import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProvider from "./context/UserContext";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Reset from "./screens/Reset";
import CreateArticle from "./screens/CreateArticle";
import Article from "./screens/Article";

import Layout from "./layouts/Layout";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/create-article" element={<CreateArticle />} />
            <Route path="/article/:id" element={<Article />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
