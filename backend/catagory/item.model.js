const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    id:{
        type : String,
        required: true,
        unique: true,
    },
    cat_name: {
        type: String,
        required:true
    },
    item_name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    sub_cat: {
        type: String,
        required:true
    },
    quantity: {
        type:Number,
        required:true
       
    },
})

//creates collection called Job
module.exports = mongoose.model('item', schema);
