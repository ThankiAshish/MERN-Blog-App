require("dotenv").config("../.env");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;
