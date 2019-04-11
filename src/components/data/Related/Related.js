import React from "react";

const Related = ({ jobs }) => {
  return (
    <>
      {jobs.map(({ id, title }) => (
        <p key={id} style={{ display: "inline-block" }}>
          {title}
        </p>
      ))}
    </>
  );
};

export default Related;
