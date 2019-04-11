import React from "react";
import ContentAnimation from "../animations/ContentAnimation";
import styles from "./Tab.module.css";

const Tab = ({ message, children }) => {
  // ContentAnimations have to stay rendered
  return (
    <>
      <ContentAnimation show={!!children}>
        <article className={styles.content}>{children}</article>
      </ContentAnimation>
      <ContentAnimation show={!children}>
        <div className={`${styles.message}`}>{message}</div>
      </ContentAnimation>
    </>
  );
};

export default Tab;
