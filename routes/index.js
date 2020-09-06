var express = require("express");
var router = express.Router();

var hash = 'bundle.c06bc51596b6b3191a89';

/* GET home page. */
router.get("*", function (req, res, next) {
  const cssPath =
    process.env.NODE_ENV == "production"
      ? `/bundle/${hash}.css`
      : "/static/bundle.css";
  const jsPath =
    process.env.NODE_ENV == "production"
      ? `/bundle/${hash}.js`
      : "/static/bundle.js";
  res.render("index", { title: "Trello", jsPath, cssPath });
});

module.exports = router;
