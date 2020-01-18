
const USERS = require("../models/model.users")

const GET_USERS = async (req, res) => {

   let query = USERS.find()

   query = query.limit(5)

   let dbRes = await query

   res.json({
      message: "GET_USERS",
      result: dbRes.length,
      data: dbRes
   })
}

const CREATE_USER = async (req, res) => {

   await USERS.init()
   let query = USERS.create(req.body)

   try {
      let dbRes = await query
      res.json({
         message: "USER CREATED",
         data: dbRes
      })
   } catch (error) {
      res.status(500).json({
         message: "INTERNAL SERVER ERROR",
         error: error
      })
   }
}

module.exports = { GET_USERS, CREATE_USER }