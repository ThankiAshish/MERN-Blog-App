require("dotenv").config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoute"));
app.use("/", require("./routes/articleRoute"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
