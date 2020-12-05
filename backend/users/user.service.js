const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("_helpers/db");
const details = require("details.json");

var moment = require('moment');
const nodemailer = require("nodemailer");
const { ok } = require("assert");
const { ItemData, GRN } = require("../_helpers/db");

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
const Comment = db.Comment;
const Invoice =db.Invoice;
const MembershipStatus =db.MembershipStatus;
const Cart = db.Cart;



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
  getAllMembership,
  getReleventType,
  membershipInactive,
  getUsersReports,
  getByIdInstructorDetails,
  instrucotrInactive,
  updateInstructor,
  getReleventActivationOfEmployee,
  getReleventUserData,
  updateSupplierDataService,
  deleteSupplierDataService,
  updateActiveIncativeStatusMembership_service,
  saveCommentController_service,
  getCommentDataController_service,
  loadAllinvoiceData_service,
  getReleventMembshipStatusData_service,
  getReleventMembshipStatusDataPending_service,
  saveMembershipReciptDetails_service,
  updateInvoice_Controller_service,
  updateMembershipCardStatus_service,
  getInvoiceData_service,
  updateMembershipReciptDetails_service,
  getMembershipTypByCatagory_service,
  patchScheduleType_service,
  inActiveScheduleType_service,
  item_reports_service,
  grn_reports_service

};

async function grn_reports_service(grnData){
  let _grnArray = [];
  const _findAllGrnData = await GRN.find({createdDate:{$gte: new Date(moment(grnData.fromDate).add(1, 'day')), $lte:new Date(moment(grnData.toDate).add(1, 'day'))}});
  console.log(grnData); 
  if(_findAllGrnData){
     if(grnData.type == 'wihout item'){
     
      _findAllGrnData.forEach((grn , index)=>{
        if(grnData.supplierName == ''){
          let grnDetail = {
            date : grn.date,
            grnId :grn.id,
            purchaseOrderId : grn.purchaseOrderId,
            supplierName :grn.supplierName,
            totalAmount : grn.totalAmount
          }
          _grnArray.push(grnDetail);
        }else{
          if(grnData.supplierName == grn.supplierName){
            let grnDetail = {
              date : grn.date,
              grnId :grn.id,
              purchaseOrderId : grn.purchaseOrderId,
              supplierName :grn.supplierName,
              totalAmount : grn.totalAmount
            }
            _grnArray.push(grnDetail);
          }
        }
     
      })
      
     }else{
      _findAllGrnData.forEach((itmGrn , gIndex)=>{
            let grnItemDetail = {
              date : itmGrn.date,
              grnId :itmGrn.id,
              purchaseOrderId : itmGrn.purchaseOrderId,
              supplierName :itmGrn.supplierName,
              totalAmount : itmGrn.totalAmount,
              items : itmGrn.ItemGrnTable
            }
            _grnArray.push(grnItemDetail); 
      })
     }
     }
      return _grnArray;
}

async function item_reports_service(itemData){
  console.log(itemData);
  let _filterGn = [];
  const _findAllCartData = await Cart.find({createdDate:{$gte: new Date(moment(itemData.fromDate).add(1, 'day')), $lte:new Date(moment(itemData.toDate).add(1, 'day'))}});
   
    if(itemData && itemData.itemName == ''){
 //  console.log(_findAllCartData.length);  
      if(_findAllCartData && _findAllCartData.length > 0){
        _findAllCartData.forEach((crt , index)=>{
            if(crt && crt.CartValues && crt.CartValues.length>0){
              crt.CartValues.forEach((itm , giIndex)=>{
                let _arrayData = {
                  itemId :itm.itemId,
                  itemName:itm.itemName,
                  avlQty:itm.avlableQty,
                  deductQty:Number(itm.qty),
                  sellingPrice:itm.sellingPrice,
                  paymentDate : crt.paymentDate,
                  nowAvailableQty:0
                }

              _filterGn.push(_arrayData)
              });
            }

          })
        }
    }else{
      if(_findAllCartData){
        _findAllCartData.forEach((crt , index)=>{
          if(crt && crt.CartValues && crt.CartValues.length>0){
            crt.CartValues.forEach((itm , giIndex)=>{
              if(itm.itemName == itemData.itemName){
              let _arrayData = {
                itemId :itm.itemId,
                itemName:itm.itemName,
                avlQty:itm.avlableQty,
                deductQty:Number(itm.qty),
                sellingPrice:itm.sellingPrice,
                paymentDate : crt.paymentDate,
                nowAvailableQty:0
              }
              _filterGn.push(_arrayData)
            }
            });
          }

        })
      }
      
    }
   // return _filterGn
 //   console.log(_filterGn.length)
    if(_filterGn.length>0){
      var _findItemTable = (itemData.itemName == '')?await ItemData.find({}):await ItemData.find({$and:[{item_name:itemData.itemName ,cat_name:itemData.catogry}]});
     
     if(_findItemTable){
       _findItemTable.forEach((finItm , index)=>{
            var filterData = _filterGn.filter(ct=>ct.itemName == finItm.item_name);
            if(filterData.length > 0)
            filterData[0].nowAvailableQty = finItm.quantity;
       })
     };
    }else{
      return 'No such data for your item report request'
    }

    return _filterGn;
}

