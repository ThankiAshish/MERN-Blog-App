// import { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

// import Editor from "./components/Editor";

// import { isAuth } from "../helpers/auth";
// import { toast } from "react-toastify";

// const CreateArticle = () => {
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [cover, setCover] = useState("");
//   const [content, setContent] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.set("title", title);
//     formData.set("summary", summary);
//     formData.set("content", content);
//     formData.set("cover", cover[0]);
//     formData.set("author", isAuth().id);

//     try {
//       const response = await fetch(`api/article`, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.status === 200) {
//         setTitle("");
//         setSummary("");
//         setCover("");
//         setContent("");

//         toast.success("Article created successfully");
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       {!isAuth() && <Navigate to="/" />}
//       <form className="article-form" onSubmit={handleSubmit}>
//         <h1>Create New Article</h1>
//         <input
//           type="text"
//           name="title"
//           id="title"
//           placeholder="Article Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="input-field"
//         />
//         <input
//           type="text"
//           name="summary"
//           id="summary"
//           placeholder="Article Summary"
//           value={summary}
//           onChange={(e) => setSummary(e.target.value)}
//           className="input-field"
//         />
//         <input
//           type="file"
//           name="cover"
//           id="cover"
//           className="input-field"
//           onChange={(e) => setCover(e.target.files)}
//         />
//         <Editor value={content} onChange={setContent} />
//         <button type="submit" className="btn btn-full">
//           Create Article
//         </button>
//       </form>
//     </>
//   );
// };

// export default CreateArticle;

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import Editor from "./components/Editor";

import { isAuth } from "../helpers/auth";
import { toast } from "react-toastify";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [cover, setCover] = useState([]);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setCover(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("cover", cover[0]);
    formData.set("author", isAuth().id);

    try {
      const response = await fetch(`api/article`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        setTitle("");
        setSummary("");
        setCover([]);
        setContent("");

        toast.success("Article created successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {!isAuth() && <Navigate to="/" />}
      <form className="article-form" onSubmit={handleSubmit}>
        <h1>Create New Article</h1>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          name="summary"
          id="summary"
          placeholder="Article Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="input-field"
        />
        <label htmlFor="dropzone" className="cover-label">
          Article Cover
        </label>
        <div {...getRootProps({ className: "dropzone" })} name="dropzone">
          <input {...getInputProps()} />
          <p>Drag & drop some files here, or click to select files</p>
          <aside>
            <ul>
              {cover.map(
                (file) => (
                  console.log(file),
                  (
                    <div className="file-preview">
                      <img className="preview" src={file.preview} alt="" />
                      <p>{file.name}</p>
                    </div>
                  )
                )
              )}
            </ul>
          </aside>
        </div>
        <Editor value={content} onChange={setContent} />
        <button type="submit" className="btn btn-full">
          Create Article
        </button>
      </form>
    </>
  );
};

export default CreateArticle;
