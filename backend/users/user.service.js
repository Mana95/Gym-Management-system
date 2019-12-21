const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('_helpers/db');
const details = require('details.json');



const nodemailer = require('nodemailer');

const User = db.User;
const Roles = db.Roles;
const Groups = db.Groups;
const Customers = db.Customers;
const Supplier = db.Supplier;
const SubCatagory = db.SubCatagory;
const passwordResetToken = db.passwordResetToken;
const MembershipType = db.MembershipType;
const Membership = db.Membership;
const ScheduleType =db.ScheduleType;


module.exports = {

    authenticate,
    getAll,
    getById,
    create,
    update,
    getbyrole,
    delete: _delete,
    creationUser,
    getRoles,
    groupinsertion,
    getGroups,
    UpdateUserService,
    loadByID,
    getGroupNames,
    getDetailUsers,
    cusRegister,
    getCustomerData,
    supRegister,
    getSuppliers,
    getCatDataRelevent,
    signUpUser,
    getreleventSupliers,
    ResetPassword,
    insertMembershipType,
    getMembershiptype,
    insertMembership, 
    insertMembershipToUser,
    GetByPending,
    updateById,
    savescheduleType,
    getAllSchedule,
   




};


async function getAllSchedule(){
    return await ScheduleType.find({})
}

async function savescheduleType(body) {
    const scheduleType = new ScheduleType(body);  
    await scheduleType.save();
}

async function updateById(data){
    console.log(data)

    Membership.updateOne(
        {
            membershipId: data.id
        },
        {
            $set: data
        }, function (err, responses) {
            if (err) {
                console.log(err);
            }
        });
        let userData = {
            id:data.id,
            active:true
        }


        User.updateOne(
            {
                user_id: userData.id
            },
            {
                $set: userData
            }, function (err, responses) {
                if (err) {
                    console.log(err);
                }
            }  
        )
}

async function  GetByPending(){
    return await Membership.find({})
}

async function insertMembershipToUser(body) {
    
    
  
    if(!userFind){
        if(body.password){
            user.hash = bcrypt.hashSync(body.password, 10);    
        }
        await user.save();
    }
}

async function insertMembership(body) {
    //Find in collection
    const membershipfind = await Membership.findOne({ username: body.membershipbody.username });
    const userFind =await User.findOne({username:body.UserDatabody.username});
    //create objects
    const user = new User(body.UserDatabody);
    const membership = new Membership(body.membershipbody);
    //convert to pw to hash saveing part
    if (!membershipfind) {
        if(!userFind){
        if (body.membershipbody.password && body.UserDatabody.password) {
            membership.hash = bcrypt.hashSync(body.membershipbody.password, 10);   
            user.hash = membership.hash;
        }     
        if(await membership.save()){
            //console.log('Save una');
            await user.save();
        }
        else{
            throw 'Data doesn;t Saved to the Mongo DB'
        }
    }
}
}








async function insertMembershipType(body) {
    const membership_type = await MembershipType.findOne({ typeName: body.typeName })
    const membership = new MembershipType(body);
    if (membership_type) {
        throw 'TypeName "' + body.typeName + '" is already taken';
    }
    else {
        await membership.save();
    }


}
async function getMembershiptype() {
    return await MembershipType.find({});
}

async function ResetPassword(values) {

    const user = await User.findOne({
        email: values.email
    });
    console.log(user);

    var resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save(function (err) {
        if (err) { return }
        passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();



        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            auth: {
                user: 'manaalex3@gmail.com',
                pass: 'QAZ(*&jker":'
            }
        });
        var mailOptions = {
            to: user.email,
            from: 'your email',
            subject: 'Gym Managment System',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n' +
                '<br>Thank You.\n'
        }
        transporter.sendMail(mailOptions, (err, info) => {
        })
    })
}





async function getreleventSupliers(data) {
    var name = data;

    return await Supplier.find({ sup_firstName: { $regex: '^' + data } })
}


async function getCatDataRelevent(id) {
    return await SubCatagory.find({ mainCatgory: id });
}

async function getSuppliers() {
    return await Supplier.find({});
}


async function supRegister(data) {
    console.log('SERVICE');
    const supplier = new Supplier(data);
    console.log(supplier);
    await supplier.save();
}

async function getCustomerData() {
    return await Customers.find({});
}

async function cusRegister(data) {
    console.log('SERVICE');
    const customer = new Customers(data);
    console.log(customer);
    await customer.save();
}



async function getDetailUsers(roleValue) {
    console.log('service' + roleValue)
    return await User.find({ assignRole: roleValue })

}

async function getGroupNames() {
    //Using Projection
    return await Groups.find({}, { GroupName: 1, _id: 0 });
}

async function loadByID(id) {
    console.log('Service:' + id)
    return await Groups.findById(id);
}

async function UpdateUserService(newData) {
    console.log(newData.uniqueId);

    User.updateOne(
        {
            _id: newData.uniqueId
        },
        {
            $set: newData
        }, function (err, responses) {
            if (err) {
                console.log(err);
            }
        });


}

async function groupinsertion(groupData) {
    console.log("groupData");

    const group = new Groups(groupData);
    console.log(group);

    // save user
    await group.save();
}

async function getRoles() {
    return await Roles.find({});
}

async function getGroups() {
    return await Groups.find({});
}


async function creationUser(userData) {
    console.log("creationUser");
    // validate
    const cus = new Customers(userData);
    console.log(userData);
    // hash password
    if (userData.password) {
        cus.hash = bcrypt.hashSync(userData.password, 10);
    }

    // save user
    await cus.save();

}

async function signUpUser(data) {
    console.log(data.username);
    if (await User.findOne({ username: data.username })) {
        // throw 'User name is already existent'; 
        console.log('HI')
        let message = 3
        return message;

    }

    const user = new User(data);
    console.log(user);
    // hash password
    if (data.password) {
        user.hash = bcrypt.hashSync(data.password, 10);
    }

    // save user
    await user.save();
}



async function authenticate({ firstName, password }) {
    console.log('Authentication service')
   
    const user = await User.findOne({ firstName });
    const userActive = await User.findOne({})
    console.log(user);

    if(user.active == true) {
    if (user && bcrypt.compareSync(password, user.hash)) {
     
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}
else if(user.active == false) {
    throw 'That user is not Active';
}
else{
    throw 'There is no such User';
}

}

//Get data
async function getAll() {
    return await User.find({});
}




async function getById(id) {
    console.log("This is the service " + id)
    return await User.findById(id);
}

async function getbyrole(role) {
    return await User.findByrole(role);

}

async function create(userParam) {
    console.log("test");
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);
    console.log(user);
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {

        userParam.hash = bcrypt.hashSync(userParam.password, 10);

    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();


}

async function _delete(id) {

    console.log("This is the backend service" + id)
    await User.findByIdAndRemove({ "_id": id });
}
