// Purpose: Index of all routes
// EXTERNAL DEPENDENCIES
const express = require('express');
const router = express.Router();
const get = require('../handlers/get')
const post = require('../handlers/post')
const isEmail = require("../middleware/isEmail");

// INTERNAL DEPENDENCIES

// GET CONTENT WITH LAYOUT
router.get('/', get.index);
router.get('/about', get.about);
router.get('/approach', get.approach);
router.get('/blog', get.blog);
router.get('/contact', get.contact);
router.get('/policy', get.policy);
router.get('/workshops', get.workshops);
router.get('/daily', get.daily);
router.get('/inscription', get.inscription);
router.get('/success', get.success);
// GET CONTENT WITHOUT LAYOUT
router.get('/content_index', get.content_index);
router.get('/content_about', get.content_about);
router.get('/content_approach', get.content_approach);
router.get('/content_blog', get.content_blog);
router.get('/content_contact', get.content_contact);
router.get('/content_policy', get.content_policy);
router.get('/content_workshops', get.content_workshops);
router.get('/content_daily', get.content_daily);
// router.get('/content_inscription', get.content_inscription);
// POST ROUTES
router.post('/newsletter', isEmail, post.newsletter);
router.post("/contact", isEmail, post.contact);
router.post("/checkout", isEmail, post.payment);
// path: src/routes/index.js


module.exports = router;