var mysql = require('promise-mysql');
var dbConfig = require('../conf/dbconfig');
const con = mysql.createConnection(dbConfig);
var errorHandle = require('../conf/errorHandle');
var rowsHandle = require('../conf/rowsHandle');

var departService = {
    selectDepartList:selectDepartList,
    selectDepart:selectDepart,
    insertDepart:insertDepart,
    deleteDepart:deleteDepart,
    updateDepart:updateDepart
};

module.exports = departService;

function selectDepartList(req,res,next){
    var sql = "select diNo, diName, diDesc, diCnt from depart_info";
    return con.then((con)=>{
        return con.query(sql);
    })
    .then(rowsHandle)
    .catch(errorHandle)
};

function selectDepart(req,res,next){
    var sql = "select diNo, diName, diDesc, diCnt from depart_info where diNo = ?";
    var diNo = req.params.diNo;
    return con.then((con)=>{
        return con.query(sql,diNo);
    })
    .then(rowsHandle)
    .catch(errorHandle)
};

function insertDepart(req,res,next){
    var obj = req.body;
    var values = [obj.diName, obj.diDesc, obj.diCnt];
    var sql = "insert into depart_info(diName, diDesc, diCnt)";
    sql += "values (?, ?, ?)";
    var result = {};
    var dbCon;

    return con.then(con => {
        dbCon = con;
        return con.query(sql, values);
    })
    .then(rows=>{
        result["succeed"] = "no";
        if(rows.affectedRows == 1){
            result["succeed"] = "ok";
        }
        return result;
    })
    .catch(errorHandle)
};

function deleteDepart(req,res,next){
    var sql = "delete from depart_info where diNo = ?";
    var diNo = req.params.diNo;
    return con.then(con=>{
        return con.query(sql,diNo);
    })
    .then(rowsHandle)
    .catch(errorHandle)
};

function updateDepart(req,res,next){
    var obj = req.body;
    var values = [obj.diName, obj.diDesc, obj.diCnt, obj.diNo];
    var sql = "update depart_info";
    sql += " set diName = ?, ";
    sql += " diDesc = ?, ";
    sql += " diCnt = ?";
    sql += " where diNo = ?";
    var result = {};

    return con.then(con => {
        return con.query(sql, values);
    })
    .then(rows=>{
        console.log(rows);
        result["succeed"] = "ok";

        if(rows.affectedRows != 1){
            result["succeed"] = "no";
        }
        return result;
    })
    .catch(errorHandle)
};