
const check=require('./detailsModel')
const apiResponse=require('./formatResponse')
const checkAccountNumber=async(req,res)=>{
try{
    const checkone=await check.findOne({AccountNo:req.body.AccountNo})
console.log(checkone,'------------------------')
    if(req.body.AccountNo==''){
        res.status(400).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,{
            message:`null or Empty Fields Are Not Accepted`,
            code:`0115`
        }))
    }
    else{

    
 if(!checkone){
    res.status(400).send(apiResponse.errorFormat(`if you doesnt have Account Number Approach your Branch Bank Officers`, {
        message: `do not have account Number plesae contact Branch manager`,
        code: `010`
      }))
}
else if(checkone.AccountNo==req.body.AccountNo){
    res.status(200).send(apiResponse.successFormat(`your Account Has Active`,  {
        message: `success`,
        code: `021`,
        status: `your Active user `
      }))
}
}
}
catch(err){
    res.status(400).send(apiResponse.errorFormat(`failed Enter your AccountNumber`, {
        message: `something Went wrong`,
        code: `013`,
        status: `something went wrong please approach your branch manager`
      }))
}
}


module.exports=checkAccountNumber