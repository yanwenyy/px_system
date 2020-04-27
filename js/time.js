$(function () {
    var socket=[]; //websocket对象数组
    function connect(options) {
        if ('WebSocket' in window) {
            socket[options] = new WebSocket(http_url.Socket_url+options.id);
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
    var list=[
        {
            name:'getData',
            id:'1',
            succ:getData
        },{
            name:'allProcess',
            id:'2',
            succ:allProcess
        },{
            name:'listProcess',
            id:'3',
            succ:listProcess
        }
    ];
    window.onbeforeunload = function () {

        var i=0,len=socket.length;
        for(;i<len;i++){
            var v=socket[i];
            socket[i].close(3000, "强制关闭");

        }

    };
    var i=0,len=list.length;
    for(;i<len;i++){
        var v=list[i];
        connect(v)
    }
    function getData(message) {
       console.log(111)
    }
    function allProcess(message) {
        console.log(222)
    }
    function listProcess(message) {
        console.log(333)
    }
});