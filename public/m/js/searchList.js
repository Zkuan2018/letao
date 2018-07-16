

$(function() {
    var page = 1;
    var pageSize = 8;
    //获取上一个页面中val的值,放到文本框中
    var key = getSearch().key;
    $('.lt_search input').val( key );
    //页面一加载就进行页面渲染
    render();
    

    //搜索功能
    $('.lt_search button').on('click', function() {
        var val = $('.lt_search input').val();
        window.location.href = "searchList.html?key="+val;
    });


    //排序功能
    $('.lt_sort li[data-type]').on('click', function() {
        //1-判断当前的li有无active类,有,改变箭头的方向
        //2-没有active类,加active类,把所有的箭头方向朝下
        if( $(this).hasClass('active') ) {
            $(this).find('.fa').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }else {
            $(this).addClass('active').siblings().removeClass('active');
            $('.lt_sort .fa').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        render();
        
    })


    
    function render() {
        var obj = {
            proName:key,
            page:page,
            pageSize:pageSize
        }
        //第四个参数
        //判断li有无active类,有的话,传第四个参数---price?num
       var $checked = $('.lt_sort li.active');
       if( $checked.length === 1) {
           //选中,传第四个参数
           var type = $checked.data('type');//获取被选中的是price还是num
           var value = $checked.find('.fa').hasClass('fa-angle-down')?2:1;//判断的箭头的方向决定是升序还是降序
           obj[type] = value;//将第四个参数放入obj中
       }

        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:obj,
            success:function(info) {
                console.log( info );
                $('.product').html( template('tpl', info));
            }
        })
    }
   
    getSearch();
    //获取url中的内容
    function getSearch() {
        var obj = {};
        var search = location.search;//地址栏参数部分
        search = decodeURI(search);//解码成字符串
        search = search.slice(1);//切割?号
        // console.log( search );
        var arr = search.split('&');
        // console.log( arr );
        arr.forEach(function(item){
            // console.log( item );
            var key = item.split('=')[0];
            var value = item.split('=')[1];
            obj[key] = value;  
            // console.log( obj );          
        });
        return obj;     
    }

    
})