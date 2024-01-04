import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="auth-section">
      <form>
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          className="input-field"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          className="input-field"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
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
  );
};

export default Register;
