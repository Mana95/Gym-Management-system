const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({

        id:{
            unique:true,
            required:true,
            type:String
        }, 
        type:{
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
          validMonth: {
            type: Number,
            required: true
          },
          BMi:{
              type:Number
          },
          beginner:[{
            b_name: {
                type: String,
              
            },
            b_title:{
                type: String,
                
            },
            b_empType:{
                type: String,
                
            }
          }],
          tickets:[{
            name:{
                type: String,
               
            },
            title:{
                type: String,
              
            },
            empType:{
                type: String,
               
            }
          }
          ],
          tuesday:[{
            t_name:{
                type: String,
              
            },
            t_title:{
                type: String,
                
            },
            t_empType:{
                type: String,
                
            }
          }],
          wednesday:[{
            w_name:{
                type: String,
                 
            },
            w_title:{
                type: String,
                
            },
            w_empType:{
                type: String,
                
            }
          }],
          thursday:[{
            t_name:{
                type: String,
                  
            },
            t_title:{
                type: String,
                
            },
            t_empType:{
                type: String,
               
            }
          }],
          friday:[{
            f_name:{
                type: String,
              
            },
            f_title:{
                type: String,
              
            },
            f_empType:{
                type: String,
              
            }
          }],
          satarday:[{
            s_name:{
                type: String,
                 
            },
            s_title:{
                type: String,
              
            },
            s_empType:{
                type: String,
               
            }  
          }],
          sunday:[{
            sun_name:{
                type: String,
               
            },
            sun_title:{
                type: String,
                
            },
            sun_empType:{
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