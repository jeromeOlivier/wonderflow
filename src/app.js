// External imports
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const env = require("dotenv");
const compression = require("compression");
const helmet = require("helmet");

// Internal imports
const routes = require("./routes/index");
const app = express();

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "public")));
