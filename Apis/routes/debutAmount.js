const debut = require("./debutAmountModel")
const detailsModel = require('./detailsModel')
const apiResponse = require("./formatResponse")
const moment = require("moment")
const balancesheet = require('./checkBalanceModel')
const allTranctionseettingDateWise = require("./allTransactionsGettingDateWiseModel")
const { response } = require("express")
const transaction = async (req, res) => {

    try {
        const date = moment().format(`YYYY-MM-DD HH-mm-ss`)
        if (req.body.AccountNo == '' || req.body.debutAmount == '' || req.body.firstname == '') {
            res.status(400).send(apiResponse.errorFormat(`null or empty fields Are not Accepted`, {
                message: `enter valid Account Number And debutAmount`,
                code: `020`
            }, 400))
        }

        else {
            const single =await balancesheet.findOne({AccountNo:req.body.AccountNo})
            if(!single){
                res.status(404).send(apiResponse.errorFormat(`Nill Balance`, {
                    message: `please Credit Some Amount After proceed To debit Payment`,
                    code: `010`
                })) 
            }
            const findaccountnumber = await detailsModel.findOne({ AccountNo: req.body.AccountNo })
            if (!findaccountnumber) {
                res.status(404).send(apiResponse.errorFormat(`invalid Accountnumber`, {
                    message: `please approach admin Team`,
                    code: `010`
                }))
            }
            else if (findaccountnumber) {
                const savedebutdetails = new debut({
                    firstname: req.body.firstname,
                    AccountNo: req.body.AccountNo,
                    debutAmount: req.body.debutAmount,
                    debetedDate: date,
                    // creditedfinalAmount:
                })
                let savedebutaAmount = await savedebutdetails.save()
                const checkBalance = await balancesheet.findOne({ AccountNo: req.body.AccountNo })
                if (checkBalance.AccountNo == req.body.AccountNo) {
                    const dbbalance = {
                        Balance: checkBalance.Balance
                    }
                    console.log(dbbalance, 'currentAmountinBalanceModel===##########################################')
                    const debutamount = Number(req.body.debutAmount)
                    if (dbbalance.Balance < debutamount) {
                        res.status(500).send(apiResponse.errorFormat(`if you doesnt have Amount`, {
                            message: `maintain sufficient amount`,
                            code: `015`
                        }))
                    }
                    else if (dbbalance.Balance > debutamount || dbbalance.Balance == debutamount) {
                        const balance = dbbalance.Balance - debutamount
                        const updatebalance = {
                            Balance: Number(balance)
                        }
                        console.log(updatebalance, 'latestAmountinBalanceModel===$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                        const transactionModel1 = await balancesheet.updateOne({ AccountNo: req.body.AccountNo }, { $set: updatebalance })
                        res.status(200).send(apiResponse.successFormat(`successfully your transaction has done`, {
                            message: `your transaction has exeuted successfully`, debutamount,
                            code: `040`,
                        }))

                    }
                    const allgettinDateWise = await allTranctionseettingDateWise.findOne({ AccountNo: req.body.AccountNo })
                    console.log(allgettinDateWise, '999999999999999999999999999999')
                if(!allgettinDateWise){  
                const value=new allTranctionseettingDateWise({
                   debutedAmount: Number(req.body.debutAmount),
                   AccountNo:req.body.AccountNo
                })
                 let add1 = await value.save()
         }
                     if (allgettinDateWise.debutedAmount==null) {
                        const debutAmountsaved=new allTranctionseettingDateWise({
                            AccountNo:req.body.AccountNo,
                            debutedAmount: Number(req.body.debutAmount)   
                         })
                   let debutamount=await debutAmountsaved.save()
                   console.log(debutamount.debutedAmount, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

                     }
                else if (allgettinDateWise.debutedAmount) {
                    console.log(finddebutamount,'111111111111111111111111')

                    const finddebutamount={
                        debutedAmount:allgettinDateWise.debutedAmount
                    }
                //  var lastElement = allgettinDateWise[allgettinDateWise.length - 1];
                    const debutfirst=allgettinDateWise.debutedAmount
                        const newvalues = new allTranctionseettingDateWise({
                            AccountNo: req.body.AccountNo,
                            debutedAmount: Number(req.body.debutAmount) + Number(finddebutamount)
                        })
                        let add111 = await newvalues.save()
                    
                     }
            }
                else {
                    res.status(504).send(apiResponse.errorFormat(`failed`, {
                        message: `something wrong`,
                        code: `025`
                    }))
                }
                // }
            }
        }
    }
    catch (err) {
        (apiResponse.errorFormat(`fail`, {
            message: `your transaction was failed`,
            code: `030`
        }))
    }
}
module.exports = transaction