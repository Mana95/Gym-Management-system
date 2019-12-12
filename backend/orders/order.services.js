const db = require('_helpers/db');


const PurchaseOrder = db.PurchaseOrder;
const ItemData = db.ItemData;
const Supplier =db.Supplier;

module.exports = {
    InsertData,
    updateByqantity,
    updateByqantityDelete,
    getPending,
    updatedStatus,
    getprogressPo,
    getByIdPo,
    getSupplierById
}

async function getSupplierById(id) {
    return await Supplier.find({sup_id:id});
}

async function getByIdPo(id ){
    return await PurchaseOrder.find({purchaseOrderId:id});
}



async function getprogressPo() {
    return await PurchaseOrder.find({status:'Approved'});
}

async function updatedStatus(val) {
    PurchaseOrder.updateOne(
        {
            _id: val.id
        },
        {
            $set: val
        }, function (err, responses) {
            if (err) {
                console.log(err);
            }
        }  );
}

async function getPending() {
    return await PurchaseOrder.find({status:'Pending'});
}

async function updateByqantityDelete(data) {
    console.log('delete')
    console.log(data);
    var query = {id : data.id}
    var x = data.quantity;
   console.log(x);
        ItemData.updateOne({id:data.id},
             {
                 $inc:{quantity: -x}
                },  {new: true } , function (err, responses) {
                    if (err) {
                        console.log(err);
                        
                    }
                })
}

async function updateByqantity(quantity) {
    console.log(quantity);
    var x = quantity.quantity
    ItemData.updateOne({id:quantity.id},
        {
            $inc:{quantity: x}
           },  {new: true } , function (err, responses) {
               if (err) {
                   console.log(err);
                   
               }
           })

    // ItemData.updateOne(
    //     {
    //         id: quantity.id
    //     },
    //     {
    //         $set: quantity
    //     }, function (err, responses) {
    //         if (err) {
    //             console.log(err);
    //         }
    //     }  );

}

async function InsertData(data){
    console.log('SERVICE');
    const purcahseOrder = new PurchaseOrder(data);
    //console.log(itemData);
    await purcahseOrder.save();
}