const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Roles = db.Roles;


module.exports = {
    roleCreation
};

async function roleCreation(roleDetails) {
    console.log("roleDetails");

    const role = new Roles(roleDetails);
    console.log(role);
   
    // save user
    await role.save();
}
