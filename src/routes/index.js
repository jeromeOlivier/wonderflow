// Purpose: Index of all routes
// EXTERNAL DEPENDENCIES
const express = require('express');
const router = express.Router();
const pages = require('../controllers/pages')
const chimp = require('../controllers/mailchimp')

// INTERNAL DEPENDENCIES

// ROUTES
router.get('/', pages.get_index);
router.get('/approach', pages.get_approach);
router.get('/workshops', pages.get_workshops);
router.get('/about', pages.get_about);
router.get('/contact', pages.get_contact);
router.get('/blog', pages.get_blog);
router.post('/newsletter', chimp.add_email);

module.exports = router;