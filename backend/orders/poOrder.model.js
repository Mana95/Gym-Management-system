const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    purchaseOrderId : {
        type : String,
        required: true,
        unique: true,
    },
    supplierId:{
        type : String,
        required: true,
    },
    supllierFirstName:{
        type: String,
        required:true
    },
    supplierLastName:{
        type: String,
        required:true
    },
    time: {
        type: String,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now

    },
    
    status: {
        type: String,
        required:true
    },
    currentUser:{
        type: String,
        required:true
    },
    categoryName:{
        type: String,
        required:true
    },
    ItemDataValues: [{
        itemId :{
            type : String,
            required: true,
        },
        itemName:{
            type: String,
            required:true
        },
        qty:{
            type: Number,
            required:true
        },
        status: {
            type: String,
            required:true
        }
    }],
    totalAmount :{
        type:Number
    }

});
module.exports = mongoose.model('purchaseOrder', schema);