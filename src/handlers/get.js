const asyncHandler = require("express-async-handler");
const metaData = require("../utils/meta");

// Helper to get locale safely
const getLocale = (req) => req.params.locale || 'fr-ca';

// Factory to generate full layout handler
const layoutHandler = (pageKey, viewMap = {}) => asyncHandler(async (req, res) => {
  const isSubscribed = req.cookies.isSubscribed === "true";
  const locale = getLocale(req);

  // fallback to key if locale-specific view not provided
  const viewName = viewMap[locale] || pageKey;

  res.render("layout", {
    content: viewName,
    isSubscribed,
    meta: metaData[locale][pageKey],
    req,
    locale,
    viewPath: `${locale}/${viewName}`,
    headerPath: `${locale}/header`,
    footerPath: `${locale}/footer`
  });
});

// Factory for HTMX main content injection
const contentHandler = (pageKey, viewMap = {}) => asyncHandler(async (req, res) => {
  const locale = getLocale(req);
  const viewName = viewMap[locale] || pageKey;
  res.render(`${locale}/${viewName}`);
});

// Factory to render partial metadata (for htmx head updates)
const metaHandler = (pageKey) => asyncHandler(async (req, res) => {
  const locale = getLocale(req);
  res.render("partials/head-meta", {
    meta: metaData[locale][pageKey],
    req,
  });
});

module.exports = {
  // Full layout routes
  index: layoutHandler("index"),
  about: layoutHandler("about", {'fr-ca': 'a-propos', 'en-ca': 'about'}),
  approach: layoutHandler("approach", {'fr-ca': 'approche', 'en-ca': 'approach'}),
  blog: layoutHandler("blog"),
  contact: layoutHandler("contact"),
  policy: layoutHandler("policy", {'fr-ca': 'politique', 'en-ca': 'policy'}),
  workshops: layoutHandler("workshops", {'fr-ca': 'ateliers', 'en-ca': 'workshops'}),
  daily: layoutHandler("daily", {'fr-ca': 'quotidien', 'en-ca': 'daily'}),
  registration: layoutHandler("registration", {'fr-ca': 'inscription', 'en-ca': 'registration'}),
  success: layoutHandler("success", {'fr-ca': 'succes', 'en-ca': 'success'}),

  // HTMX content-only routes
  content_index: contentHandler("index"),
  content_about: contentHandler("about", {'fr-ca': 'a-propos', 'en-ca': 'about'}),
  content_approach: contentHandler("approach", {'fr-ca': 'approche', 'en-ca': 'approach'}),
  content_blog: contentHandler("blog"),
  content_contact: contentHandler("contact"),
  content_policy: contentHandler("policy", {'fr-ca': 'politique', 'en-ca': 'policy'}),
  content_workshops: contentHandler("workshops", {'fr-ca': 'ateliers', 'en-ca': 'workshops'}),
  content_daily: contentHandler("daily", {'fr-ca': 'quotidien', 'en-ca': 'daily'}),
  content_registration: contentHandler("registration", {'fr-ca': 'inscription', 'en-ca': 'registration'}),
  content_success: contentHandler("success", {'fr-ca': 'succes', 'en-ca': 'success'}),

  // HTMX meta partials
  meta_index: metaHandler("index"),
  meta_about: metaHandler("about"),
  meta_approach: metaHandler("approach"),
  meta_blog: metaHandler("blog"),
  meta_contact: metaHandler("contact"),
  meta_policy: metaHandler("policy"),
  meta_workshops: metaHandler("workshops"),
  meta_daily: metaHandler("daily"),
  meta_registration: metaHandler("registration"),
  meta_success: metaHandler("success"),
};

