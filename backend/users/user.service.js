const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("_helpers/db");
const details = require("details.json");

const nodemailer = require("nodemailer");

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

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  getbyrole,
  delete: _delete,
  creationUser,
  getRoles,
  groupinsertion,
  getGroups,
  UpdateUserService,
  loadByID,
  getGroupNames,
  getDetailUsers,
  cusRegister,
  supRegister,
  getSuppliers,
  getCatDataRelevent,
  signUpUser,
  getreleventSupliers,
  ResetPassword,
  insertMembershipType,
  getMembershiptype,
  insertMembership,
  insertMembershipToUser,
  GetByPending,
  updateById,
  savescheduleType,
  getAllSchedule,
  getreleventCustomer,
  EmployeeCreation,
  getreleventRoleData,
  updateRole,
  loginMail,
  instructorSave,
  findCustomer,
  savememberData,
  loadProfileData,
  checktheNICNumber,
  responseAllInstructorData,
  getAllMembership

};

async function responseAllInstructorData() {
  return await Instructor.find({});
}
async function checktheNICNumber(data){
  
 const nicFind = await Membership.findOne({nicNumber: data.nicNo},function(error , res){
 
 });
    if(nicFind !== null){
      
      return 1;
    }else{
      
      return 2;
    }

}

async function loadProfileData(id) {
  //get the user role
  const userRole = await User.find({ _id: id }, function (error, response) {
    if (error) {
      return error;
    }
  });

  const role = userRole[0].role;
  const username = userRole[0].username;

  //switch cases to find relevent data
  switch (role) {
    case "Admin":
      return await User.find({username:username});
      break;
    case "User":
      return await Employee.find({username:username});
      break;
    case "Supplier":
      return await Supplier.find({username:username});
      break;
    case "Customer":
      return await Customers.find({username:username});
      break;
    case "Membership":
      return await Membership.find({username:username});
      break;
    case "Instructor":
      return await Instructor.find({username:username});
      break;
  }
}

async function findCustomer(data) {
  console.log("Service");
  console.log(data);

  return await Customers.find({ id: data });
}

async function updateRole(data) {
  User.updateOne(
    {
      _id: data.id,
    },
    {
      $set: data,
    },
    function (err, responses) {
      if (err) {
        console.log(err);
      }
    }
  );
}

async function getreleventRoleData(data) {
  return await User.find({ _id: data });
}

async function getAllSchedule() {
  return await ScheduleType.find({});
}

async function getAllMembership() {

  return await Membership.find({});
}

async function savescheduleType(body) {
  const scheduleType = new ScheduleType(body);
  await scheduleType.save();
}

async function updateById(data) {
  console.log(data);

  const MembershipUpdate = Membership.updateOne(
    {
      membershipId: data.id,
    },
    {
      $set: data,
    },
    function (err, responses) {
      if (err) {
        console.log(err);
      }
    }
  );
  let userData = {
    id: data.id,
    role:'Membership',
    membershipStatus: true,
  };

 const Userpdate =  User.updateOne(
    {
      user_id: userData.id,
    },
    {
      $set: userData,
    },
    function (err, responses) {
      if (err) {
        console.log(err);
      }
    }
  );

  if(Userpdate && MembershipUpdate){
    return 1;
  }else {
    return 3;
  }
}

async function GetByPending() {
  return await Membership.find({});
}

async function insertMembershipToUser(body) {
  if (!userFind) {
    if (body.password) {
      user.hash = bcrypt.hashSync(body.password, 10);
    }
    await user.save();
  }
}

async function insertMembership(body) {
  console.log('awa serivece');
  const UserData = body.UserDatabody;
  const membershipData = body.membershipbody;

 //create objects
 const membership = new Membership(body.membershipbody);
 
 const membershipFind = await Membership.findOne({customerID : membershipData.customerID})

  
if(!membershipFind){
  //saveing the data 
  await membership.save();
console.log('update wennai yannne');
  //updateing the usertable
  await User.updateOne(
    {
      _id: UserData._id,
    },
    {
      $set: UserData,
    },
    function (err, responses) {
      if (err) {
        console.log(err);
      }else{
        console.log(responses);
      }
    }
  );
  return 1;
}
else{
  return 8;
}

}

