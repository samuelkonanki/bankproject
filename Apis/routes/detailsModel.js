const mongo=require("mongoose");
const mongoschema=mongo.Schema({
    firstname:{
        type:String,
        required:[true,"it is Mandatory"]
    },
    surname:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    fathername:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    mothername:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    dateofbirth:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    age:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    pannumber:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    aadharnumber:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    mobilenumber:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    state:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    district:{
        type:String,
        required:[true,"it is Mandatory"],
    }, 
    mandal:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    village:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    pincode:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    gender:{
  type:String,
  required:[true,"it is Mandatory"]
    },
    accounttype:{
        type:String,
        required:[true,"it is Mandatory"],
    },
    country:{
        type:String,
        required:[true,"it is Mandatory"],
    },
        bankname:{
            type:String,
            required:[true,"it is Mandatory"],

        },
        AccountNo:{
            type:String
        }
})
module.exports=mongo.model("inputaccountdetails",mongoschema)