const express = require("express");
const emailController = require("../controller/email.controller");
const router = express.Router();

router.get("/email", emailController.getEmail);

module.exports = router;
