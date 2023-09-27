const asyncHandler = require("express-async-handler");

/**
 * Middleware to handle the index route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */
const get_index = asyncHandler(async (req, res) => {
    // check if user is subscribed to the newsletter
    const isSubscribed = req.cookies.isSubscribed === 'true';

    // render index page with all the necessary attributes
    res.render('index', { isSubscribed: isSubscribed });
});

const get_approach = asyncHandler(async (req, res) => {
    res.render('approach');
});

const get_workshops = asyncHandler(async (req, res) => {
    res.render('workshops');
});

const get_about = asyncHandler(async (req, res) => {
    res.render('about');
});

const get_contact = asyncHandler(async (req, res) => {
    res.render('contact');
});

const get_blog = asyncHandler(async (req, res) => {
    res.render('blog');
});

module.exports = {
    get_index,
    get_approach,
    get_workshops,
    get_about,
    get_contact,
    get_blog
}