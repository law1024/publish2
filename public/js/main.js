require.config({
    paths: {
        'jquery': 'vender/jquery'
    }
});

require([
    'jquery',
    'pager',
    'menu',
    'dialog',
    'tab',
    'uploader'
], function(
    $,
    pager,
    menu,
    dialog,
    tab,
    uploader
) {

    var dialogs = {};

    function initPage() {
        pager.add();        
        $('#switchover').on('click', 'span', function() {
            var $this = $(this);
            if ($this.data('turn') === 'next') {
                pager.next();
            } else {
                pager.prev();
            }
        });
    }

    function initMenu() {
        //pageMenu
        menu.init();
        menu.attach("#page-container", [
            /*{header: 'Options'},*/
            {
                text: '背景',
                action: function() {
                    dialogs.backgroundDialog.open();
                }
            },
            {divider: true},
            {
                text: '图片'
            },
            {
                text: '文字'
            },
            {
                text: '音乐'
            },
            {divider: true},
            {
                text: "页面",
                subMenu: [
                    {
                        text: '上方插入页',
                        action: function() {
                            pager.before();
                        }
                    },
                    {
                        text: '下方插入页',
                        action: function() {
                            pager.after();
                        }
                    },
                    {
                        text: '删除当前页'
                    }
                ]
            }
        ]);
    }

    //初始化弹窗
    function initDialog() {

        // 背景图片选择弹窗
        var backgroundDialog = dialog.getInstance({
            id     : 'background-dialog',
            title  : '背景',
            content: $('#image-template').html()
        });

        //初始化图片上传按钮
        var $backgroundView = backgroundDialog.$view;

        uploader.register({
            $drag  : $('.image-content', $backgroundView),
            $button: $('.add-image-button', $backgroundView),
        },
        function(src) {
            console.log(src);
        });

        dialogs.backgroundDialog = backgroundDialog;
        //数据的传递
    }

    function main() {
        // 弹窗map
        initPage();
        initDialog();

        initMenu();
        //初始化tab选项
        tab.register('.tab');


    }

    main();


});