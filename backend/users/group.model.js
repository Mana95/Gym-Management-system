const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const schema = new Schema({
    GroupId : {
        type: String,
        unique: true,
        required: true
    },
    GroupName: {
        type: String,
        required:true
    },
    description: {
        type:String,
        required:true
    }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Group', schema);
