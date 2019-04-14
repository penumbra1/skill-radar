import React from "react";
import { ParallelCoordinates } from "react-vis";
import { LabelSeries } from "react-vis";
import createMultilineTick from "../utils";
import palette from "../../../palette";

// React-vis doesn't allow to control label rotation
// To rotate labels, I render my own LabelSeries instead of the default one
// Adapted from the source:
// https://github.com/uber/react-vis/blob/master/src/parallel-coordinates/index.js

function getLabelsData(props) {
  const { domains, style, rotation } = props;
  return domains.map((domain, index) => {
    return {
      x: domain.name,
      y: 1.1,
      label: domain.name,
      rotation: rotation,
      style
    };
  });
}

class VerticalLabelSeries extends LabelSeries {
  getLabel = labelData => {
    const xFunctor = this._getAttributeFunctor("x");
    console.log(xFunctor(labelData));
    return createMultilineTick(labelData.label, { x: xFunctor(labelData) });
  };

  render() {
    console.log("render series");
    return (
      <LabelSeries
        {...this.props}
        getLabel={this.getLabel}
        labelAnchorX="start"
      />
    );
  }
}

const ParallelChart = ({ data, className, domains }) => {
  console.log("render chart");
  return (
    <ParallelCoordinates
      data={data}
      domains={domains}
      width={600}
      height={400}
      colorType="category"
      colorRange={palette}
      style={{ line: { strokeWidth: 3 }, labels: { display: "none" } }}
      margin={{ top: 170 }}
    >
      <VerticalLabelSeries
        domains={domains}
        data={getLabelsData({ domains, rotation: -90 })}
        animation
        className="rv-xy-plot__axis__tick__text" // imitate axis tick styles
        style={{ fontSize: 13 }}
      />
    </ParallelCoordinates>
  );
};

export default ParallelChart;
