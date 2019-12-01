const express = require('express');
const router = express.Router();
const catService = require('./catagory.services')
module.exports = router;

router.post('/insertCat', insertCatData);
router.post('/insertSubCat' , insertSubCat)
router.post('/insertItemData' , insertItemData)

router.get('/getAll', getData);
router.get('/getAllSub' , getSubCatData)
router.get('/getCatName' , getCatName)
router.get('/feteadsda/:id' , getReleventCat)


router.delete('/deleteRec/:id', deleteData);


function insertItemData(req ,res ,next) {
    console.log(req.body)
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
    console.log('Controller');
    console.log(req.body);
    catService.insertSubCat(req.body)
    .then(() => res.json({}))
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
    console.log(req.body)
    let data = req.body;
    catService.insertCat(data)
    .then(cat_data => res.json(cat_data))
    .catch(err => next(err));


}