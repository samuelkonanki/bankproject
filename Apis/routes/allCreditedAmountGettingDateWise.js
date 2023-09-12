const { response } = require('express')
const moment=require('moment')
const apiResponse=require('./formatResponse')
const transactionmodel=require('./creditedAmountModel')
const dateWiseCreditedAmountList=async(req,res)=>{
          const startDate=req.body.startDate;
          const EndDate=req.body.EndDate;
if(req.body.AccountNo==''||req.body.startDate==''||req.body.EndDate==''){
    res.status(400).send(apiResponse.errorFormat(`null or Empty Fields Are Not Accepted`,[{
        message:`pelase Enter your Account Number`,
        code:`010`
    }])) 
}
else{
     const data=await transactionmodel.find({AccountNo:req.body.AccountNo})
    console.log(data,'55555555555555555')

    if(!data){
        res.status(404).send(apiResponse.errorFormat(`invalid Accountnumber`,[{
            message:`please approach admin Team`,
            code:`015`
        }])) 
    }
    //  if(data){
    //     storedData=[]
    //     data.map((item=>{
    //         if(item.creditedDate>=startDate&&item.creditedDate<=EndDate){
    //             storedData.push(item)
    //         }
    //         }))
    //         console.log(storedData,'iiiiiiiiiiiiiiiiiiiiiiiii')

    //   res.send({storedData})
    // }
     if(data){
        storedData=[]
       for(const item of data){
        if(item.creditedDate>=startDate&&item.creditedDate<=EndDate){
            storedData.push(item)
        }
       
       }
        console.log(storedData,'iiiiiiiiiiiiiiiiiiiiiiiii')

      res.send({storedData})
    }
    
}   
}
module.exports=dateWiseCreditedAmountList