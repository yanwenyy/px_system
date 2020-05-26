//接口变量
const http_url={
    formal_url:"http://bobao.yingtaiwx.com/px_edu",//正式
    test_url:"http://bobao.yingtaiwx.com/px_edu",//测试
    Socket_url:"ws://bobao.yingtaiwx.com/px_edu/imserver/",
    url:"http://bobao.yingtaiwx.com/px_edu"
};
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
function ajax(url,data,succ){
    // console.log(url);
    $.ajax({
        type:"POST",
        url:http_url.url+url,
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
            // "Accept-Encoding":"gzip,deflate"
        },
        data:JSON.stringify(data),
        success:function(data){
            if(data.code=="2"){
                // alert(data.des);
                window.location.href="../html/register-next.html"
            }else{
                succ(data);
            }

        },
        error:function(){
            console.log("程序出错,请重试");
        }
    })
}
function ajax_get(url,succ){
    // console.log(url);
    $.ajax({
        type:"GET",
        url:http_url.url+url,
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8"
            // "Accept-Encoding":"gzip,deflate"
        },
        success:function(data){
            if(data.code=="2"){
                // alert(data.des);
                window.location.href="../html/register-next.html"
            }else{
                succ(data);
            }

        },
        error:function(){
            console.log("程序出错,请重试");
        }
    })
}
function ajax_nodata(url,succ){
    $.ajax({
        type:"POST",
        url:http_url.url+url,
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
            // "Accept-Encoding":"gzip,deflate"
        },
        success:function(data){
            if(data.code=="2"){
                window.location.href="../html/register-next.html"
            }else{
                succ(data);
            }
        },
        error:function(){
            console.log("程序出错,请重试");
        }
    })
}