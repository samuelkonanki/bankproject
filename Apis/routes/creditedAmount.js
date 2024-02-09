const moment = require("moment")
const corn = require('node-cron')
const transactionmodel = require("./creditedAmountModel")
const detailsModel = require('./detailsModel')
const apiResponse = require('./formatResponse')
const { response } = require("express")
const mongo = require('mongoose')
const balance = require('./checkBalanceModel')
const checkBalanceModel = require("./checkBalanceModel")
const allTranctionseettingDateWise = require('./allTransactionsGettingDateWiseModel')
async function creditedamount(req, res) {
  try {

    const AcceptedtypeofRupees = ["10", "20", "50", "100", "200", "500"]
       const moment1 = moment().format('YYYY-MM-DD')
    if (req.body.firstname == '' || req.body.AccountNo == '' || req.body.creditedamount == '' || req.body.accounttype == '' || req.body.Branch == '' || req.body.typeofcash == '') {
      res.status(404).send(apiResponse.errorFormat(`All Fields Are Mandatory Please fill All Details certain Details`, {
        message: `enter valid details`,
        code: `023`,
        status: `Empty fields Not Accepeted`
      }))
    }
    else {

      if (!(req.body.firstname && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.firstname))) {
        res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters `, {
          message: `please Enter valid FirstName`,
          code: `012`
        }))
      }
      else if (!(req.body.accounttype && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.accounttype))) {
        res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
          message: `please Enter valid AccountType Name`,
          code: `020`
        }))
      }
      else if (!(req.body.AccountNo && /^[3][0-9]{9}$/.test(req.body.AccountNo))) {
        res.status(400).send(apiResponse.errorFormat(`Your Number Invalid Format Not Valid Characters `, {
          message: `Enter Validate AccountNumber`,
          code: `025`
        }))
      }
      else if (!(req.body.creditedamount && /^\d+(\.\d{1,2})?$/.test(req.body.creditedamount))) {
        res.status(400).send(apiResponse.errorFormat(`Your CreditedAmount Enter Number Format Not Valid Characters `, {
          message: `Enter Validate Amount`,
          code: `024`
        }))
      }
      else if (!(req.body.Branch && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.Branch))) {
        res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
          message: `please Enter valid BranchName`,
          code: `026`
        }))
      }
    
      const findaccountnumber = await detailsModel.findOne({ AccountNo: req.body.AccountNo })
      console.log(findaccountnumber)
      if (!findaccountnumber) {
        res.status(404).send(apiResponse.errorFormat(`if you doesnt have Account Number Approach your Branch Bank Officers`, {
          message: `do not have account Number plesae contact Branch manager`,
          code: `010`
        }))
      }

       //  if (AcceptedtypeofRupees[0]!==req.body.cash10s ||AcceptedtypeofRupees[1]!==req.body.cash20s || AcceptedtypeofRupees[2]!==req.body.cash50s || AcceptedtypeofRupees[3]!==req.body.cash100s || AcceptedtypeofRupees[4]!==req.body.cash200s || AcceptedtypeofRupees[5]!==req.body.cash500s) {
        //   res.status(400).send(apiResponse.errorFormat(`Type of cash only 10,20,50,100,500 Accepted`, [{
        //     message: `please Credit TypeCash `,
        //     status: `failed To creditedAmount`,
        //     code: `117`
        //   }]))
        // }
      else if (findaccountnumber.AccountNo == req.body.AccountNo) {
        if (req.body.creditedamount == 0) {
          res.status(400).send(apiResponse.errorFormat(`please Enter Amount 0000 values are not updated your Balance or doesn't effect any Transactions`, {
            message: `0 values are not Accepted`,
            code: `0001`,
            status: `failed to your Tranaction`
          }))
          console.log(req.body.creditedamount, '&&&&&&&&&&&&&&&&&&&&&')
        }
       
        else if (50000 < req.body.creditedamount) {
          res.status(400).send(apiResponse.errorFormat(`savings  Account above 50000 thousand Rupees in Current Day not Accepted to Credited`, {
            message: ` Above 50000 thousand are not Accepted Because of Income Tax Rule :114B  `,
            code: `000`,
            status: `please contact Branch Manager if you required to change Account Type & SubMitted Pan Number `,
            data: `more than 3 times your credited amount add gst your 4th transaction`
          }))
        }
        const creditLimit1 = await transactionmodel.find({ AccountNo: req.body.AccountNo })
        var creditLimit = creditLimit1[creditLimit1.length - 1];
        console.log(creditLimit, 'xxxxxxxxxxxxxxxxxx')
        if (50000 > req.body.creditedamount) {
          if (creditLimit == undefined || creditLimit == "undefined") {
            const credited = new transactionmodel({
              firstname: req.body.firstname,
              AccountNo: req.body.AccountNo,
              Branch: req.body.Branch,
              creditedDate: moment1,
              creditedamount: req.body.creditedamount,
              accounttype: req.body.accounttype,
              cash10s: req.body.cash10s,
              cash20s: req.body.cash20s,
              cash50s: req.body.cash50s,
              cash100s: req.body.cash100s,
              cas200s: req.body.cash200s,
              cash500s: req.body.cash500s,
              cash2000s: req.body.cash2000s,
              perDaycreditedamount: req.body.creditedamount
            })
            console.log(credited, '+++++++++++++++++++++++++++')
            let amount = await credited.save()
            let amount1 = {
              amount: amount.creditedamount
            }
            console.log(amount1, '-----------------------')
            res.status(200).send(apiResponse.successFormat(`successfully credited your Amount`, amount1, {
              message: `success`,
              code: `021`,
              status: ` Amount Credited in your Bank Account Successfully`
            }))
            const data = await balance.findOne({ AccountNo: req.body.AccountNo })
            console.log(data, '======================')
            if (data == null) {
              const enterreqbodycreditedamount = Number(req.body.creditedamount)
              const updateAndSaveBalanceModel = new balance({
                AccountNo: req.body.AccountNo,
                Balance: enterreqbodycreditedamount
              })
              console.log(updateAndSaveBalanceModel, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
              let saveamountBalanceModel = await updateAndSaveBalanceModel.save()
            }
            if (data.Balance == 0) {
              console.log(data.Balance)
              let obj1 = {
                Balance: Number(req.body.creditedamount)
              }
              const updateBalanceZero = await balance.updateOne({ AccountNo: req.body.AccountNo }, { $set: obj1 })
            }
            const allgettinDateWise = await allTranctionseettingDateWise.find({ AccountNo: req.body.AccountNo })
            console.log(allgettinDateWise, '9999999999999999999999999999')
            if (allgettinDateWise == null) {
              const valuesstored = new allTranctionseettingDateWise({
                AccountNo: req.body.AccountNo,
                creditedAmount: Number(req.body.creditedamount)
              })
              let add = await valuesstored.save()
            }
          }
          const save = Number(creditLimit.perDaycreditedamount) + Number(req.body.creditedamount)
          if (creditLimit.perDaycreditedamount >= 50000 && creditLimit.creditedDate == moment1 || save >= 50000 && creditLimit.creditedDate == moment1) {
            res.send(apiResponse.errorFormat(`your Limt reached Or Only Day Limit Lessthan 50000 Only`, {
              message: `please contact Branch Manager`,
              status: `failed To creditedAmount And credited Sufficient Equal to 50000 Or Lessthan 50000 Thousand Rupess Only `,
              code: `116`
            }))
          }
          else if (creditLimit.AccountNo == req.body.AccountNo) {
            if (creditLimit.creditedDate == moment1) {
              const perDaycredited = Number(req.body.creditedamount)
              const dbperdayamount = Number(creditLimit.perDaycreditedamount)
              const secondTimecredited = new transactionmodel({
                firstname: req.body.firstname,
                AccountNo: req.body.AccountNo,
                Branch: req.body.Branch,
                creditedDate: moment1,
                creditedamount: req.body.creditedamount,
                accounttype: req.body.accounttype,
                cash10s: req.body.cash10s,
                cash20s: req.body.cash20s,
                cash50s: req.body.cash50s,
                cash100s: req.body.cash100s,
                cas200s: req.body.cash200s,
                cash500s: req.body.cash500s,
                cash2000s: req.body.cash2000s,
                perDaycreditedamount: Number(perDaycredited + dbperdayamount),
              })
              const amount = await secondTimecredited.save()
              let obj12 = {
                creditedAmount: amount.creditedamount
              }
              let obj14 = {
                perDaycreditedamount: amount.perDaycreditedamount
              }
              const updatecreditamountperday = await transactionmodel.updateOne({ AccountNo: req.body.AccountNo }, { $set: obj14 })
              console.log(secondTimecredited, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              res.status(200).send(apiResponse.successFormat(`successfully credited your Amount`, obj12, {
                message: `success`,
                code: `021`,
                status: ` Amount Credited in your Bank Account Successfully`
              }))
              const data = await balance.findOne({ AccountNo: req.body.AccountNo })
              if (data.AccountNo == req.body.AccountNo) {
                console.log(data.AccountNo)
                let saveamout = Number(data.Balance)
                let reqbodyamount = Number(req.body.creditedamount)
                let finalamount = saveamout + reqbodyamount
                let obj = {
                  Balance: Number(finalamount)
                }
                const updateBalance = await balance.updateOne({ AccountNo: req.body.AccountNo }, { $set: obj })
              }
              else if (data.Balance == 0) {
                let obj13 = {
                  Balance: Number(req.body.creditedamount)
                }
                const updateBalanceZero = await balance.updateOne({ AccountNo: req.body.AccountNo }, { $set: obj13 })
              }
              else if (allgettinDateWise) {
                var lastElement = allgettinDateWise[allgettinDateWise.length - 1];
                console.log(lastElement.creditedAmount, 'mmmmmmmmmmmmmmmmmm')
                const newvaluesstored = new allTranctionseettingDateWise({
                  AccountNo: req.body.AccountNo,
                  creditedAmount: Number(req.body.creditedamount) + Number(lastElement.creditedAmount)
                })
                let add1 = await newvaluesstored.save()
              }
            }
            //Not match current Date And Database Date
            else if (creditLimit.creditedDate != moment1) {
              const perDaycredited = Number(req.body.creditedamount)
              const secondTimecredited = new transactionmodel({
                firstname: req.body.firstname,
                AccountNo: req.body.AccountNo,
                Branch: req.body.Branch,
                creditedDate: moment1,
                creditedamount: req.body.creditedamount,
                accounttype: req.body.accounttype,
                cash10s: req.body.cash10s,
                cash20s: req.body.cash20s,
                cash50s: req.body.cash50s,
                cash100s: req.body.cash100s,
                cas200s: req.body.cash200s,
                cash500s: req.body.cash500s,
                cash2000s: req.body.cash2000s,
                perDaycreditedamount: perDaycredited,
              })
              const amount = await secondTimecredited.save()
              let obj12 = {
                creditedAmount: amount.creditedamount
              }
              let obj14 = {
                perDaycreditedamount: amount.perDaycreditedamount
              }
              const updatecreditamountperday = await transactionmodel.updateOne({ AccountNo: req.body.AccountNo }, { $set: obj14 })
              console.log(secondTimecredited, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              res.status(200).send(apiResponse.successFormat(`successfully credited your Amount`, obj12, {
                message: `success`,
                code: `021`,
                status: ` Amount Credited in your Bank Account Successfully`
              }))
              const data = await balance.findOne({ AccountNo: req.body.AccountNo })
              if (data.AccountNo == req.body.AccountNo) {
                console.log(data.AccountNo)
                let saveamout = Number(data.Balance)
                let reqbodyamount = Number(req.body.creditedamount)
                let finalamount = saveamout + reqbodyamount
                let obj = {
                  Balance: Number(finalamount)
                }
                const updateBalance = await balance.updateOne({ AccountNo: req.body.AccountNo }, { $set: obj })
              }
              else if (data.Balance == 0) {
                let obj13 = {
                  Balance: Number(req.body.creditedamount)
                }
                const updateBalanceZero = await balance.updateOne({ AccountNo: req.body.AccountNo }, { $set: obj13 })
              }
              else if (allgettinDateWise) {
                var lastElement = allgettinDateWise[allgettinDateWise.length - 1];
                console.log(lastElement.creditedAmount, 'mmmmmmmmmmmmmmmmmm')
                const newvaluesstored = new allTranctionseettingDateWise({
                  AccountNo: req.body.AccountNo,
                  creditedAmount: Number(req.body.creditedamount) + Number(lastElement.creditedAmount)
                })
                let add1 = await newvaluesstored.save()
              }
            }
          }

        }
      }
      else {
        res.status(504).send(apiResponse.errorFormat(`failed to credited your Amount`, {
          message: `your amount Not Credited`,
          code: `012`,
          status: `failed`
        }))
      }
    }
  }
  catch (err) {
    apiResponse.errorFormat(`something went wrong`, {
      message: `please contact Branch Manager`,
      status: `failed To try Block`,
      code: `111`
    })
  }
}
module.exports = creditedamount