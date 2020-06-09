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
    //整体情况分析
    ajax_get("/data/over/all", function (data) {
        totalData(data.data)
    });
    //归属数据
    ajax_get("/data/signup/sum", function (data) {
        ajax_get("/data/everysignup/sum", function (data2) {
            ascription(data.data, data2.data)
        });
    });
    ajax_get("/data/agency/studio", function (data) {
        student(data.data)
    });
    //各机构文化课招生情况
    ajax_get("/data/agency/cultural", function (data) {
        course(data.data)
    });
    //数据获取量
    ajax_get("/data/head/datacollection",function(data){
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
        var year = data[0].dataTime.split("-")[0],
            x_data = [],
            year_data = [],
            last_year_data = [],
            i = 0, len = data.length;
        for (; i < len; i++) {
            var v = data[i];
            var t = v.dataTime.split(" ")[0];
            var date = t.split("-")[1] + "/" + t.split("-")[2];
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
                data: [year - 1 + '年', year + '年'],
                textStyle: {color: '#2BB5FF'},
                orient: 'vertical',
                right: '4%'
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
                    name: year - 1 + '年',
                    type: 'line',
                    symbolSize: 8,
                    data: last_year_data,
                    itemStyle: {normal: {label: {show: true}}},
                    lineStyle: {color: '#FD375C'}
                },
                {
                    name: year + '年',
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
    function ascription(total, list) {
        var source1 = ["name", "全部"],
            source2 = ["线上", total.onlineNum],
            source3 = ['教学部', total.edcactionNum],
            source4 = ['地推', total.pusnNum],
            source5 = ['画室', total.studioNum],
            source6 = ['其他', total.otherNum],
            i = 0, len = list.length,
            agencyName = [];
        for (; i < len; i++) {
            var v = list[i];
            source1.push(v.agencyName);
            source2.push(v.onlineNum);
            source3.push(v.edcactionNum);
            source4.push(v.pusnNum);
            source5.push(v.studioNum);
            source6.push(v.otherNum);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('ascription'));
        // 指定图表的配置项和数据
        var option = {
            title: [{
                text: ''
            }, {
                subtext: source1[1],
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '17%',
                top: '37%',
                textAlign: 'center'
            }, {
                subtext: source1[2],
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '38%',
                top: '37%',
                textAlign: 'center'
            }, {
                subtext: source1[3],
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '58%',
                top: '37%',
                textAlign: 'center'
            },
                {
                    subtext: source1[4],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '78%',
                    top: '37%',
                    textAlign: 'center'
                }, {
                    subtext: source1[5],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '18%',
                    top: '82%',
                    textAlign: 'center'
                }, {
                    subtext: source1[6],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '38%',
                    top: '82%',
                    textAlign: 'center'
                },
                {
                    subtext: source1[7],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '58%',
                    top: '82%',
                    textAlign: 'center'
                },
                {
                    subtext: source1[8],
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
                    // ['name', '全部', '北京小泽','济南小泽','郑州小泽','广州一尚','西安清美','西安青卓','北京九鼎'],
                    // ['name', source1],
                    // ['线上', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 73.4, 55.1],
                    // ['教学部', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 83.8, 98.7],
                    // ['地推', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 92.1, 85.7],
                    // ['画室', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 86.4, 65.2],
                    // ['其他', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 55.2, 67.1],
                    source1,
                    source2,
                    source3,
                    source4,
                    source5,
                    source6
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
                    value: source1[1]
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
                    value: source1[2]
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
                    value: source1[3]
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
                        value: source1[4]
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
                        value: source1[5]
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
                        value: source1[6]
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
                        value: source1[7]
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
                        value: source1[8]
                    }
                }]
        };
        myChart.setOption(option);
    }

    //各机构招生情况
    function student(data) {
        var i = 0, len = data.length,
            x_data = [], list = [];
        for (; i < len; i++) {
            var v = data[i];
            x_data.push(v.agencyName);
            list.push(v.agencyDtoList);
        }
        // console.log(x_data)
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
                    name: '当天',
                    textStyle: {
                        color: '#fff',
                        fontSize: 11,
                        padding: [0, 0, 0, 13],
                    },
                }, '前一天', '前两天', '前三天', '前四天', '前五天', '前六天'],
                bottom: '5%',
                textStyle: {
                    color: '#fff',
                    fontSize: 11,
                    padding: [0, 0, 0, 8],
                },
                align: '500',
                itemWidth: 40,
                itemHeight: 22,
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    name: '画室',
                    type: 'category',
                    // data: ['北京小泽', '济南小泽', '郑州小泽', '广州一尚', '西安清美', '西安青卓', '北京九鼎', '画室'],
                    data: x_data,
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                    axisLabel: {
                        interval:0,
                        rotate:40
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {lineStyle: {color: '#2BB5FF', type: 'dotted'}},
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
                    // data: [120, 132, 101, 134, 90, 230, 210, 90]
                    data: [list[0][6].num, list[1][6].num, list[2][6].num, list[3][6].num, list[4][6].num, list[5][6].num, list[6][6].num]
                },
                {
                    name: '前一天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#39D9D6', label: {show: true}}},
                    // data: [220, 182, 191, 234, 290, 330, 310, 139]
                    data: [list[0][5].num, list[1][5].num, list[2][5].num, list[3][5].num, list[4][5].num, list[5][5].num, list[6][5].num]
                },
                {
                    name: '前两天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#8433FD', label: {show: true}}},
                    // data: [150, 232, 201, 154, 190, 330, 410, 120]
                    data: [list[0][4].num, list[1][4].num, list[2][4].num, list[3][4].num, list[4][4].num, list[5][4].num, list[6][4].num]
                },
                {
                    name: '前三天',
                    type: 'bar',
                    barWidth: '25',
                    stack: '广告',
                    itemStyle: {normal: {color: '#E8C212', label: {show: true}}},
                    // data: [120, 132, 101, 134, 90, 230, 210, 90]
                    data: [list[0][3].num, list[1][3].num, list[2][3].num, list[3][3].num, list[4][3].num, list[5][3].num, list[6][3].num]
                },
                {
                    name: '前四天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#3ECF67', label: {show: true}}},
                    // data: [220, 182, 191, 234, 290, 330, 310, 120]
                    data: [list[0][2].num, list[1][2].num, list[2][2].num, list[3][2].num, list[4][2].num, list[5][2].num, list[6][2].num]
                },
                {
                    name: '前五天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#FD375C', label: {show: true}}},
                    // data: [150, 232, 201, 154, 190, 330, 410, 340]
                    data: [list[0][1].num, list[1][1].num, list[2][1].num, list[3][1].num, list[4][1].num, list[5][1].num, list[6][1].num]
                }, {
                    name: '前六天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#FF9019', label: {show: true}}},
                    // data: [150, 232, 201, 154, 190, 330, 410, 200]
                    data: [list[0][0].num, list[1][0].num, list[2][0].num, list[3][0].num, list[4][0].num, list[5][0].num, list[6][0].num]
                },


            ]
        };
        myChart.setOption(option);
    }

    //各机构文化课招生情况
    function course(data) {
        var i = 0, len = data.length,
            x_data = [], list = [];
        for (; i < len; i++) {
            var v = data[i];
            x_data.push(v.agencyName);
            list.push(v.agencyDtoList);
        }
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
                    name: '当天',
                    textStyle: {
                        color: '#fff',
                        fontSize: 11,
                        padding: [0, 0, 0, 13],
                    },
                }, '前一天', '前两天', '前三天', '前四天', '前五天', '前六天'],
                bottom: '5%',
                textStyle: {
                    color: '#fff',
                    fontSize: 11,
                    padding: [0, 0, 0, 8],
                },
                align: '500',
                itemWidth: 40,
                itemHeight: 22,
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    name: '画室',
                    type: 'category',
                    // data: ['北京小泽', '济南小泽', '郑州小泽', '广州一尚', '西安清美', '西安青卓', '北京九鼎', '画室'],
                    data: x_data,
                    axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                    axisLabel: {
                        interval:0,
                        rotate:40
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {lineStyle: {color: '#2BB5FF', type: 'dotted'}},
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
                    // data: [120, 132, 101, 134, 90, 230, 210, 90]
                    data: [list[0][6].num, list[1][6].num, list[2][6].num, list[3][6].num, list[4][6].num, list[5][6].num, list[6][6].num]
                },
                {
                    name: '前一天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#39D9D6', label: {show: true}}},
                    // data: [220, 182, 191, 234, 290, 330, 310, 139]
                    data: [list[0][5].num, list[1][5].num, list[2][5].num, list[3][5].num, list[4][5].num, list[5][5].num, list[6][5].num]
                },
                {
                    name: '前两天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#8433FD', label: {show: true}}},
                    // data: [150, 232, 201, 154, 190, 330, 410, 120]
                    data: [list[0][4].num, list[1][4].num, list[2][4].num, list[3][4].num, list[4][4].num, list[5][4].num, list[6][4].num]
                },
                {
                    name: '前三天',
                    type: 'bar',
                    barWidth: '25',
                    stack: '广告',
                    itemStyle: {normal: {color: '#E8C212', label: {show: true}}},
                    // data: [120, 132, 101, 134, 90, 230, 210, 90]
                    data: [list[0][3].num, list[1][3].num, list[2][3].num, list[3][3].num, list[4][3].num, list[5][3].num, list[6][3].num]
                },
                {
                    name: '前四天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#3ECF67', label: {show: true}}},
                    // data: [220, 182, 191, 234, 290, 330, 310, 120]
                    data: [list[0][2].num, list[1][2].num, list[2][2].num, list[3][2].num, list[4][2].num, list[5][2].num, list[6][2].num]
                },
                {
                    name: '前五天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#FD375C', label: {show: true}}},
                    // data: [150, 232, 201, 154, 190, 330, 410, 340]
                    data: [list[0][1].num, list[1][1].num, list[2][1].num, list[3][1].num, list[4][1].num, list[5][1].num, list[6][1].num]
                }, {
                    name: '前六天',
                    type: 'bar',
                    stack: '广告',
                    itemStyle: {normal: {color: '#FF9019', label: {show: true}}},
                    // data: [150, 232, 201, 154, 190, 330, 410, 200]
                    data: [list[0][0].num, list[1][0].num, list[2][0].num, list[3][0].num, list[4][0].num, list[5][0].num, list[6][0].num]
                },


            ]
        };
        myChart.setOption(option);
    }

    //数据获取量
    function getList(res) {
        var list=res,i=0,len=list.length,title_data=[],
            source0=[],
            source1=[],
            source2=[],
            source3=[],
            source4=[],
            source5=[],
            source6=[],
            source7=[];
        for(;i<len;i++){
            var v=list[i];
            title_data.push(v.agencyName);
            switch (i){
                case 0:
                    source0=v.datalist;
                    break;
                case 1:
                    source1=v.datalist;
                    break;
                case 2:
                    source2=v.datalist;
                    break;
                case 3:
                    source3=v.datalist;
                    break;
                case 4:
                    source4=v.datalist;
                    break;
                case 5:
                    source5=v.datalist;
                    break;
                case 6:
                    source6=v.datalist;
                    break;
                case 7:
                    source7=v.datalist;
                    break;
            }
        }
       var j=0,j_len=source0.length,date_list=[];
        for(;j<j_len;j++){
            var v=source0[j],date_v=v.dataTime.split(" ")[0],time_v=date_v.split("-");
            date_list.push(time_v[1]+"/"+time_v[2])
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('getList'));
        // 指定图表的配置项和数据
        var option = {
            title: [{
                text: ''
            }, {
                subtext: title_data[0],
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '15%',
                top: '42%',
                textAlign: 'center'
            }, {
                subtext: title_data[1],
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '40%',
                top: '42%',
                textAlign: 'center'
            }, {
                subtext: title_data[2],
                subtextStyle: {
                    color: '#2BB6FF'
                },
                left: '65%',
                top: '42%',
                textAlign: 'center'
            },
                {
                    subtext: title_data[3],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '90%',
                    top: '42%',
                    textAlign: 'center'
                }, {
                    subtext: title_data[4],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '15%',
                    top: '84%',
                    textAlign: 'center'
                }, {
                    subtext: title_data[5],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '40%',
                    top: '84%',
                    textAlign: 'center'
                },
                {
                    subtext: title_data[6],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '65%',
                    top: '84%',
                    textAlign: 'center'
                },
                {
                    subtext: title_data[7],
                    subtextStyle: {
                        color: '#2BB6FF'
                    },
                    left: '90%',
                    top: '84%',
                    textAlign: 'center'
                }],
            legend: {
                bottom: '3%',
                textStyle: {
                    color: '#fff',
                    fontSize: 11
                },
                data:['数据获取量', '有效数据量', '有效率']
            },
            tooltip: {},
            // dataset: {
            //     source: [
            //         // ['product', '数据获取量', '有效数据量', '有效率'],
            //         // ['0401', 86.5, 92.1, 85.7],
            //         // ['0402', 86.5, 92.1, 85.7],
            //         // ['0403', 86.5, 92.1, 85.7],
            //         // ['0404', 86.5, 92.1, 85.7],
            //         // ['0405', 86.5, 92.1, 85.7],
            //         // ['0406', 86.5, 92.1, 85.7],
            //         // ['0407', 86.5, 92.1, 85.7],
            //         // [date_list[0], source0[0].dataAmount, source0.effectiveData, source0.efficient],
            //         // [date_list[1], source1.dataAmount, source1.effectiveData, source1.efficient],
            //         // [date_list[2], source2.dataAmount, source2.effectiveData, source2.efficient],
            //         // [date_list[3], source3.dataAmount, source3.effectiveData, source3.efficient],
            //         // [date_list[4], source4.dataAmount, source4.effectiveData, source4.efficient],
            //         // [date_list[5], source5.dataAmount, source5.effectiveData, source5.efficient],
            //         // [date_list[6], source6.dataAmount, source6.effectiveData, source6.efficient]
            //     ]
            // },
            xAxis: [

                {
                    type: 'category', gridIndex: 0, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }, axisLabel: {
                        interval: 0,
                        //   rotate:30 ,
                        fontSize: 8,
                    },
                    data:[date_list[0],date_list[1],date_list[2],date_list[3],date_list[4],date_list[5],date_list[6]]
                },
                {
                    type: 'category', gridIndex: 1, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }, axisLabel: {
                        interval: 0,
                        fontSize: 8,
                    },
                    data:[date_list[0],date_list[1],date_list[2],date_list[3],date_list[4],date_list[5],date_list[6]]
                },
                {
                    type: 'category', gridIndex: 2, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }, axisLabel: {
                        interval: 0,
                        fontSize: 8,
                    },
                    data:[date_list[0],date_list[1],date_list[2],date_list[3],date_list[4],date_list[5],date_list[6]]
                },
                {
                    type: 'category', gridIndex: 3, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }, axisLabel: {
                        interval: 0,
                        fontSize: 8,
                    },
                    data:[date_list[0],date_list[1],date_list[2],date_list[3],date_list[4],date_list[5],date_list[6]]
                },
                {
                    type: 'category', gridIndex: 4, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }, axisLabel: {
                        interval: 0,
                        fontSize: 8,
                    },
                    data:[date_list[0],date_list[1],date_list[2],date_list[3],date_list[4],date_list[5],date_list[6]]
                },
                {
                    type: 'category', gridIndex: 5, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }, axisLabel: {
                        interval: 0,
                        fontSize: 8,
                    },
                    data:[date_list[0],date_list[1],date_list[2],date_list[3],date_list[4],date_list[5],date_list[6]]
                },
                {
                    type: 'category', gridIndex: 6, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }, axisLabel: {
                        interval: 0,
                        fontSize: 8,
                    },
                    data:[date_list[0],date_list[1],date_list[2],date_list[3],date_list[4],date_list[5],date_list[6]]
                },
                {
                    type: 'category', gridIndex: 7, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    }, axisLabel: {
                        interval: 0,
                        fontSize: 8,
                    },
                    data:[date_list[0],date_list[1],date_list[2],date_list[3],date_list[4],date_list[5],date_list[6]]
                }
            ],
            yAxis: [
                {
                    gridIndex: 0, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                },
                {
                    gridIndex: 1, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                },
                {
                    gridIndex: 2, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                },
                {
                    gridIndex: 3, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                },
                {
                    gridIndex: 4, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                },
                {
                    gridIndex: 5, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                },
                {
                    gridIndex: 6, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                },
                {
                    gridIndex: 7, axisLine: {
                        lineStyle: {
                            color: '#2BB5FF',
                        }
                    },
                }
            ],
            grid: [
                {top: '10%', bottom: '60%', right: '75%', left: '5%'},
                {top: '10%', bottom: '60%', right: '50%', left: '30%'},
                {top: '10%', bottom: '60%', right: '25%', left: '55%'},
                {top: '10%', bottom: '60%', right: '0', left: '80%'},
                {top: '50%', bottom: '20%', right: '75%', left: '5%'},
                {top: '50%', bottom: '20%', right: '50%', left: '30%'},
                {top: '50%', bottom: '20%', right: '25%', left: '55%'},
                {top: '50%', bottom: '20%', right: '0', left: '80%'}
            ],
            series: [
                // These series are in the first grid.
                {type: 'bar',name:'数据获取量', xAxisIndex: 0, yAxisIndex: 0, itemStyle: {normal: {color: '#7065FB'}},
                    data:[source0[0].dataAmount,source0[1].dataAmount,source0[2].dataAmount,source0[3].dataAmount,source0[4].dataAmount,source0[5].dataAmount,source0[6].dataAmount]},
                {type: 'bar',name:'有效数据量', xAxisIndex: 0, yAxisIndex: 0, itemStyle: {normal: {color: '#F3C938'}},
                    data:[source0[0].effectiveData,source0[1].effectiveData,source0[2].effectiveData,source0[3].effectiveData,source0[4].effectiveData,source0[5].effectiveData,source0[6].effectiveData]},
                {type: 'line', name:'有效率', xAxisIndex: 0, yAxisIndex: 0, itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value>0?c.value.toFixed(2):0)+"%";}}}},
                    data:[source0[0].efficient*100,source0[1].efficient*100,source0[2].efficient*100,source0[3].efficient*100,source0[4].efficient*100,source0[5].efficient*100,source0[6].efficient*100]},
                // These series are in the second grid.
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1, itemStyle: {normal: {color: '#7065FB'}},
                    data:[source1[0].dataAmount,source1[1].dataAmount,source1[2].dataAmount,source1[3].dataAmount,source1[4].dataAmount,source1[5].dataAmount,source1[6].dataAmount]},
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1, itemStyle: {normal: {color: '#F3C938'}},
                    data:[source1[0].effectiveData,source1[1].effectiveData,source1[2].effectiveData,source1[3].effectiveData,source1[4].effectiveData,source1[5].effectiveData,source1[6].effectiveData]},
                {
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value>0?c.value.toFixed(2):0)+"%";}}}},
                    data:[source1[0].efficient*100,source1[1].efficient*100,source1[2].efficient*100,source1[3].efficient*100,source1[4].efficient*100,source1[5].efficient*100,source1[6].efficient*100]
                },

                {type: 'bar', xAxisIndex: 2, yAxisIndex: 2, itemStyle: {normal: {color: '#7065FB'}},
                    data:[source2[0].dataAmount,source2[1].dataAmount,source2[2].dataAmount,source2[3].dataAmount,source2[4].dataAmount,source2[5].dataAmount,source2[6].dataAmount]},
                {type: 'bar', xAxisIndex: 2, yAxisIndex: 2, itemStyle: {normal: {color: '#F3C938'}},
                    data:[source2[0].effectiveData,source2[1].effectiveData,source2[2].effectiveData,source2[3].effectiveData,source2[4].effectiveData,source2[5].effectiveData,source2[6].effectiveData]},
                {
                    type: 'line',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value>0?c.value.toFixed(2):0)+"%";}}}},
                    data:[source2[0].efficient*100,source2[1].efficient*100,source2[2].efficient*100,source2[3].efficient*100,source2[4].efficient*100,source2[5].efficient*100,source2[6].efficient*100]
                },

                {type: 'bar', xAxisIndex: 3, yAxisIndex: 3, itemStyle: {normal: {color: '#7065FB'}},
                    data:[source3[0].dataAmount,source3[1].dataAmount,source3[2].dataAmount,source3[3].dataAmount,source3[4].dataAmount,source3[5].dataAmount,source3[6].dataAmount]},
                {type: 'bar', xAxisIndex: 3, yAxisIndex: 3, itemStyle: {normal: {color: '#F3C938'}},
                    data:[source3[0].effectiveData,source3[1].effectiveData,source3[2].effectiveData,source3[3].effectiveData,source3[4].effectiveData,source3[5].effectiveData,source3[6].effectiveData]},
                {
                    type: 'line',
                    xAxisIndex: 3,
                    yAxisIndex: 3,
                    itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value>0?c.value.toFixed(2):0)+"%";}}}},
                    data:[source3[0].efficient*100,source3[1].efficient*100,source3[2].efficient*100,source3[3].efficient*100,source3[4].efficient*100,source3[5].efficient*100,source3[6].efficient*100]
                },

                {type: 'bar', xAxisIndex: 4, yAxisIndex: 4, itemStyle: {normal: {color: '#7065FB'}},
                    data:[source4[0].dataAmount,source4[1].dataAmount,source4[2].dataAmount,source4[3].dataAmount,source4[4].dataAmount,source4[5].dataAmount,source4[6].dataAmount]},
                {type: 'bar', xAxisIndex: 4, yAxisIndex: 4, itemStyle: {normal: {color: '#F3C938'}},
                    data:[source4[0].effectiveData,source4[1].effectiveData,source4[2].effectiveData,source4[3].effectiveData,source4[4].effectiveData,source4[5].effectiveData,source4[6].effectiveData]},
                {
                    type: 'line',
                    xAxisIndex: 4,
                    yAxisIndex: 4,
                    itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value>0?c.value.toFixed(2):0)+"%";}}}},
                    data:[source4[0].efficient*100,source4[1].efficient*100,source4[2].efficient*100,source4[3].efficient*100,source4[4].efficient*100,source4[5].efficient*100,source4[6].efficient*100]
                },

                {type: 'bar', xAxisIndex: 5, yAxisIndex: 5, itemStyle: {normal: {color: '#7065FB'}},
                    data:[source5[0].dataAmount,source5[1].dataAmount,source5[2].dataAmount,source5[3].dataAmount,source5[4].dataAmount,source5[5].dataAmount,source5[6].dataAmount]},
                {type: 'bar', xAxisIndex: 5, yAxisIndex: 5, itemStyle: {normal: {color: '#F3C938'}},
                    data:[source5[0].effectiveData,source5[1].effectiveData,source5[2].effectiveData,source5[3].effectiveData,source5[4].effectiveData,source5[5].effectiveData,source5[6].effectiveData]},
                {
                    type: 'line',
                    xAxisIndex: 5,
                    yAxisIndex: 5,
                    itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value>0?c.value.toFixed(2):0)+"%";}}}},
                    data:[source5[0].efficient*100,source5[1].efficient*100,source5[2].efficient*100,source5[3].efficient*100,source5[4].efficient*100,source5[5].efficient*100,source5[6].efficient*100]
                },

                {type: 'bar', xAxisIndex: 6, yAxisIndex: 6, itemStyle: {normal: {color: '#7065FB'}},
                    data:[source6[0].dataAmount,source6[1].dataAmount,source6[2].dataAmount,source6[3].dataAmount,source6[4].dataAmount,source6[5].dataAmount,source6[6].dataAmount]},
                {type: 'bar', xAxisIndex: 6, yAxisIndex: 6, itemStyle: {normal: {color: '#F3C938'}},
                    data:[source6[0].effectiveData,source6[1].effectiveData,source6[2].effectiveData,source6[3].effectiveData,source6[4].effectiveData,source6[5].effectiveData,source6[6].effectiveData]},
                {
                    type: 'line',
                    xAxisIndex: 6,
                    yAxisIndex: 6,
                    itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value>0?c.value.toFixed(2):0)+"%";}}}},
                    data:[source6[0].efficient*100,source6[1].efficient*100,source6[2].efficient*100,source6[3].efficient*100,source6[4].efficient*100,source6[5].efficient*100,source6[6].efficient*100]
                },

                {type: 'bar', xAxisIndex: 7, yAxisIndex: 7, itemStyle: {normal: {color: '#7065FB'}},
                    data:[source7[0].dataAmount,source7[1].dataAmount,source7[2].dataAmount,source7[3].dataAmount,source7[4].dataAmount,source7[5].dataAmount,source7[6].dataAmount]},
                {type: 'bar', xAxisIndex: 7, yAxisIndex: 7, itemStyle: {normal: {color: '#F3C938'}},
                    data:[source7[0].effectiveData,source7[1].effectiveData,source7[2].effectiveData,source7[3].effectiveData,source7[4].effectiveData,source7[5].effectiveData,source7[6].effectiveData]},
                {
                    type: 'line',
                    xAxisIndex: 7,
                    yAxisIndex: 7,
                    itemStyle: {normal: {color: '#E83751', label: {show: true,formatter:function(c){return (c.value>0?c.value.toFixed(2):0)+"%";}}}},
                    data:[source7[0].efficient*100,source7[1].efficient*100,source7[2].efficient*100,source7[3].efficient*100,source7[4].efficient*100,source7[5].efficient*100,source7[6].efficient*100]
                },
            ]
        };
        myChart.setOption(option);
    }
});