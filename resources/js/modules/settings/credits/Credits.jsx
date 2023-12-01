import React, { useEffect, useState } from "react";
import styles from "./Credits.module.scss";
// import { Navigate } from "react-router-dom";

const Credits = () => {
  const [credits, setCredits] = useState(() => {
    return parseInt(localStorage.getItem("credits") || "24", 10);
  });

  useEffect(() => {
    localStorage.setItem("credits", credits.toString());
  }, [credits]);

  
  return (
    <>
      <div className={styles.credits_container}>
        <div className={styles.credits_container_content}>
          <p>
            You have <b>{credits}</b> credits. {credits === 0 && ' Create an account to get more credits.'}
          </p>
        </div>
      </div>
    </>
  );
};

export default Credits;
