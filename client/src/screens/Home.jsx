import { isAuth } from "../helpers/auth";
import { Navigate } from "react-router-dom";

import Article from "./components/Article";
import Header from "./components/Header";

const Home = () => {
  return (
    <>
      {!isAuth() && <Navigate to="/login" />}
      <Header />
      <Article />
    </>
  );
};

export default Home;
