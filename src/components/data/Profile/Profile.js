import React from "react";
import BarChart from "./BarChart";
import styles from "./Profile.module.css";

const Profile = ({ skills = [], abilities = [] }) => {
  return (
    <>
      <div className={styles.chart}>
        <h3>Skills</h3>
        <BarChart data={skills} color="#fa8775" />
      </div>
      <div className={styles.chart}>
        <h3>Abilities</h3>
        <BarChart data={abilities} color="#9d02d7" />
      </div>
    </>
  );
};

export default Profile;
