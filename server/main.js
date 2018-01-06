const express = require('express');
const morgan = require('morgan'); 
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const menuController = require('./controller/menu_controller');
const departController = require('./controller/depart_controller');
const userController = require('./controller/user_controller');
const header = require('./conf/header');

app.set('port', (process.env.PORT || 3000));

//app.use('/', express.static(__dirname + '/../dist'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev')); //로그찍는 모듈 그냥 이렇게 쓰면댐

app.use(header);

app.use('/api/menus',menuController);
app.use('/api/departs',departController);
app.use('/api/userdeparts',userController);

app.listen(app.get('port'), function() {
    console.log('express running port : '+app.get('port'));
});