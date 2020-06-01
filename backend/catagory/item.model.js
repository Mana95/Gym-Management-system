const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);





const stockItemSchema = new Schema({
    itemId:{
        type:String,
       
    },
    stockId:{
        type:String,
       
    }
})
const schema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true,
    },
    cat_name: {
        type: String,
        required: true
    },
    Importered_Country: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    itemCreatedName: {
        type: String,
    },
    item_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    sub_cat: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
    selling_price:{
        type: Number,
    },
    createdDate: {
        type: Date,
        default: Date.now

    },
    itemStatus:{
        type:Boolean,
    },
    quantity: {
        type: Number,
    },
    unitPrice:{
        type: Number,
    },
    stockAvlStatus:{
        type:Boolean,
        default:false
    },
    stock: [{
        stockId: {
            type: String,
            required: true,
            unique: true,
        },
        itemId:{
            type: String,
            required: true
        },
        itemName: {
            type: String,
            required: true
        },
       
         buying_price: {
            type: Number,
            required: true
        },
        supplierID:{
            type: String,
            required: true
        },
        purchaseOrderId:{
            type: String
        },
        qty:{
            type: Number
        },
        grnId:{
            type: String
        }
    }],

    stockItem:[stockItemSchema]

});

schema.set('toJSON', { virtuals: true,timestamp:true });
stockItemSchema.plugin(AutoIncrement, {inc_field: 'ISID'});
module.exports = mongoose.model('ItemData', schema);