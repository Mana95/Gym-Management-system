const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    invoiceId:{
        type : String,
        required: true,
        unique: true,
    },
    userId:{
        type : String,
        required: true,
   
    },
    orderId:{
        type : String,
    },
    invoiceType:{
        type : String,
        required: true,
    },
    email:{
        type : String,
        required: true,   
    },
    orderAction: {
        type : Number,
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
    },
    membershipId: {
        type : String,
    },
    createdDate: {
        type: Date,
        default: Date.now

    },

});
module.exports = mongoose.model('invoice', schema);