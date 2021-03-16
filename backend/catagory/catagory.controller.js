const express = require('express');
const router = express.Router();
const catService = require('./catagory.services')
module.exports = router;

router.post('/insertCat', insertCatData);
router.post('/insertSubCat' , insertSubCat);
router.post('/insertItemData' , insertItemData);


router.get('/getAll', getData);
router.get('/getAllSub' , getSubCatData);
router.get('/getCatName' , getCatName);
router.get('/feteadsda/:id' , getReleventCat);
router.get('/getItemDetails', getItemDetails);
router.get('/getitemsNames' , getitemsNames);
router.get('/getByItemName' ,  getByName);

router.post('/deleteRec', deleteData);

router.put('/updateItem' ,  updateItem);

router.patch('/inactive' ,  inactiveItem);


function inactiveItem(req ,res ,next){
     
    catService.inactiveItem(req.body)
    .then(item => res.json(item))
    .catch(err => next(err));
}

function updateItem(req ,res ,next){
     
    catService.updateItem(req.body)
    .then(item => res.json(item))
    .catch(err => next(err));
}


function getByName(req,res,next) {
   // console.log(req.params.id);
   
    catService.getByItemName(req.query)
    .then(item => res.json(item))
    .catch(err => next(err));
}


function getitemsNames(req,res,next){

    catService.getItemrelventItems(req.query)
    .then(item => res.json(item))
    .catch(err => next(err));
}


function getItemDetails(req ,res, next){
    catService.getItemData()
    .then(item => res.json(item))
    .catch(err => next(err));
}

function insertItemData(req ,res ,next) {
   // console.log(req.body)
    catService.insertItData(req.body)
    .then(item => res.json(item))
    .catch(err => next(err));
}

function getReleventCat(req ,res ,next){
    catService.getCatDataRelevent(req.params.id)
    .then(sup => res.json(sup))
    .catch(err => next(err));

}



function insertSubCat(req ,res ,next) {
    //console.log('Controller');
    //console.log(req.body);
    catService.insertSubCat(req.body)
    .then((sub) => res.json(sub))
    .catch(err => next(err));
}

function deleteData(req ,res, next) {
    
    catService.deleteData(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}


function getSubCatData (req ,res ,next) {
    catService.getAllSub()
    .then(cat => res.json(cat))
    .catch(err => next(err));
}

function getData(req,res,next){
    catService.getAll()
    .then(cat => res.json(cat))
    .catch(err => next(err));
}

function getCatName (req ,res ,next) {
    catService.getCatName()
    .then(catName => res.json(catName))
    .catch(err => next(err));

}


function insertCatData (req, res ,next) {
    //console.log(req.body)
    let data = req.body;
    catService.insertCat(data)
    .then(cat =>{
        if(cat != undefined && cat.errorStatus !=undefined && cat.errorStatus ==true){
            res.status(500).send({
                message: cat
            })
        }else{
            res.json(cat)
        }
    }
    )
    .catch(err => next(err));


}