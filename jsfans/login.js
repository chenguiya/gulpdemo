define("test/login",["jquery",],function(require, exports, module){
    "user strict";
    var $=require("jquery");
    var m={};
    m.init=function(){
    	$('#login_outId').click(function(){
            $.ajax({
            url: homeUrl+'login/logout',
            type: "post",
            dataType: "json",
            data: '',
            timeout: 10000,
            cache: false,
            beforeSend: function(XMLHttpRequest){},
            success: function(data, textStatus){
                if(typeof(data.err) != "undefined")
                {
                    if(data.code == 200)
                    {
                        window.location.href = homeUrl+'index';
                    }
                    else
                    {
                        alert(data.err);
                    }
                }
            },
            complete: function(XMLHttpRequest, textStatus){},
            error: function(){
                alert("返回异常！");
            }
           });
        });
    }
   module.exports = m;
});

