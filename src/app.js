// Purpose: Main entry point for the application.
//
// Notes:
//     - This file is the main entry point for the application.
//     - It sets up the Express application and establishes the routes.
//     - It uses Pug as the view engine.
//     - It uses HTMX for HTTP calls and targeted DOM manipulation.
//     - It uses Stripe for payment processing.
//     - It uses MongoDB for data storage.

// EXTERNAL DEPENDENCIES
const express = require("express");
const path = require("path");
require("dotenv").config();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");

// create Express app
const app = express();
app.use(compression());

// INTERNAL DEPENDENCIES
const routes = require("./routes/index");

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://checkout.stripe.com/"],
        connectSrc: ["'self'", "https://checkout.stripe.com/"],
        frameSrc: ["'self'", "https://checkout.stripe.com/"],
    },
    hsts: false,
}));
app.use(cookieParser());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes);

// Initialize server
const port = process.env.PORT || "3000";
app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${ port }`));
