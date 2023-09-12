const { response } = require('express')
const atmModel=require('./atmModel')
const apiResponse=require('./formatResponse')
async function atmAmountlist(req,res){
    if(req.body.AtmPinNumber==''){
        res.status(400).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,[{
            message:`pelase Enter your Account Number`,
            code:`010`
        }])) 
    }
    else{
        const list=await atmModel.findOne({AtmPinNumber:req.body.AtmPinNumber})
        console.log(list,'####################')
        
        if(!list){
            res.status(404).send(apiResponse.errorFormat(`invalid Accountnumber`,[{
                message:`please approach admin Team`,
                code:`015`
            }]))
        }
        else if(list.AtmPinNumber==req.body.AtmPinNumber){
            const find=atmModel.find()
        .then(response=>{
            res.status(200).send(apiResponse.successFormat(`success`,response,[{
                message:`your All ATM Transactions  is `,
                code:`020`
              }]))
        })
        .catch(err=>{
            res.status(500).send (apiResponse.errorFormat(`fail`,[{
                message:`fail`,
           code:`015`
            }]))
        })
     }
     }
}
module.exports=atmAmountlist