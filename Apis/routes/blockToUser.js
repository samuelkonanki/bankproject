const loginModel=require("./loginModel")
const mongo=require('mongoose')
const block=async (req,res)=>{
    if(req.body.email==''||req.body.password==''){
        res.json({message:"do not enter email or password"})
        }
        const name={
            status:'Blocked'
        }
    const find= await loginModel.findOne({email:req.body.email},{password:req.body.password})
try{
    if(!find){
        res.json({message:'unblocked',
        status_code:400})
    }
    if(find){
        const update= await loginModel.updateOne({email:req.body.email},{$set:name})
        res.json({message:'your Account Blocked',
         status_code:200})
    }
    else{
        res.json({message:'checked',
       status_code:500})
    }
}
catch(err){
res.json({message:"something wrong",
   status_code:404})
}
}
module.exports=block