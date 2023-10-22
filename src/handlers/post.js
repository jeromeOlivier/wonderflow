const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { workshops } = require("./get");
const data = require("../workshops.json");

/**
 * Function to add email address to a Mailchimp list.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise} - Promise with no resolved value.
 */
const newsletter = asyncHandler(async(req, res) => {
    const { email } = req.body;
    console.log("this is the email", email);

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
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        res.cookie("isSubscribed", "true", { maxAge: 10 * 365 * 24 * 60 * 60 * 1000 })
           .render("newsletter-thanks");
    } catch (error) {
        console.error("Error:", error);
        console.error(error.response ? error.response.data : error);
        res.sendStatus(500);
    }
});

// email transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD,
    },
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
            res.render("contact-thanks");
        }
    });
};

const payment = async(req, res, next) => {
    const workshop = data.workshops[0];
    const {
        first_name, last_name, email, tel, company, position, message,
    } = req.body;

    const forward = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `inscription from: ${ first_name } ${ last_name }`,
        text: `
        first name: ${ first_name }
        last name: ${ last_name }
        email: ${ email }
        tel: ${ tel || "no tel" }
        company: ${ company || "no company" }
        position: ${ position || "no position" }
        message: ${ message || "no message" }
        `,
        priority: "high",
    };
    await transporter.sendMail(forward, () => {});
    const isSubscribed = req.cookies.isSubscribed;
    res.render("layout", { content: "success", isSubscribed });
    /*
     try {
     const session = await stripe.checkout.sessions.create({
     payment_method_types: ["card"],
     mode: "payment",
     line_items: [
     {
     price_data: {
     currency: "cad", product_data: {
     name: 'Wonderflow',
     description: `${ workshop.name } - ${ workshop.date }`,
     }, unit_amount: workshop.price,
     }, quantity: workshop.quantity,
     },
     ],
     success_url: `${ process.env.BASE_URL }/success`,
     cancel_url: `${ process.env.BASE_URL }/workshops`,
     });
     console.log("Session", session.url);
     res.redirect(session.url);
     } catch (error) {
     console.log("Error", error);
     res.status(500).json({
     error: error.message,
     });
     }
     */
};
// path: src/handlers/post.js

module.exports = {
    newsletter, contact, payment,
};

