const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');


const ScheduleType =db.ScheduleType;
const Schedule = db.Schedule;
const Membership = db.Membership

module.exports = {
  
    getByName,
    insertSchData,
    getByMySchedule,
    PendingSchedule,
    updateRecord,
    RejectRecord,
    getAcceptedSchedule,
    loadById
    
};

async function loadById(id){
     console.log('id')
    console.log(id);
    return await Membership.find({membershipId:id})
}


async function getAcceptedSchedule() {
    return await Schedule.find({acceptStatus:true})
}


async function RejectRecord(data){
    Schedule.updateOne(
        {
            _id: data.id
        },
        {
            $set: data
        }, function (err, responses) {
            if (err) {
                console.log(err);
            }
        });
}




async function updateRecord(data){
    Schedule.updateOne(
        {
            _id: data.id
        },
        {
            $set: data
        }, function (err, responses) {
            if (err) {
                console.log(err);
            }
        });
}

async function PendingSchedule() {
    return await Schedule.find({acceptStatus:false})
}

async function getByMySchedule(id){
    return await Schedule.find({membershipId:id})
}

async function insertSchData(data){
    const schedule = new Schedule(data);  
    await schedule.save();
}

async function getByName(){
    return await ScheduleType.find({});
}