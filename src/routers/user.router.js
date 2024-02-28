const express = require("express");
const userController = require("../controller/user.controller");
const jwtValidate = require("../middleware/jwt-validate.middleware");
const upload = require("../middleware/multer.middleware");

const router = express.Router();

router.post(
    "/sign-up",
    upload.single("profileImage"),
    userController.userSignUp
);
router.post("/sign-in", userController.userSignIn);
router.get("/me", jwtValidate, userController.getMyInfo);

module.exports = router;
