const balance=require('./checkBalanceModel')
const details=require('./detailsModel')
const moment=require('moment')
const apiResponse=require('./formatResponse')
const atmModeldetails=require("./atmModel")
const mongo=require('mongoose')
const ObjectId=mongo.Types.ObjectId

const atmPinSet=async (req,res)=>{
if(req.body.AtmPinNumber==''||req.body.AccountNo==''){
    res.status(400).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,[{
        message:`pelase Enter your pin Number`,
        code:`010`
    }]))
}
else{
    const findaccountnumber=await details.findOne({AccountNo:req.body.AccountNo})
    if(!findaccountnumber){
        res.status(404).send(apiResponse.errorFormat(`invalid Account Number`,[{
            message:`please Contact Admins`,
            code:`015`
        }]))
    
    }
    else if(findaccountnumber.AccountNo==req.body.AccountNo){
         const findatmPinNumber=await balance.findOne({AtmPinNumber:req.body.AtmPinNumber})
        if(!findatmPinNumber){

         let savepinNumber={   
           AtmPinNumber:req.body.AtmPinNumber
                          }
                          console.log(savepinNumber)
                          const up=await balance.updateOne({AccountNo:req.body.AccountNo},{$set:savepinNumber})
                        //   let id=req.params.id
    //    const findid=await balance.updateOne({_id:ObjectId(id)},{$set:savepinNumber})
          res.status(200).send(apiResponse.successFormat(`success`,savepinNumber,[{
            message:`your pin Number SuccessFully Submitted `,
            code:`025`
          }]))
        }

    if(findatmPinNumber){
        res.status(404).send(apiResponse.errorFormat(`Already you Have Atm Pin Number`,[{
            message:`second Time DoesNot Existed Atm Pin Number Please Contact Admins`,
            code:`020`
        }]))
 
    }
   
}
}
}
module.exports=atmPinSet