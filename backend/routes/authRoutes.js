const express = require("express");

const { signUpNewUser, signInUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUpNewUser);
router.post("/signin", signInUser);

module.exports = router;
