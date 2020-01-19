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
        required: true,
    },
    description:{
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now

    } 
});

//schema.set('toJSON', { virtuals: true });
schema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('newschedule', schema);
