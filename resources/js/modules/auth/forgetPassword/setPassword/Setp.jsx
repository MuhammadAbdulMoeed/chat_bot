import React from "react";
import styles from "./Setp.module.scss";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import FormInput from "../../../../FormInput/FormInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setp = () => {
  const navigate = useNavigate();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is Required"),
    new_password: Yup.string().required("Password is Required"),
    new_password_confirmation: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Password Confirmation is Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "https://apichatbot.cyberasol.com/api/updatepassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.status === 200) {
        // Show success toast
        notify(true);
        // Request was successful, you can handle the success here.
        console.log("Your Password Updated Successfully");
        // Redirect or perform any other actions on success.
        navigate("/");
      } else {
        // Show error toast
        notify(false);
        // Request failed, handle the error here.
        console.error("Please Try Again");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const notify = (isSuccess) => {
    if (isSuccess) {
      toast.success("Your Password Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Please try strong password", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <>
      <div className={styles.setP_container}>
        <h1 onClick={() => navigate("/")}>
          FalecomELE.
          <span>org</span>
        </h1>
        <div className={styles.setP_container_content}>
          <h1> Create Your New Password</h1>
          <div className={styles.setP_container_content_innercontent}>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={validate}
              onSubmit={handleSubmit} // Add the onSubmit handler
            >
              {(formik) => (
                <div>
                  <Form>
                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      place="Enter your Email"
                    />
                    <FormInput
                      label="New password"
                      name="new_password"
                      type="password"
                      place="Enter your password"
                    />
                    <FormInput
                      label="Confirm your new password"
                      name="new_password_confirmation"
                      type="password"
                      place="Enter your confirm password"
                    />

                    <button
                      className={styles.setP_container_content_innercontent_btn}
                      type="submit"
                    >
                      <h1>Submit</h1>
                      <HiOutlineArrowNarrowRight />
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Setp;
