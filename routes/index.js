var express = require("express");
var router = express.Router();

var hash = 'bundle.24699501f5eeeaa79f2c';

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
