import React, { memo } from "react";
import styles from "./Header.module.css";

const Header = ({ title }) => (
  <header className={styles.wrapper}>
    <h1>• skill radar •</h1>
    <h2>{`What does it take to be a ${title || "..."} ?`}</h2>
  </header>
);

export default memo(Header);
