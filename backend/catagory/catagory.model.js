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

    description: {
        type:String,
       
    },
})

//creates collection called Job
module.exports = mongoose.model('main_catagory', schema);
