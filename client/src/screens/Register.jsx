import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import { isAuth } from "../helpers/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (response.status === 200) {
        toast.success("User created successfully");

        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isAuth() && <Navigate to="/" />}
      <section className="auth-section">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Your Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-field"
          />
          <button type="submit" className="btn btn-full">
            Register
          </button>

          <p>
            Already Have an Account?&nbsp;
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Register;
