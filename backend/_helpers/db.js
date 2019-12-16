const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {

    User: require('../users/user.model'),
    Job: require('../jobs/job.model'),
    Catagory: require('../catagory/catagory.model'),
    SubCatagory: require('../catagory/subcatagory.model'),
    Customers: require('../users/customer.model'),
    Supplier:require('../users/supplier.model'),
    PurchaseOrder:require('../orders/poOrder.model'),
    GRN:require('../orders/GRN.model'),
    passwordResetToken:require('../users/resettoken'),
   
    ItemData: require('../catagory/item.model'),
    //Now added
    Uplds: require('../uplds/upload.model'),
    Comments: require('../comments/comment.model'),
    Roles: require('../users/roles/role.model'),
    Groups: require('../users/group.model')
    

    
};