﻿define("test/mobile/recruit_app",["jquery","http://res.wx.qq.com/open/js/jweixin-1.0.0.js"],function(a){
    "user strict";var $=a("jquery");var wx=a('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
    var d=encodeURIComponent(urls);
    if($('.rectInput').length){
        $('.rectScroll .rectInput').click(function(index){
              var index = $(this).index(".rectInput");
              var height=$('.rectInput').outerHeight()+8;
              //alert(index);
              //$('.rectScroll').scrollTop(index*height);
              setTimeout(function(){
                $('.rectScroll').scrollTop(index*height);
              },500)
              //console.log($(this).offset().top);
        })  
    }
    if(window.navigator.userAgent.toLowerCase().indexOf("micromessenger")){
    $.ajax({
        type:"GET",
        url:"http://wx.5usport.com/Jsapisign",
        data:{signurl:d},
        dataType:"json",
        success:function(e){
           //alert(e.appid);
           wx.config({
              debug:!1,
              appId:e.appid,
              timestamp:e.timestamp,
              nonceStr:e.noncestr,
              signature:e.signature,
              jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage"]
            })
        },
        error:function(){
           showmsg('数据有误','',1000)
        }
    })
    wx.ready(function(){
        wx.showOptionMenu(),
        wx.onMenuShareAppMessage({
            title:shareTitle,
            desc:shareDescription,
            link:shareUrl,
            imgUrl:shareImage,
            trigger:function(e){},
            success:function(e){},
            cancel:function(e){},
            fail:function(e){}
        })
        wx.onMenuShareTimeline({
            title:shareTitle,
            link:shareUrl,
            imgUrl:shareImage,
            trigger:function(e){},
            success:function(e){},
            cancel:function(e){},
            fail:function(e){}
        })
    })
    wx.error(function(e){
        alert(e.errMsg)
    });
    }

});