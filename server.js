
const APP = require("./src/app/app")

const dotenv = require('dotenv')
dotenv.config({ path: ".env" })

const db = require('./src/database/connection')

const PORT = process.env.PORT || 5050
db.connect(() => {
   APP.listen(PORT, console.log(`\nServer Started...\nhttp://localhost:${PORT}`))
})


