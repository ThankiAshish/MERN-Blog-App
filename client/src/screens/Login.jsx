import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await fetch(`api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        toast.success("User logged in successfully");

        setFormData({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="auth-section">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
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
        <button type="submit" className="btn btn-full">
          Login
        </button>

        <p>
          Forgot Password?&nbsp;
          <Link to="/reset" className="link">
            Reset
          </Link>
        </p>
        <p>
          Don&apos;t Have an Account?&nbsp;
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
