var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var signup = require('./signup.js');
var login = require('./login.js');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
var dict;
fs.readFile("words.json", "utf8", function(err, data){
    dict = JSON.parse(data.trim());
});

let users;
var count=1;
// fs.readFile("users.json", "utf8", function(err, data){
//     users = JSON.parse(data.trim());
// });

fs.readFile("./users.json",null,function(error,data){
    if(error){
        console.log(error)
    }
    else{
        data=data.toString().trim();
        users=JSON.parse(data);
    }
});

app.get('/dictionary', function(req, res){
    let request = req.query['word'];
    for(key in dict){
        if(key == request){
            res.header("Content-type: text/plain");
            res.send(dict[key]);
        }
    }
});

app.get('/suggest', function(req, res){
    let request = req.query['word'];
    if(request != ""){
        let list = "<ul id = ulList>";
        for(key in dict){
            if((key + "").startsWith(request)){
                list += '<li><a class = '+ 'lists' +' href='+'http://localhost:3000/dictionary?word='+key+'>'+key+'</a></li>';
            }
        } 
        list += '</ul>';
        res.header("Content-type: text/html");
        res.send(list);
    }
});

app.get('/add', function(req, res){
    let request_word = req.query['word'];
    let request_mean = req.query['meaning'];

    let notify = 0;
    for(key in dict){
        if(key == request_word){
            notify = 1;
            res.header("Content-type: text/plain");
            res.send("word already exist");
        }
    }
    if(notify == 0){
        dict[request_word] = request_mean;
        fs.writeFileSync('./words.json',JSON.stringify(dict));
        res.header("Content-type: text/plain");
        res.send("");
    }
    //res.header("Content-type: text/plain");
    
});

app.get('/edit', function(req, res){
    let request_word = req.query['word'];
    let request_mean = req.query['meaning'];

    let notify_edit = 0;
    for(key in dict){
        if(key == request_word){
            notify_edit = 1;
            dict[request_word] = request_mean;
            fs.writeFileSync('./words.json',JSON.stringify(dict));
            res.header("Content-type: text/plain");
            res.send("");
        }
    }
    if(notify_edit == 0){
        res.header("Content-type: text/plain");
        res.send("word doesn't exist");
    }
    //res.header("Content-type: text/plain");
    
});





// app.post('/login', function (request, response) {
    
//         if(request.headers.name != "" && request.headers.password != ""){
//         for (key in users) {
//             if ((key == request.header.name) && (users[key] == request.header.password)) {
               
//                 response.send("index.html");
               
//             }
//         }
//         }
        
//         response.send("wrong");
//     });
    
// app.post('/signup', function (request, response) {
//         var name = request.headers.name;
//         var pass = request.headers.password;
//        // var pass2 = request.headers.password;
//         if(name !="" && pass!=""){
//             response.send("please fill the form again!");
//         }
//         for (let i in users) {
//             if (i == (name + pass)) {
//                 response.send("false");
//             }
//         }
        
//         users[name + pass] = count;
//         count++;
//         fs.writeFile("./users.json", JSON.stringify(users), function (error) { });
//         response.send("true");
        
// });    
app.use('/signup', signup);
app.use('/login', login);

app.listen(3000);
