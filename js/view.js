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
            title: [{
                text: ''
            }, {
                subtext: '全部',
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '17%',
                top: '37%',
                textAlign: 'center'
            }, {
                subtext: '北京小泽',
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '38%',
                top: '37%',
                textAlign: 'center'
            }, {
                subtext: '济南小泽',
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '58%',
                top: '37%',
                textAlign: 'center'
            },
                {
                    subtext: '郑州小泽',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '78%',
                    top: '37%',
                    textAlign: 'center'
                }, {
                    subtext: '广州一尚',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '18%',
                    top: '82%',
                    textAlign: 'center'
                }, {
                    subtext: '西安清美',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '38%',
                    top: '82%',
                    textAlign: 'center'
                },
                {
                    subtext: '西安青卓',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '58%',
                    top: '82%',
                    textAlign: 'center'
                },
                {
                    subtext: '北京九鼎',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '78%',
                    top: '82%',
                    textAlign: 'center'
                }],
            color: ['#FF8A00', '#8D2EFB', '#FF0D4D', '#00DCD9', '#008EFF'],
            tooltip: {},
            dataset: {
                source: [
                    ['name', '全部', '北京小泽', '济南小泽', '郑州小泽', '广州一尚', '西安清美', '西安青卓', '北京九鼎'],
                    ['线上', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 73.4, 55.1],
                    ['教学部', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 83.8, 98.7],
                    ['地推', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 92.1, 85.7],
                    ['画室', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 86.4, 65.2],
                    ['其他', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 55.2, 67.1]
                ]
            },
            series: [{
                type: 'pie',
                radius: 45,
                center: ['18%', '20%'],
                label: {
                    position: 'inside',
                    formatter: '{b}\n{d}%',
                    fontSize: 10,
                },
                encode: {
                    itemName: 'name',
                    value: '全部'
                }
                // No encode specified, by default, it is '2012'.
            }, {
                type: 'pie',
                radius: 45,
                center: ['38%', '20%'],
                label: {
                    position: 'inside',
                    formatter: '{b}\n{d}%',
                    fontSize: 10,
                },
                encode: {
                    itemName: 'name',
                    value: '北京小泽'
                }
            }, {
                type: 'pie',
                radius: 45,
                center: ['58%', '20%'],
                label: {
                    position: 'inside',
                    formatter: '{b}\n{d}%',
                    fontSize: 10,
                },
                encode: {
                    itemName: 'name',
                    value: '济南小泽'
                }
            },
                {
                    type: 'pie',
                    radius: 45,
                    center: ['78%', '20%'],
                    label: {
                        position: 'inside',
                        formatter: '{b}\n{d}%',
                        fontSize: 10,
                    },
                    encode: {
                        itemName: 'name',
                        value: '郑州小泽'
                    }
                },
                {
                    type: 'pie',
                    radius: 45,
                    center: ['18%', '65%'],
                    label: {
                        position: 'inside',
                        formatter: '{b}\n{d}%',
                        fontSize: 10,
                    },
                    encode: {
                        itemName: 'name',
                        value: '广州一尚'
                    }
                }, {
                    type: 'pie',
                    radius: 45,
                    center: ['38%', '65%'],
                    label: {
                        position: 'inside',
                        formatter: '{b}\n{d}%',
                        fontSize: 10,
                    },
                    encode: {
                        itemName: 'name',
                        value: '西安清美'
                    }
                }, {
                    type: 'pie',
                    radius: 45,
                    center: ['58%', '65%'],
                    label: {
                        position: 'inside',
                        formatter: '{b}\n{d}%',
                        fontSize: 10,
                    },
                    encode: {
                        itemName: 'name',
                        value: '西安青卓'
                    }
                },
                {
                    type: 'pie',
                    radius: 45,
                    center: ['78%', '65%'],
                    label: {
                        position: 'inside',
                        formatter: '{b}\n{d}%',
                        fontSize: 10,
                    },
                    encode: {
                        itemName: 'name',
                        value: '北京九鼎'
                    }
                }]
        };
        myChart.setOption(option);
    }

    //各机构招生情况
    function student() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('student'));
        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: [{
                    name:'当天',
                    textStyle:{
                        color:'#fff',
                        fontSize:11,
                        padding: [0, 0,0,13],
                    },
                }, '前一天', '前两天', '前三天', '前四天', '前五天', '前六天'],
                bottom: '5%',
                textStyle:{
                    color:'#fff',
                    fontSize:11,
                    padding: [0, 0,0,8],
                },
                align: '500' ,
                itemWidth: 40,
                itemHeight: 22 ,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['北京小泽', '济南小泽', '郑州小泽', '广州一尚', '西安清美', '西安青卓', '北京九鼎', '画室'],
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {lineStyle: {color: '#2BB5FF',type: 'dotted'}},
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        },
                    },
                }
            ],
            series: [

                {
                    name: '当天',
                    type: 'bar',
                    barWidth: '25',
                    stack: '广告',
                    itemStyle: {normal: {color: '#19287A', label: {show: true}}},
                    data: [120, 132, 101, 134, 90, 230, 210, 90]
                },
                {
                    name: '前一天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#39D9D6', label: {show: true}}},
                    data: [220, 182, 191, 234, 290, 330, 310, 139]
                },
                {
                    name: '前两天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#8433FD', label: {show: true}}},
                    data: [150, 232, 201, 154, 190, 330, 410, 120]
                },
                {
                    name: '前三天',
                    type: 'bar',
                    barWidth: '25',
                    stack: '广告',
                    itemStyle: {normal: {color: '#E8C212', label: {show: true}}},
                    data: [120, 132, 101, 134, 90, 230, 210, 90]
                },
                {
                    name: '前四天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#3ECF67', label: {show: true}}},
                    data: [220, 182, 191, 234, 290, 330, 310, 120]
                },
                {
                    name: '前五天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#FD375C', label: {show: true}}},
                    data: [150, 232, 201, 154, 190, 330, 410, 340]
                }, {
                    name: '前六天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#FF9019', label: {show: true}}},
                    data: [150, 232, 201, 154, 190, 330, 410, 200]
                },


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
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: [{
                    name:'当天',
                    textStyle:{
                        color:'#fff',
                        fontSize:11,
                        padding: [0, 0,0,13],
                    },
                }, '前一天', '前两天', '前三天', '前四天', '前五天', '前六天'],
                bottom: '5%',
                textStyle:{
                    color:'#fff',
                    fontSize:11,
                    padding: [0, 0,0,8],
                },
                align: '500' ,
                itemWidth: 40,
                itemHeight: 22 ,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['北京小泽', '济南小泽', '郑州小泽', '广州一尚', '西安清美', '西安青卓', '北京九鼎', '画室'],
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {lineStyle: {color: '#2BB5FF',type: 'dotted'}},
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        },
                    },
                }
            ],
            series: [

                {
                    name: '当天',
                    type: 'bar',
                    barWidth: '25',
                    stack: '广告',
                    itemStyle: {normal: {color: '#19287A', label: {show: true}}},
                    data: [120, 132, 101, 134, 90, 230, 210, 90]
                },
                {
                    name: '前一天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#39D9D6', label: {show: true}}},
                    data: [220, 182, 191, 234, 290, 330, 310, 139]
                },
                {
                    name: '前两天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#8433FD', label: {show: true}}},
                    data: [150, 232, 201, 154, 190, 330, 410, 120]
                },
                {
                    name: '前三天',
                    type: 'bar',
                    barWidth: '25',
                    stack: '广告',
                    itemStyle: {normal: {color: '#E8C212', label: {show: true}}},
                    data: [120, 132, 101, 134, 90, 230, 210, 90]
                },
                {
                    name: '前四天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#3ECF67', label: {show: true}}},
                    data: [220, 182, 191, 234, 290, 330, 310, 120]
                },
                {
                    name: '前五天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#FD375C', label: {show: true}}},
                    data: [150, 232, 201, 154, 190, 330, 410, 340]
                }, {
                    name: '前六天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#FF9019', label: {show: true}}},
                    data: [150, 232, 201, 154, 190, 330, 410, 200]
                },


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
            title: [{
                text: ''
            }, {
                subtext: '全部',
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '15%',
                top: '42%',
                textAlign: 'center'
            }, {
                subtext: '北京小泽',
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '40%',
                top: '42%',
                textAlign: 'center'
            }, {
                subtext: '济南小泽',
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '65%',
                top: '42%',
                textAlign: 'center'
            },
                {
                    subtext: '郑州小泽',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '90%',
                    top: '42%',
                    textAlign: 'center'
                }, {
                    subtext: '广州一尚',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '15%',
                    top: '84%',
                    textAlign: 'center'
                }, {
                    subtext: '西安清美',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '40%',
                    top: '84%',
                    textAlign: 'center'
                },
                {
                    subtext: '西安青卓',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '65%',
                    top: '84%',
                    textAlign: 'center'
                },
                {
                    subtext: '北京九鼎',
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '90%',
                    top: '84%',
                    textAlign: 'center'
                }],
            legend: {
                bottom: '3%',
                textStyle:{
                    color:'#fff',
                    fontSize:11
                }},
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
                {type: 'category', gridIndex: 0,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {type: 'category', gridIndex: 1,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {type: 'category', gridIndex: 2,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {type: 'category', gridIndex: 3,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {type: 'category', gridIndex: 4,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {type: 'category', gridIndex: 5,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {type: 'category', gridIndex: 6,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {type: 'category', gridIndex: 7,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },}
            ],
            yAxis: [
                {gridIndex: 0,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {gridIndex: 1,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {gridIndex: 2,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {gridIndex: 3,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {gridIndex: 4,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {gridIndex: 5,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {gridIndex: 6,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },},
                {gridIndex: 7,axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },}
            ],
            grid: [
                {top: '10%',bottom: '60%',right:'75%',left:'5%'},
                {top: '10%',bottom: '60%',right:'50%',left:'30%'},
                {top: '10%',bottom: '60%',right:'25%',left:'55%'},
                {top: '10%',bottom: '60%',right:'0',left:'80%'},
                {top: '50%',bottom: '20%',right:'75%',left:'5%'},
                {top: '50%',bottom: '20%',right:'50%',left:'30%'},
                {top: '50%',bottom: '20%',right:'25%',left:'55%'},
                {top: '50%',bottom: '20%',right:'0',left:'80%'}
            ],
            series: [
                // These series are in the first grid.
                {type: 'bar', xAxisIndex: 0, yAxisIndex: 0,itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 0, yAxisIndex: 0,itemStyle: {normal: {color: '#F3C938'}}},
                {type: 'line', xAxisIndex: 0, yAxisIndex: 0,itemStyle: {normal: {color: '#E83751', label: {show: true}}}},
                // These series are in the second grid.
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1,itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1,itemStyle: {normal: {color: '#F3C938'}}},
                {type: 'line', xAxisIndex: 1, yAxisIndex: 1,itemStyle: {normal: {color: '#E83751', label: {show: true}}}},

                {type: 'bar', xAxisIndex: 2, yAxisIndex: 2,itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 2, yAxisIndex: 2,itemStyle: {normal: {color: '#F3C938'}}},
                {type: 'line', xAxisIndex: 2, yAxisIndex: 2,itemStyle: {normal: {color: '#E83751', label: {show: true}}}},

                {type: 'bar', xAxisIndex: 3, yAxisIndex: 3,itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 3, yAxisIndex: 3,itemStyle: {normal: {color: '#F3C938'}}},
                {type: 'line', xAxisIndex: 3, yAxisIndex: 3,itemStyle: {normal: {color: '#E83751', label: {show: true}}}},

                {type: 'bar', xAxisIndex: 4, yAxisIndex: 4,itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 4, yAxisIndex: 4,itemStyle: {normal: {color: '#F3C938'}}},
                {type: 'line', xAxisIndex: 4, yAxisIndex: 4,itemStyle: {normal: {color: '#E83751', label: {show: true}}}},

                {type: 'bar', xAxisIndex: 5, yAxisIndex: 5,itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 5, yAxisIndex: 5,itemStyle: {normal: {color: '#F3C938'}}},
                {type: 'line', xAxisIndex: 5, yAxisIndex: 5,itemStyle: {normal: {color: '#E83751', label: {show: true}}}},

                {type: 'bar', xAxisIndex: 6, yAxisIndex: 6,itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 6, yAxisIndex: 6,itemStyle: {normal: {color: '#F3C938'}}},
                {type: 'line', xAxisIndex: 6, yAxisIndex: 6,itemStyle: {normal: {color: '#E83751', label: {show: true}}}},

                {type: 'bar', xAxisIndex: 7, yAxisIndex: 7,itemStyle: {normal: {color: '#7065FB'}}},
                {type: 'bar', xAxisIndex: 7, yAxisIndex: 7,itemStyle: {normal: {color: '#F3C938'}}},
                {type: 'line', xAxisIndex: 7, yAxisIndex: 7,itemStyle: {normal: {color: '#E83751', label: {show: true}}}},
            ]
        };
        myChart.setOption(option);
    }
});