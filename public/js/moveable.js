define([
    'jquery'
], function(
    $
) {
    return {
        move: function(opts) {
            var $container = opts.$container;
            var $handle    = opts.$handle ?
                             opts.$handle : opts.$container;

            var startX, startY;

            var top  = parseInt($container.css('top'));//$container;
                left = parseInt($container.css('left'));//opts.wrap.left;

            var moveAction = function(e) {
                
                var moveX = e.pageX - startX,
                    moveY = e.pageY - startY;

                $container.css({
                    left: moveX + left,
                    top : moveY + top
                });
            };
            var upAction = function(e) {

                $(document).off('mousemove', moveAction);
                $(document).off('mouseup', upAction);

                //更新状态
                top  = parseInt($container.css('top'));
                left = parseInt($container.css('left'));
            }
            
            $handle.on('mousedown', function(e) {
                startX = e.pageX;
                startY = e.pageY;
                //给document绑上mousemove、mouseup事件
                $(document).on('mousemove', moveAction);
                $(document).on('mouseup', upAction);
            });
        }
    };
});