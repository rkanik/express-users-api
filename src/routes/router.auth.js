
const router = require('express').Router();

//const AUTH = require("../auth/auth.verify-token")
const authController = require("../controllers/controller.auth")

router.post("/signin", authController.SIGN_IN)

router.post("/register", authController.REGISTER)

router.post("/forgot-password", authController.FORGOT_PASSWORD)

module.exports = router