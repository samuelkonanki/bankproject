const { response } = require("express")
const details=require("./detailsModel")
const mongo=require("mongoose")
const obj=mongo.Types.ObjectId
const getoneresult=(req,res)=>{
let id=req.params.id
console.log(id,'lllllllllll')
const oneresult=details.findOne({AccountNo:id})
.then(response=>{
    res.send(response)
})
.catch(err=>{
    res.json({message:"error",err})
})
}
module.exports=getoneresult