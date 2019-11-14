const express = require('express');
const router = express.Router();
const insertRoleServices = require('./role.service');


//route to the path by exporting the routers
module.exports = router;

//routes

router.post('/roleCreation', insertRole);


function insertRole(req, res , next) {
    console.log(req.body);
    insertRoleServices.roleCreation(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));

   
    



}