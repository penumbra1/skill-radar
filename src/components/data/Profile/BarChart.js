import React, { memo } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries
} from "react-vis";
import "react-vis/dist/style.css";

// Multiline axis ticks, 3 words per line
// Example: https://github.com/uber/react-vis/issues/488
const tickFormatter = t => {
  const tickLines = t.split(" ").reduce(
    (lines, word) => {
      let currentLine = lines[lines.length - 1];
      const currentLength = currentLine.join(" ").length;

      if (currentLength + word.length > 21) {
        currentLine = lines[lines.push([]) - 1];
      }

      currentLine.push(word);
      return lines;
    },
    [[]]
  );
  const spans = tickLines.map((line, i) => (
    <tspan
      x="0"
      dy={`${tickLines.length === 1 ? 0.32 : 1.1 * i - 0.14}em`}
      key={line[0]}
    >
      {line.join(" ")}
    </tspan>
  ));
  return <>{spans}</>;
};

const BarChart = ({ color, data }) => {
  return (
    <XYPlot
      width={500}
      height={500}
      yType={"ordinal"}
      margin={{ left: 160 }}
      getX={s => s.importance}
      getY={s => s.name[0].toUpperCase() + s.name.slice(1)}
      colorType="literal"
      color={color}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis
        style={{
          text: {
            fontSize: "13px"
          }
        }}
        tickFormat={tickFormatter}
      />
      <HorizontalBarSeries animation="gentle" data={data} />
    </XYPlot>
  );
};

export default memo(BarChart);
