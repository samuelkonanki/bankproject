const detailsmodel=require('./detailsModel')
const apiResponse=require('./formatResponse')
const mongo=require('mongoose')
const ObjectId = mongo.Types.ObjectId
// const updateall=await detailsmodel.updateOne({_id:ObjectId(id)},{$set:update})
editfunction=async (req,res)=>{
    try{
        if (req.body.firstname == "" || req.body.surname == "" || req.body.fathername == "" || req.body.mothername == "" || req.body.dateofbirth == "" || req.body.age == "" || req.body.pannumber == "" || req.body.aadharnumber == "" || req.body.mobilenumber == "" || req.body.state == "" || req.body.district == "" || req.body.mandal == "" || req.body.village == "" || req.body.pincode == "" || req.body.gender == "" || req.body.accounttype == "") {
            res.status(400).send(apiResponse.errorFormat(`Please Enter Details`,{
              message: `required all fields plese fill the alldetails`,
              status: `400`,
              Err_code: `010`
            }))
          }
          else{
    const id=req.params.id
    console.log(id,'-----------------------------')
    const findaccountnumber=await detailsmodel.findOne({AccountNo:id})
    console.log(findaccountnumber,'####################')
    if(!findaccountnumber){
        res.status(404).send(apiResponse.errorFormat(`invalid Account Number`, {
            message: `Enter Valid Account Number `,
            code: `010`
        })) 
    }
 else if(findaccountnumber){
const update={
    firstname: req.body.firstname,
    surname: req.body.surname,
    fathername: req.body.fathername,
    mothername: req.body.mothername,
    dateofbirth: req.body.dateofbirth,
    age: req.body.age,
     mobilenumber: req.body.mobilenumber,
    district: req.body.district,
    mandal: req.body.mandal,
    village: req.body.village,
    pincode: req.body.pincode,
    gender: req.body.gender,
    accounttype: req.body.accounttype
}
const updateall=await detailsmodel.updateOne({AccountNo:(id)},{$set:update})
console.log(updateall,'**********************')
res.status(200).send(apiResponse.successFormat(`success`,{
    message:`your Details updated successfully `,
    code:`020`
  }))
}
else{
    res.status(400).send(apiResponse.errorFormat(`failed Enter your Details`, {
        message: `something Went wrong`,
        code: `013`,
        status: `something went wrong please approach your branch manager`
      }))
}
}
    }
catch(err){
  res.status(400).send(apiResponse.errorFormat(`failed to Upade your Details`, {
          message: `failed to Upade your Details Please Enter valid Details`,
          code: `012`,
          status: `failed`
        }))
}
}
module.exports=editfunction