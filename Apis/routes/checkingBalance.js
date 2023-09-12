const { response } = require('express')
// const transactionModel= require('./transactionModel')
const balance=require('./checkBalanceModel')
const apiResponse=require('./formatResponse')
const { status } = require('express/lib/response')
const checkBalance=async (req,res)=>
{
    if(req.body.AccountNo==''){
        res.status(404).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,[{
            message:`please contact Admins`,
            code:`0115`
        }]))   
    }  
    else{
        // const id=req.params.id
const findaccountnumber=await balance.findOne({AccountNo:req.body.AccountNo})
if(!findaccountnumber){
res.status(404).send(apiResponse.errorFormat(`if you doesnt have accountnumber`,[{
    message:`please contact Admins`,
    code:`015`
}]))
}
else if(findaccountnumber){
    res.status(200).send(apiResponse.successFormat(`success`,{
        message:`your Account Balance is `,Balance:findaccountnumber.Balance,
        code:`020`
      }))
    
      
}
}
}
module.exports=checkBalance