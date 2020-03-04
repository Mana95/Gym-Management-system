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
const Employee = db.Employee;
const Instructor = db.Instructor;


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
    getreleventCustomer,
    creationUserPub,
    EmployeeCreation,
    getreleventRoleData,
    updateRole,
    loginMail,
    instructorSave,
    findCustomer,
    savememberData
   




};




async function  findCustomer(data) {
console.log('Service')
console.log(data);


    return await Customers.find({id:data})
}


async function updateRole(data) {

    User.updateOne(
        {
            _id: data.id
        },
        {
            $set: data
        }, function (err, responses) {
            if (err) {
                console.log(err);
            }
        });
}

async function getreleventRoleData(data){
    return await User.find({_id:data})
}

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

    const UserData = body.UserDatabody;
    const membershipData = body.membershipbody;
    console.log(body.UserDatabody);
    //Find in collection
    const membershipfind1 = await Membership.findOne({ username: body.membershipbody.username});
    const checkStatus = await Membership.findOne({ customerID: body.membershipbody.customerID , status :"false"});
    const membershipfind2 = await Membership.findOne({email: body.membershipbody.email});
    const userFind1 =await User.findOne({username:body.UserDatabody.username});
    const userFind2 =await User.findOne({email: body.UserDatabody.email});
   
     //create objects
     const user = new User(body.UserDatabody);
     const membership = new Membership(body.membershipbody);
    
     if(!checkStatus){
        
   if(!(membershipfind1 && userFind1)){
    if (body.membershipbody.password && body.UserDatabody.password) {
        membership.hash = bcrypt.hashSync(body.membershipbody.password, 10);   
        user.hash = membership.hash;
    }
    if(await membership.save()){
        //console.log('Save una');
        await user.save();
        return 1;
    } 
   }else{
     return 3;
}
}else{
    return 4;
}
}

//Insert member to Database
async function savememberData(data){
  
   if(await User.findOne({email: data.email})){
    return 'Email "' + data.email + '" is already taken';
       
   }else if(await User.findOne({username:data.username})){
    return 'UserName "' + data.username + '" is already taken';
    
   }
   const user = new User(data);
    // hash password
    if (data.password) {
        user.hash = bcrypt.hashSync(data.password, 10);
    }
    // save user
    if(await user.save()){
        return 1;
    }
    
}


