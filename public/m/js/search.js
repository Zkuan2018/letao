$(function () {
    //动态渲染历史记录
    render();
    //清空功能
    $('.lt_history').on('click', '.btn_empty', function () {
        mui.confirm("你确定要删除吗?", "温馨提示", ['否', '是'], function (e) {
            // console.log( e );
            if (e.index == 1) {//是
                localStorage.removeItem('zkk_history');
                render();
            }
        })
    });

    //删除功能
    $('.lt_history').on('click', '.btn_delete', function () {
        //获取要删除的下标
        var index = $(this).data('index');
        mui.confirm('你确定要删除这条历史记录吗?', '温馨提示', ['取消', '确定'], function (e) {
            if (e.index == 1) {
                //获取数据
                var history = getHistory();             
                //删除对应的下标
                history.splice(index, 1);
                //将数据存回localStorage
                localStorage.setItem('zkk_history', JSON.stringify(history));//转成字符串才能存储
                //重新渲染
                render();

            }
        })

    });


    //添加功能
    $('.lt_search button').on('click', function() {
        //获取文本框中的内容
        var val = $('.lt_search input').val();
          console.log( val );  
        //将文本框置空
        $('.lt_search input').val('');
        if( val === '' ) {
            //提示框
            mui.toast("请输入搜索的内容");
            return;
        }
        //获取本地数据
        var history = getHistory();
        //将val存入到数组中
        //1- 最多存10条,超过,则删除最后一条
        //2- 不能重复(先判断是否存在,不存在添加,存在,先删除,再添加)
        //获取val在history中的下标
        var index = history.indexOf(val);
        if( index != -1 ) {//存在
            history.splice(index, 1);
        }
        if( history.length > 9) {
            history.pop();
        }
        history.unshift(val);//数组
        //存回localstorage
        localStorage.setItem('zkk_history', JSON.stringify(history));
        render();

        //获取文本框中的内容,进行页面跳转--searchList.html
        location.href = "searchList.html?key="+val;

    })








    //获取历史记录
    function getHistory() {
        var result = localStorage.getItem('zkk_history');//字符串
        return JSON.parse(result) || [];//转换成数组
    }
    // var history = getHistory();
    // console.log( history );
    //动态渲染历史记录(存储在本地)

    function render() {
        //获取localStorage中的数据,转换成数组,结合模板,动态渲染
        var history = getHistory();
        console.log(history);
        $('.lt_history').html(template('tpl', { list: history }));
    }

})