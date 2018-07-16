$(function() {
    $.ajax({
       type:'get',
       url:'/category/queryTopCategory',
       success:function(info) {
        //    console.log( info );
           $('.category_left ul').html( template('tpl', info ) );
           var id = info.rows[0].id;
           console.log( id );
           //渲染二级分类
          renderSecond(id);        
       } 
    });


    //点击li,切换
    $('.category_left').on('click', 'li', function() {
        var id = $(this).data('id');
        renderSecond(id);
        $(this).addClass('active').siblings().removeClass('active');
    })



    //渲染二级分类
    function renderSecond(id) {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id,
            },
            success:function( info ) {
                console.log( info );
             $('.category_right ul').html( template('tpl2', info ));
            }
        })
    }
})