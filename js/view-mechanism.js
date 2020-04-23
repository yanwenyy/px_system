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
        var html_hour = hour + ":" + minute + ":" + second;
        var html_week = vWeek[vWeek_s];

        $(".time-year").html(html_year);
        $(".time-hour").html(html_hour);
        $(".time-week").html(html_week);
    }

    setInterval(function () {
        time()
    }, 1000);
    totalData();
    ascription();
    student();
    course();
    getList();

    //整体情况分析
    function totalData() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('totalData'));
        // 指定图表的配置项和数据
        var option = {

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['2019年', '2020年'],
                textStyle: {color: '#2BB5FF'},
                orient: 'vertical' ,
                right:'4%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,

                data: [
                    {
                        value: '周一',
                        textStyle: {color: '#2BB5FF'}
                    }, {
                        value: '周二',
                        textStyle: {color: '#2BB5FF'}
                    }, {
                        value: '周三',
                        textStyle: {color: '#2BB5FF'}
                    }, {
                        value: '周四',
                        textStyle: {color: '#2BB5FF'}
                    }, {
                        value: '周五',
                        textStyle: {color: '#2BB5FF'}
                    }, {
                        value: '周六',
                        textStyle: {color: '#2BB5FF'}
                    },],
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
                    name: '2019年',
                    type: 'line',
                    symbolSize: 8,
                    data: [85, 70, 15, 87, 39, 67, 67],
                    itemStyle: {normal: {label: {show: true}}},
                    lineStyle: {color: '#FD375C'}
                },
                {
                    name: '2020年',
                    type: 'line',
                    symbolSize: 8,
                    data: [14, 45, 65, 12, 33, 23, 56],
                    itemStyle: {normal: {label: {show: true, color: "#73D3E2"}}},
                    lineStyle: {color: '#2B44A4'}
                }
            ]
        };
        myChart.setOption(option);
    }

    //归属数据
    function ascription() {
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
                        {value: 310, name: '地推',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }},
                        {value: 234, name: '其他',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }},
                        {value: 135, name: '画室',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }},
                        {value: 154, name: '教学部',label: {
                                position: 'inside',
                                formatter: '{b}\n{d}%',
                                fontSize: 16,
                            }},
                        {value: 335, name: '线上',label: {
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
    function student() {
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
                    data: ['04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16'],
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
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

        myChart.setOption(option);
    }

    //各机构文化课招生情况
    function course() {
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
                    data: ['04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16'],
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
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

        myChart.setOption(option);
    }

    //数据获取量
    function getList() {
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
                    ['1', 41.1, 30.4, 65.1],
                    ['2', 86.5, 92.1, 85.7],
                    ['3', 24.1, 67.2, 79.5],
                    ['4', 24.1, 67.2, 79.5],
                    ['5', 24.1, 67.2, 79.5],
                    ['6', 24.1, 67.2, 79.5],
                    ['7', 24.1, 67.2, 79.5],
                    ['8', 24.1, 67.2, 79.5],
                ]
            },
            xAxis: [
                {
                    type: 'category',
                    name:'日期',
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
                    min: 0,
                    max:300,
                    interval: 50,
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
                    yAxisIndex: 0,
                    itemStyle: {normal: {color: '#E83751', label: {show: true}}},
                    yAxisIndex: 1,
                },

            ]
        };
        myChart.setOption(option);
    }
});