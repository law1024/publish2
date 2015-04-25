var util       = require('util');
var express    = require('express');
var formidable = require('formidable');

var router     = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Publish - less is more'
  };
  res.render('index', data);
});

//图片上传接口
router.post('/publish/fileupload', function(req, res) {
    
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        // fields中保存了其他自定义信息
        
        res.end(util.inspect({fields: fields, files: files}));
    });
});

module.exports = router;
