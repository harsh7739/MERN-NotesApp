const express = require("express")
const connection = require("./db")
const cors = require("cors")
const UserRouter = require("./routes/UserRoute")
const NoteRouter = require("./routes/NoteRoutes")
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth",UserRouter)
app.use("api/notes",NoteRouter)

app.listen(process.env.PORT,async()=>{
console.log("DB connected....")
await connection
})

module.exports = app