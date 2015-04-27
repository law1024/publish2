var util         = require('util');
var utility      = require('utility');
var express      = require('express');
var formidable   = require('formidable');

var router       = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Publish - less is more'
  };
  var cuid = req.cookies.uid;
  var suid = req.session.uid;

  if (cuid === suid && suid !== undefined) {
    res.render('index', data);
  } else {
    //登录
    res.render('login', data);
  }
});

router.get('/login/', function(req, res, next) {
  var data = {
    title: 'Publish - less is more'
  };
  var cuid = req.cookies.uid;
  var suid = req.session.uid;

  if (cuid === suid && suid !== undefined) {
    res.redirect('/index/');
  } else {
    //登录
    res.render('login', data);
  }
});

/* 登录接口 */
router.post('/login/', function(req, res) {
    var data  = req.body;
    var pass  = data.password;
    var email = data.email;

    if (email === "wanghaojie01" && pass === "123") {
        //session and cookie
        var session = req.session;

        var ps  = utility.md5(pass);
        var uid = utility.md5(email + ps);

        uid = utility.base64encode(uid);

        req.session.uid = uid;
        res.cookie('uid', uid);

        res.send({
            "status": 0,
            "href"  : '/index/',
            "result": ''
        });        
    } else {
        res.send({
            "status": 1,
            "result": '用户名或密码错误'
        });
    }
});


/* 首页 */
router.get('/index/', function(req, res) {
    var data = {
        title: 'Publish - less is more'
    };
    var cuid = req.cookies.uid;
    var suid = req.session.uid;

    if (cuid === suid && suid !== undefined) {
        // 这个时候有很多初始化的工作要做，
        // 首先将用户所有编辑过的页面展示出来
        res.render('index', data);
    } else {
        //登录
        res.redirect('/login/');
    }
});

/* 图片上传接口 */
router.post('/fileupload/', function(req, res) {
    //首先拿到用户的邮箱
    var cuid = req.cookies.uid;
    var suid = req.session.uid;

    if (cuid === suid && suid != undefined) {

        var form = new formidable.IncomingForm();
        // util.inspect({fields: fields, files: files});
        form.parse(req, function(err, fields, files) {
            // fields中保存了其他自定义信息
            // 获取该用户的文件夹
            res.send({
                'status': 0,
                'src'   : 'http://d.3987.com/keai_140909/001.jpg'
            });
        });
    } else {
        res.send({
            'status': 2,
            'result': '请登录'
        });
    }
});

module.exports = router;
