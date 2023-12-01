import React, { useState, useEffect } from "react";
import styles from "./Account.module.scss";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Retrieve the user's email from local storage
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  return (
    <div className={styles.account_container}>
      {userEmail ? (
        <>
          <p>Logged in as <b>{userEmail}</b></p>
          <button style={{backgroundColor: '#0073bd', borderRadius: "10px", border: "0px" , padding:"10px 20px 10px 20px", margin:"10px 0px", color:" #fff" }} onClick={() => {
             localStorage.removeItem("userEmail");
  let baseCredits = localStorage.getItem("baseCredits") || "24";
  localStorage.setItem("credits", baseCredits);
  setUserEmail("");
  navigate("/");
          }}>Logout</button>
        </>
      ) : (
        <>
          <p>Create an account to get <b>250</b> free credits.</p>
          <div className={styles.account_container_content}>
            <button onClick={() => navigate("/signup")}>Create Account</button>
            <button onClick={() => navigate("/signin")}>Login</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
