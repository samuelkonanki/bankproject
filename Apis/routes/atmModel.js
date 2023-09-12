const mongo=require('mongoose')
const AtmSchema=mongo.Schema({
    AtmPinNumber:{
        type:String
    },
    EnterAmount:{
        type:Number
    },
    transactionDate:{
        type:String
    }
})
module.exports=mongo.model('AtmTranaction',AtmSchema)