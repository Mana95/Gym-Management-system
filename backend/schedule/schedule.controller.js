const express = require('express');
const router = express.Router();
var path = require('path');
var mime = require('mime');
var fs = require('fs');

const scheduleService = require('./schedule.service');

module.exports = router;

router.get('/getAllSchedule' , getAllSchedule);
router.post('/insertData' , insertData);
router.get('/getMySchedule/:id' , getMySchedule);
router.get('/getPendings' , getPendings);
router.post('/updateRecord' , updateRecord);
router.get('/getAcceptedSchedule' , getAcceptedSchedule);
router.post('/RejectRecord' , RejectRecord);
router.post('/createSchedule' , createSchedule);
router.get('/loadById/:id' , loadById);
router.get('/loadInstrucotrData/:id' , loadInstrucotrData);

function createSchedule(req ,res ,next){
    
    scheduleService.createSchedule(req.body)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}
function loadInstrucotrData(req ,res ,next){
    scheduleService.loadInstrucotrData(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function loadById(req,res,next){
    //console.log(req.params.id);
    scheduleService.loadById(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));


}

function getAcceptedSchedule(req,res ,next){
    scheduleService.getAcceptedSchedule()
    .then(sch => res.json(sch))
    .catch(err => next(err));
}



function RejectRecord(req ,res ,next){
    let data = {
        _id:req.body.id,
        rejectStatus:true
    }
    scheduleService.RejectRecord(data)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}
function updateRecord(req ,res , next){
    console.log(req.body)
    let data = {
        _id:req.body._id,
        acceptStatus:true
    }
    scheduleService.updateRecord(data)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function getPendings(req ,res ,next){
    scheduleService.PendingSchedule()
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function getMySchedule(req ,res , next){
    scheduleService.getByMySchedule(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function insertData(req,res, next){
    scheduleService.insertSchData(req.body)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function getAllSchedule(req ,res ,next){
    scheduleService.getByName()
    .then(sch => res.json(sch))
    .catch(err => next(err));
}