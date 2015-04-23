define([
    'jquery'
], function(
    $
) {
    /*
    * 选项卡的抽象类
    */
    var tab = {
        state: {
            FILL: 'fill'
        },
        //给一个dom片段注册为一个选项卡
        register: function(selector) {
            
            $(selector).each(function(idx, item) {
                //只需找到第一层的tab-content
                var $item     = $(item);
                var $tabs     = $item.find('.tab-nav:first').children();
                var $contents = $item.find('.tab-content:first').children();
                
                $item.on("click", ".tab-nav > ", function() {
                    var $this = $(this);
                    //已经被选中了
                    if ($this.hasClass("on")) {
                        return;
                    }
                    $tabs.filter(".on").removeClass("on");
                    
                    $this.addClass("on");

                    //content dom只有一个
                    if ($contents.length === 1) {
                        //$contents.html(content);
                        //使用填充的方式

                        console.warn("where is the data");
                    } else {
                        $contents.hide().eq($this.index()).show();
                    }
                });
                //默认选中第一个
                $tabs.first().click();
            });
        }
    };

    return tab;
});