define([
  "jquery",
  "modules/draggable"
],
function(
  $,
  draggable
) {
  //图片list
  var fileList = [];
  //对上传的文件进行进一步的处理
  function packaging(file, callback) {
    //console.log(file);
    //获取文件的后缀名
    var postfix = (file.name).match(/\.\w+$/)[0];
    //如果是图片
    var data = {
      name: "img" + new Date().getTime(),
      type: postfix,
      file: file,
      size: file.size
    };

    if (/\.(png|jpg|jpeg)/.test(postfix)) {
      /*
      //如果是图片，直接将dataURL返回
      var reader = new FileReader();
      //onload事件
      reader.addEventListener("load", function(e) {
        //$.trigger("upload.complete", e.target.result);
        !!callback && callback(e.target.result);
        //这个地方需要把$page传进来
      }, false);

      reader.readAsDataURL(file);
      */
      //将文件放到fileList
      //fileList.push(data);
      uploader.upload(data, callback);

    } else {
      console.log("上传的是多媒体");
    }
  }

  var uploader = {
    // 文件上传接口
    server  : '/publish/fileupload',

    // 注册
    register: function(opts, callback) {
      if (opts.$drag.length) {
        draggable.init(opts.$drag);
        //添加事件监听
        draggable.on('file', function(file) {
          packaging(file, callback);
        });
      }

      if (!opts.$button) {
        return;
      }
      var $button = opts.$button;

      $button.each(function(idx, item) {
        var $item = $(item);
        var $input;
        /*$item.on("click", function() {
          console.log(111);
        });*/
        //如果按钮本身就是一个文件上传按钮
        if (item.tagName.toLowerCase() === "input" && item.type === "file") {
          $input = $item;
        } else {
          //如果没有input
          $input = $('<input type="file" class="uploader-input">').css({
            opacity: "0",
            display: "none"
          })
          $item.after($item);
          //点击button，触发input点击事件
          $item.on("click", function(e) {
            e.stopPropagation();
            $input.css({
              "display": "block"
            });
            //$input[0].focus();
            $input[0].click();
            $input.css({
              "display": "none"
            });
          });
        }
        $input.on("change", function(e) {
          //e.target.files
          //console.info(e.target.files[0]);
          packaging(e.target.files[0], callback);
          
        });
      });
    },

    upload: function(data, callback) {

      if (!!data) {
        //上传文件
        var form = new FormData();
        var idx;

        for (idx in data) {
          if (!data.hasOwnProperty(idx)) {
            continue;
          }
          form.append(idx, data[idx]);
        }

        $.ajax({
          url : this.server,
          type: 'POST',
          data: form,
          processData: false,
          contentType: false,
          // success
          success: function(res) {
            console.log(res);
            // ok
            if (res.status === 0) {
              callback(res.src);
            } else {
              // 上传失败
              // 提示
            }
          },
          // fail
          fail: function() {
            console.log('err');
          }
        });

      } else {
        //上传整个fileList
      }
    }
  
  };
  //将按钮注册为文件上传组件

  return uploader;
});