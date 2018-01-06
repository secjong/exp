var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');
var dbConfig = require('../conf/dbconfig');
const con = mysql.createConnection(dbConfig);
var errorHandle = require('../conf/errorHandle');
var rowsHandle = require('../conf/rowsHandle');

router.get('/',selectUserList);
router.get('/login',loginUser);
// router.post('/',createUser);
router.post('/update',updateUser);
router.post('/:userno',deleteUser);

module.exports = router;

function loginUser(req,res,next){
    var userId = req.query.userId;
    var userPwd = req.query.userPwd;
    sql = "SELECT userno, username, userid, userage, userpwd, useraddress FROM user_info WHERE userid = ?";

    con.then((con)=>{
        return con.query(sql,userId);
    })
    .catch(errorHandle)
    .then((rows)=>{
        var result = {};
        result["login"] = "no";
        if(rows.length == 1){
            var checkPwd = rows[0].userpwd;
            if(userPwd == checkPwd){
                result["login"] = "ok";
                result["list"] = rows;
            }
        }
        return result;
    })
    .then((result)=>{
        res.json(result);
    })
};

function selectUserList(req,res,next){
    var sql = "select * from user_info ui, depart_info di where ui.dino = di.dino;";
    con.then((con)=>{
        return con.query(sql);
    })
    .then(rows=>{
        res.json(rows)
    })
};

function updateUser(req,res,next){
    var obj = req.body;
    var values = [obj.username, obj.userid, obj.dino, obj.userno];
    var sql = "update user_info";
    sql += " set username = ?, ";
    sql += " userid = ?, ";
    sql += " dino = ?";
    sql += " where userno = ?";
    var result = {};
    con.then(con => {
        return con.query(sql, values);
    })
    .then(rows=>{
        console.log(rows);
        result["succeed"] = "ok";
        if(rows.affectedRows != 1){
            result["succeed"] = "no";
        }
        res.json(result);
    })
};

function deleteUser(req,res,next){
    var sql = "delete from user_info where userno = ?";
    var userNo = req.params.userno;
    con.then(con=>{
        return con.query(sql, userNo);
    })
    .then(rows=>{
        console.log("rows : " , rows);
        // if(rows.affectedRows == 1){
        //     var sql = "update depart_info set diCnt = ? where "
        // }
    })
    .catch(errorHandle)
    .then((result)=>{
        console.log("result : " , result);
        res.json(result);
    });
};

// function createUser(req,res,next){
//     var sql = "select 1 from user_info where userId=?";
//     var values = [req.body.userId];
//     connection2(dbConfig)
//     .then((con)=>{
//         return con.query(sql,values);
//     })
//     .then((result)=>{
//         if(result.length>0){
//             throw {"code":"중복에러","errno":1,"sqlMessage":req.body.userId+"이거 있어! 에러야임마!!"};
//         }
//         return true;
//     }).then(()=>{
//         sql = "insert into user_info(";
//         sql += "userId, userName, userPwd)";
//         sql += "values(?,?,?,?)";
//         var pm = req.body;
//         var values = [pm.userId, pm.userName, pm.userPwd];
//         var result = {};
//         return connection2(dbConfig).then((con)=>{
//             return con.query(sql,values);
//         })
//     }).then((result)=>{
//         console.log(result);
//         if(result.affectedRows==1){
//             var sql = "select userNo, userName,userId,userPwd from user_info";
//             return connection2(dbConfig).then((conn)=>{
//                 return conn.query(sql);
//             })
//             .then(rowsHandle);
//         }else{
//             throw {"code":"몰름","errno":2,"sqlMessage":"이유는 모르겠고 안드갔는데?"};
//         }
//     })
//     .catch(errorHandle)
//     .then((result)=>{
//         console.log(result);
//         res.json(result);
//     });
   
// };

// app.post('/api/users',(req, res, next)=>{
//     var sql = "insert into user_info("
//     var valueSql = "values("
//     var values = [];
//     for(var key in req.body){
//         sql += key+",";
//         valueSql += "?,";
//         values.push(req.body[key]);
//     }
//     sql = sql.substr(0, sql.length-1) + ")";
//     valueSql = valueSql.substr(0, valueSql.length-1) + ")";
//     sql += valueSql;
//     connection2(dbConfig).then((conn)=>{
//         console.log(sql);
//         return conn.query(sql, values);
//     })
//     .then(rowsHandle)
//     .catch(errorHandle)
//     .then((result)=>{
//         console.log(result);
//     });
// })