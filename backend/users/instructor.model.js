const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    
        isId: {
            type: String,
            unique: true,
           
        },
        email: {
            type: String,
            unique: true,
            required: true
        },

        firstName:{
            type:String,
          
        },
        lastName:{
            type:String,
            required:true
        },
        username:{
            type:String,
          
        },
        phonenumber:{
            type:Number,
            required:true
        },
        phonenumber1:{
            type:Number,
            required:true
        },
        birth:{
            type:Date,
            required:true
        },
        joinDate:{
            type:Date,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        description:{
            type:String,
           
        },
        typeName:{
            type:String,
           required:true
        },
        nicNumber: {
            type:String,
            required:true 
        },
      
        image:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        active:{
            type:Boolean,
            required:true
        },
        experince:[{
            name:{
                type:String,
               
            },
            title:{
                type:String,
               
            },
            empType:{
                type:String,
              
            },
            startDate:{
                type:String,
                
            },
            endDate:{
                type:String,
                
            },
            experinceMonth:{
                type:Number,
            },
            detail:{
                type:String,
                
            },

        }],
        skils: [{
            skillName:{
                type:String
            }
        }],
        education:[{
            level:{
                type:String
            },
            college:{
                type:String
            },
            passingyear:{
                type:String
            }   
        }]






    


})


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Instructor', schema);