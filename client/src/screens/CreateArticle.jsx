import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { isAuth } from "../helpers/auth";

const CreateArticle = () => {
  return (
    <>
      {!isAuth() && <Navigate to="/" />}
      <form>
        <ReactQuill theme="snow" />
      </form>
    </>
  );
};

export default CreateArticle;
