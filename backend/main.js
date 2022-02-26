const express = require('express');
const { get } = require('http');
const app = express();
const mysql = require('mysql');

var is_login = false;
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

app.post('/login', function(request, response) {
    var id = request.body.id;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM user WHERE id = ? AND password = ?', [id, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.id = id;
                response.redirect('/diary'); // 로그인 정보 일치하면 메인 페이지로 이동
                response.end();
            } else {              
                response.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>'); 
                // 로그인 정보가 맞지 않을 시에 경고창 띄우기
            }            
        });
    } else {        
        response.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');
        // 로그인 정보가 입력이 되지 않았을 때 경고창 띄우기
        response.end();
    }
});

app.get('/search_id', function(req, res){
    res.sendFile(_path + '/frontend/search id.html');
});

app.get('/diary', function(req, res){
    res.sendFile(_path + '/frontend/sharing.html');
});

app.get('/setting', function(req, res){
    res.sendFile(_path + '/frontend/setting.html');
});

app.post('', function(request, response) {
    request.session.loggedin = false;
    response.send('<script type="text/javascript">alert("성공적으로 로그아웃 되었습니다."); document.location.href="/";</script>');
    response.end();
});

// 로그아웃 버튼 누를 시에 로그아웃 확인 후 시작 페이지가 떠야되는데 아직 그것까지는 연결을...

app. get('/register', function(req, res){
    res.sendFile(_path + '/frontend/signup.html');
})

app.post('/register', function(request, response) {
    var username = request.body.username;
    var id = request.body.id;
    var number = request.body.number; // 주민등록번호
    var password = request.body.password;
    var password2 = request.body.password2; // 비밀번호 확인 시 입력한 문자열
    var phonenumber = request.body.phonenumber;
    var email = request.body.email;
    console.log(username, password, number, email);
    if (username && password && number && email) {
        connection.query('SELECT * FROM user WHERE username = ? AND number = ? AND phonenumber = ? AND id = ? AND password = ? AND email = ?', [username, number, phonenumber, id, password, number, email], function(error, results, fields) {
            if (error) throw error;
            if (results.length <= 0 && password==password2) {
                connection.query('INSERT INTO user (username, number, phonenumber, id, password, number, email) VALUES(?,?,?)', [username, number, phonenumber, id, password, number, email],
                // db에 정보 저장
                function (error, data) {
                    if (error)
                    console.log(error);
                    else
                    console.log(data);
                });
                response.redirect('/register_complete'); // 회원가입 완료 시 회원가입 완료 안내 페이지로 이동
            } else if(password!=password2){
                // 비밀번호와 비밀번호 재확인 시 일치하지 않을 때
                response.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); document.location.href="/register";</script>');    
            }
            else {
                // 아이디가 이미 있을 때
                response.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); document.location.href="/register";</script>');    
            }            
            response.end();
        });
    } else {
        // 입력되지 않은 정보가 있을 때
        response.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); document.location.href="/register";</script>');    
        response.end();
    }
});

app. get('/register_complete', function(req, res){
    res.sendFile(_path + '/frontend/signup-complet.html');
    // 회원가입 완료 페이지
});

app.get('/find_pw', function(req, res){
    res.sendFile(_path + '/frontend/search pw-1.html');
    // 비밀번호 찾기 페이지 
});

app.get('/find_pw_phone', function(req, res){
    res.sendFile(_path + '/frontend/search pw-2.html');
    // 전화번호로 인증하기 페이지
});

app.get('/find_pw_email', function(req, res){
    res.sendFile(_path + '/frontend/search pw-3.html');
    // 이메일로 인증하기 페이지
});

app.get('/friends', function(req, res){
    res.sendFile(_path + '/frontend/fri.html');
});

app.get('/change_pw', function(req, res){
    res.sendFile(_path + '/frontend/pwd.html');
});

app.listen(PORT, function(err){
    if(err){
        return console.log(err);
    }
    console.log("the sever is listening on port 3000");
});