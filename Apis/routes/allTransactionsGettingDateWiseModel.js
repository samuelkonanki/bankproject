
const mongo=require('mongoose')
const allTranctionsgettingDateWieSchema=mongo.Schema({
    Date:{
        type:Date,
        default:Date.now(),
        reuired:true,  
    },
    AccountNo:{
        type:String,
    },
    creditedAmount:{
         type:Number,
    },
    debutedAmount:{
        type:Number,
    }
})
module.exports=mongo.model("AllTransactionsGettingDateWise",allTranctionsgettingDateWieSchema)