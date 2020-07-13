const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const schema = new Schema({
    itemId : {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required:true
    },
    comment: {
        type:String,
        required:true
    },
    createDate: {
        type:String
    },
    createdTime: {
        type:String
    },
    email:{
        type:String
    }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('comment', schema);
