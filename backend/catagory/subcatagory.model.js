const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    id:{
        type : String,
        required: true,
        unique: true,
    },
    sub_cat_name: {
        type: String,
        required:true
    },
    mainCatgory: {
        type: String,
        required:true
    },

    description: {
        type:String,
       
    },
})

//creates collection called Job
module.exports = mongoose.model('submain_catagory', schema);
