var util       = require('util');
var express    = require('express');
var formidable = require('formidable');

var router     = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Publish - less is more'
  };
  res.render('login', data);
});



/* 登录接口 */
router.post('/publish/login/', function(req, res) {
    var data  = req.body;
    var pass  = data.password;
    var email = data.email;

    if (email === "wanghaojie01" && pass === "123") {
        //session and cookie
        res.send({
            "status": 0,
            "href"  : '/publish/index/',
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
router.get('/publish/index/', function(req, res) {
    var data = {
        title: 'Publish - less is more'
    };
    res.render('index', data);
});

/* 图片上传接口 */
router.post('/publish/fileupload/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // fields中保存了其他自定义信息
        res.end(util.inspect({fields: fields, files: files}));
    });
});

module.exports = router;
