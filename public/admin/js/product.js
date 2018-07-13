$(function() {
    var page = 1;
    var pageSize = 2;
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
                console.log( info );
                $('tbody').html( template('tpl', info) );
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
})