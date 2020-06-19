const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    id: {
        type: String,
      
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    
    age:{
        type: String,
      
    },
    description:{
        type: String,
      
    },
    nicNumber:{
        type: String,
        required: true
    },
    birth:{
        type: String,
        required: true
    },
    image:{
        type:String
    },
    imagePath:{
        
        type: String
       
    },
    gender:{
        type: String
    },
    phonenumber:{
        type: String,
        required: true
    },
    Emergency:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true 
    },
    active: {
        type: Boolean,
    },
   
    role: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now

    }  
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('employee', schema);