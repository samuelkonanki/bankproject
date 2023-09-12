const forgotAtmpin=require("./checkBalanceModel")
const mongo=require("mongoose")
const apiResponse=require('./formatResponse')
const ObjectId=mongo.Types.ObjectId
 const forgotpin=async(req,res)=>{
    try{
  if(req.body.AtmPinNumber==''||req.body.AccountNo==''){
    res.status(400).send(apiResponse.errorFormat(`null or empty fields Are not Accepted`,[{
        message:`enter valid Account Number Or debutAmount`,
        code:`020`
    }],400))

  }

else{
 const pinupdate=await forgotAtmpin.findOne({AccountNo:req.body.AccountNo})
 console.log(pinupdate,'#####################')
 if(!pinupdate){
    res.status(404).send(apiResponse.errorFormat(`invalid Account Number`,[{
        message:`please Contact Admins`,
        code:`015`
    }]))
 }
 else if(pinupdate.AccountNo==req.body.AccountNo){
const NewPin={
    AtmPinNumber:req.body.AtmPinNumber
}
console.log(NewPin,'*******************')
let id=req.params.id
const newatmpinnumber=await forgotAtmpin.updateOne({_id:new ObjectId(id)},{$set:NewPin})
console.log(id,'__________________________________________')
console.log(newatmpinnumber,'-------------------')
res.status(200).send(apiResponse.successFormat(`successfully Update your Pin Number`,NewPin,[{
    message:`your Atm Pin Number Update successfully`,
    code:`040`,
}]))

}
}
}
catch(err){
    res.status(505).send (apiResponse.errorFormat(`fail`,[{
        message:`ATM Pin Number Update failed`,
        code:`030`
     }]))   
}
 }

module.exports=forgotpin