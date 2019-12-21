const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    membership_type_id: {
        type: String,
        required: true
    },
    typeName: {

        type: String,
        required: true

    },
    note: {
        type: String,
        required: true
    },
    years: {
        type: String,
      
    },
    month: {
        type: String,
        
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
    },
    createdDate: {
        type: Date,
        default: Date.now

    }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('membershiptype', schema);