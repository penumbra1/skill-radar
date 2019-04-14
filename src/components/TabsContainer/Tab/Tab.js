import React from "react";
import ContentAnimation from "../../animations/ContentAnimation";
import styles from "./Tab.module.css";

const Tab = ({ error, fallback, children }) => {
  // Both ContentAnimations have to stay rendered
  return (
    <>
      <ContentAnimation show={!error && !!children}>
        <article className={styles.content}>{children}</article>
      </ContentAnimation>
      <ContentAnimation show={!!error || !children}>
        <div className={`${styles.message}`}>{error || fallback}</div>
      </ContentAnimation>
    </>
  );
};

export default Tab;