async function getUsersReports(data){
  console.log(data);
  var statusData = false;
  if(data.status != ''){
    const statusVal = (data.status=='true') ? true : false;
    statusData = statusVal
  }

  if(statusData ==true && data.role != ''){
 return await User.find({ role:data.role , active:statusData, createdDate:{$gte: new Date(moment(data.fromDate).add(1, 'day')), $lte:new Date(moment(data.toDate).add(1, 'day'))}},
 function(error , result){
  if(result != undefined && result.length ==0){
    return 2;
}
 });
}else if(statusData ==true && data.role==''){
  return await User.find({  active: statusData,  createdDate:{$gte: new Date(moment(data.fromDate).add(1, 'day')), $lte:new Date(moment(data.toDate).add(1, 'day'))}}, function(error , result)
  {
      if(result != undefined && result.length ==0){
          return 2;
      }
  });
}else if(statusData ==false && data.role !=''){
  console.log('HI')
  return await User.find({role: data.role,active:statusData,  createdDate:{$gte: new Date(moment(data.fromDate).add(1, 'day')), $lte:new Date(moment(data.toDate).add(1, 'day'))}}, function(error , result)
  {
      if(result != undefined && result.length ==0){
          return 2;
      }
  });
}
else{
  return await User.find({createdDate:{$gte: new Date(moment(data.fromDate).add(1, 'day')), $lte:new Date(moment(data.toDate).add(1, 'day'))}}, function(error , result)
        {
            if(result != undefined && result.length ==0){
                return 2;
            }
        });   
}
}
async function inActiveScheduleType_service(id){
  await ScheduleType.updateOne({
    _id : id
    },
     {$set:{active:false}}
    ), function(error , result){
      if(!error){
        return 1;
      }
    }
}

async function patchScheduleType_service(data){
   await ScheduleType.updateOne({
      id : data.id 
      },
       {$set:data}
      ), function(error , result){
        if(!error){
          return 1;
        }
      }
}

async function getMembershipTypByCatagory_service(cat){
  return await MembershipType.find({membershipCatagory:cat});
}
async function updateMembershipReciptDetails_service(data){

  await Invoice.updateOne({
    invoiceId : data.invoiceId 
  },
   {$set:data}
  )

 await Membership.updateOne({
  membershipId : data.userId 
  },
   {$set:{paymentDetails:'Created'}}
  )
  return 1;

}

async function getInvoiceData_service(id){
    console.log(id)
    return await Invoice.findOne({invoiceId:id})
}

async function updateMembershipCardStatus_service(data){
  //console.log(data);
  await Invoice.updateOne({
    email:data.email
  },
  {
    $set:{invoicePrinted:true}
  }
  )
  //update the login User table
  let updateMembrData = {
    paymentStatus:true,
    role:'Membership'

  }
  //update the Membership table data
  await Membership.updateOne({
    membershipId:data.membershipId
  },
  {
    $set:updateMembrData
  }
  )

  //update the login User table
  let updateUserData = {
    role:'Membership',
    membershipStatus:true

  }

  await User.updateOne({
    user_id:data.customerID
  },
  {
    $set:updateUserData
  }
  )

    return 1;


}



