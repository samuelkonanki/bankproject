const { response } = require("express")
// const jwt=require("jsonwebtoken")
const conn=require("./login")
const insert=(req,res)=>{
    let add=new conn({
        username:req.body.username,
        password:req.body.password
    })
    add.save()
    .then(response=>{
        res.json("sucessfully registerd",response)
    })
    .catch(err=>{
        if(!username&&!password){
            res.json(message="plese fill the Details",err)
        }
    })

    }
    module.exports=insert
