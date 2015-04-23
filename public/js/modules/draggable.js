define([
    'jquery'
], function(
    $
) {
    //可拖拽
    $(document).on({
        // 拖离
        dragleave: function(e) {
            e.preventDefault();
        },
        // 拖放后
        drop: function(e) {
            e.preventDefault();
        },
        // 拖入
        dragenter: function(e) {
            e.preventDefault();
        },
        // 连续拖拽
        dragover: function(e) {
            e.preventDefault();
        }
    });
    var eventList = [];

    var draggable = {

        init: function($container) {
            $container.each(function(idx, item) {

                item.addEventListener('drop', function(e) {
                    //取消默认浏览器拖拽效果
                    e.preventDefault();
                    // 触发addFiles事件
                    this.trigger('file', e.dataTransfer.files[0]);

                }.bind(this), false);
            }.bind(this));
        },
        //绑定事件
        on: function(name, handle) {
            eventList.push({
                name  : name,
                handle: handle
            });
        },

        //触发事件
        trigger: function(name, data) {
            var i = 0,
                l = eventList.length;

            for (; i < l; i ++) {
                if (name === eventList[i].name) {

                    eventList[i].handle(data);
                }
            }
        }

    };

    return draggable;
});