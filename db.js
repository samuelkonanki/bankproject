const mongose=require("mongoose")
const dot=require("dotenv").config()
const connectDB=async()=>{
    
   let mongoUrl=" "
   mongoUrl="mongodb://"+process.env.host+"/"+process.env.database
   console.log('mongoUrl', mongoUrl)
    
   const conn = await mongose.connect(mongoUrl, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   });

   console.log(`Mongo DB Connected `);
}
module.exports = connectDB;

