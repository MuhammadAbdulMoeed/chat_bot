import React, { useState } from "react";
import styles from "./Signup.module.scss";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import FormInput from "../../../FormInput/FormInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Name Validation
    if (!formData.name.trim()) {
      formErrors.name = 'Name is required';
      isValid = false;
    }

    // Email Validation
    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
      isValid = false;
    }

    // Password Validation
    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Password Confirmation Validation
    if (!formData.password_confirmation) {
      formErrors.password_confirmation = 'Confirm Password is required';
      isValid = false;
    } else if (formData.password !== formData.password_confirmation) {
      formErrors.password_confirmation = 'Passwords do not match';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          navigate("/signin");
        } else {
          const errorResponse = await response.json();
          setErrors({ submit: errorResponse.message });
        }
      } catch (error) {
        setErrors({ submit: error.message });
      }
    }
  }

  return (
    <>
      <div className={styles.signup_container}>
        <h1 onClick={() => navigate("/")}>
          FalecomELE.
          <span>org</span>
        </h1>
        <div className={styles.signup_container_content}>
          <h1>Create your account</h1>
          <div className={styles.signup_container_content_innercontent}>
           
        
                <div>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name" className={styles.form_label}>Name</label>
            <input
              className={styles.inputField}
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
            <label htmlFor="name" className={styles.form_label}>Email</label>
            <input
              className={styles.inputField}
              label="Email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
            <label htmlFor="name" className={styles.form_label}>Password</label>
            <input
              className={styles.inputField}
              label="Password"
              name="password"
              type="password"
              placeholder="Create your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className={styles.error}>{errors.password}</div>}
            <label htmlFor="name" className={styles.form_label}>Confirm Password</label>
            <input
              className={styles.inputField}
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              placeholder="Confirm your password"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
            {errors.password_confirmation && <div className={styles.error}>{errors.password_confirmation}</div>}

            <button
              className={styles.signup_container_content_innercontent_btn}
              type="submit"
            >
              Continue
              <HiOutlineArrowNarrowRight />
            </button>
          </form>
                </div>
            <p>
              Already have an account?<Link to="/signin"> Log in.</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
