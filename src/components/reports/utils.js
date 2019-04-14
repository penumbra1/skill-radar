import React from "react";

// Multiline axis ticks, 3 words per line
// Example: https://github.com/uber/react-vis/issues/488
const createMultilineTick = (label, tickProps) => {
  const tickLines = label.split(" ").reduce(
    (lines, word) => {
      let currentLine = lines[lines.length - 1];
      const currentLength = currentLine.join(" ").length;

      if (currentLength + word.length > 21) {
        lines.push([]);
        currentLine = lines[lines.length - 1];
      }

      currentLine.push(word);
      return lines;
    },
    [[]]
  );

  const spans = tickLines.map((line, i) => (
    <tspan
      {...tickProps}
      dy={`${tickLines.length === 1 ? 0.32 : 1.1 * i - 0.14}em`}
      key={line[0]}
    >
      {line.join(" ")}
    </tspan>
  ));

  return spans;
};

export default createMultilineTick;
