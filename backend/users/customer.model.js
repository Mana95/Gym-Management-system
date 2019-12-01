const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const schema = new Schema({
    id : {
        type: String,
        unique: true,
        required: true
    },
    user_id:{
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phonenumber: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type:String
    }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('customers', schema);
