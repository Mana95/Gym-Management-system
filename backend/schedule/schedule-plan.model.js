const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({

        id:{
            unique:true,
            required:true,
            type:String
        }, 
        ScheduleId: {
          required:true,
          type:String 
        },
        type:{
            required:true,
            type:String 
        },
        scheduleCategoryType:{
          required:true,
          type:String 
        },
        membershipId:{
            required:true,
            type:String 
        },
        date:{
            required:true,
            type:String   
        },
        memberName:{
            required:true,
            type:String 
        }, 
        height: {
            type: Number,
            required: true
          },
          weight: {
            type: Number,
            required: true
          },
          gender: {
            type: String,
            required: true
          },
          instructorName: {
            type: String,
            required: true
          },
          contact: {
            type: Number,
            required: true
          },
          endDate: {
            type: String,
            required: true
          },
          nameOfSchedule: {
            type: String,
            required: true
          },
          validMonthDay: {
            type: Number,
            required: true
          },
          BMi:{
              type:Number
          },
          changeStatus:{
            type: String,
          },
          normal:[{
            normalExerciseName: {
                type: String,
              
            },
            normalExerciseRepetition:{
                type: String,
                
            },
            normalExerciseRounds:{
                type: String,
                
            }
          }],
          tickets:[{
            normalExerciseName: {
              type: String,
            
          },
          normalExerciseRepetition:{
              type: String,
              
          },
          normalExerciseRounds:{
              type: String,
            }
          }
          ],
          tuesday:[{
            normalExerciseName:{
                type: String,
              
            },
            normalExerciseRepetition:{
                type: String,
                
            },
            normalExerciseRounds:{
                type: String,
                
            }
          }],
          wednesday:[{
            normalExerciseName: {
              type: String,
            
          },
          normalExerciseRepetition:{
              type: String,
              
          },
          normalExerciseRounds:{
              type: String,
                
            }
          }],
          thursday:[{
            normalExerciseName: {
              type: String,
            
          },
          normalExerciseRepetition:{
              type: String,
              
          },
          normalExerciseRounds:{
              type: String,
               
            }
          }],
          friday:[{
            normalExerciseName: {
              type: String,
            
          },
          normalExerciseRepetition:{
              type: String,
              
          },
          normalExerciseRounds:{
              type: String,
            }
          }],
          satarday:[{
            normalExerciseName: {
              type: String,
            
          },
          normalExerciseRepetition:{
              type: String,
              
          },
          normalExerciseRounds:{
              type: String,
               
            }  
          }],
          sunday:[{
            normalExerciseName: {
              type: String,
            
          },
          normalExerciseRepetition:{
              type: String,
              
          },
          normalExerciseRounds:{
              type: String,
            } 
          }], 
        createdDate: {
            type: Date,
            default: Date.now  
        }
})


//schema.set('toJSON', { virtuals: true });
// schema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('schedule-plan', schema);