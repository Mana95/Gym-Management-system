const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: {
        type: String,
      
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    firstName: {

        type: String,
        required: true

    },
    username: {
        type:String,
        required:true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
    },
    //Add the role for the user.model.js
    role: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now

    },
    //create a field email
    email: {
        type: String,
        required: true
    }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);