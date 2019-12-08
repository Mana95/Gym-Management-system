const express = require('express');
const router = express.Router();
const userService = require('./user.service');


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/signUp', signUp);

router.post('/userCreation', userCreation);
router.post('/cusCreation' , cusRegister)
router.post('/supCreation' , supRegister)

router.get('/u', getAll);
router.get('/groups', getAllGroups);
router.post('/groupCreation', groupCreation);
router.post('/userUpdate', UpdateUser);
router.get('/getId/:id' , getGroupById);
router.get('/groupNames' , getGroupByName);
router.get('/userRoles/:id' , getuserRole);
router.get('/allCustomers' , getCustomersData);
router.get('/allSuppliers', getSupplierData);
router.get('/subCatGetting/:id' , getReleventCat);
router.get('/getreleventData/:id' , getreleventSupliers);




router.get('/roles', getAllRoles);
router.get('/current', getCurrent);
router.get('/userById/:id', getById);
router.put('/:id', update);
router.delete('/deleteRecord', _delete);
router.get('/role', getbyrole);
router.delete('/d/:id', deleteRecord);


module.exports = router;


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

function getCustomersData(req, res, next){
userService.getCustomerData()
.then(customer => res.json(customer))
.catch(err => next(err));
}

function cusRegister(req ,res ,next){
    console.log(req.body);
    let cusData = req.body;
    userService.cusRegister(cusData)
    .then(customer => res.json(customer))
    .catch(err => next(err));
}



function getuserRole(req,res, next) {
    console.log("contorller" + req.params.id)
    let roleValue = req.params.id
    userService.getDetailUsers(roleValue)
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getGroupByName(req, res, next){
    console.log(res.body)
    userService.getGroupNames()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getGroupById (req,res,next){
    console.log("Controller:" +req.params.id)
    userService.loadByID(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

}


function UpdateUser(req, res, next){
    console.log("Controller:" + JSON.stringify(req.body));
    userService.UpdateUserService(req.body)
     .then(() => res.json({}))
    .catch(err => next(err));
}

function deleteRecord(req,res,next){

    console.log(req.method);
    console.log(req.params.id);

    userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
    
   
}


function groupCreation(req,res,next){
    console.log(req.body);
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
    console.log("hey there");
    userService.getGroups()
    .then(users => res.json(users))
    .catch(err => next(err));
}
function userCreation (req, res , next) {
    console.log(req.body);
    userService.creationUser(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function signUp(req, res, next){
    let currentUser = req.body.firstName
    console.log('SIGNUp'+ currentUser);
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
    console.log(req.body)
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {

    console.log(req.body);
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
    console.log("getByid method in controller" + req.params.id)
    
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
    console.log(req.body)
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
        
}