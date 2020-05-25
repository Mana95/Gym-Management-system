const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    cartTotal: {
        type:Number,
        required :true
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