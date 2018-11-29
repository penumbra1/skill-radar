import React from "react";
import BarChart from "./BarChart";
import styles from "../data.module.css";

const Profile = ({ skills = [], abilities = [] }) => {
  return (
    <article className={styles.wrapper}>
      <div>
        <h3>Skills</h3>
        <BarChart data={skills} color="#fa8775" />
      </div>
      <div>
        <h3>Abilities</h3>
        <BarChart data={abilities} color="#9d02d7" />
      </div>
    </article>
  );
};

export default Profile;
