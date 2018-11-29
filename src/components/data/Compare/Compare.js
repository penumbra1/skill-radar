import React from "react";
import ParallelChart from "./ParallelChart";
import styles from "../data.module.css";

const data = [
  {
    name: "Honda",
    mileage: 8,
    price: 6,
    safety: 9
  },
  {
    name: "Gonda",
    mileage: 1,
    price: 3,
    safety: 5
  },
  {
    name: "Bonda",
    mileage: 2,
    price: 7,
    safety: 10
  },
  {
    name: "Donda",
    mileage: 7,
    price: 3,
    safety: 6
  },
  {
    name: "Tonda",
    mileage: 4,
    price: 1,
    safety: 0
  }
];

const domains = [
  { name: "mileage", domain: [0, 10] },
  { name: "price", domain: [0, 10] },
  { name: "safety", domain: [0, 10] }
];

const Compare = ({ data = [] }) => {
  return (
    <article className={styles.wrapper}>
      <h3>Skills in common</h3>
      <ParallelChart data={data} domains={domains} />
    </article>
  );
};

export default Compare;