async function updateInvoice_Controller_service(data) {
  console.log(data);
  //update the invoice table
 
  await Invoice.updateOne({
    invoiceId:data.inoviceId
  },
  {
    $set:data
  }
  )

  if(data.invoiceDetails == 'Rejected'){
    await Membership.updateOne({
       membershipId:data.membershipId
    },
    {
      $set:{ paymentDetails: 'Rejected'}
    }
    )
  }else {
    await Membership.updateOne({
      membershipId:data.membershipId
    },
    {
      $set:{ paymentDetails: 'Sucess'}
    }
    )
  }

  return 1;

}


async function saveMembershipReciptDetails_service(data){
  
  //save data to invoice table
  const invoice = new Invoice(data);
  await invoice.save();


  let membershipData= {
    paymentDetails:'Created',
    invoiceId:data.invoiceId
  }
  //update the membeship table  and the paymentDetails must be created
  await Membership.updateOne(
    {
      membershipId:data.membershipId
    },
    {
      $set:membershipData
    },
    function(err , result){
       if(err){
         console.log(err)
         return err;
       }
    }
  )
  
  
      return 1;







}





async function getReleventMembshipStatusDataPending_service(email){
  return await Membership.find({email:email});
}

async function getReleventMembshipStatusData_service(email){
  return await MembershipStatus.find({email:email});
}

async function loadAllinvoiceData_service(){
  return await Invoice.find({});
}

async function getCommentDataController_service(id){
  return await Comment.find({itemId:id});
}
async function saveCommentController_service(commentData){
  const comment = new Comment(commentData);
  await comment.save();
}

async function updateActiveIncativeStatusMembership_service(data){
  var tempArray = [];
  //const membershipStatus = new MembershipStatus(tempArray[0]);
  //find the date in the data base
   await Membership.findOne({_id:data.data._id},function(error ,result){
      if(result){
        tempArray.push(result);
      }else if(error){
        return ;
      }
    })
    let memberShipDetials = {
      membershipId:  tempArray[0].membershipId,
      email: tempArray[0]. email,
      firstName: tempArray[0].firstName,
      lastName: tempArray[0].lastName,
      phonenumber: tempArray[0].phonenumber,
      phonenumber1: tempArray[0].phonenumber1,
      Height:tempArray[0].Height,
      Weight: tempArray[0].Weight,
      disaster: tempArray[0].disaster,
      birth: tempArray[0].birth,
      customerID : tempArray[0].customerID,
      description: tempArray[0].description,
      AcceptedRejectedStatus:'Rejected',
      gender:  tempArray[0].gender,
      age: tempArray[0].age,
      BMI: tempArray[0].BMI,
      currnetJoinDate: tempArray[0].currnetJoinDate,
      typeName:  tempArray[0].typeName,
      amount:  tempArray[0].amount,
      VMonth:  tempArray[0].VMonth,
      endDate:  tempArray[0].endDate,
      status: false,
      nicNumber:  tempArray[0].nicNumber,
      role: "Member",
      noteDisaster:  '',
    };
    //then delete the document 
    await Membership.deleteOne({ _id:data.data._id })
    const membershipStatus = new MembershipStatus(memberShipDetials);
   const saveMembershipStatus = await membershipStatus.save();

   if(saveMembershipStatus){
     return 1;
   }
    
// return
//   await Membership.deleteOne({
//     _id:data.data._id
//   })

//  // db.collection.deleteOne()

//   return 1;
//     var updateMembershipStatus = await Membership.updateOne(
//       {_id:data.data._id}, {$set:{AcceptedRejectedStatus:"Rejected"}}
//     )
//     if(updateMembershipStatus.ok==1){
//       return 1;
//     }
}

async function deleteSupplierDataService(data){
  
    var inactiveSupplier = await Supplier.updateOne(
      {_id:data.data._id} , {$set:{active:false}}
    )
    var inactiveUser = await User.updateOne(
      {user_id:data.data.sup_id} , {$set:{active:false}}
    )
    console.log('ijh')
      if(inactiveSupplier.ok == inactiveUser.ok){
        return 1;
      }

}

