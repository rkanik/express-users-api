const Joi = require("@hapi/joi")

const user = Joi.object({
   name: {
      title: Joi.string(),
      firstName: Joi.string()
         .required().min(2).required(),
      lastName: Joi.string()
         .required().min(2).required()
   },
   userName: Joi.string()
      .min(3).max(16).required(),
   email: Joi.string().email().required(),
   gender: Joi.string(),
   married: Joi.boolean(),
   password: Joi.string().required()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
   birthDate: Joi.string().required(),
   age: Joi.number(),
   images: {
      profile: Joi.string(),
      cover: Joi.string()
   },
   phones: Joi.array(),
   address: {
      streat: Joi.string(),
      city: Joi.string(),
      countryCode: Joi.string(),
      country: Joi.string()
   },
   geo: {
      ip: Joi.string(),
      agent: Joi.string(),
      latitude: Joi.number(),
      longitude: Joi.number()
   },
   createdAt: Joi.number(),
   updatedAt: Joi.number(),
   lastVisited: Joi.number()
})

module.exports = user