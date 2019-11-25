const bcrypt = require('bcryptjs');
const db = require('_helpers/db');


 const Catagory = db.Catagory;
 const SubCatagory = db.SubCatagory;


module.exports = {

   insertCat,
   getAll,
   deleteData,
   insertSubCat,
   getAllSub,
   getCatName
  

};
async function getCatName() {
    console.log('getCatagoryName')
    return await Catagory.find({} , {cat_name:1 , _id:0})
}

async function getAllSub() {
    return await SubCatagory.find({})
}

async function insertSubCat(data) {
    console.log(data)
    const subcat = new SubCatagory(data);
    console.log(subcat);
    await subcat.save();
}

async function deleteData (id){
    console.log(id)
    await Catagory.deleteOne({"_id": id});
}
async function getAll(){
    return await Catagory.find({})
}

async function insertCat(data){
    console.log(data)
    const cat = new Catagory(data);
    console.log(cat);
   
    // save user
    await cat.save();
}