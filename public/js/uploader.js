define([
  "jquery"
],
function(
  $
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
      file: file
    };

    if (/\.(png|jpg|jpeg)/.test(postfix)) {
      //如果是图片，直接将dataURL返回
      var reader = new FileReader();
      //onload事件
      reader.addEventListener("load", function(e) {
        //$.trigger("upload.complete", e.target.result);
        !!callback && callback(e.target.result);
        //这个地方需要把$page传进来
      }, false);

      reader.readAsDataURL(file);
      //将文件放到fileList
      fileList.push(data);
    } else {
      console.log("上传的是多媒体");
    }
  }

  var uploader = {

    register: function($button, callback) {
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

    upload: function(file) {
      if (!!file) {

      } else {
        //上传整个fileList
      }
    }
  
  };
  //将按钮注册为文件上传组件

  return uploader;
});