module.exports = checkDupplicatesValues;


module.exports = sendEmail;

const db = require("./db");
const { static } = require("express");
const User = db.User;
const Roles = db.Roles;

const Groups = db.Groups;
const Customers = db.Customers;

const Supplier = db.Supplier;
const SubCatagory = db.SubCatagory;

const passwordResetToken = db.passwordResetToken;
const MembershipType = db.MembershipType;

const Membership = db.Membership;
const ScheduleType = db.ScheduleType;

const Employee = db.Employee;
const Instructor = db.Instructor;

 function checkDupplicatesValues(params) {
    let errorArray =[];
    let memberhipMessage = ['memberhipMessage'];
    let membershipChanged =['memberhipRoleChanged'];
    errorArray.length =0;
    if(param!=undefined){
//find email
await Membership.findOne({email:params.email},function(error , res){
    if(res!=null){
      errorArray.push('email');
    }
  })
//find NicNumber
await Membership.findOne({ nicNumber: params.nicNumber },function(error , res){
    if(res!=null){
      errorArray.push('Nic Number');
    }
  });
//find phonenumber
await Membership.findOne({phonenumber: params.phonenumber},function(error , res){
    if(res!=null){
      errorArray.push('Mobile Number')
    }
  })

      return errorArray;  

    }
}


 function sendEmail(email){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "manaalex3@gmail.com",
    pass: 'QAZ(*&jker":',
    },
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {


  to: email,
  from: "your email",
  subject: "Gym Membership registration",
  text:
    "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
    "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
    "http://localhost:4200/response-reset-password/" +
    +
    "\n\n" +
    "If you did not request this, please ignore this email and your password will remain unchanged.\n" +
    "<br>Thank You.\n",
};
transporter.sendMail(mailOptions, (err, info) => {
  if(err){
    console.log('error')
    console.log(err);
    return 'error'
  }else if(info){
    return 1;
  }
  
});







}