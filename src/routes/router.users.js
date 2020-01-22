
const Router = require('express').Router()

const USERS_CONTROLLER = require("../controllers/controller.users")
const AUTH = require("../auth/auth.verify-token")

Router.route("/")
   .get(AUTH.VERIFY, USERS_CONTROLLER.GET_USERS)
   .delete(AUTH.VERIFY, USERS_CONTROLLER.DELETE_USERS)
   .patch(AUTH.VERIFY,USERS_CONTROLLER.UPDATE_USER)

module.exports = Router