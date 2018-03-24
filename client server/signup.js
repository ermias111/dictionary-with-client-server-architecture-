var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

router.use(express.static(path.join(__dirname, 'public')));
router.use(bodyParser.json());

var fs = require('fs');
var users;
fs.readFile("users.json", "utf8", function(err, data){
    users = JSON.parse(data.trim());
});

router.post('/',function(req, res){
    let u_name = req.query['username'];
    let u_pass = req.query['password'];
    let state = 0;

    if((u_name != "") && (u_pass != "")){
        
        for(key in users){
            if(key == u_name){
                state = 1;
                res.header("Content-type: text/plain");
                res.send("user name already exist");
            }
        } 
    }
    if(state == 0){
        if((key == u_name) && (users[key] == u_pass)){
            user[u_name] = u_pass;
            fs.writeFileSync('./users.json',JSON.stringify(users));
            res.header("Content-type: text/html");
            res.sendFile("login.html");
        }
    }
});


module.exports = router;
