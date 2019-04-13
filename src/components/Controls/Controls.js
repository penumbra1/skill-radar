import React from "react";
import SearchInput from "./SearchInput";
import Button from "antd/lib/button";
import styles from "./Controls.module.css";
import { Status } from "../App";
import Loader from "../Loader/Loader";

const Controls = ({ onSelect, onClick, job }) => {
  return (
    <div className={styles.wrapper}>
      <Status.Consumer>
        {({ loading }) => loading && <Loader fontSize="2rem" />}
      </Status.Consumer>
      <SearchInput onSelect={onSelect} job={job} />
      <Button icon="plus" onClick={onClick}>
        compare
      </Button>
    </div>
  );
};

export default Controls;
