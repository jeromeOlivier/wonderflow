// Purpose: Centralized route definitions for all GET and POST endpoints with localized slugs

const express = require('express');
const router = express.Router();
const get = require('../handlers/get');
const post = require('../handlers/post');
const isEmail = require("../middleware/isEmail");

// ─── Legacy Redirects ─────────────────────────────────────────────────────────
router.get('/', (req, res) => res.redirect(301, '/fr-ca'));
router.get('/about', (req, res) => res.redirect(301, '/fr-ca/a-propos'));
router.get('/approach', (req, res) => res.redirect(301, '/fr-ca/approche'));
router.get('/blog', (req, res) => res.redirect(301, '/fr-ca/blog'));
router.get('/contact', (req, res) => res.redirect(301, '/fr-ca/contact'));
router.get('/policy', (req, res) => res.redirect(301, '/fr-ca/politique'));
router.get('/workshops', (req, res) => res.redirect(301, '/fr-ca/ateliers'));
router.get('/daily', (req, res) => res.redirect(301, '/fr-ca/quotidien'));
router.get('/inscription', (req, res) => res.redirect(301, '/fr-ca/inscription'));
router.get('/success', (req, res) => res.redirect(301, '/fr-ca/succes'));

// ─── Localized Route Slugs ─────────────────────────────────────────────────────
const localizedRoutes = [
  ['index', '', ''],
  ['about', 'a-propos', 'about'],
  ['approach', 'approche', 'approach'],
  ['blog', 'blog', 'blog'],
  ['contact', 'contact', 'contact'],
  ['policy', 'politique', 'policy'],
  ['workshops', 'ateliers', 'workshops'],
  ['daily', 'quotidien', 'daily'],
  ['registration', 'inscription', 'registration'],
  ['success', 'succes', 'success']
];

// ─── Full Layout Routes ────────────────────────────────────────────────────────
localizedRoutes.forEach(([key, frSlug, enSlug]) => {
  router.get('/:locale(fr-ca|en-ca)/' + frSlug, get[key]);
  if (frSlug !== enSlug) {
    router.get('/:locale(fr-ca|en-ca)/' + enSlug, get[key]);
  }
});

// ─── HTMX Content-Only Routes ──────────────────────────────────────────────────
localizedRoutes.forEach(([key]) => {
  router.get('/:locale(fr-ca|en-ca)/content_' + key, get[`content_${key}`]);
});

// ─── HTMX Meta Routes ──────────────────────────────────────────────────────────
localizedRoutes.forEach(([key]) => {
  router.get('/:locale(fr-ca|en-ca)/meta_' + key, get[`meta_${key}`]);
});

// ─── Form Submission Routes ────────────────────────────────────────────────────
router.post('/newsletter', isEmail, post.newsletter);
router.post('/contact', isEmail, post.contact);
router.post('/checkout', isEmail, post.payment);

module.exports = router;