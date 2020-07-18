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
    MembershipType: require('../users/membership-type.model'),
    Membership: require('../users/membership.model'),
    ScheduleType: require('../users/ScheduleType.model'),
    Employee: require('../users/employee.model'),
    SalesOrder:require('../orders/soOrder.model'),
    Cart:require('../orders/cart.model'),
    Comment:require('../users/comment.model'),
    Schedule: require('../schedule/newschedule.model'),
    Instructor:require('../users/instructor.model'),
    Invoice:require('../orders/invoice.model'),
    ItemData: require('../catagory/item.model'),
    MembershipStatus : require('../users/membershipStatus.model'),
    Uplds: require('../uplds/upload.model'),
    Comments: require('../comments/comment.model'),
    Roles: require('../users/roles/role.model'),
    Groups: require('../users/group.model'),
    Schedule_Plan:require('../schedule/schedule-plan.model'),
    DietMealPlan:require('../schedule/diet-meal.model'),
    Exercise: require('../schedule/exercise.model'),

    

    
};