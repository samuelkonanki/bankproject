const mongo=require("mongoose")
const dataschema=mongo.Schema({   
    email:{
        type:String,
        requried:[true,'it is required']
    },
    password:{
        type:String,
        requried:[true,'it is required']
    },
    otp:{
        type:String 
    } ,
    expirationTime:{
          type:Date
    },
    createdAt:{
       type:String
    },
    status:{
        type:String
    },
    unblockstatusDate:{
        type:Date
    }
}
)
    
module.exports=mongo.model("username&password",dataschema)