// Purpose: Centralized route definitions for all GET and POST endpoints

// ─── External Dependencies ─────────────────────────────────────────────────────
const express = require('express');
const router = express.Router();
const get = require('../handlers/get');
const post = require('../handlers/post');
const isEmail = require("../middleware/isEmail");

// ─── Full Page Routes (Render layout with content injection) ───────────────────
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

// ─── HTMX Content-Only Routes (Partial swaps for <main>) ───────────────────────
router.get('/content_index', get.content_index);
router.get('/content_about', get.content_about);
router.get('/content_approach', get.content_approach);
router.get('/content_blog', get.content_blog);
router.get('/content_contact', get.content_contact);
router.get('/content_policy', get.content_policy);
router.get('/content_workshops', get.content_workshops);
router.get('/content_daily', get.content_daily);
// router.get('/content_inscription', get.content_inscription); // optional/unused

// ─── HTMX Meta Tag Routes (Used to update <head> metadata) ─────────────────────
router.get('/meta_index', get.meta_index);
router.get('/meta_about', get.meta_about);
router.get('/meta_approach', get.meta_approach);
router.get('/meta_blog', get.meta_blog);
router.get('/meta_contact', get.meta_contact);
router.get('/meta_policy', get.meta_policy);
router.get('/meta_workshops', get.meta_workshops);
router.get('/meta_daily', get.meta_daily);
router.get('/meta_inscription', get.meta_inscription);
router.get('/meta_success', get.meta_success);

// ─── Form Submission Routes (POST endpoints) ────────────────────────────────────
router.post('/newsletter', isEmail, post.newsletter);
router.post('/contact', isEmail, post.contact);
router.post('/checkout', isEmail, post.payment);

module.exports = router;