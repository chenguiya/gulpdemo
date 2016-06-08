define("js/wx_sharecup",["jquery","http://res.wx.qq.com/open/js/jweixin-1.0.0.js"],function(a){
    "user strict";var $=a("jquery");var wx=a('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
    var shareTitle='美女足球达人邀你PK欧洲杯，绝对欲罢不能';
var shareDescription='#吐血推荐#动动手指参与，美女奖品送送送！带上朋友一起狂欢欧洲杯吧';
var shareUrl='http://cid.5usport.com/api/wx_eurocup/index';
var shareImage='http://cid.5usport.com/static/images/europecup/sharelogo.jpg';
var urls=location.href.split('#')[0];
var e=encodeURIComponent(urls);
$.ajax({
  type:"GET",
  url:"http://wx.5usport.com/Jsapisign",
  data:{signurl:e},
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
    success:function(e){
    },
    cancel:function(e){},
    fail:function(e){}
  })
  wx.onMenuShareTimeline({
    title:shareTitle,
    link:shareUrl,
    imgUrl:shareImage,
    trigger:function(e){},
    success:function(e){
    },
    cancel:function(e){},
    fail:function(e){}
  })
})
wx.error(function(e){
  alert(e.errMsg)
});

});