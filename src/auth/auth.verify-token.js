
const jwt = require("jsonwebtoken")
const { UNAUTHORIZED } = require("../js/http.status")

const VERIFY = (req, res, next) => {
   let token = req.header("auth-token")
   if (!token) { res.status(UNAUTHORIZED.code).json({ error: true, message: "Access denied!" }) }

   jwt.verify(token, process.env.JWT_TOKEN_SECRET,
      (err, decoded) => {
         if (err) res.status(UNAUTHORIZED.code).json({ error: true, message: err.message })
         req.body = { ...req.body, ...decoded }
         next()
      }
   )
}

module.exports = { VERIFY }