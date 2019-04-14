import React from "react";
import ParallelChart from "./ParallelChart";
import styles from "./Compare.module.css";

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
    <div className={styles.chart}>
      <h3>Skills in common</h3>
      <ParallelChart data={data} domains={getDomains(data)} />
    </div>
  );
};

export default Compare;
