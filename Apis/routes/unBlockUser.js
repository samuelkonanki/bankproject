const { response } = require('express')
const details=require('./detailsModel')
const apiResponse=require('./formatResponse')
const moment=require('moment')

     const unblockuser=async(req,res)=>{
        const moment1=moment().utcformat(330).format('YYYY-MM-DD HH-mm-ss')
        const updatestatus={
            status:'success',
            unblockstatusDate:moment1
        }
        const updatelogin=await details.findOneAndupdatone({updatestatus})
        .then(response=>{
   res.status(200).send(apiResponse.successFormat(`success`,moment[{
    message:`your Account was unblocked`,updatestatus,
    code:`020`
   }],200))
        })
        .catch(err=>{
   res.status(400).send(apiResponse.errorFormat(`fail`,[{
    message:`something went wrong`,
    code:`010`
   }],400))
        })
    }
    
module.exports=unblockuser