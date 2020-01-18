
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = require("express")()

/** Middlewares */
app.use(cors())
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(morgan('dev'))

app.get("/", (req, res) => {
   res.send("Welcome")
})

/** Routes */
app.use("/api/v1/users", require("../routes/router.users"))
app.use("/api/v1/user", require("../routes/router.auth"))

module.exports = app