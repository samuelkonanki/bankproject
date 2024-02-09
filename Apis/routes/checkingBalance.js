const { response } = require('express')
// const transactionModel= require('./transactionModel')
const balance=require('./checkBalanceModel')
const apiResponse=require('./formatResponse')
const { status } = require('express/lib/response')
const getone=require('./detailsModel')
const checkBalance=async (req,res)=>
{
    if(req.body.AccountNo==''){
        res.status(404).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,{
            message:`null or Empty Fields Are Not Accepted`,
            code:`0115`
        }))   
    }  
    else{
        const getall=await getone.findOne({AccountNo:req.body.AccountNo})
        console.log(getall,'zzzzzzzzzzzzzzz')
const findaccountnumber=await balance.findOne({AccountNo:req.body.AccountNo})
if(!findaccountnumber){
    res.status(404).send(apiResponse.errorFormat(`invalid Account Number`, {
        message: `Enter Valid Account Number `,
        code: `010`
    })) 
}
else if (findaccountnumber.Balance==null){
    res.status(404).send(apiResponse.errorFormat(`if you doesnt have Balance`,{
        message:`if you doesnt have Balance`,
        code:`016`
    }))
    
}
else if(findaccountnumber){
    res.status(200).send(apiResponse.successFormat(`success`,{
        message:`your Account Balance is `,Balance:findaccountnumber.Balance,getall,
        code:`020`
      }))
    
      
}
}
}
module.exports=checkBalance