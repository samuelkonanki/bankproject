const loginModel = require("./loginModel")
const { response } = require("express")
const mongo = require("mongoose")
const bcrypt = require('bcrypt')
const salt = 10;
const secretkey = "secretkey"
const update = async (req, res) => {
    try {
    if (req.body.email == '' || req.body.password == '') {
        res.json({
            message: "do not enter email or password",
            Status_code: 400
        })
    }
    
        const email = await loginModel.findOne({ email: req.body.email })

        if (!email) {
            res.json({
                message: "if doesn't have email and password",
                Status_code: 404
            })
        }
        if (email) {
            const password = req.body.password
            bcrypt.hash(password, salt, async function (err, hash) {
                const updatepassword = {
                    password: hash
                }
                console.log(updatepassword.password, 'oooooooooo')
                await loginModel.updateOne({ email: req.body.email }, { $set: updatepassword })
                res.json({
                    message: "update sucessfully",
                    Status_code: 200
                })

            })

        }
    }
    catch (err) {
        res.send( "not update", err )
    }
}
module.exports = update