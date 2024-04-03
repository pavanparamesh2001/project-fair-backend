//load .env file contents into process.env by default
require('dotenv').config
//2 import express
const express =require('express')
//3 import cors
const cors=require('cors')
//4 create an application using express
const pfserver =express()
//5 use
pfserver.use(cors())
pfserver.use(express.json())
//6 port creation
const PORT=4000 || process.env.PORT
pfserver.listen(PORT,()=>{
    console.log('pfService listening on port'+PORT);
})
pfserver.get('/',(req,res)=>{
    res.send("welcome to project-fair")
})