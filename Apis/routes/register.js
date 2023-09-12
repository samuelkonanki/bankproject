const { response } = require("express")
const conn = require("./loginModel")
const bcrypt = require('bcrypt');
const salt = 10;
const moment=require('moment-timezone')
const insert = async (req, res) => {
    const data = await conn.findOne({ email: req.body.email },{password:req.body.password})
    const createdAt= moment().format ('YYYY-MM-DD HH-mm-ss')
    if (req.body.email==""||req.body.password=="") {
        res.json({
            message: "plese fill the Details",
            Status_code: 404
        })
    }
     else{
    if (data) {
        res.json({
            message: "the Email Already Existed",
            Status_code: 400
        })
    } 
    else if(!data) {
         const password = req.body.password
         bcrypt.hash(password, salt, function (err, hash) {
            let value = new conn({
                email: req.body.email,
                 password: hash,
                 status:'success',
                createdAt
            })
            value.save()
                .then(response => {
                    res.json({
                        message: "sucessfully Registerd",
                        Status_code: '020'
                    })
                })
                .catch(err => {
                    res.json({ message: "Error", err })
                })
         })
    }
     }
}
module.exports = insert 