//Insert member to Database
async function savememberData(data) {
 

  
  if (await User.findOne({ email: data.email })) {
    return 'Email "' + data.email + '" is already taken';
  } else if (await User.findOne({ nicNumber: data.nicNumber })) {
    return 'UserName "' + data.nicNumber + '" is already taken';
  }
  const user = new User(data);
  // hash password
  if (data.password) {
    user.hash = bcrypt.hashSync(data.password, 10);
  }
  // save user
  if (await user.save()) {
    return 1;
  }
}


async function instructorSave(data) {

   let userData = data.UserData;
   let instructorData = data.data;
   let errorArray = [];
//   console.log(errorArray);
  errorArray.length = 0 ; 

//    //define object
  const instructor = new Instructor(instructorData);
  const user = new User(userData);

//    //finding relevent data
   await User.findOne({ email: userData.email },
    function(error, res){
      if(res!==null){
       
        errorArray.push('email');
      }
    }
    );
    
   // return errorArray;
   await User.findOne({ username: userData.username },
    function(error, res){
      if(res!==null){
    
        errorArray.push('username');
      }
    });
  await User.findOne({ nicNumber: userData.nicNumber },
    function(error, res){
     
      if(res!==null){
        errorArray.push('Nic Number');
      }
    });
   // return errorArray;
  //   console.log(errorArray.length);

     if(errorArray.length == 0){
       user.hash = bcrypt.hashSync(userData.password, 10);
       await instructor.save();
       await user.save();
       return 1;
     }else if(errorArray.length ==1){
     return(errorArray);
    }
   else if(errorArray.length ==2){
       return(errorArray);
     }
     else if(errorArray.length ==3){
       return(errorArray);
    }
 
  }





async function insertMembershipType(body) {
  const membership_type = await MembershipType.findOne({
    typeName: body.membershipName,
  });
  const membership = new MembershipType(body);
  if (membership_type) {
    throw 'TypeName "' + body.membershipName + '" is already taken';
  } else {
    await membership.save();
  }
}
async function getMembershiptype() {
  return await MembershipType.find({});
}

async function loginMail(data) {
  console.log(data);
  const user = await User.findOne({
    email: data.mail,
  });
  if (!user) {
    console.log("Boyd eke enne");
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      auth: {
        user: "manaalex3@gmail.com",
        pass: 'QAZ(*&jker":',
      },
    });
    var mailOptions = {
      to: data.mail,
      from: "your email",
      subject: "Gym Managment System UserName and Password",
      text:
        `Hey ,<br/>
            Here is your username and password for login as a supplier<br/>
            username:` +
        data.username +
        `<br/>
            password:` +
        data.password +
        `<br/>
            Thank You<br/>
            Admin Panel`,
    };
    transporter.sendMail(mailOptions, (err, info) => {});

    let message = 1;
    return message;
  } else {
    return 3;
  }
}

async function ResetPassword(values) {
  const user = await User.findOne({
    email: values.email,
  });
  console.log(user);

  var resettoken = new passwordResetToken({
    _userId: user._id,
    resettoken: crypto.randomBytes(16).toString("hex"),
  });
  resettoken.save(function (err) {
    if (err) {
      return;
    }
    passwordResetToken
      .find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } })
      .remove()
      .exec();
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "manaalex3@gmail.com",
        pass: 'traffic(*&p123',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
      to: user.email,
      from: "your email",
      subject: "Gym Managment System",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://localhost:4200/response-reset-password/" +
        resettoken.resettoken +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n" +
        "<br>Thank You.\n",
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if(err){
        console.log(err);
      }
    });
  });
}

async function getreleventCustomer(data) {
  var name = data;
  return await Customers.find({ firstName: { $regex: "^" + data } });
}

async function getreleventSupliers(data) {
  var name = data;

  return await Supplier.find({ sup_firstName: { $regex: "^" + data } });
}

async function getCatDataRelevent(id) {
  return await SubCatagory.find({ mainCatgory: id });
}

async function getSuppliers() {
  return await Supplier.find({});
}

async function supRegister(data) {
console.log('HI');
  //define the variable
  const userData = data.UserData;
  const supplierData = data.sup_data;
 
  //define the array
  let supplierArray = [];
  supplierArray.length = 0;
  
  //    //define object
  const supplier = new Supplier(supplierData);
  const user = new User(userData);

  //    //finding relevent data
  await User.findOne({ email: userData.email },
    function(error, res){
      if(res!==null){
       
        supplierArray.push('email');
      }
    }
    );
   // return errorArray;
   
  await User.findOne({ nicNumber: userData.nicNumber },
    function(error, res){
     
      if(res!==null){
        supplierArray.push('Nic Number');
      }
    });

    if(supplierArray.length == 0){
      user.hash = bcrypt.hashSync(userData.password, 10);
      await supplier.save();
      await user.save();
      return 1;
    }else if(supplierArray.length ==1){
    return(supplierArray);
   }
  else if(supplierArray.length ==2){
      return(supplierArray);
    }
    else if(supplierArray.length ==3){
      return(supplierArray);
   }

}