async function instructorSave(data){
    let userData = data.UserData;
    let instructorData = data.data;
    const instructorFind = await Instructor.findOne({email:instructorData.email});
    const userfind = await User.findOne({email:userData.email});
    const instructor  = new Instructor(instructorData);
    const user = new User(userData);

    if(!(instructorFind&&userfind)){
        user.hash = bcrypt.hashSync(userData.password, 10);  
        await instructor.save();
        await user.save();
        return 1;
    }else{
        return 3;
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

async function loginMail(data){
    console.log(data);
    const user = await User.findOne({
        email: data.mail
    });
    if(!user) {
        console.log('Boyd eke enne');
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            auth: {
                user: 'manaalex3@gmail.com',
                pass: 'QAZ(*&jker":'
            } 
        });
        var mailOptions = {
            to: data.mail,
            from: 'your email',
            subject: 'Gym Managment System UserName and Password',
            text: `Hey ,<br/>
            Here is your username and password for login as a supplier<br/>
            username:`+data.username+`<br/>
            password:`+data.password+`<br/>
            Thank You<br/>
            Admin Panel`
        }
        transporter.sendMail(mailOptions, (err, info) => {
        })

        let message = 1
        return message;

    }else{
        return 3;
    }
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


async function getreleventCustomer(data){
    var name = data;
    return await Customers.find({ firstName: { $regex: '^' + data } })
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
    const supplier = await Supplier.findOne({sup_email:data.sup_email})
    if(!supplier){
        const supplier = new Supplier(data);
        console.log(supplier);
        await supplier.save();
        return 1;
    }else{
        return 3;
    }
   
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
    return await User.find({});
}

async function getGroups() {
    return await Groups.find({});
}
async function EmployeeCreation(data){
  
    if (await  Employee.findOne({username:data.username})) {
        
        let message = 3
        return message;

    }
    else if(await Employee.findOne({email:data.email})){
     //   console.log('Else If HI')
        let message = 3
        return message;
    }else {
    const employee = new Employee(data);
        if (data.password) {
            employee.hash = bcrypt.hashSync(data.password, 10);
        }
        await employee.save(); 
        if(await employee.save()) {


            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                port: 465,
                auth: {
                    user: 'manaalex3@gmail.com',
                    pass: 'QAZ(*&jker":'
                }
            });
            let mailOption ={
                from: '"Gym Managment Admin"', // sender address
                to: data.email, // list of receivers
                subject: 'Employee invitation',
                text: 'Hello world?', // plain text body
                html:` <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </head>
                <body style="margin: 0; padding: 0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                        <tr>
                            <td style="padding: 10px 0 30px 0;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                                    <tr>
                                        <td align="center" bgcolor="#2b2424" style="padding: 10px 0 10px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                            <img src="https://www.precor.com/sites/default/files/community/_S1_2736_0.jpg" alt="Creating Email Magic" width="600" height="300" style="display: block;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;" align = "center">
                                                        <b>Employee Login Invitation
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                      Hi Manoj,
                                                      <br/><br/>
                                                      Worm Welcome! You are now Employee of MAXOUT ,We're glad to have you. Here are your account Details,
                                                      
                                                    </td>
                                                </tr>
                                                <tr>
                                                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; ">
                                                <b>Employee Id : </b> ` + data.id + ` <br>
                                            </td>
                                            <br>
                                                </tr>
                                                <tr>
                                                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                <b>Name : </b> ` + data.firstName  +  ` <br>
                                            </td>
                                                </tr>
                                                <tr>
                                                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                <b>Role : </b> ` + data.role + ` <br>
                                            </td>
                                                </tr>
                                                <tr>
                                                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                <b>Sender Mail Address : </b> ` + data.createdDate + ` <br>
                                            </td>
                                                </tr>
                                                    <tr>
                                                    <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                      Please follow the link 'http://localhost:4200/response-reset-password/' and here is your username and password
                                                    </td>
                                                </tr>
                                                 <tr>
                                                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; ">
                                                <b>User Name : </b> ` + data.username + ` <br>
                                            </td>
                                            <br>
                                                </tr>
                                                 <tr>
                                                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; ">
                                                <b>Password : </b> ` `Use your Nic Number` ` <br>
                                            </td>
                                            <br>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td width="260" valign="top">
                                                                  
                                                                </td>
                                                                <td style="font-size: 0; line-height: 0;" width="20">
                                                                    &nbsp;
                                                                </td>                                                       
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#FF8C00" style="padding: 30px 30px 30px 30px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="color: #2b2424; font-family: Arial, sans-serif; font-size: 14px;" width="75%">
                                                        &reg; Gym Managment, more details  2019<br/>
                                                        <a href="#" style="color: #ffffff;"><font color="#ffffff">Unsubscribe</font></a> to this Description instantly
                                                    </td>
                                                    <td align="right" width="25%">
                                                        <table border="0" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html> `,// html body
        
            
                 
            };
            transporter.sendMail(mailOption, (err, info) => {
            })













        }
    }
    
}

async function creationUserPub(data){
    const user = new User(data);
    const userfind = await User.findOne({username:data.username});
    const userEmail = await User.findOne({email:data.email});
    if(userEmail){
        let message = 3
        return message;
    }else if(userfind){
        let message = 3
        return message;
    }
    if(!userfind){
        if (data.password) {
            user.hash = bcrypt.hashSync(data.password, 10);
        }else {
            console.log('HI')
            let message = 3
            return message; 
        }
        await user.save();
    }
   
}
async function creationUser(userData) {
    console.log("creationUser");
    // validate
    const cus = new Customers(userData);
   // console.log(userData);
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
   
    if(await User.findOne({ username: firstName , active:false })){
        return 'Username is not Activated please contact admin department';
    }else if(!(await User.findOne({ username: firstName}))){
        return 'There is no sufficient user in the system';
    }

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
}

//Get data
async function getAll() {
    return await Employee.find({});
}




async function getById(id) {
    return await Employee.find({"_id":id});
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

async function _delete(data) {

    console.log(data)
    await User.deleteOne({ "user_id": data.EmpId } ,
   async function(err , response){
        if(err){
            //console.log('HEllo')
             return ({
                message: JSON.stringify(err),
                error: true
             });
        }else{
            console.log('user done')
            await Employee.deleteOne({_id : data.id})
             return ({
                message: "record is updated successfully",
                error: false
            })
        }
    });
}
