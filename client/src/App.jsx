import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
