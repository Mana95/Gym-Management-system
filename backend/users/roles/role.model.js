const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const schema = new Schema({
    roleID : {
        type: String,
        unique: true,
        required: true
    },
    roleName: {
        type: String,
        required:true
    },
    description: {
        type:String,
        required:true
    }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Role', schema);
