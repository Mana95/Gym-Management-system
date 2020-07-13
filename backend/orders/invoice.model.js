const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    invoiceId:{
        type : String,
        required: true,
        unique: true,
    },
    transactionId:{
        type : String,
        required: true,
        unique: true,
    },
    userId:{
        type : String,
        required: true,
   
    },
    invoiceType:{
        type : String,
        required: true,
    },
    email:{
        type : String,
        required: true,   
    },
    paymentTotal: {
        type:Number,
        required: true,   
    }
});
module.exports = mongoose.model('invoice', schema);