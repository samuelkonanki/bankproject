const mongo=require('mongoose')
const BalanceModelSchema=mongo.Schema({
    Balance:{
        type:Number
    },
    AccountNo:{
        type:String
    },
    AtmPinNumber:{
        type:String
    }

})
module.exports=mongo.model('checkingBalance',BalanceModelSchema)