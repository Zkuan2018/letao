$(function() {
    var page = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(info) {
                // console.log( info );
                $('tbody').html( template('tpl', info ));
                //分页功能操作
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

    //点击添加分类,显示模态框
    $('.btn-add').on('click', function() {
        $('#addModal').modal('show');
        //获取一级分类的所有数据,渲染
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info) {
                console.log( info );
                $('.dropdown-menu').html( template('tpl2', info) );
            }
        })
    })

    //点击下拉框中的分类,获取文本放到dropdown中,同时获取id(事件委托)
    $('.dropdown-menu').on('click', 'a', function() {
        // console.log( "1" );
        $('.dropdown-text').text( $(this).text() );
        $("[name='categoryId']").val( $(this).data('id') );  
        
        //手动重置categoryId的样式
        $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    })

    //文件上传
    //调用插件file-upload中的方法
    $('#fileupload').fileupload({
        done:function(e, data) {
            // console.log( data.result );
            $('.img_box img ').attr('src', data.result.picAddr);
            //将图片的地址给brandLogo,传给后台
            $("[name='brandLogo']").val(data.result.picAddr);
            //手动重置brandLogo的样式
            $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });

    //表单验证
    $('form').bootstrapValidator({
        fields:{
           categoryId:{
               validators:{
                   notEmpty:{
                       message:'一级分类名称不能为空',
                   }
               }
           },
           brandName:{
            validators:{
                notEmpty:{
                    message:'二级分类名称不能为空',
                }
            }
           },
           brandLogo:{
            validators:{
                notEmpty:{
                    message:'请上传品牌的图片',
                }
            }
           }
        },
        //配置验证小图标的规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置不做校验的类型
        //默认指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded:[],

    })

    //表单验证成功,发送请求
    $('form').on('success.form.bv', function(e) {
        //表单提交,阻止默认行为的跳转
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            success:function(info) {
                // console.log( info );
                if(info.success) {
                    //隐藏模态框
                    $('#addModal').modal('hide');
                    page = 1;
                    render();
                    //重置样式和内容
                    $('form').data('bootstrapValidator').resetForm(true);
                    //重置下拉框内容/图片
                    $('.dropdown-text').text("请选择一级分类");
                    $('.img_box img').attr('src', './images/none.png');
                }
            }
        })
    })
});