define([
  "jquery"
], function(
  $
) {
  //右键菜单
  //设置dom结构
  function buildMenu(data, menuId, subMenu) {
    var $menu = $('<ul class="context-menu"></ul>');
    if (menuId) {
      $menu.attr("id", menuId);
    }
    //可能需要递归的创建submenu
    if (subMenu) {
      $menu.addClass("context-submenu");
    }
    for (var i = 0; i < data.length; i ++) {
      var item = data[i];
      if (item.divider) {
        $menu.append('<li class="divider"></li>');
      } else if (item.header) {
        $menu.append('<li class="nav-header">'+ data[i].header +'</li>');
      } else {
        if (!item.href) {
          item.href = "javascript:;"
        }
        $sub = $('<li><a href="'+ item.href +'">'+ item.text +'</a></li>');
        if (item.subMenu) {
          //有子菜单
          $sub.addClass("has-submenu");
        }
        //这里的按钮有可能会被注册为文件添加按钮
        if (item.klass) {
          $sub.find("a").attr("class", item.klass);
        }
        //初始化即执行
        if (item.init) {
          //把按钮返回回去
          item.init($sub.find("a"));
        }
        //点击执行
        if (item.action) {
          
          (function(action) {
            $sub.find("a").on("click", function(e) {
              action(e);
            });
          })(item.action);
        }
        $menu.append($sub);
        if (item.subMenu) {
          //在这里进行递归
          $menu.find("li:last").append(buildMenu(item.subMenu, "", true));
        }
      }
    }
    return $menu;
  }
  var menu = {
    init: function() {
      $(document).on("click", function() {
        //将所有右键弹出菜单都消除
        $(".context-menu").fadeOut(100, function() {
          $(this).css("display", "").find(".drop-left").removeClass("drop-left");
        });
      });

      $(document).on("contextmenu", function() {
        $(".context-menu").fadeOut(100);
      });

      $(document).on("mouseenter", ".has-submenu", function() {
        var $sub  = $(this).find(".context-submenu:first");
        var subWidth  = $sub.width();
        var subLeft   = $sub.offset().left;
        var collision = (subWidth+subLeft) > window.innerWidth;
        if(collision) {
          $sub.addClass('drop-left');
        }
      });
    },
    //合理的使用事件代理有很多好处
    attach: function(container, data) {
      var self = this;
      //生成菜单并添加到body中
      var menuId = "menu-" + new Date().getTime();

      //给$container添加右键功能
      $(document).on("contextmenu", container, function(e) {
        e.preventDefault();
        e.stopPropagation();
        //显示右键出来的菜单
        self.$target = $(this);
        if (self.$target.hasClass('edit-node')) {
            self.$target.removeClass('done');
        }
        $(".context-menu").find(".drop-left").removeClass("drop-left");
        var $menu = $("#" + menuId);
        //定位
        var menuHeight = $menu.height();
        if (e.pageY + menuHeight > $(document).height()) {
          $menu.addClass("context-menu-up").css({
            top : e.pageY - menuHeight - 20,
            left: e.pageX - 15
          });
        } else {
          $menu.removeClass("context-menu-up").css({
            top : e.pageY + 6,
            left: e.pageX - 15
          });
        }
        $menu.fadeIn(100);
      });

      $("body").append(buildMenu(data, menuId));
    }

  };
  return menu;
});