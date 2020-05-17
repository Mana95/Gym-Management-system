const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('_helpers/db');

const schema = new Schema({

    user_id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
    },
    role: {
        type: String,
        required: true
    },
    membershipStatus:{
        type: Boolean, 
    },
    endDate:{
        type: Date, 
    },
    nicNumber: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now

    }
});





schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('User', schema);
