const asyncHandler = require("express-async-handler");

/**
 * Middleware to handle INDEX route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const index = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render index page with all the necessary attributes
    res.render("layout", { content: "index", isSubscribed });
});
// inject INDEX content into MAIN
const content_index = asyncHandler(async(req, res) => {
    res.render("index");
});

/**
 * Middleware to handle ABOUT route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const about = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render index page with all the necessary attributes
    res.render("layout", { content: "about", isSubscribed });
});
// inject ABOUT content into MAIN
const content_about = asyncHandler(async(req, res) => {
    res.render("about");
});

/**
 * Middleware to handle APPROACH route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const approach = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render approach page with all the necessary attributes
    res.render("layout", { content: "approach", isSubscribed });
});
// inject APPROACH content into MAIN
const content_approach = asyncHandler(async(req, res) => {
    res.render("approach");
});

/**
 * Middleware to handle BLOG route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const blog = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render blog page with all the necessary attributes
    res.render("layout", { content: "blog", isSubscribed });
});
// inject BLOG content into MAIN
const content_blog = asyncHandler(async(req, res) => {
    res.render("blog");
});

/**
 * Middleware to handle CONTACT route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const contact = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render contact page with all the necessary attributes
    res.render("layout", { content: "contact", isSubscribed });
});
// inject CONTACT content into MAIN
const content_contact = asyncHandler(async(req, res) => {
    res.render("contact");
});

/**
 * Middleware to handle POLICY route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const policy = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render POLICY page with all the necessary attributes
    res.render("layout", { content: "policy", isSubscribed });
});
// inject POLICY content into MAIN
const content_policy = asyncHandler(async(req, res) => {
    res.render("policy");
});

/**
 * Middleware to handle WORKSHOPS route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const workshops = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render contact page with all the necessary attributes
    res.render("layout", { content: "workshops", isSubscribed });
});
// inject WORKSHOPS content into MAIN
const content_workshops = asyncHandler(async(req, res) => {
    res.render("workshops");
});

/**
 * Middleware to handle DAILY WORKSHOP route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const daily = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render contact page with all the necessary attributes
    res.render("layout", { content: "daily", isSubscribed });
});
// inject DAILY WORKSHOP content into MAIN
const content_daily = asyncHandler(async(req, res) => {
    res.render("daily");
});

/**
 * Middleware to handle INSCRIPTION route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const inscription = asyncHandler(async(req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === "true";
    // render contact page with all the necessary attributes
    res.render("layout", { content: "inscription", isSubscribed });
});
// inject INSCRIPTION content into MAIN
const content_inscription = asyncHandler(async(req, res) => {
    res.render("inscription");
});

/**
 * Middleware to handle SUCCESSFUL INSCRIPTION route.
 */
const success = asyncHandler(async(req, res) => {
    const isSubscribed = req.cookies.isSubscribed === "true";
    res.render("layout", { content: "success", isSubscribed });
});

module.exports = {
    index,
    about,
    approach,
    blog,
    contact,
    policy,
    workshops,
    daily,
    inscription,
    success,
    content_index,
    content_about,
    content_approach,
    content_blog,
    content_contact,
    content_policy,
    content_workshops,
    content_daily,
    content_inscription,
};