
const Router = require('express').Router()

const USERS_CONTROLLER = require("../controllers/controller.users")

Router.route("/")
   .get(USERS_CONTROLLER.GET_USERS)
   .post(USERS_CONTROLLER.CREATE_USER)
   .delete(USERS_CONTROLLER.DELETE_USERS)

module.exports = Router