import React, { useState } from "react";
import styles from "./Topbar.module.scss";
import { TopIcon1, TopIcon2 } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";
const Topbar = () => {
  const [root, setRoot] = useState(true);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const toggleIcon = () => {
    // Add logic to change the route based on the current state of 'root'
    if (root) {
      navigate("/setting");
    } else {
      navigate("/");
    }
    setRoot(!root);
  };

  return (
    <>
      <div className={styles.top_container}>
        <div className={styles.top_container_content}>
          <div className={styles.top_container_content_top}>
            <h1>Talk To Him</h1>
            <p>NOTE: THIS IS A SIMULATED CHAT WITH BOT USING AI </p>
          </div>
          {root ? (
            <Link to="/setting">
              <img src={TopIcon1} alt="Icon" onClick={toggleIcon} />
            </Link>
          ) : (
            <Link to="/">
              <img src={TopIcon2} alt="Icon" onClick={toggleIcon} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
