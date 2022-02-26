const express = require('express');
const app = express();
var PORT = 3000;
const path = require('path');
var _path = path.join(__dirname, '../');


app.use(express.static(_path + "frontend/css"));
app.use(express.static(_path + "frontend/images"));
app.use(express.static(_path + "frontend/js"))

app.get('/SharingDiary', function(req, res){
    res.sendFile(_path + '/frontend/start page.html');
});

app.get('/login', function(req, res){
    res.sendFile(_path + '/frontend/login.html');
});

app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.passward;
    
    if (username && password) {
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/diary');
                response.end();
            } else {              
                response.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
            }            
        });
    } else {        
        response.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');    
        response.end();
    }
});

app.get('/search_id', function(req, res){
    res.sendFile(_path + '/frontend/search id.html');
});

//위에 3개 연결 성공

app.get('/diary', function(req, res){
    res.sendFile(_path + '/frontend/sharing.html');
});

app.get('/setting', function(req, res){
    res.sendFile(_path + '/frontend/setting.html');
});

app.get('/friends', function(req, res){
    res.sendFile(_path + '/frontend/fri.html');
});

app.get('/change_pw', function(req, res){
    res.sendFile(_path + '/frontend/pwd.html');
});

//위에 4개 연결 성공

app.listen(PORT, function(err){
    if(err){
        return console.log(err);
    }
    console.log("the sever is listening on port 3000");
});