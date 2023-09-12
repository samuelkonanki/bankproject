const mongose=require("mongoose")
const dot=require("dotenv").config()
const connectDB=async()=>{
    try{
   let mongoUrl=" "
   const db=process.env.database
   mongoUrl="mongodb://"+process.env.host+"/"+db
   console.log('mongoUrl', mongoUrl)
   
   const conn = await mongose.connect(mongoUrl, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   });
     
   console.log(`Mongo DB Connected `);
   }
    catch(err){
console.log("something went wrong")
   }
}
module.exports = connectDB;

