const mongo=require('mongoose')
const debutSchema=mongo.Schema({
    name:{
        type:String
    },
    AccountNo:{
        type:String
    },
    debutAmount:{
        type:Number
    },
    debetedDate:{
        type:String
    },
})
module.exports=mongo.model('debutAmount',debutSchema)