var express = require("express");
var router = express.Router();
var userRouter = require("./user");
var boardRouter = require("./board");
var teamRouter = require("./team");
var cardRouter = require("./card");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ success: true, message: "Welcome to Node APIs" });
});

router.use("/user", userRouter);
router.use("/team", teamRouter);
router.use("/list", cardRouter);
router.use("/board", boardRouter);


module.exports = router;
