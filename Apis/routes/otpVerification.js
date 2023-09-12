const { response } = require("express")
const ref=require("./loginModel")
const jwt=require("jsonwebtoken")
const moment = require('moment')
const secretkey="secretkey"
const now = new Date();
const otpVer=async (req,res)=>{
    const otpverified=await ref.findOne({otp:req.body.otp})
        if(req.body.otp==""){
            res.json({message:"doNot Enter otp",
          Status_code:404})
        }
        if(!otpverified){
             res.json({Message:"invalid Otp",
            Status_code:400})
          }
          console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
           if(otpverified.createdAt>moment().format('YYYY-MM-DD HH:mm:ss')){
            if(otpverified){
              const dele=await ref.deleteOne({otp:req.body.otp})
          .then(response=>{
          const tokengenarate=ref.findOne({email:req.body.username,password:req.body.password})
          token = jwt.sign({ username:req.body.username, password: req.password }, "secretValue", {
              expiresIn: "5m",
             });
             res.json({ message: "login success", 
             Status:"otp Verified Sucessfully",
             Status_code:200,
             token })
          })
          .catch(err=>{
          res.json({message:"error",err})
          })     
      }
          }

          else{
            res.send('otp Experied')
          }
         
    }
    module.exports=otpVer
    
    
    
    