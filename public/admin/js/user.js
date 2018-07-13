
$(function() {
    var page = 1;
    var pageSize = 5;
    var id;
    var isDelete;
   render();
   function render() {
       $.ajax({
           type:'get',
           url:'/user/queryUser',
           data:{
            page:page,
            pageSize:pageSize
           },
           success:function(info) {
            //    console.log( info );
               $('tbody').html( template('tpl', info));
               $('#paginator').bootstrapPaginator({
                   bootstrapMajorVersion:3,
                   currentPage:page,
                   totalPages:Math.ceil(info.total/info.size),
                   //回调函数
                   onPageClicked:function(a,b,c,p) {
                    page = p;
                    render();
                   }
               })
           }
       })
   } 

   //点击启用/禁用
   $('tbody').on('click','.btn' ,function() {
       $('#userModal').modal('show');
      id = $(this).parent().data( 'id' );
    //   console.log( id );
      isDelete = $(this).hasClass('btn-danger')?0:1;
    //   console.log( isDelete );
   })
   $('.btn-confirm').on('click', function(e) {
       e.preventDefault();
       //发送ajax请求
       $.ajax({
           type:'post',
           url:'/user/updateUser',
           data:{
               id:id,
               isDelete:isDelete,
           },
           success:function( info ) {
               console.log( info );
               if( info.success) {
                $('#userModal').modal('hide');
                 render();
               }
           }
       })
   })
})

//hcc:18511249258