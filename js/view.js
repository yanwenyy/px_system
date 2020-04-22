$(function () {
    //实时time
    function time() {
        var vWeek, vWeek_s, vDay;
        vWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (date >= 0 && date <= 9) {
            date = "0" + date;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
        }
        if (second >= 0 && second <= 9) {
            second = "0" + second;
        }
        vWeek_s = date.getDay();
        var html_year = year + "/" + month + "/" + day;
        var html_hour = hour+ ":" + minute+ ":" + second;
        var html_week =vWeek[vWeek_s];

        $(".time-year").html(html_year);
        $(".time-hour").html(html_hour);
        $(".time-week").html(html_week);
    };
    setInterval(function () {
        time()
    }, 1000);
    totalData();
    //整体情况分析
    function totalData(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('totalData'));
        // 指定图表的配置项和数据
        var option = {

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['2019', '2020']
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [
                    {
                        value:'周一',
                        textStyle:{color:'#2BB5FF'}
                    }, {
                        value:'周二',
                        textStyle:{color:'#2BB5FF'}
                    }, {
                        value:'周三',
                        textStyle:{color:'#2BB5FF'}
                    }, {
                        value:'周四',
                        textStyle:{color:'#2BB5FF'}
                    }, {
                        value:'周五',
                        textStyle:{color:'#2BB5FF'}
                    }, {
                        value:'周六',
                        textStyle:{color:'#2BB5FF'}
                    }, ],

                name:'日期',
                nameTextStyle: {
                    color:'#2BB5FF'
                }
            },
            yAxis: {
                type: 'value',
                name:'人数',
                nameTextStyle: {
                    color:'#2BB5FF'
                }
            },
            series: [
                {
                    name: '2019',
                    type: 'line',
                    data: [85, 70, 15, 87, 39, 67, 67],
                    itemStyle : { normal: {label : {show: true}}}
                },
                {
                    name: '2020',
                    type: 'line',
                    data: [14, 45, 65, 12, 33, 23, 56],
                    itemStyle : { normal: {label : {show: true}}}
                }
            ]
        };

        myChart.setOption(option);
    }
});