const asyncHandler = require("express-async-handler");
const metaData = require("../utils/meta");

// Helper to get locale safely
const getLocale = (req) => req.params.locale || 'fr-ca';

// Factory to generate full layout handler
const layoutHandler = (pageKey) => asyncHandler(async (req, res) => {
  const isSubscribed = req.cookies.isSubscribed === "true";
  const locale = getLocale(req);

  res.render("layout", {
    content: pageKey,
    isSubscribed,
    meta: metaData[locale][pageKey],
    req,
    locale,
    viewPath: `${locale}/${pageKey}`,
    headerPath: `${locale}/header`,
    footerPath: `${locale}/footer`
  });
});

// Factory to render partial metadata (for htmx head updates)
const metaHandler = (pageKey) => asyncHandler(async (req, res) => {
  const locale = getLocale(req);
  res.render("partials/head-meta", {
    meta: metaData[locale][pageKey],
    req,
  });
});

// Factory for HTMX main content injection
const contentHandler = (pageKey) => asyncHandler(async (req, res) => {
  const locale = getLocale(req);
  res.render(`${locale}/${pageKey}`);
});

module.exports = {
  // Full layout routes
  index: layoutHandler("index"),
  about: layoutHandler("about"),
  approach: layoutHandler("approach"),
  blog: layoutHandler("blog"),
  contact: layoutHandler("contact"),
  policy: layoutHandler("policy"),
  workshops: layoutHandler("workshops"),
  daily: layoutHandler("daily"),
  registration: layoutHandler("registration"),
  success: layoutHandler("success"),

  // HTMX content-only routes
  content_index: contentHandler("index"),
  content_about: contentHandler("about"),
  content_approach: contentHandler("approach"),
  content_blog: contentHandler("blog"),
  content_contact: contentHandler("contact"),
  content_policy: contentHandler("policy"),
  content_workshops: contentHandler("workshops"),
  content_daily: contentHandler("daily"),
  content_registration: contentHandler("registration"),
  content_success: contentHandler("success"),

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
