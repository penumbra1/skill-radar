import React from "react";
import { ReactComponent as Dots } from "./three-dots.svg";
import palette from "../../palette";
import { Icon } from "antd";
import styles from "./Loader.module.css";

// Convert palette to CSS variables for use in keyframes
const colorVars = () => {
  const vars = {};
  palette.forEach((color, index) => {
    vars[`--${index}`] = color;
  });
  return vars;
};

const Loader = ({ fontSize }) => {
  // Variables will be local to the element!
  const style = { ...colorVars(), fontSize };

  return <Icon component={Dots} style={style} className={styles.loader} />;
};

export default Loader;
