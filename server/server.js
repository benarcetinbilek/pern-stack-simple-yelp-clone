require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())

const dependencies = {
    port: process.env.port || 3005
}

app.use("/", require("./crud"))
app.use("/auth", require("./routes/jwtAuth"))


app.listen(dependencies, () => {
    console.log(`${dependencies.port} -- listening`)
})


