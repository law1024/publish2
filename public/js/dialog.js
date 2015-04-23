define([
    'jquery',
    'moveable'
], function(
    $,
    moveable
) {

    function Dialog(opts) {
        this.$view = $([
            '<div class="dialog">',
                '<div class="dialog-header">',
                    '<h3>提示</h3>',
                    '<span class="cancel"></span>',
                '</div>',
                '<div class="dialog-section">',
                '</div>',
                '<div class="dialog-footer">',
                    '<a href="javascript:;" class="dialog-button sure button">确定</a>',
                '</div>',
            '</div>'
        ].join(''));
        //添加到body
        this.$view.appendTo($('body'));
        var self = this;
        //关闭弹窗
        this.$view.find(".cancel").on('click', function(e) {
            e.stopPropagation();
            self.close();
        });
        var $view = this.$view;
        
        if (opts.id) {
            $view.attr("id", opts.id);
        }
        if (opts.title) {
            $view.find(".dialog-header > h3").text(opts.title);
        }
        //设置弹窗内容
        $view.find(".dialog-section").html(opts.content);
        //不显示默认的按钮
        if (!!opts.ownbutton) {
            this.$sure = $view.find(opts.ownbutton);
            //隐藏dialog-footer
            $view.find('.dialog-footer').hide();
        } else {
            this.$sure = $view.find(".sure");
        }
        this.$view.css({    
            top : 100,
            left: $(document).width() / 2
        });
        //绑定确定事件
        this.sure(opts.sure);
        this.feedback = {};

        //让自身可以拖动
        this.move({
            $container: this.$view,
            $handle   : this.$view.find('.dialog-header')
        });
    }

    Dialog.getInstance = function(opts) {
        return new Dialog(opts);
    }

    $.extend(Dialog.prototype, {
        //close
        close: function() {
            this.$view.removeClass("show");
            this.$view.css({    
                top : 100,
                left: $(document).width() / 2
            });
        },
        //open
        open: function() {
            this.$view.addClass("show");
        },

        sure: function(callback) {
            var self = this;
            this.$sure.on('click', function() {
                self.close();
                //执行回调
                if (!!callback) {
                    callback(self.feedback);
                }
            });
        },
        find: function(selector) {
            return this.$view.find(selector);
        },
        setFeedback: function(data) {
            this.feedback = data;
        }
    }, moveable);
    

    return Dialog;
});