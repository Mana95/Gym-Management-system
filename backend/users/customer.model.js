const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const schema = new Schema({
    id : {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required:true
    },
    nicNumber: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true
    },
    gender:{
        type:String,    
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
    address2:{
        type:String
    },
    active:{
        type:Boolean
    }
   

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('customers', schema);
