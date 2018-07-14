$(function() {
    var page = 1;
    var pageSize = 2;
    var imgs = [];
    render();
    function render() {
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info) {
                // console.log( info );
                $('tbody').html( template('tpl', info) );
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    itemTexts:function(type, page, current) {
                        switch(type){
                            case "first":
                                 return "首页";
                            case "prev":
                                 return "上一页";
                            case "next":
                                 return "下一页";
                            case "last":
                                 return "尾页";
                            case "page":
                                 return page;

                        }
                    },
                    tooltipTitles:function(type, page, current) {
                        switch(type){
                            case "first":
                                 return "首页";
                            case "prev":
                                 return "上一页";
                            case "next":
                                 return "下一页";
                            case "last":
                                 return "尾页";
                            case "page":
                                 return '第'+page+'页';

                        }
                    },
                    onPageClicked:function(a,b,c,p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    //点击添加商品,弹出模态框
    $('.btn-add').on('click', function() {
        $('#addModal').modal('show');
        //获取二级分类的所有数据,渲染
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
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

    //点击下拉框中的a,文本放到dropdown-text中,记录id
    $('.dropdown-menu').on('click', 'a', function() {
        $('.dropdown-text').text( $(this).text() );
        $("[name='brandId']").val( $(this).data('id'));
        //重置brandId的样式
        $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })

    //文件上传
    $('#fileupload').fileupload({
        done:function(e,data) {
            if(imgs.length === 3 ) {
                return;
            }
            console.log( data.result );
            //将上传的图片push到imgs中
            imgs.push(data.result);
            $('.img_box').append('<img src= "' + data.result.picAddr +' " width="100" height="100" alt="">');
            if(imgs.length === 3) {
                $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');  
            }else {
                $('form').data('bootstrapValidator').updateStatus('brandLogo', 'INVALID');
            }
           
        }
    })

    //表单验证
    $('form').bootstrapValidator({
         //配置验证小图标的规则
         feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置不做校验的类型
        //默认指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded:[],
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类名称",
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的名称",
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的描述",
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的库存",
                    },
                    regexp:{
                        regexp:/^[1-9]\d{0,4}$/,
                        message:"请输入正确的库存(1-99999)",
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的尺码",
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确的尺码(xx-xx)",
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的原价",
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的价格",
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传3张图片",
                    }
                }
            }
        }
    })

    //表单验证成功时的事件
    $('form').on('success.form.bv', function(e) {
        e.preventDefault();
        //$('#addModal').modal('hide');
        var para =$('form').serialize();
        // console.log( para );
        para += "&picNmae1="+ imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
        para += "&picName2="+ imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
        para += "&picName3="+ imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:para,
            success:function(info) {
                // console.log( info );
                if(info.success) {
                    $('#addModal').modal('hide');
                    page = 1;
                    render();
                    //重置form样式和内容
                    $('form').data('bootstrapValidator').resetForm(true);
                    $('.dropdown-text').text("请选择二级分类");
                    // $('.img_box img').remove();
                    $('.img_box').empty();
                    //将数组置空
                    imgs = [];

                }
            }
        })
    })
})