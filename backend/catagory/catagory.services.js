
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
   getByItemName,
   updateItem,
   inactiveItem
  

};

async function inactiveItem(data) {
    return await ItemData.updateOne({id: data.id}, {$set: {itemStatus: false }});
}



async function updateItem(updateItem) {


try{
    await ItemData.updateOne({"id":updateItem.id},{$set:updateItem});
    return 1;
}catch (e){
    console.log(e)
}

}

async function getByItemName(data) {
    return await ItemData.find({item_name: data.itemName});
}

async function getItemrelventItems(data) {

    return await ItemData.find({cat_name: data.name});
}

async function getItemData(){
    return await ItemData.find({itemStatus: true});
}

async function insertItData(data){
   // console.log('SERVICE');
    const itemData = new ItemData(data);
    //console.log(itemData);
    await itemData.save();
}

async function getCatDataRelevent(id){
    return await SubCatagory.find({mainCatgory:id});
}


async function getCatName() {
    //console.log('getCatagoryName')
    //return await Catagory.find({} , {cat_name:1 , _id:0})
    return await Catagory.find({});
}

async function getAllSub() {
    return await SubCatagory.find({})
}

async function insertSubCat(data) {

const subcat = new SubCatagory(data);


const subCatagoryNameFind = await SubCatagory.findOne({sub_cat_name:data.sub_cat_name.toLowerCase() , mainCatgory:data.mainCatgory},
    function(error , responseDb){
        if(error){
            return 'Server Error Please Contact Admin';
        }
    });
    if(!subCatagoryNameFind){
        await subcat.save();
        return 1;
    }

}

async function deleteData (id){
    //console.log(id)
    await Catagory.deleteOne({"_id": id});
}
async function getAll(){
    return await Catagory.find({})
}

async function insertCat(data){

        //find duplicat catNames
        const _duplicateCats = await Catagory.findOne({cat_name:data.cat_name});

        if(_duplicateCats){
            return {errorStatus:true , message:'Main catogory name is already available!Please try another name'}
        };
   // console.log(data)
    const cat = new Catagory(data);
   // console.log(cat // save user
    const _saveCat = await cat.save();
    if(_saveCat){
        return {errorStatus:false , message:'Main cataogry insert succesfully'}
    }
}