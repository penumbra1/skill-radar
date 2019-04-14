import React, { memo } from "react";
import styles from "./Header.module.css";

const getTitleWithArticle = title => {
  if (!title) return "a ... ";
  return `${"aeiouy".includes(title[0].toLowerCase()) ? "an" : "a"} ${title}`;
};

const Header = ({ title }) => (
  <header className={styles.wrapper}>
    <h1>• skill radar •</h1>
    <h2>{`What does it take to be ${getTitleWithArticle(title)}?`}</h2>
  </header>
);

export default memo(Header);
