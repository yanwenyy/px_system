$(function () {
    var id = GetQueryString("id");
    var socket = []; //websocket对象数组
    function connect(options) {
        if ('WebSocket' in window) {
            socket[options] = new WebSocket(http_url.Socket_url + options.id);
            // console.log(http_url.Socket_url+options.id)
        } else {
            alert("您的浏览器不支持websocket");
        }
        socket[options].onerror = function () {
            console.log("send error！");
        };
        socket[options].onopen = function () {
            console.log("connection success！")
        };
        socket[options].onmessage = function (event) {
            options.succ(event.data);
        };
        socket[options].onclose = function () {
            console.log("closed websockettttttt!")
        }
    }

    var list = [
        {
            name: 'getData',
            id: 'AGW_' + id,
            succ: getData
        }, {
            name: 'allProcess',
            id: 'AGS_' + id,
            succ: listProcess
        }
    ];
    window.onbeforeunload = function () {

        var i = 0, len = socket.length;
        for (; i < len; i++) {
            var v = socket[i];
            socket[i].close(3000, "强制关闭");

        }

    };
    var i = 0, len = list.length;
    for (; i < len; i++) {
        var v = list[i];
        connect(v)
    }

    function getData(message) {
        // console.log(message)
        var datas = JSON.parse(message);
        $(".signupDayNum").html(datas.signupDayNum);
        $(".signupMonthNum").html(datas.signupMonthNum);
        $(".signupSum").html(datas.signupSum);
        $(".frontMoneyNum").html(datas.frontMoneyNum);
        $(".fullMoneyNum").html(datas.signupDayNum);
        $(".refundNum").html(datas.refundNum);
        $(".refundMoney").html(datas.refundMoney);
        $(".cultyualDayNum").html(datas.cultyualDayNum);
        $(".cilturalMonthNum").html(datas.cilturalMonthNum);
        $(".contactRate").html((datas.contactRate * 100).toFixed(2) + "%");
    }

    function listProcess(message) {
        var data = JSON.parse(message);
            html = '<div class="student-process-list">' +
                '<div class="inline-block">' +
                '<div class="process-title inline-block">总招生进度</div>' +
                '<div class="process-div inline-block">' +
                '<div class="process-bar red-bar inline-block" style="width: ' + (data.sumSchedu > 1 ? '100' : (data.sumSchedu * 100).toFixed(2)) + '%">' + ((data.sumSchedu * 100).toFixed(2)) + '% </div>' +
                '<span>' + data.realSum + '人</span>' +
                '</div>' +
                '</div>' +
                '<span class="inline-block process-num">' + data.studentNum + '人</span>' +
                '</div>' +
                '<div class="student-process-list">' +
                '<div class="inline-block">' +
                '<div class="process-title inline-block">线上</div>' +
                '<div class="process-div inline-block">' +
                '<div class="process-bar blue-bar inline-block" style="width: ' + (data.onlineSchedu > 1 ? '100' : (data.onlineSchedu * 100).toFixed(2)) + '%"> ' + ((data.onlineSchedu * 100).toFixed(2)) + '% </div>' +
                '<span>' + data.realOnlineNum + '人</span>' +
                '</div>' +
                '</div>' +
                '<span class="inline-block process-num">' + data.onlineNum + '人</span>' +
                '</div>' +
                '<div class="student-process-list">' +
                '<div class="inline-block">' +
                '<div class="process-title inline-block">教学部</div>' +
                '<div class="process-div inline-block">' +
                '<div class="process-bar green-bar inline-block" style="width: ' + (data.eduSchedu > 1 ? '100' : (data.eduSchedu * 100).toFixed(2)) + '%">' + ((data.eduSchedu * 100).toFixed(2)) + '%</div>' +
                '<span>' + data.realEduNum + '人</span>' +
                '</div>' +
                '</div>' +
                '<span class="inline-block process-num">' + data.edcactionNum + '人</span>' +
                '</div>' +
                '<div class="student-process-list">' +
                '<div class="inline-block">' +
                '<div class="process-title inline-block">地推</div>' +
                '<div class="process-div inline-block">' +
                '<div class="process-bar orange-bar inline-block" style="width: ' + (data.pushSchedu > 1 ? '100' : (data.pushSchedu * 100).toFixed(2)) + '%">' + ((data.pushSchedu * 100).toFixed(2)) + '%</div>' +
                '<span>' + data.realPusnNum + '人</span>' +
                '</div>' +
                '</div>' +
                '<span class="inline-block process-num">' + data.pusnNum + '人</span>' +
                '</div>' +
                '<div class="student-process-list">' +
                '<div class="inline-block">' +
                '<div class="process-title inline-block">画室</div>' +
                '<div class="process-div inline-block">' +
                '<div class="process-bar pink-bar inline-block" style="width: ' + (data.studioSchedu > 1 ? '100' : (data.studioSchedu * 100).toFixed(2)) + '%">' + ((data.studioSchedu * 100).toFixed(2)) + '%</div>' +
                '<span>' + data.realStudioNum + '人</span>' +
                '</div>' +
                '</div>' +
                '<span class="inline-block process-num">' + data.studioNum + '人</span>' +
                '</div>' +
                '<div class="student-process-list">' +
                '<div class="inline-block">' +
                '<div class="process-title inline-block">其他</div>' +
                '<div class="process-div inline-block">' +
                '<div class="process-bar purple-bar inline-block" style="width: ' + (data.otherSchedu > 1 ? '100' : (data.otherSchedu * 100).toFixed(2)) + '%">' + ((data.otherSchedu * 100).toFixed(2)) + '%</div>' +
                '<span>' + data.realOtherNum + '人</span>' +
                '</div>' +
                '</div>' +
                '<span class="inline-block process-num">' + data.otherNum + '人</span>' +
                '</div>';
        $(".student-process").html(html);
    }
});