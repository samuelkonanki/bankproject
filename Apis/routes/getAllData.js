const { response } = require("express")
const details=require("./detailsModel")
const getAll=(req,res)=>{
const result=details.find()
.then(response=>{
    res.json( {message:"the total details is",response})
})
.catch(err=>[
    res.json({message:"error",err})
])
}
module.exports=getAll