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

var n = 0;
router.post('/',function(req, res){
    let u_name = req.query['username'];
    let u_pass = req.query['password'];
    if((u_name != "") && (u_pass != "")){
        
        for(key in users){
            if((key == u_name) && (users[key] == u_pass)){
                n = 1;
                res.header("Content-type: text/html");
                res.sendFile("index2.html");
            }
        } 
        if(n == 0){
            res.header("Content-type: text/plain");
            res.send("incorrect");
        }
    }
});

module.exports = router;
