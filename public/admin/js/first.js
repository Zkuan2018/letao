$(function() {
    var page = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(info) {
                // console.log( info );
                $('tbody').html( template('tpl', info) );
                 //添加分页功能
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,p) {
                        page = p;
                        render();
                    }

                })
            }
        })
    }

    //点击添加分类btn-add,绑定事件
    $('.btn-add').on('click', function() {
        $('#addModal').modal('show');
    })

    //进行表单验证
    $('form').bootstrapValidator({
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名称不能为空",
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
    })

    //表单验证成功,发送ajax请求
    $('form').on('success.form.bv', function(e) {
        //阻止默认跳转
        e.preventDefault();
        // console.log( "1" );
        //发送请求
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$('form').serialize(),
            success:function(info) {
                console.log( info );
                if( info.success) {
                    //隐藏模态框
                    $('#addModal').modal('hide');
                    //添加分类完成,重新渲染page = 1;
                    page = 1;
                    render();
                    //重置表单的样式和内容
                    $('form').data('bootstrapValidator').resetForm(true);
                }
            }
        })
    })

   
})