//membership registration
async function cusRegister(data) {
  const customerData = data.data;
  const userParam = data.userParam;
  var errorArray = [];

  const membership = new Membership(customerData); 
  const user = new User(userParam);

  //Check email
 await User.findOne({email:userParam.email},
  function(error, res){
    if(res !=null){
      errorArray.push('email');
    }
  });
   await User.findOne({nicNumber:userParam.nicNumber},
    function(error, res){
      if(res !=null){
        errorArray.push('nic Number');
      }
    });
    if(errorArray.length == 0){
      if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
      }
          // saveing
           await user.save();
          await membership.save();
          return 1;
    }else{
      return (errorArray);
    }

  

  
    
  
}

async function getDetailUsers(roleValue) {
  console.log("service" + roleValue);
  return await User.find({ assignRole: roleValue });
}

async function getGroupNames() {
  //Using Projection
  return await Groups.find({}, { GroupName: 1, _id: 0 });
}

async function loadByID(id) {
  console.log("Service:" + id);
  return await Groups.findById(id);
}

async function UpdateUserService(newData) {
  
  
return await User.updateOne(
    {
      _id: newData._id,
    },
    {
      $set: newData,
    },
    function (err, responses) {
      if (err) {
        console.log(err);
      }else{
        console.log(responses);
      }
    }
  );
}

async function groupinsertion(groupData) {
  console.log("groupData");

  const group = new Groups(groupData);
  console.log(group);

  // save user
  await group.save();
}

async function getRoles() {
  return await User.find({});
}

async function getGroups() {
  return await Groups.find({});
}
async function EmployeeCreation(data) {
  console.log("empoyee");
  // console.log(data)
  const employee = new Employee(data);
  const userName = await Employee.findOne({ username: data.username });
  const userEmail = await Employee.findOne({ email: data.email });

  if (userEmail) {
    return 5;
  } else if (userName) {
    return 3;
  } else {
    if (data.password) {
      employee.hash = bcrypt.hashSync(data.password, 10);
    }
    await employee.save();
    return 1;
  }
}



async function creationUser(userData) {
  console.log("creationUser");
  // validate
  const cus = new Customers(userData);
  // console.log(userData);
  // hash password
  if (userData.password) {
    cus.hash = bcrypt.hashSync(userData.password, 10);
  }

  // save user
  await cus.save();
}

async function signUpUser(data) {
  console.log(data.username);
  if (await User.findOne({ username: data.username })) {
    // throw 'User name is already existent';
    console.log("HI");
    let message = 3;
    return message;
  }

  const user = new User(data);
  console.log(user);
  // hash password
  if (data.password) {
    user.hash = bcrypt.hashSync(data.password, 10);
  }

  // save user
  await user.save();
}

async function authenticate({ email, password }) {

  if (await User.findOne({ email: email, active: false })) {
    return "User is not Activated please contact admin department";
  } else if (!(await User.findOne({ email: email }))) {
    return "There is no sufficient user in the system";
  }

  const user = await User.findOne({ email });
  const userActive = await User.findOne({});


  if (user.active == true) {
    if (user && bcrypt.compareSync(password, user.hash)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
        ...userWithoutHash,
        token,
      };
    }
  }
}

//Get data
async function getAll() {
  return await Employee.find({});
}

async function getById(id) {
  return await Employee.find({ _id: id });
}

async function getbyrole(role) {
  return await User.findByrole(role);
}

async function create(userParam) {
  console.log("test");
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);
  console.log(user);
  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(data) {
  console.log(data);
  await User.deleteOne({ user_id: data.EmpId }, async function (err, response) {
    if (err) {
      //console.log('HEllo')
      return {
        message: JSON.stringify(err),
        error: true,
      };
    } else {
      console.log("user done");
      await Employee.deleteOne({ _id: data.id });
      return {
        message: "record is updated successfully",
        error: false,
      };
    }
  });
}
