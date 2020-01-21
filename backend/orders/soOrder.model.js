const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    id:{
        type : String,
        required: true,
        unique: true
    },
      customerId:{
          type:String,
          required:true
      },
      customerfirstName:{
        type:String,
        required:true
      },
      customerLastName:{
        type:String,
        required:true
      },
      categoryName:{
        type:String,
        required:true 
      },
      date : {
        type: String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    itemTable:[{
        itemId :{
            type : String,
            required: true,
        },
        itemName:{
            type: String,
            required:true
        },
        price:{
            type: Number,
            required:true
        },
        qty:{
            type: Number,
            required:true
        },
        status: {
            type: String,
            required:true
        }
    }]

      
})

module.exports = mongoose.model('salesorder', schema);