import React from "react";
import styles from "./Signin.module.scss";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import FormInput from "../../../FormInput/FormInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("https://chatbot.cyberasol.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (response.status === 200) {
        notify(true);
    

        localStorage.setItem("userEmail", values.email);
       
  
        console.log("Successfully Login!");
        updateCredits(250);

        navigate("/");
      } else {
        notify(false);
        console.error("Invalid Email or Password");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  


  const updateCredits = (newCredits) => {
    let existingCredits = parseInt(localStorage.getItem("credits") || "24", 10);
    let baseCredits = parseInt(localStorage.getItem("baseCredits") || existingCredits.toString(), 10);
  
    localStorage.setItem("credits", (existingCredits + newCredits).toString());
    localStorage.setItem("baseCredits", baseCredits.toString());
  };
  const notify = (isSuccess) => {
    if (isSuccess) {
      toast.success("Successfull Login!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Invalid Password or Email!!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <>
      <div className={styles.signin_container}>
        <h1 onClick={() => navigate("/")}>
          FalecomELE.
          <span>org</span>
        </h1>
        <div className={styles.signin_container_content}>
          <h1>Log in to your account</h1>
          <div className={styles.signin_container_content_innercontent}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validate}
              onSubmit={handleSubmit} // Add the onSubmit handler
              onClick={notify}
            >
              {(formik) => (
                <div>
                  <Form>
                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      place="Enter email"
                    />

                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                      place="Enter password"
                    />
                    <span>
                      Forgot your password?{" "}
                      <Link to="/forgetpassword">Reset it</Link>
                    </span>
                    <button
                      className={
                        styles.signin_container_content_innercontent_btn
                      }
                      type="submit"
                    >
                      <h1>Login</h1>
                      <HiOutlineArrowNarrowRight />
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
            <p>
              Don't have an account?<Link to="/signup"> Create one</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signin;
