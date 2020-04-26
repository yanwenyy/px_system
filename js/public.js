//接口变量
const http_url={
    formal_url:"http://123.57.42.98:8080/px_edu",//正式
    test_url:"http://123.57.42.98:8080/px_edu",//测试
    url:"http://123.57.42.98:8080/px_edu"
};
var rotation_src=http_url.url+"showImg/rotation/";
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