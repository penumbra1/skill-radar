import React from "react";
import Button from "antd/lib/button";
import styles from "./Related.module.css";

const Related = ({ jobs, onClick }) => {
  return (
    <div className={styles.wrapper}>
      {jobs.map(({ id, title }) => (
        <Button
          key={id}
          className={styles.item}
          href="#"
          onClick={onClick}
          data-id={id}
          data-title={title}
        >
          {title}
        </Button>
      ))}
    </div>
  );
};

export default Related;
