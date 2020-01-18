
const router = require('express').Router();

router.post("/signin", (req, res) => {
   res.send("Signin")
})

router.post("/register", (req, res) => {
   res.send("Register")
})

router.post("/forgot-password", (req, res) => {
   res.send("forgot-password")
})

module.exports = router