async function updateSupplierDataService(supplierData){
  var userData = supplierData.userData;
  var supplierDetails = supplierData.updateSupplier;
//console.log(userData);
  const userUpdateQuery = await User.updateOne(
    {
      user_id:userData.user_id
    },
    {
      $set:userData
    },
    function(err , result){
       if(err){
         console.log(err)
         return err;
       }
    }
  )
  const supplierupdateQuery =  await Supplier.updateOne(
    {sup_id:supplierDetails.id},
    {$set:supplierDetails}
  )
    if(supplierupdateQuery.ok == userUpdateQuery.ok ) return 1;
  

  




}


async function getReleventUserData(id){
  
  return await Supplier.find({_id:id});
}
async function getReleventActivationOfEmployee(status){
  console.log(status)
  const statusVal = (status =='true')?true:false;
  return await Employee.find({active:statusVal})
}

async function updateInstructor(data){
  const userData= data.UserData;
  
  const instructorData = data.data;
  
 
  await User.updateOne({
    user_id:userData.user_id
  },
  {
    $set:userData
  },
  function(error , result){
    if(error){
      console.log(error);
      return 'Internal server Error'
    }
  })

  return await Instructor.updateOne({
    isId:instructorData.isId
  },
  {$set:instructorData},
  function(error ,result){
    if(error){
      return 'Internal server Error'  
    }
    return 1;
  })





  
}

async function getByIdInstructorDetails(id){
  return await Instructor.find({_id:id});
}

async function instrucotrInactive(data){
  
  const instructorUpdate = await User.updateOne(
   {
     user_id: data.isId,
   },
   {
     $set: {active:false},
   },
   function (err, responses) {
     if (err) {
       console.log(err);
     }
   } )

   if(instructorUpdate){
    await Instructor.updateOne(
      {
        isId: data.isId,
      },
      {
        $set: {active:false},
      },
      function (err, responses) {
        if (err) {
          console.log(err);
        }else {
          return 1;
        }
      } )
   }
}

 


async function membershipInactive(data) {
 console.log(data)
    var updateData={
       role:'Member',
       membershipStatus : false,
    }

   const userUpdate = await User.updateOne(
    {
      user_id: data.membershipId,
    },
    {
      $set: updateData,
    },
    function (err, responses) {
      if (err) {
        console.log(err);
      }
    }
  );

  const membershipUpdate = await Membership.updateOne(
    {
      membershipId: data.membershipId,
    },
    {
      $set: {status:'false'},
    },
    function (err, responses) {
      if (err) {
        console.log(err);
      }
    }
  );
    if(membershipUpdate && userUpdate){
      return 1;
    }


  
  }
  

async function getReleventType(data) {
 
return await Instructor.find({typeName:data});

}


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
  const email = userRole[0].email;

  //switch cases to find relevent data
  switch (role) {
    case "Admin":
      return await User.find({email:email});
      break;
    case "User":
      return await Employee.find({email:email});
      break;
    case "Supplier":
      return await Supplier.find({email:email});
      break;
    case "Customer":
      return await Customers.find({email:email});
      break;
    case "Membership":
      return await Membership.find({email:email});
      break;
    case "Instructor":
      return await Instructor.find({email:email});
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
 
  var _findDuplicates =await ScheduleType.findOne({type:body.type});
 
  if(_findDuplicates  == undefined){
    const scheduleType = new ScheduleType(body);
    await scheduleType.save();
    return {errorMessage:'ScheduleType Create success', errorStatus:false}
  }else{
    return {errorMessage:'Type is Already Inserted', errorStatus:true}
  }
  
}

