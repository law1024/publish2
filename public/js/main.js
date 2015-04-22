require.config({
    paths: {
        'jquery': 'vender/jquery'
    }
});

require([
    'jquery',
    'pager',
    'menu'
], function(
    $,
    pager,
    menu
) {


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
                text: '背景'
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
                        text: '上方插入页'
                    },
                    {
                        text: '下方插入页'
                    },
                    {
                        text: '删除当前页'
                    }
                ]
            }
        ]);
    }

    function main() {
        initPage();
        initMenu();
    }

    main();


});