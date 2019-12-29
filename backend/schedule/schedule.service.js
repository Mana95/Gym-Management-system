const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');


const ScheduleType =db.ScheduleType;
const Schedule = db.Schedule;

module.exports = {
  
    getByName,
    insertSchData,
    getByMySchedule
    
};

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