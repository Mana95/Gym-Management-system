const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    orderId:{
        type : String,
        required: true,
        unique: true,
    },
    userId:{
        type : String,
        required: true,
    },
    email:{
        type : String,
        required: true,   
    },
    clientName:{
        type : String,
       
    },
    cashierName:{
        type : String,
    },
    invoicePrinted: {
        type:Boolean
    },
    orderAction: {
        type : Number,
    },
    rejectedReason:{
        type : String,
    },
    orderApprovedName: {
        type : String,
    },
    createdDate: {
        type: Date,
        default: Date.now

    },
    CartValues: [
        {
            id: {
                type:String,
                required :true
            },
            itemId:{
                type:String,
                required :true
            },
            itemName:{
                type:String,
                required :true
            },
            qty:{
                type:Number,
                required :true
            },
            sellingPrice:{
                type:Number,
                required :true
            },
            mainCategory:{
                type:String,
                required :true
            },
            totalPrice:{
                type:Number,
                required :true
            },
            avlableQty:{
                type:Number,
                required :true
            }
        }
    ],
    paymentTotal: {
        type:Number,
        required: true,   
    },
});
module.exports = mongoose.model('myorder', schema);


//My oder action
// Pending - 1;
// Completed -2;
// rejected - 3;
// expired -4;