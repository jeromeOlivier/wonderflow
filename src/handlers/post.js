const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

/**
 * Function to add email address to a Mailchimp list.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise} - Promise with no resolved value.
 */
const newsletter = asyncHandler(async(req, res) => {
    const { email } = req.body;
    console.log('this is the email', email)

    // Mailchimp credentials
    const dataCenter = process.env.MAILCHIMP_DATA_CENTER;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const apiKey = process.env.MAILCHIMP_API_KEY;

    // endpoint
    const url = `https://${ dataCenter }.api.mailchimp.com/3.0/lists/${ listId }/members`;
    const config = {
        method: "POST", body: JSON.stringify({
            email_address: email, status: "subscribed",
        }), headers: {
            "Content-Type": "application/json",
            "Authorization": `apikey ${ apiKey }`,
        },
    };
    console.log(config);
    try {
        const response = await fetch(url, config);
        console.log(response);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json(); // if the API returns JSON
        res.cookie("isSubscribed", "true", { maxAge: 10 * 365 * 24 * 60 * 60 * 1000 })
           .render("newsletter-thanks");
    } catch (error) {
        console.error("Error:", error);
        console.error(error.response ? errro.response.data : error);
        res.sendStatus(500);
    }
});

/**
 * Handles the contact form submission and sends an email.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the email has been
 *     sent.
 */
const contact = async(req, res, next) => {
    const { email, message } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === "true",
        auth: {
            user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `message from: ${ email }`,
        text: `
        from: ${ email }
        message: ${ message }
        `,
        priority: "high",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
            res.render('contact-thanks');
        }
    });
};

module.exports = {
    newsletter, contact,
};

