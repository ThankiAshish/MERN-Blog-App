import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>MERN Blog App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login" className="btn">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="btn btn-outline">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
