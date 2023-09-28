// Purpose: Index of all routes
// EXTERNAL DEPENDENCIES
const express = require('express');
const router = express.Router();
const get = require('../controllers/get')
const chimp = require('../controllers/mailchimp')

// INTERNAL DEPENDENCIES

// FULL PAGE ROUTES
router.get('/', get.index);
router.get('/about', get.about);
router.get('/approach', get.approach);
router.get('/blog', get.blog);
router.get('/contact', get.contact);
router.get('/policy', get.policy);
router.get('/workshops', get.workshops);
// CONTENT INJECTION ROUTES
router.get('/content_index', get.content_index);
router.get('/content_about', get.content_about);
router.get('/content_approach', get.content_approach);
router.get('/content_blog', get.content_blog);
router.get('/content_contact', get.content_contact);
router.get('/content_policy', get.content_policy);
router.get('/content_workshops', get.content_workshops);
// SECONDARY ROUTES
router.post('/newsletter', chimp.add_email);
// router.post('/contact', post.post_contact);

module.exports = router;