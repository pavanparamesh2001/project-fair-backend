//1
require('dotenv').config()//Loads .env file contents into process.env by default. If DOTENV_KEY is present, it smartly attempts to load encrypted .env.vault file contents into process.env.

//import express
//2
const express = require('express')
//3
const cors = require ('cors')

//7 import db
const db = require('./DB/connection')
const router=require('./Routes/route')




//4 create a appln using express
const pfServer = express()

//5 use
pfServer.use(cors())
pfServer.use(express.json())

//9
pfServer.use(router)
// to view images in frontend or to export export images from backend
pfServer.use('/uploads',express.static('./uploads'))  //image ethikkan ola fn aan static



//port creation
const PORT = 4000 || process.env.PORT

//pfser desihn
pfServer.listen(PORT,()=>{
    console.log('pfServer listening on port ' +PORT);
})



pfServer.get('/',(req,res)=>{
    res.send("Welcome to project-fair")
})
