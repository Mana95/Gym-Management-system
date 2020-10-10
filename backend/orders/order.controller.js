const express = require('express');
const router = express.Router();
var path = require('path');
var mime = require('mime');
var fs = require('fs');
const orderService = require('./order.services');
module.exports = router;


router.post('/savePurchaseOrderData' , savePoData);
router.post('/updateByQuantity' , updateByQty);
router.post('/updateBydeleteQuantity' , updateBydelete)
router.post('/saveGRN', SaveGRNData);
router.post('/updateStatusOfPO', updateStatusOfPo);
router.post('/insertSalesOrder' , insertSalesOrder);

router.get('/getPendingPo', getPendingPo);
router.get('/getProgressPo', getProgress);
router.get('/getByIdPo/:id' , getById);
router.get('/routeIdData/:id', routeIdData);
router.get('/getsId/:id' , getSupplierId);
router.get('/getAllSo', getAllSo);
router.get('/getAllCartItems', getAllCartItems);
router.get('/poReports', return_report_purchase_order);
router.get('/loadAllinvoiceData', loadAllinvoiceData_controller);
router.get('/getMyOrders/:id', getMyOrders_controller);
router.get('/getOrderById/:id', getOrderById_controller);


router.post('/saveCartData', saveCartData);
router.post('/updateStatus', UpdateStatus);

router.patch('/updateOrderInvoiceStatus', updateOrderInvoiceStatus_controller);

///report
function updateOrderInvoiceStatus_controller(req ,res, next){

  orderService.updateOrderInvoiceStatus_service(req.body)
  .then(cart => {
            
    if(cart != undefined && cart.errorStatus !=undefined && cart.errorStatus ==true){
        res.status(500).send({
            message: cart
        })
    
    }else{
        res.json(cart)
    }
  
    // res.json(user)

})
.catch(err => next(err));
}




function getOrderById_controller(req ,res, next){
    orderService.getOrderById_service(req.params.id)
    .then(cart => res.json(cart))
    .catch(err => next(err));
}


function getMyOrders_controller(req ,res, next){
    orderService.getMyOrders_service(req.params.id)
    .then(cart => res.json(cart))
    .catch(err => next(err));
}
function loadAllinvoiceData_controller(req ,res ,next){
    orderService.loadAllinvoiceData_service()
    .then(cart => res.json(cart))
    .catch(err => next(err));
}

function return_report_purchase_order(req ,res ,next){
    orderService.return_report_purchase_order(req.query)
    .then(cart => res.json(cart))
    .catch(err => next(err));
 
}
//////////////////////////////////////



function saveCartData(req ,res ,next){
    orderService.saveCartData(req.body)
    .then(cart => res.json(cart))
    .catch(err => next(err));
}



function getAllCartItems(req ,res ,next){
    orderService.getCartItems()
    .then(cart => res.json(cart))
    .catch(err => next(err));
}

function routeIdData(req ,res ,next){
    //console.log(req.params.id)
    orderService.routeIdData(req.params.id)
    .then(cart => res.json(cart))
    .catch(err => next(err))
}






function insertSalesOrder(req , res, next){
   // console.log('dsdsdsds')
 
    orderService.salesOrderInsert(req.body)
    .then(grn => res.json(grn))
    .catch(err => next(err));
}

function getAllSo(req , res, next){
    orderService.getAllDataSo()
    .then(grn => res.json(grn))
    .catch(err => next(err));
}

function updateStatusOfPo(req ,res ,next ){
   
    //console.log('dsdsdsds')
 
    orderService.updateStatus( req.body)
    .then(grn => res.json(grn))
    .catch(err => next(err));
}


function SaveGRNData(req ,res, next){
    let GrnData = req.body;
    orderService.SaveDataGrn(GrnData)
    .then(grn => res.json(grn))
    .catch(err => next(err));
    
}

function getSupplierId(req ,res ,next){
    let id = req.params.id
    orderService.getSupplierById(id)
    .then(po => res.json(po))
    .catch(err => next(err));
}

function getById(req ,res, next) {
    let id = req.params.id
    //console.log(id);
    orderService.getByIdPo(id)
    .then(po => res.json(po))
    .catch(err => next(err));

}
   

function getProgress(req ,res ,next){
    orderService.getprogressPo()
    .then(po => res.json(po))
    .catch(err => next(err));
}

function UpdateStatus(req ,res ,next) {
    orderService.updatedStatus(req.body)
    .then(po => res.json(po))
    .catch(err => next(err));
}   

function getPendingPo(req ,res, next){
    orderService.getPending()
    .then(po => res.json(po))
    .catch(err => next(err));
}


function updateBydelete(req ,res, next) {
    //console.log(req.body);
    orderService.updateByqantityDelete(req.body)
    .then(item_Data => res.json(item_Data))
    .catch(err => next(err));
}

function updateByQty(req ,res ,next){
  
    let quantityData = req.body
    //console.log(req.body);
    orderService.updateByqantity(quantityData)
    .then(item_Data => res.json(item_Data))
    .catch(err => next(err));
   
}


function savePoData(req ,res ,next){
    //console.log(req.body);
    orderService.InsertData(req.body)
    .then(po_data => res.json(po_data))
    .catch(err => next(err));
}
