var express = require("express");
var router = express.Router();
var userRouter = require("./user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ success: true, message: "Welcome to Node APIs" });
});

router.use("/user", userRouter);

module.exports = router;
