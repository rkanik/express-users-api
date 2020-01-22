
const USER = require("../models/model.user")
const bCript = require('bcryptjs')
const jwt = require("jsonwebtoken")

const { OK, NOT_MODIFIED, CREATED, UNAUTHORIZED, BAD_REQUEST, NOT_FOUND } = require("../js/http.status")

const SIGN_IN = async (req, res) => {
   /** Checking if req dont have userName or Email and Password */
   if (!req.body.user || !req.body.password) {
      res.status(BAD_REQUEST.code).json({ error: true, message: BAD_REQUEST.status })
   } else {
      /** Condition to match username or email address */
      let or = [{ userName: req.body.user }, { email: req.body.user }]
      /** Fileds to select or deselect */
      let projection = "userName email gender password age images _id name"
      /** Executing query */
      let doc = await USER.findOne({ $or: or }).select(projection)
      /** Checking if user not exist */
      if (!doc) {
         res.status(NOT_FOUND.code).send({ error: true, message: "Invalid username or email address!" })
      } else {
         /** Matching hashed password */
         let matched = bCript.compareSync(req.body.password, doc.password)
         /** If password not matched */
         if (!matched) {
            res.status(UNAUTHORIZED.code).send({ error: true, message: "Invalid password" })
         } else {
            let data = doc._doc
            let token = jwt.sign({
               _id: data._id,
               userName: data.userName,
               email: data.email
            }, process.env.JWT_TOKEN_SECRET)
            /** Login success response */
            res.header("auth-token", token).status(OK.code).json({
               error: false,
               message: "Signin successful",
               data: {
                  ...data,
                  password: undefined,
               }
            })
         }
      }
   }
}


const REGISTER = async (req, res) => {

   /** Waiting to create all of the unique indexes */
   await USER.init()

   let user = new USER(req.body)
   let valid = user.validateSync()

   if (!valid) {
      res.status(500).json({
         error: true,
         message: valid.message,
         errors: [...Object.keys(valid.errors).map(key => (valid.errors[key].message))],
      })
   } else {
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
   }
}

const FORGOT_PASSWORD = async (req, res) => {
   /** Checking if request body has the required information */
   if (!req.body.userName || !req.body.password) {
      res.status(BAD_REQUEST.code).json({ error: true, message: BAD_REQUEST.status })
   } else {
      /** Checking if user is exist */
      let user = await USER.findOne({ userName: req.body.userName }).select("_id")
      /** User not exist */
      if (user === null) {
         res.status(NOT_FOUND.code).json({ error: true, message: "Username not found!" })
      } else {
         /** Hashing Password */
         let salt = bCript.genSaltSync(10)
         let hashedPassword = bCript.hashSync(req.body.password, salt)
         /** Updating password */
         let upRes = await USER.updateOne({ userName: req.body.userName }, { password: hashedPassword, updatedAt: Date.now() })
         /** Chcking if nohting updated */
         if (upRes.nModified === 0) {
            res.status(NOT_MODIFIED.code).json({ error: true, message: "Something went wrong while updating password" })
         } else {
            /** If everything ok then sending success response */
            upRes.ok === 1 && res.status(OK.code).json({ error: false, message: "Password updated successfully" })
         }

      }
   }
}

module.exports = { SIGN_IN, REGISTER, FORGOT_PASSWORD }