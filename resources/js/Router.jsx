import React from "react";
import {
  Account,
  Credits,
  Dashboard,
  Feedback,
  Forget,
  Setp,
  Setting,
  Signin,
  Signup,
} from "./modules";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chatbot } from "./components";
import { ToastContainer } from "react-toastify";

const Router = () => {
  return (
    <>
  
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Chatbot />} />
            <Route path="/setting" element={<Setting />}>
              <Route path="/setting/" element={<Feedback />} />
              <Route path="/setting/account" element={<Account />} />
              <Route path="/setting/credits" element={<Credits />} />
            </Route>
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgetpassword" element={<Forget />} />
          <Route path="/setpassword" element={<Setp />} />
        </Routes>
        <ToastContainer />
    
    </>
  );
};

export default Router;
