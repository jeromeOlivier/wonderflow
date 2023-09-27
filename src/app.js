// Purpose: Main entry point for the application.
//
// Notes:
//     - This file is the main entry point for the application.
//     - It sets up the Express application and establishes the routes.
//     - Once it becomes necessary, it will connect to MongoDB with Mongoose.
//     - It uses Pug as the view engine.
//     - It uses HTMX for HTTP calls and targeted DOM manipulation.

// EXTERNAL DEPENDENCIES
const express = require("express");
const path = require("path");
const env = require("dotenv");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require('cookie-parser')

// INTERNAL DEPENDENCIES
const routes = require("./routes/index");

// initialize dotenv
env.config();

// create Express app
const app = express();

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes);

// Initialize server
const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Server running on port ${ port }`));

