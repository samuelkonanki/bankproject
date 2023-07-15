const express=require("express");
const mongo=require("mongoose")
const dot=require("dotenv").config();
const jwt=require("jsonwebtoken")
const connectDB=require("./db")

const app=express()

const port=process.env.PORT

connectDB()

app.listen(port,()=>{
    console.log (`run on server::::::,${port}`)
})