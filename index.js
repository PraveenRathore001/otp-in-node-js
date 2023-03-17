const express=require('express')
const bodyParser = require("body-parser")
require('./model/databse')
const app=express()
const Router=require('./routes/userRoutes')

app.use(bodyParser.json())
app.use('/',Router)
// app.use(express.json())


const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`port is running on: ${port}`);
})  