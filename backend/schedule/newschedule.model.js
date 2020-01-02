const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    id: {
        type: String,
        required: true,
        unique:true
    },
    membershipId:{
        type: String,
        required: true,
        unique:true
    },
    type:{
        type: String,
        required: true,
    },
    createStatus:{
        type: Boolean,
        required: true,
    },
    rejectStatus:{
        type: Boolean,
    },
    acceptStatus:{
        type: Boolean,
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


schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('newschedule', schema);
