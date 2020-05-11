const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({

    exerciseId: {
        type: String,
        required: true,
        unique:true
    },
    exerciseName:{
        type: String,
        required: true,
    
    },
    exerciseFor:{
        type: String,
        required: true,
    
    },
    equipment:{
        type: String,
      
    
    },
    createdBy:{
        type: String,
        required: true,
    
    },
    exerciseStatus:{
        type: Boolean,
        required: true,
    
    },
    benefits:{
        type: String,
        required: true,
    
    },
    guideNote:{
        type: String,
        required: true,
    
    },
    createdDate:{
        type: String,
        required: true,
    
    },
    createdId:{
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now

    } 
});

module.exports = mongoose.model('exercise', schema);
