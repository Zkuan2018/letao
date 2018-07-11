$(function () {
    // console.log( "1" );
    //1-表单校验
    $('form').bootstrapValidator({
        //配置校验的规则,根据表单中的name属性
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须为3-6位'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须为6-12位'
                    }
                }
            }
        },
        //配置验证小图标的规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    //2-表单注册一个校验成功的事件
    //注册成功的表单校验
    $('form').on('success.form.bv', function(e){
        //点击登录,阻止默认跳转,需要进行验证
        e.preventDefault();
        console.log( "需要发送ajax请求" );
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            success:function( info ) {
                console.log( info );
                if( info.error === 1000 ) {
                    alert('用户名不存在');
                }
                if( info.error === 1001 ) {
                    alert('密码错误!');
                }
                if(info.success) {
                    location.href = "index.html";
                }
            }
        })
    })



});