import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { isAuth, logout } from "../../helpers/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`api/auth/logout`, {
        method: "GET",
      });

      if (response.status === 200) {
        toast.success("Logged out successfully");
        logout();
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header>
      <Link to="/">
        <h1>MERN Blog App</h1>
      </Link>
      <nav>
        <ul>
          {isAuth() ? (
            <>
              <li>
                <Link to="/create-article" className="link">
                  Create Article
                </Link>
              </li>
              <li>
                <button className="btn btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
