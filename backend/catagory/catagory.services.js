
const db = require('_helpers/db');


 const Catagory = db.Catagory;
 const SubCatagory = db.SubCatagory;
 const ItemData = db.ItemData;


module.exports = {

   insertCat,
   getAll,
   deleteData,
   insertSubCat,
   getAllSub,
   getCatName,
   getCatDataRelevent,
   insertItData,
   getItemData,
   getItemrelventItems,
   getByItemName
  

};


async function getByItemName(itemName) {
    return await ItemData.find({item_name: itemName});
}

async function getItemrelventItems(category) {
    return await ItemData.find({cat_name: category});
}

async function getItemData(){
    return await ItemData.find({});
}

async function insertItData(data){
    console.log('SERVICE');
    const itemData = new ItemData(data);
    console.log(itemData);
    await itemData.save();
}

async function getCatDataRelevent(id){
    return await SubCatagory.find({mainCatgory:id});
}


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