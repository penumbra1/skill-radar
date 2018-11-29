import React from "react";
import { ParallelCoordinates } from "react-vis";
import palette from "../../../palette";

const ParallelChart = ({ data, domains }) => (
  <ParallelCoordinates
    data={data}
    domains={domains}
    width={500}
    height={300}
    colorType="category"
    colorDomain={[0, 1, 2]}
    colorRange={palette}
    style={{ line: { strokeWidth: 3 } }}
    margin={{ top: 20 }}
  />
);

export default ParallelChart;
