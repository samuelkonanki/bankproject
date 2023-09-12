const { response } = require('express')
const creditedAmountModelModel=require('./creditedAmountModel')
const apiResponse=require('./formatResponse')
async function creditedAmountlist(req,res){
    if(req.body.AccountNo==''){
        res.status(400).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,[{
            message:`pelase Enter your Account Number`,
            code:`010`
        }])) 
    }
    else{
        const list=await creditedAmountModelModel.findOne({AccountNo:req.body.AccountNo})
        console.log(list,'####################')
        
        if(!list){
            res.status(404).send(apiResponse.errorFormat(`invalid Accountnumber`,[{
                message:`please approach admin Team`,
                code:`015`
            }]))
        }
        else if(list.AccountNo==req.body.AccountNo){
            const find=creditedAmountModelModel.find()
        .then(response=>{
            res.status(200).send(apiResponse.successFormat(`success`,response,[{
                message:`your All Transactions  is `,
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
module.exports=creditedAmountlist