async function updateById(data) {
 

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
    role:'Member',
    membershipStatus: false,
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
  let errorArray =[];
  let memberhipMessage = ['memberhipMessage'];
  let membershipChanged =['memberhipRoleChanged'];
  errorArray.length =0;
  const UserData = body.UserDatabody;
  const membershipData = body.membershipbody;
  //check whether the userId is Available
  /////////nAtethuhuh
  //console.log(body);
  var checkUserId = await Membership.findOne({$and:[{customerID:membershipData.customerID ,membershipExpire:false}]},function(err, result){
    // console.log(result);
  });



 // return;
 if(checkUserId){
   //check that user already send a Membership request
  await Membership.findOne({customerID:membershipData.customerID}, {$and:[{role:'Member'} , {AcceptedRejectedStatus:'Pending'}]}
  ,function(error ,res){
    if(res!==null){
    //  console.log('Membership thiyenwa');
      memberhipMessage.push('Memberhip request already sended🙎‍♂')
     //throw (memberhipMessage);
    }
 })
     //check the membership Role Changed
     await Membership.findOne({$and:[{customerID:membershipData.customerID ,role:'Membership'}]  } ,function(err, res){
      if(res!==null){
       // console.log('ds')
        membershipChanged.push('Cannot submit,You are now membership please login again😊.')
      }
    })
 if(membershipChanged.length ==2){
  return (membershipChanged);
 }
 if(memberhipMessage.length == 2){
  // console.log('membership message')
      return (memberhipMessage);
 }
 }else{
  console.log(membershipData.phonenumber)
  //check the email of the membership
  await Membership.findOne({ email: UserData.email },function(error , res){
   if(res!=null){
     errorArray.push('email');
   }
 });
 //check the nicNumber of the membership
 await Membership.findOne({ nicNumber: membershipData.nicNumber },function(error , res){
   if(res!=null){
     errorArray.push('Nic Number');
   }
 });
 //return phoe number
 await Membership.findOne({phonenumber: membershipData.phonenumber},function(error , res){
   if(res!=null){
     errorArray.push('Mobile Number')
   }
 })
 
 }
 //create objects
 const membership = new Membership(body.membershipbody);
if(errorArray.length == 0){
  //saveing the data 
  await membership.save();

 //console.log('update wennai yannne');
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
       // console.log(responses);
      }
    }
  );
  return 1;

}else{
  return (errorArray);
}

}

