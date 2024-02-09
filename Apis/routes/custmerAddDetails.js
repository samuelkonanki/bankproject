const { response } = require("express")
const details = require('./detailsModel')
const apiResponse = require('./formatResponse')
const post = async (req, res) => {
  console.log(req.body)
  if (req.body.firstname == "" || req.body.surname == "" || req.body.fathername == "" || req.body.mothername == "" || req.body.dateofbirth == "" || req.body.age == "" || req.body.pannumber == "" || req.body.aadharnumber == "" || req.body.mobilenumber == "" || req.body.state == "" || req.body.district == "" || req.body.mandal == "" || req.body.village == "" || req.body.pincode == "" || req.body.gender == "" || req.body.accounttype == "" || req.body.bankname == "") {
    res.json({
      message: "required all fields plese fill the alldetails",
      status: "400",
      Err_code: "010"
    })
  }
  const aadharpanerr = await details.findOne({ pannumber: req.body.pannumber, aadharnumber: req.body.aadharnumber })
  if (aadharpanerr) {
    res.status(400).send(apiResponse.errorFormat(` Your Aadharnumber Number And PanNumber Already Registred Please Enter Another Number`, {
      message: `Aadharnumber&&Pannumber Already Existed`,
      code: `011`,
      status_code:"090"
    }))
  }
  else {
    const cellnumber = req.body.mobilenumber
    const aadhar = req.body.aadharnumber
    const pan = req.body.pannumber

    if (!(req.body.firstname && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.firstname))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters `, {
        message: `please Enter valid FirstName`,
        code: `012`
      }))
    }
    else if (!(req.body.surname && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.surname))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters `, {
        message: `please Enter valid SurName`,
        code: `013`
      }))
    }
    else if (!(req.body.fathername && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.fathername))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
        message: `please Enter valid FatherName`,
        code: `014`
      }))
    }
    else if (!(req.body.mothername && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.mothername))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
        message: `please Enter valid MotherName`,
        code: `015`
      }))
    }
    else if (!(req.body.state && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.state))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
        message: `please Enter valid StateName`,
        code: `016`
      }))
    }
    else if (!(req.body.district && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.district))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
        message: `please Enter valid DistrictName`,
        code: `017`
      }))
    }
    else if (!(req.body.mandal && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.mandal))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
        message: `please  Enter valid MandalName `,
        code: `018`
      }))
    }
    else if (!(req.body.gender && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.gender))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters  && Only Enter Characters`, {
        message: `please Enter valid GenderName`,
        code: `019`
      }))
    }
    else if (!(req.body.accounttype && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.accounttype))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
        message: `please Enter valid AccountType Name`,
        code: `020`
      }))
    }
    else if (!(req.body.country && /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(req.body.country))) {
      res.status(400).send(apiResponse.errorFormat(` Not valid Numbers and Special Characters && Only Enter Characters`, {
        message: `please Enter valid CountryName`,
        code: `021`
      }))
    }
    else if (!(req.body.pincode && /^[0-9]{6}$/.test(req.body.pincode))) {
      res.status(400).send(apiResponse.errorFormat(`your Pin code Invalid And Enter Correct Format`, {
        message: `Enter validate Pincode`,
        code: `022`
      }))
    }
    else if (!(req.body.pannumber && /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(req.body.pannumber))) {
      res.status(400).send(apiResponse.errorFormat(`your Pan Number Invalid Or Format Error Or Lessthan 10 Positions Or Graterthan  And Not Valid Characters`, {
        message: `Enter validate PanNumber`,
        code: `023`
      }))
    }
    else if (!(req.body.aadharnumber && /^[0-9]{12}$/.test(req.body.aadharnumber))) {
      res.status(400).send(apiResponse.errorFormat(` Your Aadharnumber lessthan 12 characters or Graterthan And Not Valid Characters`, {
        message: `please Enter valid AadharNumber`,
        code: `024`
      }))
    }
    else if (!(req.body.mobilenumber && /^[6-9][0-9]{9}$/.test(req.body.mobilenumber))) {
      res.status(400).send(apiResponse.errorFormat(`Your Mobile Number Invalid Format Not Valid Characters `, {
        message: `Enter Validate MobileNumber`,
        code: `025`
      }))
    }
    else if (!(req.body.age && /^[1-9]{2}$/.test(req.body.age))) {
      res.status(400).send(apiResponse.errorFormat(`Age Invalid Format && Not Valid Characters Only Numbers Accepted `, {
        message: `Enter Valid AgeNumber`,
        code: `026`
      }))
    }
    else if (aadhar.length == 12) {
      if (pan.length == 10) {
        if (cellnumber.length == 10) {
          
          // let generateaccnum=(Math.random()*10).toString(14).substring(2,12);
          let generateaccnum = ''
          for (i = 0; i < 9; i++) {
            generateaccnum += Math.floor(Math.random() * 8)
          }
          let finalnum = 3 + generateaccnum;
          console.log(finalnum)
          const dot = new details({
            firstname: req.body.firstname,
            surname: req.body.surname,
            fathername: req.body.fathername,
            mothername: req.body.mothername,
            dateofbirth: req.body.dateofbirth,
            age: req.body.age,
            pannumber: req.body.pannumber,
            aadharnumber: req.body.aadharnumber,
            mobilenumber: req.body.mobilenumber,
            state: req.body.state,
            district: req.body.district,
            mandal: req.body.mandal,
            village: req.body.village,
            pincode: req.body.pincode,
            gender: req.body.gender,
            accounttype: req.body.accounttype,
            country: req.body.country,
            bankname: "Indian Coparative Bank",
            AccountNo: finalnum
          })
          let savevalues = await dot.save()
            .then(respone => {
              res.json({
                message: "sucessfully fill the AllDetails",
                status: 200,
                Account_NO: "Your AccountNumber is" + ":" + finalnum,
                sucess_code: "030"
              })
            })
            .catch(err => {
              res.json({ message: "error", err })
            })
        }
      }
    }
  }
}
module.exports = post