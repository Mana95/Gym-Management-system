const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    membershipId: {
        type: String,
        required: true,
        unique:true
    },
    customerID: {
        type: String,
        required: true,
        unique:true
   
    },
    membershipCount:{
        type:Number
    },
    email: {

        type: String,
        required: true,
    },
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
      
    },
    phonenumber: {
        type: String,
        required: true
    },
    phonenumber1: {
        type: String,
    },
    Height:{
        type:Number,
        required:true
    },
    
    gender: {
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    disaster: {
        type:String,
        required:true,  
    },
    Weight:{
        type:Number,
        required:true
    },
    birth:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
  
    currnetJoinDate: {
        type: String,
        required: true
    },
    typeName: {
        type: String,
        required: true
    },
    noteDisaster: {
        type:String
    },
    amount: {
        type: Number,
        required: true
    },
    VMonth: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    AcceptedRejectedStatus:{
       type:String, 
    },
    status: {
        type: String,
        required: true
    },
    BMI: {
        type:Number,
    },
    nicNumber: {
        type:String,
        required:true,
        
    },
    role: {
        type:String,
        required:true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },

    payingPrice:{
        type:Number, 
    },

    balancePrice:{
        type:Number, 
    },
    membershipCountTimes:{
        type:Number,  
    },
    paymentStatus: {
        type:Boolean
    },
    paymentDetails: {
        type:String
    },
    rejectedReason:{
        type:String
    },
    invoiceId:{
        type:String    
    },
    Membership:{
        type:Boolean       
    },
    membershipExpire:{
        type:Boolean
    }


});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('membership', schema);