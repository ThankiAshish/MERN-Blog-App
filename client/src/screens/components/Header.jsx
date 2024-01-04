const Header = () => {
  return (
    <header>
      <h1>MERN Blog App</h1>
      <nav>
        <ul>
          <li>
            <a href="/" className="btn">
              Login
            </a>
          </li>
          <li>
            <a href="/" className="btn btn-outline">
              Register
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
