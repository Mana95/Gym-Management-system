const db = require('_helpers/db');


const PurchaseOrder = db.PurchaseOrder;
const ItemData = db.ItemData;
const Supplier =db.Supplier;
const GRN = db.GRN;

module.exports = {
    InsertData,
    updateByqantity,
    updateByqantityDelete,
    getPending,
    updatedStatus,
    getprogressPo,
    getByIdPo,
    getSupplierById,
    SaveDataGrn,
    updateStatus
}

async function updateStatus(data){
    console.log(data)
        let val = {
            id:data.id,
            status:'Approved'
        }

    PurchaseOrder.updateOne(
        {
            purchaseOrderId: val.id
        },
        {
            $set: val
        }, function (err, responses) {
            if (err) {
                console.log(err);
            }
        }  );

       
}

async function SaveDataGrn(data){
    console.log('SAVE WENNAI YANNE');

    const grn = new GRN(data);
    //console.log(itemData);
    await grn.save();
}

async function getSupplierById(id) {
    return await Supplier.find({sup_id:id});
}

async function getByIdPo(id ){
    return await PurchaseOrder.find({purchaseOrderId:id});
}



async function getprogressPo() {
    return await PurchaseOrder.find({status:'Pending'});
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