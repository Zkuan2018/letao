
//进度条
$(document).ajaxStart(function() {
    NProgress.start(); 
});

$(document).ajaxStop(function() {
    setTimeout(function() {
        NProgress.done();
    },500);
    
});


//二级菜单的显示与隐藏
$('.second').prev().on('click', function() {
    // console.log( "1" );
    $(this).next().slideToggle();
})

//点击icon-menu,侧边栏隐藏
$('.icon-menu').on('click', function() {
    // console.log( "1" );
    $('.lt_aside').toggleClass('active');
    $('body').toggleClass('active');
    $('.lt_header').toggleClass('active');
})

//点击icon-logout,退出登录
$('.icon-logout').on('click', function() {
    // console.log( "1" );
    $('#logoutModal').modal('show');
    
})

//点击模态框中的btn-logout,退出登录
$(".btn-logout").on('click', function() {
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        success:function(info) {
            console.log( info );
            if(info.success) {
                location.href = "login.html";
            }
        }
    })
})