import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="auth-section">
      <form>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
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
