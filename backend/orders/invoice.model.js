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
    },
    paymentrecipt: {
        type : String,
    },
    invoicePrinted: {
        type:Boolean
    },
    invoiceDetails: {
        type : String,
    },
    rejectedReason:{
        type : String,
    }

});
module.exports = mongoose.model('invoice', schema);