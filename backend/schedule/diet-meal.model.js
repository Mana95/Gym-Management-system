const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const schema = new Schema({
    dietPlanId:{
        unique:true,
        required:true,
        type:String
    },
    membershipId:{
        required:true,
        type:String 
    },
    ScheduleId:{
        required:true,
        type:String 
    },
    dietPlanName:{
        required:true,
        type:String 
    },
    memberName:{
        required:true,
        type:String 
    },
    CreatedName:{
        required:true,
        type:String 
    },
    createdContact:{
        required:true,
        type:Number 
    },
    dietPlanNote:{
       
        type:String 
    },
intervalNames:[{
    intervalName:{
        required:true,
        type:String 
    },
    intervalItemArray:[{
        foodItemName:{
            required:true,
            type:String
        },
        quantity:{
            required:true,
            type:String
        } ,
        mearurmentUnit:{
        
            type:String
        }   
    }]}
]

})

//schema.set('toJSON', { virtuals: true });
// schema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('dietMeal', schema);