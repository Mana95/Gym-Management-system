const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');


const ScheduleType =db.ScheduleType;
const Schedule = db.Schedule;
const Membership = db.Membership;
const Instructor = db.Instructor;

module.exports = {
  
    getByName,
    insertSchData,
    getByMySchedule,
    PendingSchedule,
    updateRecord,
    RejectRecord,
    getAcceptedSchedule,
    loadById,
    loadInstrucotrData
    
};

async function loadInstrucotrData(id){
    return await Instructor.find({isId:id})
}

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
            _id: data._id
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
            _id: data._id
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
    const schdulefind = await Schedule.findOne({membershipId:data.membershipId , createStatus: false})
if(!schdulefind){
    const schedule = new Schedule(data);  
    await schedule.save();
    return 1;
}else{
        return 3;
    
}
const schedule = new Schedule(data);  
    await schedule.save();

}

async function getByName(){
    return await ScheduleType.find({});
}