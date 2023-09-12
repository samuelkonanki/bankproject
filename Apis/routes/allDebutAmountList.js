const { response } = require('express')
const debutModel=require('./debutAmountModel')
const apiResponse=require('./formatResponse')
async function debutlist(req,res){
    // const find=debutModel.find()
    if(req.body.AccountNo==''){
        res.status(400).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,[{
            message:`pelase Enter your Account Number`,
            code:`010`
        }])) 
    }
    else{
        const list=await debutModel.findOne({AccountNo:req.body.AccountNo})
        console.log(list,'####################')
        
        if(!list){
            res.status(404).send(apiResponse.errorFormat(`invalid Accountnumber`,[{
                message:`please approach admin Team`,
                code:`015`
            }]))
        }
        else if(list.AccountNo==req.body.AccountNo){
            const find=debutModel.find()
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
module.exports=debutlist