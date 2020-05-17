const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const schema = new Schema({
    sup_id : {
        type: String,
        unique: true,
        required: true
    },
    sup_firstName: {
        type: String,
        required:true
    },
    sup_lastName: {
        type:String,
        required:true
    },

    sup_company: {
        type:String,
        required:true
    },
    sup_category:{
        type:String,
        required:true
    },
    sup_nicNumber: {
        type:String,
        required:true
    },
    sup_address: {
        type:String,
        required:true
    },
    
    sup_phonenumber: {
        type:Number,
        required:true
    },
    sup_phonenumber1: {
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    role:{
        type:String
    },
    sup_email: {
        type:String,
        required:true
    },
    sup_description: {
        type:String
    }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('suppliers', schema);
