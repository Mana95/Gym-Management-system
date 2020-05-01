const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    membership_type_id: {
        type: String,
        required: true,
    },
    membershipName: {
        type: String,
        required: true,
    },
    membershipCatagory: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    periodType: {
        type: String,
        required: true,
    },
    YMDValue: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    status: {
        type:Boolean
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("membershiptype", schema);
