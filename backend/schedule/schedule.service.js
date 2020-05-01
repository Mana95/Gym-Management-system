const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const moment = require('moment');

const ScheduleType =db.ScheduleType;
const Schedule = db.Schedule;
const Membership = db.Membership;
const MembershipType = db.MembershipType;
const Instructor = db.Instructor;
const Schedule_Plan = db.Schedule_Plan;
const User = db.User;

module.exports = {
    
    getByName,
    insertSchData,
    getByMySchedule,
    PendingSchedule,
    updateRecord,
    RejectRecord,
    getAcceptedSchedule,
    loadById,
    loadInstrucotrData,
    createSchedule,
    getById,
    loadInstructor,
    checkAvl,
    getmembershipDetais,
    getmembershipcheckEmailAvailable,
    getmembershipcheckUsernameAvailable

};

async function getmembershipcheckUsernameAvailable(username){
   
    const findUsername =  await User.findOne({username: username});
    
   if(findUsername.username == username){
       return 1;
   }else {
       return 'hari';
   } 
}
async function getmembershipcheckEmailAvailable(email){
    
     const findUserEmail =  await User.findOne({email: email});
     console.log(findUserEmail)
    if(findUserEmail.email == email){
        return 1;
    }else {
        return 'hari';
    }

}

async function getmembershipDetais(id){
    return await MembershipType.find({membershipName: id});
}

async function checkAvl(id) {
   //current month
    const currentMonth = moment().format('M');
      
    const getDate = await Schedule.findOne({membershipId:id},
        function(error , responses){
            //getmonth
            const getDate = responses.createdDate;
           const AvlMonth = 1 +getDate.getMonth();
            const totalDate = Number(AvlMonth) + Number(currentMonth);
            console.log(totalDate);
            if(totalDate=>2){
                console.log("Month is greater than 3")
                
            }else {
                console.log('lesthen 3month');
            }

        })

    const checkDate = await Schedule.find({membershipId:id , })
 
}

async function  loadInstructor(id){
    return await Instructor.find({})
}

async function  getById(id){
    return await Schedule_Plan.find({membershipId:id})
}


async function createSchedule(data) {
       let updateData = {
            membershipId: data.membershipId,
            status: 4
        }
    const schedule_Plan = new Schedule_Plan(data);  
    if(await schedule_Plan.save()){
     
        Schedule.updateOne(
            {
                membershipId: updateData.membershipId
            },
            {
                $set: updateData
            }, function (err, responses) {
                if (err) {
                    console.log(err);
                }
            });

    }  




}

async function loadInstrucotrData(id){
    return await Instructor.find({isId:id})
}

async function loadById(id){
    //  console.log('id')
    // console.log(id);
    return await Membership.find({membershipId:id})
}


async function getAcceptedSchedule() {
    const statusUptoDate = await Schedule.find({status:3});

    if(statusUptoDate){
       // console.log('s')
        return await Schedule.find({status:3})
    }else {
        return await Schedule.find({status:2})
    }


  
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
    return await Schedule.find({status:1})
}

async function getByMySchedule(id){
    return await Schedule.find({membershipId:id})
}

async function insertSchData(data){ 
    const schduleFind = await Schedule.findOne({membershipId:data.membershipId , status:1})

    if(!schduleFind){
        console.log('ehama ekak na')
        const schedule = new Schedule(data);  
        await schedule.save();
        return 1;
    }else {
        console.log('ehama ekak thiyenwa')
        return 3;
    }






    // const schdulefind = await Schedule.find({membershipId:data.membershipId , status: 3})
    // const schdulefindId = await Schedule.find({membershipId:data.membershipId});
    // if(schdulefind){
    // console.log('awa')
    // const schedule = new Schedule(data);  
    // await schedule.save();
    // return 1;
    // }else if(!schdulefindId) {
    //     const schedule = new Schedule(data);  
    //     await schedule.save();
    // return 1;
    // }else{
    //     return 3;
    
    // }
// const schedule = new Schedule(data);  
//     await schedule.save();

}

async function getByName(){
    return await ScheduleType.find({});
}