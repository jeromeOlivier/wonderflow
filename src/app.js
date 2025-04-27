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

// LiveReload only in development
if (process.env.NODE_ENV !== 'production') {
  const livereload = require('livereload');
  const connectLivereload = require('connect-livereload');
  const fs = require('fs');

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch([
    path.join(__dirname, "public"),
    path.join(__dirname, "views")
  ]);

  app.use(connectLivereload());

  // Watch pug files manually
  fs.watch(path.join(__dirname, 'views'), { recursive: true }, (eventType, filename) => {
    if (filename.endsWith('.pug')) {
      console.log(`[LiveReload] Detected change in ${filename}`);
      liveReloadServer.refresh('/');
    }
  });

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}

app.use(compression({
  // Only compress if NOT in development mode OR not the LiveReload script
  filter: (req, res) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      req.headers['accept'] &&
      req.headers['accept'].includes('text/html')
    ) {
      return false; // Don’t compress HTML in dev (due to LiveReload)
    }
    return compression.filter(req, res);
  }
}));


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
    scriptSrc: [
      "'self'",
      "https://checkout.stripe.com",
      ...(process.env.NODE_ENV !== 'production' ? ["http://localhost:35729"] : [])
    ],
    connectSrc: [
      "'self'",
      "https://checkout.stripe.com",
      ...(process.env.NODE_ENV !== 'production' ? ["ws://localhost:35729"] : [])
    ],
    frameSrc: ["'self'", "https://checkout.stripe.com"]
  },
  hsts: false
}));
app.use(cookieParser());
app.use(express.json());

// Static files
// Serve vanilla-cookieconsent from node_modules
app.use(
  '/vendor/cookieconsent',
  express.static(path.join(__dirname, '../node_modules/vanilla-cookieconsent/dist'))
);

// Serve your app's public assets
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes);

// Initialize server
const port = process.env.PORT || "3000";
app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${ port }`));
