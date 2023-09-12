const { response } = require("express")
const ref = require("./loginModel")
const jwt = require("jsonwebtoken")
const nodeemailer = require("nodemailer")
const bcrypt = require('bcrypt');
const CryptoJs=require('crypto-js')
const salt = 10;
const secretkey = "secretkey"
const moment = require('moment')
const login = async (req, res, next) => {
    const createdAt = moment().add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss'); 
    console.log(createdAt,'pppp')
    // const  now = new Date()
    // const year=now.getFullYear()+ "-" + now.getMonth()+1+ "-" +now.getDate()+"-" +now.getHours()-6+"-" +now.getMinutes()-30+"-" +now.getSeconds();
    // console.log(year,'9999999999999')
    // const expirationTime = new Date(now.getTime() + 1* 60000);
    const otpinemail = Math.random().toString(10).substring(2, 7)
    const otp = otpinemail
    if (req.body.email == "" || req.body.password == "") {
        res.json({
            message: "plese Fill The login Details",
            Status_code: 404
        })
    }
    const differenceError = await ref.findOne({email:req.body.email})
    console.log(differenceError,'kkkkkkkkkkkkkkkkkkkkkkk')
        if(!differenceError) {
        res.send({
            message1: "invalid Login Details",
            Status_code: 400    
        })
    }
     else if(differenceError) {
        const email = req.body.email
         const password = req.body.password
         const secretKey=''
         const bytes = CryptoJs.AES.decrypt(password, secretKey);
         console.log(bytes,'xxxxxxxxxxxxxxxxxxxxxxx')
         const decryptedPassword = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
         console.log('====decryptedPassword',decryptedPassword)
        if(bcrypt.compareSync(decryptedPassword,differenceError.password)){
         console.log(differenceError)
         console.log(password)
            console.log(password)
            var transporter = nodeemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "samuel8074473395@gmail.com",
                    pass: "axzlbzaabiuphqlt"
                }
            });
            var mailoptions = {
                from: "samuel8074473395@gmail.com",
                to: email,

                subject: "the login verification",
                text: "the otp is" + ':' + otp
            }

            transporter.sendMail(mailoptions, function (error, otp) {
                if (error) {
                // res.send("otp not sent in Email")
                }
               else if (otp) {
                    res.json({ message: "otp sent in Email sucessfully ", otp })
                }
                else{
                    // res.send(" something went wrong")
                }
            });
            const value = new ref({
            otp,
            createdAt:createdAt,
            status: 'success',
            email:req.body.email    
        })
        value.save()
            .then(response => {
                res.json({
                    message: "otp Sent Sucessfully",
                    status: 'sucess',
                    Status_code: 200
                })

            })
            .catch(err => {
                res.json({ message: "error", err })
            })
        }
        else{
            res.json({
                message: "worng password",
                Status_code: 400
            })
        }
     }
    
    console.log(otp)
}

module.exports =login



