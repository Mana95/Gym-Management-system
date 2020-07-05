const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    cartTotal: {
        type:Number,
        required :true
    },
    invoiceId:{
        type:String,
        required:true,
    },
    currentUserName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,   
    },
    payingPrice:{
        type:String,
        required:true, 
    },
    paymentDate:{
        type:String,
        required:true, 
    },
    userId:{
        type:String,
        required:true, 
    },
    createdDate: {
        type: Date,
        default: Date.now

    },
    cartId:{
        type:String
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
    ]


});
module.exports = mongoose.model('Cart', schema);