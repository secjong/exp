var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');
var dbConfig = require('../conf/dbconfig');
const con = mysql.createConnection(dbConfig);
var errorHandle = require('../conf/errorHandle');
var rowsHandle = require('../conf/rowsHandle');
var departService = require('../service/depart_service');

router.get('/',selectDepartList);
router.get('/:diNo',selectDepart);
router.delete('/:diNo',deleteDepart);
router.post('/update',updateDepart);
router.post('/',insertDepart);

function selectDepartList(req,res,next){
    departService.selectDepartList(req)
    .then(result=>{
        res.json(result);
    })
};

function selectDepart(req,res,next){
    departService.selectDepart(req)
    .then(result=>{
        res.json(result);
    })
};

function deleteDepart(req,res,next){
    departService.deleteDepart(req)
    .then(result=>{
        res.json(result);
    })
};

function updateDepart(req,res,next){
    departService.updateDepart(req)
    .then(result=>{
        res.json(result);
    })
};

function insertDepart(req,res,next){
    departService.insertDepart(req)
    .then(result=>{
        res.json(result);
    })
};

module.exports = router;