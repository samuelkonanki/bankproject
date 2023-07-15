const mongo=require("mongoose")
const dataschema=mongo.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
})
    
    
module.exports=mongo.model("login",dataschema)