const asyncHandler = require("express-async-handler");

/**
 * Function to add email address to a Mailchimp list.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise} - Promise with no resolved value.
 */
const register_newsletter = asyncHandler(async(req, res, next) => {
    const { email_address } = req.body;

    // Mailchimp credentials
    const dataCenter = process.env.MAILCHIMP_DATA_CENTER;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const apiKey = process.env.MAILCHIMP_API_KEY;

    // endpoint
    const url = `https://${ dataCenter }.api.mailchimp.com/3.0/lists/${ listId }/members`;

    fetch(url, {
        method: "POST", body: JSON.stringify({
            email_address: email_address, status: "subscribed",
        }), headers: {
            "Authorization": `apikey ${ apiKey }`,
            "Content-Type": "application/json",
        },
    }).then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        res.cookie("isSubscribed", "true", { maxAge: 10 * 365 * 24 * 60 * 60 * 1000 })
           .render("thankyou");
    }).catch((error) => {
        console.error("Error:", error);
        res.sendStatus(500);
    });
});

module.exports = {
    add_email: register_newsletter,
};

