const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const details = require('details.json');



const nodemailer = require('nodemailer');

const User = db.User;
const Roles = db.Roles;
const Groups = db.Groups;
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
    getDetailUsers



};

async function getDetailUsers(roleValue) {
    console.log('service' + roleValue )
  return await User.find({assignRole: roleValue})
    
}

async function getGroupNames(){
    //Using Projection
    return await Groups.find({},{GroupName:1 , _id:0});
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
        }  );


}

async function groupinsertion(groupData){
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


async function creationUser (userData) {
    console.log("creationUser");
    // validate
    const user = new User(userData);
    console.log(userData);
    // hash password
    if (userData.password) {
        user.hash = bcrypt.hashSync(userData.password, 10);
    }

    // save user
    await user.save();

}



async function authenticate({ firstName, password }) {
    console.log('Authentication service')
    console.log({firstName})
    console.log({password})
    const user = await User.findOne({ firstName });
    console.log(user);
    if (user && bcrypt.compareSync(password, user.hash)) {
        //  if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

//Get data
async function getAll() {
    return await User.find({});
}




async function getById(id) {
    console.log("This is the service "+ id)
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

    console.log("This is the backend service" +id)
    await User.findByIdAndRemove({"_id": id});
}
