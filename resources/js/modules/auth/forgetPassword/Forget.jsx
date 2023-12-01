import React from "react";
import styles from "./Forget.module.scss";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import FormInput from "../../../FormInput/FormInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forget = () => {
  const navigate = useNavigate();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "https://apichatbot.cyberasol.com/api/forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.status === 200) {
        // Show error toast
        notify(true);
        // Request was successful, you can handle the success here.
        console.log("Email sent to your gmail account!");
        // Redirect or perform any other actions on success.
        // navigate("/setpassword");
      } else {
        // Show error toast
        notify(false);
        // Request failed, handle the error here.
        console.error("This Email does not exist!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const notify = (isSuccess) => {
    if (isSuccess) {
      toast.info("Email sent to your gmail account!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("This Email does not exist!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <div className={styles.forget_container}>
        <h1 onClick={() => navigate("/")}>
          FalecomELE.
          <span>org</span>
        </h1>
        <div className={styles.forget_container_content}>
          <h1>Forgot your password?</h1>
          <div className={styles.forget_container_content_innercontent}>
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
                    <p>
                      Enter your email address and we'll send you a password
                      reset link:
                    </p>
                    <FormInput
                      label=""
                      name="email"
                      type="email"
                      place="Email address"
                    />

                    <button
                      className={
                        styles.forget_container_content_innercontent_btn
                      }
                      type="submit"
                    >
                      <h1>Send reset link</h1>
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

export default Forget;