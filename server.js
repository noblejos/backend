const express = require("express")
require('dotenv').config()
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")
var cors = require('cors')

const app = express()
app.use(express.json())


app.use(cors())
app.use((req, res, next) => {
    console.log('Time:', Date.now(), req.path,req.method)
    next()
  })

app.use("/api/workouts",workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log("connected to the server", process.env.PORT)
  })
   })
   .catch((error)=>{
    console.log(error)
   })



