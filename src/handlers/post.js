const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { workshops } = require("./get");
const data = require("../workshops.json");
const { getLocale } = require("./get");
const metaData = require("../utils/meta");

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
  host: process.env.CONTACT_MAIL_SMTP,
  port: Number(process.env.CONTACT_MAIL_PORT),
  secure: process.env.CONTACT_MAIL_SECURE === "true",
  auth: {
    user: process.env.CONTACT_EMAIL_FROM,
    pass: process.env.CONTACT_EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP login failed:", error);
  } else {
    console.log("SMTP login successful!");
  }
});


/**
 * Handles the contact form submission by validating input, sending an email,
 * and rendering the appropriate response (full-page or HTMX partial).
 *
 * @async
 * @function contact
 * @param {import('express').Request} req - Express request object, expected to contain
 *        `name`, `email`, and `message` in `req.body`, and optionally a `isSubscribed` cookie.
 * @param {import('express').Response} res - Express response object used to send the HTTP response.
 * @param {import('express').NextFunction} next - Express next middleware function (not used in this handler).
 * @returns {Promise<void>} A promise that resolves after handling the request.
 *
 * @throws {400} If required fields (`name`, `email`, `message`) are missing.
 * @throws {500} If an error occurs while sending the email.
 *
 * Renders a "contact-thanks" view:
 * - If the request is an HTMX request, renders only the main content.
 * - Otherwise, renders the full layout including metadata and subscription state.
 */

const contact = async (req, res, next) => {
  const locale = getLocale(req);
  const { name, email, message } = req.body;

   if (!email || !message || !name) {
    return res.status(400).send("Missing required fields");
  }

  const mailOptions = {
    from: process.env.CONTACT_EMAIL_FROM,
    to: process.env.CONTACT_EMAIL_TO,
    subject: `New message from ${name} (${email})`,
    text: `
    From: ${name}
    Email: ${email}
    
    Message:
    ${message}
        `,
    priority: "high",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    const isSubscribed = req.cookies.isSubscribed === "true";

    if (req.get("HX-Request")) {
      // For HTMX requests, return only the main content (no layout)
      return res.render(`${locale}/contact-thanks`);
    }

    // For normal full-page load
    return res.render("layout", {
      content: "contact-thanks",
      locale,
      isSubscribed,
      meta: metaData[locale]["contact-thanks"],
      req,
      viewPath: `${locale}/contact-thanks`
    });

  } catch (error) {
    console.error("Failed to send email:", error);
    return res.status(500).send("An error occurred while sending your message.");
  }
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

