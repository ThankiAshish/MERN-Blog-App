import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./assets/styles/style.css";
import "./assets/styles/queries.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="container">
      <App />
    </div>
  </React.StrictMode>
);
