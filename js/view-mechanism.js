$(function () {
    var id=GetQueryString("id");
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
        var html_hour = hour + ":" + minute + ":" + second;
        var html_week = vWeek[vWeek_s];

        $(".time-year").html(html_year);
        $(".time-hour").html(html_hour);
        $(".time-week").html(html_week);
    }

    setInterval(function () {
        time()
    }, 1000);
    ajax_get("/data/over/all?agencyId="+id,function(data){
        totalData(data.data)
    });
    //归属数据
    ajax_get("/data/signup/sum?agencyId="+id,function(data){
        ascription(data.data);
    });
    ajax_get("/data/selfagency/singup?agencyId="+id,function(data){
        student(data.data)
    });
    //各机构文化课招生情况
    ajax_get("/data/selfagency/cultural?agencyId="+id,function(data){
        course(data.data)
    });
    //数据获取量
    ajax_get("/data/single/data?agencyId="+id,function(data){
        getList(data.data);
    });
    //百度渠道获取数据
    ajax_get("/data/baidu/data",function(data){
        var list=data.data,i=0,len=list.length,html='';
        for(;i<len;i++){
            var v=list[i];
            html+=' <tr>\n' +
                '<td>'+v.agencyName+'</td>\n' +
                '<td>'+v.dataAmount+'</td>\n' +
                '<td>'+v.effectiveData+'</td>\n' +
                '<td>'+(v.effectiveRate*100).toFixed(2)+'%</td>\n' +
                '<td>'+v.todayConsumeMoney+'</td>\n' +
                '<td>'+(v.effective).toFixed(2)+'</td>\n' +
                '</tr>'
        }
        $("tbody").html(html)
    });
    //整体情况分析
    function totalData(data) {
        var year=data[0].dataTime.split("-")[0],
            x_data=[],
            year_data=[],
            last_year_data=[],
            i=0,len=data.length;
        for(;i<len;i++){
            var v=data[i];
            var t=v.dataTime.split(" ")[0];
            var date=t.split("-")[1]+"/"+t.split("-")[2];
            x_data.push({
                value: date,
                textStyle: {color: '#2BB5FF'}
            });
            year_data.push(v.enterNum);
            last_year_data.push(v.lastYearEnterNum);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('totalData'));
        // 指定图表的配置项和数据
        var option = {

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [year-1+'年', year+'年'],
                textStyle: {color: '#2BB5FF'},
                orient: 'vertical' ,
                right:'4%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,

                data: x_data,
                axisLine: {
                    lineStyle: {
                        color: '#2BB5FF',
                    }
                },
                name: '日期',
                nameTextStyle: {
                    color: '#2BB5FF'
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#2BB5FF',
                    }
                },
                splitLine: {lineStyle: {color: '#2BB5FF'}},
                name: '人数',
                nameTextStyle: {
                    color: '#2BB5FF'
                }
            },
            series: [
                {
                    name: year-1+'年',
                    type: 'line',
                    symbolSize: 8,
                    data: last_year_data,
                    itemStyle: {normal: {label: {show: true}}},
                    lineStyle: {color: '#FD375C'}
                },
                {
                    name: year+'年',
                    type: 'line',
                    symbolSize: 8,
                    data: year_data,
                    itemStyle: {normal: {label: {show: true, color: "#73D3E2"}}},
                    lineStyle: {color: '#2B44A4'}
                }
            ]
        };
        myChart.setOption(option);
    }

    //归属数据
    function ascription(data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('ascription'));
        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            color: ['#FF8A00', '#8D2EFB', '#FF0D4D', '#00DCD9', '#008EFF'],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                        {value: data.pusnNum, name: '地推',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }},
                        {value: data.otherNum, name: '其他',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }},
                        {value: data.studioNum, name: '画室',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }},
                        {value: data.edcactionNum, name: '教学部',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }},
                        {value:data.onlineNum, name: '线上',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }

    //各机构招生情况
    function student(data) {
        var i=0,len=data.length,date=[],list=[];
        for(;i<len;i++){
            var v=data[i],time=v.dataTime.split(" ")[0].split("-");
            date.push(time[1]+"/"+time[2]);
            list.push(v.sumNum);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('student'));
        // 指定图表的配置项和数据
        var option = {
            color: ['#5EDFEE'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            // grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '3%',
            //     containLabel: true
            // },
            xAxis: [
                {
                    type: 'category',
                    data: date,
                    axisTick: {
                        alignWithLabel: true
                    },
                    name: '日期',
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {lineStyle: {color: '#2BB5FF', type: 'dotted'}},
                    name: '人数',
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '40%',
                    data: list
                }
            ]
        };

        myChart.setOption(option);
    }

    //各机构文化课招生情况
    function course(data) {
        var i=0,len=data.length,date=[],list=[];
        for(;i<len;i++){
            var v=data[i],time=v.dataTime.split(" ")[0].split("-");
            date.push(time[1]+"/"+time[2]);
            list.push(v.enterNum);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('course'));
        // 指定图表的配置项和数据
        var option = {
            color: ['#5EDFEE'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            // grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '3%',
            //     containLabel: true
            // },
            xAxis: [
                {
                    type: 'category',
                    data: date,
                    axisTick: {
                        alignWithLabel: true
                    },
                    name: '日期',
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {lineStyle: {color: '#2BB5FF', type: 'dotted'}},
                    name: '人数',
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '40%',
                    data: list
                }
            ]
        };

        myChart.setOption(option);
    }

    //数据获取量
    function getList(res) {
        var i=0,len=res.length,date_list=[];
        for(;i<len;i++){
            var v=res[i],date_v=v.dataTime.split(" ")[0],time_v=date_v.split("-");
            date_list.push(time_v[1]+"/"+time_v[2])
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('getList'));
        // 指定图表的配置项和数据
        var option = {

            legend: {
                bottom: '3%',
                textStyle: {
                    color: '#fff',
                    fontSize: 11
                }
            },
            tooltip: {},
            dataset: {
                source: [
                    ['product', '数据获取量', '有效数据量', '有效率'],
                    [date_list[0], res[0].dataAmount, res[0].effectiveData,res[0].efficient*100],
                    [date_list[1], res[1].dataAmount, res[1].effectiveData,res[1].efficient*100],
                    [date_list[2], res[2].dataAmount, res[2].effectiveData,res[2].efficient*100],
                    [date_list[3], res[3].dataAmount, res[3].effectiveData,res[3].efficient*100],
                    [date_list[4], res[4].dataAmount, res[4].effectiveData,res[4].efficient*100],
                    [date_list[5], res[5].dataAmount, res[5].effectiveData,res[5].efficient*100],
                    [date_list[6], res[6].dataAmount, res[6].effectiveData,res[6].efficient*100],
                ]
            },
            xAxis: [
                {
                    type: 'category',
                    name:'日期',
                    nameTextStyle: {
                        padding: [30, 0, 0, -20]    // 四个数字分别为上右下左与原位置距离
                    },
                    // nameGap: 30 ,
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type:'value',
                    name:'人数',
                    // min: 0,
                    // max:300,
                    // interval: 50,
                    splitLine: {lineStyle: {color: '#2BB5FF', type: 'dotted'}},
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                }, {
                    type:'value',
                    min: 0,
                    max:100,
                    interval: 10,
                    splitLine: {show:false},
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },

            ],
            series: [
                // These series are in the first grid.
                {type: 'bar', xAxisIndex: 0, yAxisIndex: 0, itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 0, yAxisIndex: 0, itemStyle: {normal: {color: '#F3C938'}}},
                {
                    type: 'line',
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value[3]>0?c.value[3].toFixed(2):0)+"%";}}}},
                },

            ]
        };
        myChart.setOption(option);
    }
});