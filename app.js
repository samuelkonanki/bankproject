const express=require("express");
const mongo=require("mongoose")
const dot=require("dotenv").config();
const jwt=require("jsonwebtoken")
const cors=require("cors")
const bcry=require("bcrypt")
const aroute=require("./Apis/routes/router")
const connectDB=require("./db")
const bobyparse = require('body-parser')
const nodeemailer=require("nodemailer")
const app=express()
app.use(bobyparse.urlencoded({extended:true}))
app.use(bobyparse.json())
app.use(cors())
const port=process.env.PORT

connectDB()
app.use("/api",aroute)
app.get("/get",(req,res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log (`run on server::::::${port}`)
})