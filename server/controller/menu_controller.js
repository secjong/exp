var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');
var dbConfig = require('../conf/dbconfig');
const con = mysql.createConnection(dbConfig);
var errorHandle = require('../conf/errorHandle');
var rowsHandle = require('../conf/rowsHandle');

router.get('/', selectMenu);
module.exports = router;

function selectMenu(req,res,next){
    var sql = "select * from menu order by sort";
    con
    .then((con)=>{
        return con.query(sql);
    })
    .then(rowsHandle)
    .catch(errorHandle)
    .then(result=>{
        res.json(result);
    })
};