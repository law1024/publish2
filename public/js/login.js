(function($) {

    var $form = $('#form');

    // 发送数据请求
    function send(data) {
        $.ajax({
            url : '/login/',
            data: data,
            type: 'POST',
            dataType: 'json',
            success : function(res) {
                if (res.status === 0) {
                    //跳转
                    location.href = res.href;
                } else {
                    console.log(res.result);
                }
            },
            fail: function() {
                console.log("login fail");
            }
        });
    }

    $('#login-button').on('click', function() {
        console.info('login');
        send($form.serialize());
    });

})(jQuery);