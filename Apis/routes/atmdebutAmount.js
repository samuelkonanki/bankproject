const balancesheet=require('./checkBalanceModel')
const moment=require('moment')
const apiResponse=require('./formatResponse')
const atmdetails=require('./atmModel')
const atmModel = require('./atmModel')
const checkBalanceModel = require('./checkBalanceModel')

    const atmService=async(req,res)=>{
    const date=moment().format('YYYY-MM-DD')
if(req.body.AtmPinNumber==''||req.body.EnterAmount==''){
    res.status(400).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,[{
        message:`pelase Enter your pin Number`,
        code:`010`
    }]))
}
else{
     const pinNumber=await balancesheet.findOne({AtmPinNumber:req.body.AtmPinNumber})
  console.log(pinNumber,'///////////////////')
    if(!pinNumber){
        res.status(404).send(apiResponse.errorFormat(`invalid Pin Number`,[{
            message:`please Contact Admins`,
            code:`015`
        }]))
        }
       else if(pinNumber.AtmPinNumber==req.body.AtmPinNumber){
        if(pinNumber.Balance!==0){
       const savepinNumber=new atmModel ({
    AtmPinNumber:req.body.AtmPinNumber,
    EnterAmount:req.body.EnterAmount,
    transactionDate:date
})
const savePinNumberinatmModel=await savepinNumber.save()
       }
  const enteramount=Number(req.body.EnterAmount)
  const CheckBalanceModel=Number(pinNumber.Balance)
  console.log(CheckBalanceModel,'***********************')
  console.log(enteramount,'-----------------------------')
 if(pinNumber.Balance<enteramount){
    res.status(500).send(apiResponse.errorFormat(`if you doesnt have Amount`,[{
        message:`maintain sufficient amount`,
        code:`015`
    }]))
       }
       else if(pinNumber.Balance>enteramount || pinNumber.Balance==enteramount ){
        const balance=pinNumber.Balance-enteramount
        const updatebalance={
          Balance:Number(balance)
        }
        console.log(updatebalance,'=======================')
  const transactionModel1=await balancesheet.updateOne({AtmPinNumber:req.body.AtmPinNumber},{$set:updatebalance}) 
  
  res.status(200).send(apiResponse.successFormat(`successfully your transaction has done`,updatebalance,[{
      message:`your transaction has exeuted successfully`,
      code:`040`,
  }]))
   
 }
 }

}
}
module.exports=atmService