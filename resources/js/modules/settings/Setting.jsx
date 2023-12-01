import React from "react";
import styles from "./Setting.module.scss";
import { AccountIcon, CreditIcon, FdbackIcon } from "../../assets";
import { Outlet, useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();

  const clearChatHistory = () => {
    const messageCount = localStorage.getItem("messageCount");
    localStorage.removeItem("chatData");
    if (messageCount) {
      localStorage.setItem("messageCount", messageCount);
    }

    navigate("/");
  };


  return (
    <>
      <div className={styles.setting_container}>
        <div className={styles.setting_container_content}>
          <div className={styles.setting_container_content_top}>
            <h1>setting</h1>
            <button onClick={clearChatHistory}>Clear Chat</button>
          </div>
          <div className={styles.setting_container_content_middle}>
            <div
              className={styles.setting_container_content_middle_items}
              onClick={() => navigate("/setting")}
            >
              <img src={FdbackIcon} alt="Icons" />
              <p>feedback</p>
            </div>
            <div
              className={styles.setting_container_content_middle_items}
              onClick={() => navigate("/setting/account")}
            >
              <img src={AccountIcon} alt="Icons" />
              <p>account</p>
            </div>
            <div
              className={styles.setting_container_content_middle_items}
              onClick={() => navigate("/setting/credits")}
            >
              <img src={CreditIcon} alt="Icons" />
              <p>Credits</p>
            </div>
          </div>
          <div className={styles.setting_container_content_bottom}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
