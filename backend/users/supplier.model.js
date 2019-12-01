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

    sup_description: {
        type:String,
        required:true
    },

    sup_age: {
        type:String,
        required:true
    },
    sup_address: {
        type:String,
        required:true
    },
    sup_phonenumber: {
        type:String,
        required:true
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
