import React from "react";
import ParallelChart from "./ParallelChart";

// const testData = [
//   {
//     name: "Honda",
//     mileage: 8,
//     price: 6,
//     safety: 9
//   },
//   {
//     name: "Toyota",
//     mileage: 1,
//     price: 3,
//     safety: 5
//   }
// ];

// const testDomains = [
//   { name: "mileage", domain: [0, 10] },
//   { name: "price", domain: [0, 10] },
//   { name: "safety", domain: [0, 10] }
// ];

const getDomains = data => {
  const maxLevel = Math.ceil(
    data.reduce((max, { levels }) => Math.max(...levels.values(), max), 0)
  );

  return [...data[0].levels.keys()].map(skill => ({
    name: skill,
    getValue: item => item.levels.get(skill),
    domain: [0, maxLevel]
  }));
};

const Compare = ({ data = [] }) => {
  if (data.length === 0) return null;

  return (
    <>
      <h3>Skills in common</h3>
      <ParallelChart data={data} domains={getDomains(data)} />
    </>
  );
};

export default Compare;
