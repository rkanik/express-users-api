
const USERS = require("../models/model.user")

const GET_USERS = async (req, res) => {
   
   let params = req.query ? req.query : {}

   let query = USERS.find()

   /** sort-by */
   let sortBy = params["sort-by"] ? params['sort-by'] : ""
   query = query.sort(sortBy)

   /** Pagination */
   let page = params.page ? params.page * 1 : 1
   let limit = params.limit ? params.limit * 1 : 10
   let skip = (page - 1) * limit
   query = query.skip(skip).limit(limit)

   /** Projection */
   //let projection = params.select ? params.select.split(",") : []
   //let select = projection.filter(i => !new RegExp(`^-`).test(i)).join(" ")
   //let deselect = projection.filter(i => !select.includes(i)).join(" ")
   let deselect = "-__v -address -geo -updatedAt -lastVisited -phones -password"
   query = query.select(deselect)

   /** Executing query */
   let dbRes = await query

   res.json({
      message: "GET_USERS",
      length: dbRes.length,
      page: {
         current: page,
         last: Math.floor(await USERS.countDocuments() / limit)
      },
      data: dbRes
   })
}

const DELETE_USERS = async (req, res) => {
   let response = await USERS.deleteMany()
   res.json(response)
}

const UPDATE_USER = async (req, res) => {
   res.send("update user")
}

module.exports = { GET_USERS, DELETE_USERS, UPDATE_USER }