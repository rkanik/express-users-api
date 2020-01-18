
const mongoose = require("mongoose")

const DEF_STRING = {
   type: String,
   require: true,
   min: 8,
   max: 255
}

const SCHEMA = new mongoose.Schema({
   name: {
      title: String,
      firstName: DEF_STRING,
      lastName: DEF_STRING
   },
   userName: {
      ...DEF_STRING,
      unique: [true, "Username must to be unique!"]
   },
   email: DEF_STRING,
   gender: DEF_STRING,
   married: Boolean,
   password: String,
   birthDate: DEF_STRING,
   age: Number,
   images: {
      profile: String,
      cover: String
   },
   phones: Array,
   address: {
      streat: String,
      city: String,
      countryCode: String,
      country: String
   },
   geo: {
      ip: String,
      agent: String,
      latitude: Number,
      longitude: Number
   },
   createdAt: {
      type: Date,
      select: false,
      default: Date.now()
   },
   updatedAt: {
      type: Date,
      default: Date.now()
   },
   lastVisited: {
      type: Date,
      default: Date.now()
   }
})

const users = mongoose.model('users', SCHEMA)

module.exports = users