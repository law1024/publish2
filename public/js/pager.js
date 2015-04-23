define([
    'jquery'
], function(
    $
) {
    // Pager构造函数
    function Pager() {
        this.$view = $('<div class="page"></div>');
        //this.
        this.toEmptyPage();
        var pageList = Pager.pageList;
        this.index   = pageList.length;

        Pager.pageList.push(this);
    }

    $.extend(Pager.prototype, {
        // 转换成empty page
        toEmptyPage: function() {
            var $view = this.$view;
            if ($view.hasClass('empty')) {
                return;
            }
            $view.addClass('empty').html('<div class="empty-inner"><p>空白页</p></div>');

            return this;
        },

        // 转换成edit page
        toEditPage: function() {
            var $view = this.$view;
            if (!$view.hasClass('empty')) {
                return;
            }
            $view.removeClass('empty').html('');
            
            return this;
        },

        appendTo: function($container) {
            this.$view.appendTo($container);
            return this;
        }
    });

    $.extend(Pager, {
        // 当前页
        current: 0,
        // 保存所有page实例的数组
        pageList: [],

        $container: $('#page-container'),
        // 获取一个page实例
        getInstance: function() {
            return new Pager();
        },
        add: function() {
            this.$container.append(this.getInstance().$view);
        },
        // 在当前页前插入页
        before: function() {
            this.currentPage().$view.before(this.getInstance().$view);
            this.next(true);
            //debugger;
            setTimeout(function() {
                this.prev(false);
            }.bind(this));
        },
        // 在当前页后插入页
        after: function() {
            this.currentPage().$view.after(this.getInstance().$view);
            // 移动到该页
            this.next();
        },
        //删除当前页
        remove: function(index) {
            if (index >= this.totalPages()) {
                //index超长了
                return;
            }
            var page = null;
            if (!index) {
                page = this.currentPage();
            } else {
                page = this.pageList[index];
            }
            //未完待续
        },
        // 获取totalPages
        totalPages: function() {
            return this.pageList.length;
        },

        // 获取当前页面实例
        currentPage: function() {
            return this.pageList[this.current];
        },
        // 向后翻页
        next: function(noTransition) {
            if (this.current >= this.totalPages() - 1) {
                return;
            }
            console.log('next');
            // 这里先写死翻页操作
            this.move(-(this.current + 1) * 486, noTransition).current ++;
        },
        prev: function(noTransition) {
            if (this.current === 0) {
                return;
            }
            console.log('prev');
            this.move(-(this.current - 1) * 486, noTransition).current --;
        },

        move: function(height, noTransition) {
            if (noTransition) {
                this.$container.removeClass('animate');
            } else {
                this.$container.addClass('animate');
                //debugger;
            }
            this.$container.css({
                '-webkit-transform': 'translate(0, '+ height +'px) translateZ(0)',
                        'transform': 'translate(0, '+ height +'px) translateZ(0)'
            });
            return this;
        }

    });

    return Pager;

});