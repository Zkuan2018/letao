//左边的图表

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector('.charts_left'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2018注册人数'
    },
    tooltip: {},
    legend: {
        data:['人数', '销量']
    },
    xAxis: {
        data: ["一月","二月","三月","四月","五月","六月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'line',
        data: [1000, 2000, 1500, 1800, 995, 2200]
    },
    {
        name: '销量',
        type: 'line',
        data: [2200, 1300, 2000, 920, 600, 1800]
    },
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

//右边的图表

var myChart1 = echarts.init(document.querySelector('.charts_right'));

option1 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','李宁','新百伦','阿迪王']
    },
    series : [
        {
            name: '销售情况',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪王'},
                {value:234, name:'李宁'},
                {value:135, name:'新百伦'},
                {value:1548, name:'阿迪'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

myChart1.setOption(option1);