const express = require("express");
const router = express.Router();

const User = require("../../../model/user");
const auth = require("../../../middleware/auth");

const userController = require("../../../controllers/userController");

router.post("/signup", userController.userSignup);

router.post("/login", userController.userLogin);

router.get("/current-user", auth.verifyToken, userController.getCurrentUser);

router.put("/reset-password", userController.resetPassword);

router.put("/edit-profile", auth.verifyToken, userController.editUserProfile);

router.get("/:username", userController.searchUserByUsername);

module.exports = router;
