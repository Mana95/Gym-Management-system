const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    id : {
        type : String,
        required: true,
        unique: true,
    },
    purchaseOrderId: {
        type:String,
        required:true
    },
    supplierId:{
        type : String,
        required: true,
    },
    supplierName:{
        type: String,
        required:true
    },
    supplierAdress:{
        type: String,
        required:true
    },
    purchaseOrderDate: {
        type: Date,
        required:true
    },
    date : {
        type: Date,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now

    },
    grnStatus: {
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
    note:{
        type: String
    },
    ItemGrnTable: [{
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
        },
        buyingPrice: {
            type: Number,
            required:true
        }
    }]

});
module.exports = mongoose.model('grn', schema);