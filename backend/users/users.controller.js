const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const passwordResetToken =db.passwordResetToken;

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/signUp', signUp);
router.post('/saveMembershiptypeData', saveMembershiptypeData);
router.post('/savemember', savemember);
router.post('/updateStatus' , updateStatus);
router.post('/supplierMail' ,supplierMail);
router.post('/instructor' , instructorSave);
router.post('/saveComment' , saveCommentController);
router.post('/userCreation', userCreation);
router.post('/cusCreation' , cusRegister)
router.post('/supCreation' , supRegister)
router.post('/req-reset-password' , requestMail);
router.post('/valid-password-token' , ValidPasswordToken);
router.post('/insertMembership' , insertMembership);
router.post('/insertMembershipUser', insertMembershipUser);
router.post('/saveScheduleType', saveScheduleType);

router.post('/EmployeeCreation' , EmployeeCreation);
router.post('/updateRole' , updateRole);
router.post('/checkNIC' , checkNIC);

router.get('/validateOldPassword', validateOldPassword_controller);
router.get('/u', getAll);
router.get('/getReleventMembshipStatusData/:email', getReleventMembshipStatusData_controller);
router.get('/groups', getAllGroups);
router.post('/groupCreation', groupCreation);
router.put('/userUpdate', UpdateUser);
router.get('/getId/:id' , getGroupById);
router.get('/groupNames' , getGroupByName);
router.get('/userRoles/:id' , getuserRole);
router.get('/allSuppliers', getSupplierData);
router.get('/subCatGetting/:id' , getReleventCat);
router.get('/findCustomer/:id' , findCustomer);
router.get('/getreleventData/:id' , getreleventSupliers);
router.get('/getreleventCustomerData/:id' , getreleventCustomerData);
router.get('/getAllMembershipType' , getAllMembershipType);
router.get('/pendingMembership' , pendingMembership);
router.get('/getAllSchedule', getAllSchedule);
router.get('/getreleventRoleData/:id', getreleventRoleData);
router.get('/roles', getAllRoles);
router.get('/getReleventMembshipStatusDataPending/:email', getReleventMembshipStatusDataPending_Controller);
router.get('/current', getCurrent);
router.get('/responseAllInstructorData', responseAllInstructorData);
router.get('/getAllMembership' , getAllMembership);
router.get('/userById/:id', getById);
router.get('/loadProfileData/:id' , loadProfileData);
router.get('/getReleventType/:type' , getReleventType);
router.get('/getByIdInstructor/:id', getByIdInstructor);
router.get('/getReleventActivationOfEmployee/:id', getReleventActivationOfEmployee);
router.get('/usersReports', usersReportsDataLoad);
router.get('/item_reports', item_reports_controller);
router.get('/grn_reports', grn_reports_controller);
router.get('/getMembershipById/:id' , getMembershipById_controller)


router.get('/getReleventUserData/:id', getReleventUserData);
router.get('/getCommentData/:id', getCommentDataController);
router.put('/:id', update);
router.get('/loadAllinvoiceData', loadAllinvoiceData_Controller);

router.patch('/deleteSupplierData', deleteSupplierData);
router.patch('/membershipInactive', memerbershipUpdateStatus);
router.patch('/updateinstructor', updateInstructor);
router.patch('/instrucotrInactive', instructorUpdateStatus);
router.patch('/updateSupplierData', updateSupplierData);
router.patch('/updateActiveIncativeStatusMembership', updateActiveIncativeStatusMembership);
router.patch('/patchScheduleType', patchScheduleType_controller);
router.patch('/inActiveScheduleType/:id', inActiveScheduleType_controller);
router.patch('/updateMembership', updateMembership_controller);
router.patch('/changepassword', changepassword_controller);


router.delete('/deleteRecord', _delete);
router.get('/role', getbyrole);
router.post('/d', deleteRecord);
router.post('/new-password' , NewPassword);
router.post('/updateInvoice' , updateInvoice_Controller)

router.post('/saveMembershipReciptDetails' , saveMembershipReciptDetails_controller)
router.post('/updateMembershipCardStatus' , updateMembershipCardStatus_controller)

router.post('/updateMembershipReciptDetails' , updateMembershipReciptDetails_controller)
router.get('/getMembershipTypByCatagory/:cat',getMembershipTypByCatagory_controller);
router.get('/getInvoiceData/:id',getInvoiceData_Controller);
router.get('/checkMembership/:id',checkMembership_Controller);
module.exports = router;


