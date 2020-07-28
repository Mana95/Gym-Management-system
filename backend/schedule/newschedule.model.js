const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const schema = new Schema({

    Sid: {
        type: String,
        required: true,
        unique:true
    },
    membershipId:{
        type: String,
        required: true,
    
    },
    instructorId:{
        type: String,
    },
    dietPlan:{
        type:Boolean
      },
    type:{
        type: String,
        required: true,
    },
    status:{
        type: Number,
        required: true,
    },
    date:{
        type: String,
      
    },
    dietPlan:{
        type: Boolean,
        required: true,
    },
    description:{
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now

    },
    ScheduleAccptedRejected:{
        type: String,
    } ,
    userId: {
        type:String
    },
    scheduleActive:{
        type:Boolean
    }, 
    scheduleRejectedReason:{
        type:String
    },
    createdInstructorId: {
        type:String
    },
    createrName: {
        type:String
    },
    scheduleOwner : {
        type:String
    },
    scheduleOwnerEmail: {
        type:String
    }

});

//schema.set('toJSON', { virtuals: true });
schema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('newschedule', schema);
