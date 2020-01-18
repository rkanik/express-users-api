
const mongoose = require('mongoose')

const CONNECTION_STRING = process.env.DATABASE
   .replace("<USERNAME>", process.env.DB_USERNAME)
   .replace("<PASSWORD>", process.env.DB_PASSWORD)
   .replace("<DBNAME>", process.env.DB_NAME)

exports.connect = async callback => {
   try {
      await mongoose.connect(CONNECTION_STRING, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      })
      await callback()
      console.log("Database Connected\n")
   } catch (error) {
      console.log("\nDatabase Error!\nServer Stopped.")
      console.log(error)
   }
}

