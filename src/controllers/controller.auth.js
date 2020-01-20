
const USER = require("../models/model.user")
const bCript = require('bcryptjs')

const SIGN_IN = (req, res) => {
   res.send("Signin")
}

const REGISTER = async (req, res) => {

   /** Waiting to create all of the unique indexes */
   await USER.init()

   let user = new USER(req.body)
   let valid = user.validateSync()

   if (valid === undefined) {

      /** Hashing password */
      let salt = bCript.genSaltSync(10)
      user.password = bCript.hashSync(user.password, salt)

      user.save()
         .then(doc => {
            res.status(201).json({
               error: false,
               message: "User created successfully!",
               data: doc._doc
            })
         })
         .catch(err => {
            res.status(500).json({
               error: true,
               errorCode: err.code,
               message: err.errmsg
            })
         })
   } else {
      res.status(500).json({
         error: true,
         message: valid.message,
         errors: [...Object.keys(valid.errors).map(key => (valid.errors[key].message))],
         data: valid
      })
   }
}

const FORGOT_PASSWORD = (req, res) => {
   res.send("SiFORGOT_PASSWORDgnin")
}

module.exports = { SIGN_IN, REGISTER, FORGOT_PASSWORD }