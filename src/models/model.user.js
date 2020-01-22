
const mongoose = require("mongoose")

const SCHEMA = new mongoose.Schema({
   name: {
      title: String,
      firstName: {
         type: String,
         required: true
      },
      lastName: {
         type: String,
         required: true
      }
   },
   userName: {
      type: String,
      required: true,
      unique: [true, "Username must to be unique!"],
      minlength: 3
   },
   email: {
      type: String,
      required: true,
      unique: [true, "Email address must to be unique!"],
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   },
   password: {
      type: String,
      required: true
   },
   gender: {
      type: String,
      required: true
   },
   married: Boolean,
   birthDate: {
      type: String,
      required: true
   },
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
      type: Number,
      select: false
   },
   updatedAt: Number,
   lastVisited: Number
})

const users = mongoose.model('users', SCHEMA)

module.exports = users