//Insert member to Database
async function savememberData(data) {
 
  let _dupplicateData = [];
  if (await User.findOne({ email: data.email })) {
    // throw 'User name is already existent';
    _dupplicateData.push(data.email);
   
  }
  if (await User.findOne({ nicNumber: data.nicNumber })){
    _dupplicateData.push(data.nicNumber);
  }
  if(_dupplicateData.length > 0 ){
    return {errorStatus:true , array:_dupplicateData}
  }		
  const user = new User(data);
  if (data.password) {
      user.hash = bcrypt.hashSync(data.password, 10);
    }
    await user.save()
  // if (await User.findOne({ email: data.email })) {
  //   return 'Email "' + data.email + '" is already taken';
  // } else if (await User.findOne({ nicNumber: data.nicNumber })) {
  //   return 'NicNumber "' + data.nicNumber + '" is already taken';
  // }
  // const user = new User(data);
  // // hash password
  // if (data.password) {
  //   user.hash = bcrypt.hashSync(data.password, 10);
  // }
  // // save user
  // if (await user.save()) {
  //   return 1;
  // }
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
      if(res!=null){
       
        errorArray.push('email');
      }
    }
    );
    
   // return errorArray;
   await User.findOne({ username: userData.username },
    function(error, res){
      if(res!=null){
    
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
 console.log(body);
  const membership_type = await MembershipType.findOne({
    membershipName: body.membershipName, membershipCatagory: body.membershipCatagory
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
  //console.log(user);

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
        pass: 'QAZ(*&jker":',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
      to: user.email,
      from: "your email",
      subject: "Gym Managment System Reset Your Password",
      text:`HI HI`,
      html:`<!DOCTYPE html>
      <html>
      <head>
      
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Password Reset</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        /**
         * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
         */
        @media screen {
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
          }
      
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
          }
        }
      
        /**
         * Avoid browser level font resizing.
         * 1. Windows Mobile
         * 2. iOS / OSX
         */
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%; /* 1 */
          -webkit-text-size-adjust: 100%; /* 2 */
        }
      
        /**
         * Remove extra space added to tables and cells in Outlook.
         */
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
      
        /**
         * Better fluid images in Internet Explorer.
         */
        img {
          -ms-interpolation-mode: bicubic;
        }
      
        /**
         * Remove blue links for iOS devices.
         */
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
      
        /**
         * Fix centering issues in Android 4.4.
         */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
      
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
      
        /**
         * Collapse table borders to avoid space between cells.
         */
        table {
          border-collapse: collapse !important;
        }
      
        a {
          color: #1a82e2;
        }
      
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
        </style>
      
      </head>
      <body style="background-color: #e9ecef;">
      
        <!-- start preheader -->
        <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
          A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
        </div>
        <!-- end preheader -->
      
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
      
          <!-- start logo -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px;">
                    <a href="https://static.vecteezy.com/system/resources/thumbnails/000/595/983/small/04012019-25.jpg" target="_blank" style="display: inline-block;">
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/000/595/983/small/04012019-25.jpg" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                    </a>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end logo -->
      
          <!-- start hero -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Your Password</h1>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end hero -->
      
          <!-- start copy block -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end copy -->
      
                <!-- start button -->
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                <a href="http://localhost:4200/response-reset-password/${resettoken.resettoken}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Do Something Sweet</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- end button -->
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                    <p style="margin: 0;">
                    
                    <a href="http://localhost:4200/response-reset-password/${resettoken.resettoken}" target="_blank">http://localhost:4200/response-reset-password/${resettoken.resettoken}</a></p>
                  </td>
                </tr>
                <!-- end copy -->
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                    <p style="margin: 0;">Cheers,<br> Gym Admin</p>
                  </td>
                </tr>
                <!-- end copy -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end copy block -->
      
          <!-- start footer -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start permission -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">You received this email because we received a request for password is not correct for your account. If you didn't request password is not correct you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end permission -->
      
                <!-- start unsubscribe -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">To stop receiving these emails, you can ignore at any time.</p>
                    <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
                  </td>
                </tr>
                <!-- end unsubscribe -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end footer -->
      
        </table>
        <!-- end body -->
      
      </body>
      </html>`,// html body



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
 // console.log(name)
  if(name == 'empty'){
    return await Supplier.find({});
  }
  return await Supplier.find({ sup_firstName: { $regex: "^" + data } });
}

async function getCatDataRelevent(id) {
  return await SubCatagory.find({ mainCatgory: id });
}

async function getSuppliers() {
 
  return await Supplier.find({active:true});
}

async function supRegister(data) {

const emailData = data.mailData
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
        supplierArray.cdbacakpush('Nic Number');
      }
    });

    if(supplierArray.length == 0){
      user.hash = bcrypt.hashSync(userData.password, 10);
      await supplier.save();
      await user.save();
        var transporter = nodemailer.createTransport({
          service: "Gmail",
          port: 465,
          auth: {
            user: "manaalex3@gmail.com",
            pass: 'QAZ(*&jker":',
          },
        });
        var mailOptions = {
          to: emailData.mail,
          from: "your email",
          subject: "Gym Managment System UserName and Password",
          text:
            `Hey ,<br/>
                Here is your username and password for login as a supplier<br/>
                username:` +
                userData.mail +
            `<br/>
                password:` +
                userData.password +
            `<br/>
                Thank You<br/>
                Admin Panel`,
        };
        transporter.sendMail(mailOptions, (err, info) => {});
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
  //check nic
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
      
      mailSendMethod('employee' , userParam.email);
       return 1;
        
    }else{
      return (errorArray);
    }
  
}

function mailSendMethod(data ,email){

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



async function getDetailUsers(roleValue) {

  return await User.find({ assignRole: roleValue });
}

async function getGroupNames() {
  //Using Projection
  return await Groups.find({}, { GroupName: 1, _id: 0 });
}

async function loadByID(id) {
 
  return await Groups.findById(id);
}

async function checkEmployeeValidation(userData , phoneNumber){
  let errorArray =[];
  errorArray.length =0;

  await Membership.findOne({ email: UserData.email },function(error , res){
    if(res!=null){
      errorArray.push('email');
    }
  });
  await Membership.findOne({ phonenumber: phoneNumber },function(error , res){
    if(res!=null){
      errorArray.push('PhoneNumber');
    }
  });

  if(errorArray.length == 0){
      return 'ok';
  }else{
    return (errorArray);
  }


}

async function UpdateUserService(newData) {
  
    const userData = newData.userData;
    const employeeData = newData.UserParamUpdate;
    
    const phoneNumber = employeeData.phonenumber
  


 //var checkValidation = checkEmployeeValidation(userData , phoneNumber);

    
    // return;
 const userUpdate = await User.updateOne(
    {
      _id: userData._id,
    },
    {
      $set: userData,
    },
    function (err, responses) {
      if (err) {
        console.log(err);
      }else{
      
      }
    }
  );
    
    if(userUpdate){
    return  await Employee.updateOne(
        {
          _id: employeeData._id,
        },
        {
          $set: employeeData,
        },
        function (err, responses) {
          if (err) {
            console.log(err);
          }else{
            
          }
        }
      );
    }

}

async function groupinsertion(groupData) {
 

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
  // console.log(data)
  let errorArray =[];
  errorArray.length =0;

  const employee = new Employee(data.UserCreationParam);
  const user = new User(data.UserData);

  

  await User.findOne({ email: data.UserData.email },function(error , res){
    if(res!=null){
      errorArray.push('email');
    }
  });

 await User.findOne({ nicNumber: data.UserData.nicNumber },function(error , res){
  if(res!=null){
    errorArray.push('Nic Number');
  }
});
//return phoe number
await Employee.findOne({phonenumber: data.UserCreationParam.phonenumber},function(error , res){
  if(res!=null){
    errorArray.push('Mobile Number')
  }
})

if(errorArray.length == 0){
  var _sendEmailSuccess = sendEmployeeEmail(data.UserData.email);
 
  if(_sendEmailSuccess == false){
    user.hash = bcrypt.hashSync(data.UserData.password, 10);
    await user.save();
    await employee.save();
    return {errorMessage:'User registered done', errorStatus:false}
  }else{
    console.log(_sendEmailSuccess)
    return {errorMessage:'User Register Failed please try agian', errorStatus:true}
  }

}else{
  return {errorMessage:errorArray, errorStatus:true};
}


// //sending the email
//  if(errorArray.length == 0){

// console.log('awa')
//   var _sendEmailSuccess = sendEmployeeEmail(data.UserData.email);
 
// if(_sendEmailSuccess == true){
//   console.log('awasdsdsd')
//   user.hash = bcrypt.hashSync(data.UserData.password, 10);
//   await user.save();
//   await employee.save();
//   return 1;
// }
// return 2
// }else{
//     return (errorArray);
//   }

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
 // console.log(data.username);
  if (await User.findOne({ email: data.email })) {
    // throw 'User name is already existent';
   console.log('Hello world');
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
    return {errorStatus:true , message:"User is not Activated please contact admin department"}
  } else if (!(await User.findOne({ email: email }))) {

    return {errorStatus:true , message:"There is no sufficient user in the system"}
  };
  const user = await User.findOne({ email });
  const userActive = await User.findOne({});
  if (user.active == true) {
    if (user && bcrypt.compareSync(password, user.hash)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
        ...userWithoutHash,
        token,
        errorStatus:false,
      };
    } 
  }
}

//Get data
async function getAll() {
  return await Employee.find({active:true});
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
  // await User.updateOne({ user_id: data.EmpId },{$set:{active:false}}, async function (err, response) {
  //   if (err) {
  //     //console.log('HEllo')
  //     return {
  //       message: JSON.stringify(err),
  //       error: true,
  //     };
  //   } else {
  //     console.log("user done");
  //     await Employee.updateOne({ user_id: data.EmpId },{$set:{active:false}},);
  //     return {
  //       message: "record is updated successfully",
  //       error: false,
  //     };
  //   }
  // });
  await User.updateOne({ user_id: data.EmpId },{$set:{active:false}},function(error , result){
      if(error){
        console.log(error);
      }
  });

  await Employee.updateOne({ id: data.EmpId },{$set:{active:false}},function(error , result){
    if(error){
      console.log(error);
    }else {
      return 1;
    }
});

 


}


 function sendEmployeeEmail(email){


  var checkMail = false;


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
 transporter.sendMail(mailOptions, function(err, info){
  if(err != null){
    console.log('errr')
    console.log(info);
  return false;
  
  }else if(info){
    console.log('err sssdsdr')
    checkMail = true;
  }
  transporter.close();
});
    return checkMail;
}

