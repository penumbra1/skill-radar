import React from "react";
import styles from "./Message.module.css";

const Message = ({ children }) => (
  <div className={`${styles.wrapper}`}>{children}</div>
);

export default Message;
