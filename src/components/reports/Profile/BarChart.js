import React, { memo } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries
} from "react-vis";
import createMultilineTick from "../utils";

const yTickFormat = label => createMultilineTick(label, { x: "0" });

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
        tickFormat={yTickFormat}
      />
      <HorizontalBarSeries animation="gentle" data={data} />
    </XYPlot>
  );
};

export default memo(BarChart);
