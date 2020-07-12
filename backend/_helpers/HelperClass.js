module.exports = checkDupplicatesValues;
const db = require("./db");
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


