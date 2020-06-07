const db = require("_helpers/db");

var moment = require('moment');

const PurchaseOrder = db.PurchaseOrder;
const ItemData = db.ItemData;
const Supplier = db.Supplier;
const GRN = db.GRN;
const SalesOrder = db.SalesOrder;
const Cart = db.Cart;
var stockId = "";
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
    updateStatus,
    salesOrderInsert,
    getAllDataSo,
    getCartItems,
    routeIdData,
    saveCartData,
    return_report_purchase_order
};

async function return_report_purchase_order(data){
    if(data.supplierName != '' && data.status != ''){
        return await PurchaseOrder.find({status:data.status ,supllierFirstName:data.supplierName , createdDate:{$gte: new Date(moment(data.fromDate).add(1, 'day')), $lte:new Date(moment(data.toDate).add(1, 'day'))}})
  
         }else if( data.supplierName == '' && data.status != ''){

            return await PurchaseOrder.find({status:data.status , createdDate:{$gte: new Date(moment(data.fromDate).add(1, 'day')), $lte:new Date(moment(data.toDate).add(1, 'day'))}}
            ,function(error , result){
                if(result != undefined && result.length ==0){
                    return 2
                }
            });

    }else if( data.supplierName == '' && data.status != ''){

        return await PurchaseOrder.find({supllierFirstName:data.supplierName , createdDate:{$gte: new Date(moment(data.fromDate).add(1, 'day')), $lte:new Date(moment(data.toDate).add(1, 'day'))}}
        ,function(error , result){
            if(result != undefined && result.length ==0){
                return 2
            }
        });

}else if( data.supplierName == '' && data.status == ''){
        return await PurchaseOrder.find({createdDate:{$gte: new Date(moment(data.fromDate).add(1, 'day')), $lte:new Date(moment(data.toDate).add(1, 'day'))}}, function(error , result)
        {
            if(result != undefined && result.length ==0){
                return 2
            }
        });

}
}

async function saveCartData(data) {

   
const cartValue = data.CartValues;


        cartValue.forEach((cart , index)=>{
            let itemId = cart.itemId;
         //   ItemData.findOne({id:itemId , stock :{ $elemMatch:{ itemId: }} });


//             console.log(itemId)
//   ItemData.find({}, {id:itemId , stockItem:{$elemMatch: {
//     itemId:itemId
//   }}},function(error , result){
//        console.log(error)
//    })
//    const value =  ItemData.find().sort({_id :-1}).limit(1);
//    console.log(value)

//             ItemData.updateOne({id:itemId  ,stockItem })

          






        })
    

//     const cart = new Cart(data);
//   const findItem = await ItemData.find({id: data.})






//     //console.log(itemData);
//     await cart.save();

//     const ttemData = data.CartValues;
//     if(ttemData != undefined && ttemData.length>=0){
       

//         const qtyCheck = await ItemData.find({_id:data.id}, { qty: { $gt: data.qty } })
//         ttemData.forEach((data, index)=>{
//             console.log(data.itemName)
//             ItemData.updateOne(
//                 {_id:data.id},
//                 {
//                     $inc:{quantity: -data.qty}
//                    },  {new: true } , function (err, responses) {
//                        if (err) {
//                            console.log(err);
//                        }else{
//                            console.log(responses)
//                        }
//                    });
//         })
//     }
}

async function getCartItems() {

    //Only load not null values 😄
    return await ItemData.find({ "itemType": "Cart Items" , "selling_price" :{$ne : null}});
}

async function routeIdData(data) {
    return await ItemData.find({ _id: data });
}

async function getAllDataSo() {
    return await SalesOrder.find({ status: false });
}
async function salesOrderInsert(data) {
    //console.log('SAVE WENNAI YANNE');

    const salesOrder = new SalesOrder(data);
    //console.log(itemData);
    await salesOrder.save();
}

async function updateStatus(data) {
    // console.log(data);
    let val = {
        id: data.id,
        status: "completed",
    };

    PurchaseOrder.updateOne(
        {
            purchaseOrderId: val.id,
        },
        {
            $set: val,
        },
        function (err, responses) {
            if (err) {
                console.log(err);
            }
        }
    );
}

async function SaveDataGrn(data) {
    const allData = data;
    const grnData = data.grnData;
    const itemData = data.ItemData;
    const updatePOID = data.updateStatus;
  
   const grnSave = new GRN(grnData) 
    //update Field QTY
    var qtyArray = grnData.ItemGrnTable;
    // console.log(qtyArray[0]);

    if(await grnSave.save()){
       // console.log('save wenwa GRN')
    await PurchaseOrder.updateOne({purchaseOrderId:grnData.purchaseOrderId},  { $set:{"status":"Completed"}} );
   // console.log('PO UDPATED')
    qtyArray.forEach((itemData, index) => {
        let stock = {
            stockId: itemData.stockId,
            itemId: itemData.itemId,
            itemName: itemData.itemName,
            buying_price: itemData.buyingPrice,
            supplierID: itemData.supplierID,
            purchaseOrderId: itemData.purchaseOrderId,
            qty: itemData.qty,
            grnId: itemData.purchaseOrderId,
        };

    const qty =itemData.qty;
            for(var x =0; x<qty ; x++){
                let stockItem = {
                    itemId:itemData.itemId,
                    stockId:itemData.stockId
                }
                ItemData.updateOne(
                    { id: itemData.itemId },
                    { $push: { stockItem: { $each: [stockItem] } } },
                    function (error, response) {
                        if(error)
                     console.log(error);
                    }
                );
            }
        ItemData.updateOne(
            { id: itemData.itemId },
            { $push: { stock: { $each: [stock] } } },
            function (error, response) {
                if(error)
                console.log(error);
            }
        );
         ItemData.updateOne(
                {id:itemData.itemId},
                {
                    $inc:{quantity: itemData.qty}
                   },  {new: true } , function (err, responses) {
                       if (err) {
                           console.log(err);
                           
                       }
                   });
                   
    });
 
}

return 1;

}

async function getSupplierById(id) {
    return await Supplier.find({ sup_id: id });
}

async function getByIdPo(id) {
    return await PurchaseOrder.find({ purchaseOrderId: id });
}

async function getprogressPo() {
    return await PurchaseOrder.find({ status: "Approved" });
}

async function updatedStatus(val) {
    PurchaseOrder.updateOne(
        {
            _id: val.id,
        },
        {
            $set: val,
        },
        function (err, responses) {
            if (err) {
                console.log(err);
            }
        }
    );
}

async function getPending() {
    return await PurchaseOrder.find({ status: "Pending" });
}

async function updateByqantityDelete(data) {
    var query = { id: data.id };
    var x = data.quantity;
    // console.log(x);
    ItemData.updateOne(
        { id: data.id },
        {
            $inc: { quantity: -x },
        },
        { new: true },
        function (err, responses) {
            if (err) {
                console.log(err);
            }
        }
    );
}

async function updateByqantity(quantity) {
    var qtyArray = quantity;
    // console.log(qtyArray[0]);
    for (var x = 0; x < qtyArray.length; x++) {
        ItemData.updateOne(
            { id: qtyArray[x].itemId },
            {
                $inc: { quantity: qtyArray[x].qty },
            },
            { new: true },
            function (err, responses) {
                if (err) {
                    console.log(err);
                }
            }
        );
    }
}

async function InsertData(data) {
    const purcahseOrder = new PurchaseOrder(data);
    //console.log(itemData);
    if (await purcahseOrder.save()) {
        return 1;
    } else {
        return 2;
    }
}
