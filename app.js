const exp = require('express');
const app = exp();
const mysql = require('mysql');

var dbconf = {
    "host":"localhost",
    "user":"root",
    "password":"1111",
    "port":"3306",
    "database":"ang2"
};

var connection = mysql.createConnection(dbconf);
app.use('/',(req,res,next)=>{
    console.log(req.url);
    if(req.url.indexOf(".html" != -1)){
        //html 파일인 경우
        
        res.sendFile(req.url,{root:__dirname + "/views"});
    } else {
        //html 파일이 아닌 경우 직접 헤더셋
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
        next();
    }
})
app.get('/', (req,res,next)=>{
    
    res.write("니가 요청한 경로 : " + req.url);
    res.write("<br>시작~");
    res.write("<br>시작2");
    res.write("<br>시작3");
    res.write("<br>시작4");
    res.write("<br>시작5");
    res.write("<br>시작6");
    next();
});

app.get('/',(req,res,next)=>{
    res.write("<br>두번째 GET임");
    res.end();
});

app.get('/test', (req,res,next)=>{
    res.write("니가 요청한 경로 : " + req.url);
    res.end();
});

app.get('/join', (req,res,next)=>{
    
})

app.get('/join2',(req,res,next)=>{
    var username = req.query.username;
    var userage = req.query.userage;
    var userid = req.query.userid;
    var userpwd = req.query.userpwd;
    var useraddress = req.query.useraddress;
    if(username.trim() == ""){
        res.write("<script>alert('이름입력해주세요.');location.href='/join'</script>");
    }
    if(userage.trim() == ""){
        res.write("<script>alert('나이입력해주세요.');location.href='/join'</script>");
    }

    var sql = "SELECT userid FROM user_info WHERE userid = ?";
    var values = [userid];

    connection.query(sql, values, (err,rows)=>{
        if(err){throw err;}
        console.log(rows.length);
        if(rows.length == 0){
            sql = "INSERT INTO user_info (username, userage, userid, userpwd, useraddress, dino) ";
            sql += "VALUES (?,?,?,?,?,1)";
        
            //중복된 아이디가 없으므로 INSERT 수행
            values = [username, userage, userid, userpwd, useraddress];
            connection.query(sql, values, (err,rows)=>{
                if(err){
                    console.log(err);
                    res.write("회원가입 실패");
                    res.end();
                } else if (rows){
                    if(rows.affectedRows == 1){
                        res.write("회원가입 완료");
                        res.end();
                    }
                }
            });        
        } else {
            //중복된 아이디가 있는 경우
            res.write("중복된 아이디입니다." + userid);
            res.end();
        }
    });
});

app.get('/list',(req,res,next)=>{
    var sql = "SELECT * FROM user_info";
    var values = [];
    var result = {};
    connection.query(sql, values, (err,rows)=>{
        if(err){throw err;}
        result["list"] = rows;
        res.json(result);
    });
});


app.listen(3000, function(){
    console.log("server listening 3000 port");
});