function changepassword_controller(req ,res, next){
    User.findOne({
        user_id:req.body.id
      }, function (err, userEmail, next) {
   
        if (!userEmail) {
          return res
            .status(409)
            .json({ message: 'User does not exist' });
        }
  
         return bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res
              .status(400)
              .json({ message: 'Error hashing password' });
          }
          userEmail.hash = hash;
          userEmail.save(function (err) {
            if (err) {
              return res
                .status(400)
                .json({ message: 'Password can not reset.' });
            }else {
            
              return res
                .status(201)
                .json({ message: 'Password reset successfully' });
            } 
          });
        });
      });
}

function validateOldPassword_controller(req ,res ,next){
    userService.validateOldPassword_service(req.query)
    .then(data => {
        (data.er)? res.status(500).send(data.message):res.status(200).send(data.message);
    })
    .catch(err => next(err));
}

function checkMembership_Controller(req ,res ,next){
    userService.checkMembership_Service(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}


function getMembershipById_controller(req ,res ,next){
    userService.getMembershipById_Service(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function grn_reports_controller(req ,res ,next){
    userService.grn_reports_service(req.query)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}
function item_reports_controller(req ,res ,next){
    userService.item_reports_service(req.query)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}
function inActiveScheduleType_controller(req , res, next){

    userService.inActiveScheduleType_service(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}
function updateMembership_controller(req ,res , next){
    userService.updateMembership_service(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}


function patchScheduleType_controller(req ,res ,next){
    userService.patchScheduleType_service(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}
function getMembershipTypByCatagory_controller(req ,res ,next){
    userService.getMembershipTypByCatagory_service(req.params.cat)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function updateMembershipReciptDetails_controller(req ,res ,next){
    userService.updateMembershipReciptDetails_service(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function getInvoiceData_Controller(req ,res ,next){
    userService.getInvoiceData_service(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}


function updateMembershipCardStatus_controller(req ,res ,next){
    userService.updateMembershipCardStatus_service(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function updateInvoice_Controller (req ,res ,next){
    userService.updateInvoice_Controller_service(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function saveMembershipReciptDetails_controller (req ,res ,next){
    userService.saveMembershipReciptDetails_service(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}


function getReleventMembshipStatusDataPending_Controller (req ,res ,next){
    userService.getReleventMembshipStatusDataPending_service(req.params.email)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}



function getReleventMembshipStatusData_controller (req ,res ,next){
    userService.getReleventMembshipStatusData_service(req.params.email)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function loadAllinvoiceData_Controller (req ,res ,next){
    userService.loadAllinvoiceData_service()
    .then(data => res.json(data))
    .catch(err => next(err)); 
}
function getCommentDataController(req ,res , next){
    userService.getCommentDataController_service(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}



function saveCommentController(req ,res , next){
    userService.saveCommentController_service(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function updateActiveIncativeStatusMembership(req ,res , next){
    userService.updateActiveIncativeStatusMembership_service(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function deleteSupplierData(req ,res , next){
    userService.deleteSupplierDataService(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function updateSupplierData(req ,res , next){ 
   
    userService.updateSupplierDataService(req.body)
    .then(data => res.json(data))
    .catch(err => next(err)); 
}

function getReleventUserData(req ,res , next){ 
   
    userService.getReleventUserData(req.params.id)
    .then((data) => res.json(data))
    .catch(err => next(err)); 
}

function getReleventActivationOfEmployee(req ,res , next){   
    userService.getReleventActivationOfEmployee(req.params.id)
    .then((data) => res.json(data))
    .catch(err => next(err)); 
}

function updateInstructor(req ,res , next){
   
    userService.updateInstructor(req.body)
    .then((data) => res.json(data))
    .catch(err => next(err)); 
}


function getByIdInstructor(req ,res , next){
    userService.getByIdInstructorDetails(req.params.id)
    .then((data) => res.json(data))
    .catch(err => next(err)); 
}


function instructorUpdateStatus(req ,res , next){
    userService.instrucotrInactive(req.body)
    .then((data) => res.json(data))
    .catch(err => next(err)); 
}


function usersReportsDataLoad(req ,res , next){

    userService.getUsersReports(req.query)
    .then((data) => res.json(data))
    .catch(err => next(err)); 
}

function memerbershipUpdateStatus(req ,res , next){
    userService.membershipInactive(req.body)
    .then((data) => res.json(data))
    .catch(err => next(err)); 
}


function getReleventType(req ,res , next){
    userService.getReleventType(req.params.type)
    .then((data) => res.json(data))
    .catch(err => next(err)); 
}

function getAllMembership(req ,res ,next){
    userService.getAllMembership()
    .then((data) => res.json(data))
    .catch(err => next(err));
}

 function checkNIC(req ,res ,next){
    const numberId = req.body;
   
    userService.checktheNICNumber(numberId)
    .then((data) => res.json(data))
    .catch(err => next(err));
}

function responseAllInstructorData(req ,res,next){
    userService.responseAllInstructorData()
    .then((data) => res.json(data))
    .catch(err => next(err));
}


async function loadProfileData(req ,res ,next){
    userService.loadProfileData(req.params.id)
    .then((data) => res.json(data))
    .catch(err => next(err));
}

async function saveMembershiptypeData(req ,res ,next) {
    userService.insertMembershipType(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

async function findCustomer(req ,res ,next){
 //   console.log(req.params.id);
    userService.findCustomer(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => next(err));
}

async function ValidPasswordToken(req, res) {
    //console.log('ValidaPasswordTokern')
    if (!req.body.resettoken) {
    return res
    .status(500)
    .json({ message: 'Token is required' });
    }
    const user = await passwordResetToken.findOne({
    resettoken: req.body.resettoken
    });
    console.log(user)
    if (!user) {
    return res
    .status(409)
    .json({ message: 'Invalid URL' });
    }


    User.updateOne({ _id: user._userId },{ $set: {_id: user._userId}})
    .then(() => {
    res.status(200)
    .json({
         message: 'Token verified successfully.' 
        });
    }).catch((err) => {
    return res.status(500).send({ msg: err.message });
    });
}

async function NewPassword(req, res) {
    passwordResetToken.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
      if (!userToken) {
        return res
          .status(409)
          .json({ message: 'Token has expired' });
      }

      User.findOne({
        _id: userToken._userId
      }, function (err, userEmail, next) {
         // console.log(userEmail)
        if (!userEmail) {
          return res
            .status(409)
            .json({ message: 'User does not exist' });
        }

         return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            return res
              .status(400)
              .json({ message: 'Error hashing password' });
          }
          userEmail.hash = hash;
          userEmail.save(function (err) {
            if (err) {
              return res
                .status(400)
                .json({ message: 'Password can not reset.' });
            } else {
              userToken.remove();
              return res
                .status(201)
                .json({ message: 'Password reset successfully' });
            }

          });
        });
      });

    })
}

// function loadSchedule(req ,res ,next) {
//     userService.loadSchedule()
//     .then(membership => res.json(membership))
//     .catch(err => next(err));
// }




function savemember(req ,res ,next){
    //console.log(req.body)
    userService.savememberData(req.body)
   .then(user =>{
            if(user != undefined && user.errorStatus !=undefined && user.errorStatus ==true){
                res.status(500).send({
                    message: user
                })
        }else{
            res.json(user)  
        }
    })
        .catch(err => next(err));
}


function updateRole(req ,res ,next){
    userService.updateRole(req.body)
    .then(role => res.json(role))
    .catch(err => next(err));
}

function getreleventRoleData(req ,res,next){
    userService.getreleventRoleData(req.params.id)
    .then(membership => res.json(membership))
    .catch(err => next(err));
}

function getAllSchedule(req ,res,next){
    userService.getAllSchedule()
    .then(membership => res.json(membership))
    .catch(err => next(err));
}

 function saveScheduleType (req , res, next )
{
    userService.savescheduleType(req.body)
    .then(user =>{
        if(user != undefined && user.errorStatus !=undefined && user.errorStatus ==true){
            res.status(500).send({
                message: user
            })
        }else{
            res.json(user)
        }
    }
    )
    .catch(err => next(err));
}
    function updateStatus(req ,res, next){
        userService.updateById(req.body)
        .then(membership => res.json(membership))
        .catch(err => next(err));
    }


    function pendingMembership(req ,res ,next){
        userService.GetByPending(req.body)
        .then(membership => res.json(membership))
        .catch(err => next(err));
    }


 function insertMembershipUser(req,res,next){
    userService.insertMembershipToUser(req.body)
    .then(membership => res.json(membership))
    .catch(err => next(err));
 }   

 function insertMembership(req ,res ,next){
   
    // console.log(req.body.membershipbody);
    userService.insertMembership(req.body)
    .then(membership => res.json(membership))
    .catch(err => next(err));
 }

function getAllMembershipType(req ,res ,next){
    userService.getMembershiptype()
    .then(email => res.json(email))
    .catch(err => next(err));
}

function supplierMail(req ,res, next){
    //console.log(req.body)
    userService.loginMail(req.body)
    .then(email => res.json(email))
    .catch(err => next(err));
}

function requestMail(req ,res, next){
   
    userService.ResetPassword(req.body)
    .then(email => res.json(email))
    .catch(err => next(err));

}
function getreleventCustomerData(req , res, next){
    let data = req.params.id;
    //console.log(data)
    userService.getreleventCustomer(data)
    .then(cus => res.json(cus))
    .catch(err => next(err));
}

function getreleventSupliers(req, res, next) {
    let data = req.params.id;
    //console.log(data)
    userService.getreleventSupliers(data)
    .then(sup => res.json(sup))
    .catch(err => next(err));
}




function getReleventCat(req ,res ,next){
    userService.getCatDataRelevent(req.params.id)
    .then(sup => res.json(sup))
    .catch(err => next(err));

}
function getSupplierData(req ,res ,nex) {
    userService.getSuppliers()
    .then(sup => res.json(sup))
    .catch(err => next(err));
}

function supRegister(req ,res ,next) {
    userService.supRegister(req.body)
    .then(sup => res.json(sup))
    .catch(err => next(err));
}



function cusRegister(req ,res ,next){
    //console.log(req.body);
    let cusData = req.body;
    userService.cusRegister(cusData)
    .then(customer => res.json(customer))
    .catch(err => next(err));
}



function getuserRole(req,res, next) {
    //console.log("contorller" + req.params.id)
    let roleValue = req.params.id
    userService.getDetailUsers(roleValue)
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getGroupByName(req, res, next){
    //console.log(res.body)
    userService.getGroupNames()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getGroupById (req,res,next){
   // console.log("Controller:" +req.params.id)
    userService.loadByID(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

}


function UpdateUser(req, res, next){     
    userService.UpdateUserService(req.body)
     .then(user => res.json(user))
    .catch(err => next(err));
}

function deleteRecord(req,res,next){

  //  console.log(req.method);
    //console.log(req.body);

    userService.delete(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
    
   
}


function groupCreation(req,res,next){
   // console.log(req.body);
    userService.groupinsertion(req.body)
    .then(users => res.json- (users))
    .catch(err => next(err));
}

function getAllRoles(req,res,next){
    userService.getRoles()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getAllGroups(req, res , next){
    //console.log("hey there");
    userService.getGroups()
    .then(users => res.json(users))
    .catch(err => next(err));
}
function EmployeeCreation(req ,res ,next){
    userService.EmployeeCreation(req.body)
    .then(user =>{
        if(user != undefined && user.errorStatus !=undefined && user.errorStatus ==true){
            res.status(500).send({
                message: user
            })
        }else{
            res.json(user)
        }
    }
    )
    .catch(err => next(err));
}

function instructorSave(req , res ,next){
    userService.instructorSave(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));

}
   // res.status(200).json({data});

function userCreation (req, res , next) {
    //console.log(req.body);
    userService.creationUser(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function signUp(req, res, next){
    let currentUser = req.body.firstName
   // console.log('SIGNUp'+ currentUser);
    userService.signUpUser(req.body)
        .then(user =>{
            if(user){
                console.log('USER')
                console.log(user)
                res.json(user)
              
            }
        }
        )
        .catch(err => next(err));
}

function authenticate(req, res, next) {
   // console.log(req.body)
      
    userService.authenticate(req.body)
        .then(user => {
            
            if(user != undefined && user.errorStatus !=undefined && user.errorStatus ==true){
                res.status(500).send({
                    message: user
                })
            }else if(user == undefined){
                res.status(500).send({
                    message :{message: 'The password you entered is incorrect',
                    errorStatus:true}  
                });
            }else{
                res.json(user)
            }
          
            // res.json(user)

        })
        .catch(err => next(err));
}

function register(req, res, next) {

    //console.log(req.body);
    userService.create(req.body)
        .then((user) => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
//get by role 2019-9-11
function getbyrole(req, res, next) {
    userService.getAll(req.role.sub)
        .then(role => role ? res.json(role) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
   // console.log("getByid method in controller" + req.params.id)
    
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    //console.log(req.body)
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
        
}