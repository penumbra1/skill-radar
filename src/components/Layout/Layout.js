import React from "react";
import Header from "./Header";

import styles from "./Layout.module.css";

const Layout = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <Header title={title} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
