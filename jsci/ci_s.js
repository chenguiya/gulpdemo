$(function(){var e=encodeURIComponent(urls);
  var sharePic=$('.display_ch .message img:first').attr('src');
  if(typeof sharePic =='undefined'){
    shareImage='http://static2.5usport.com/images/logo_app.png';
  }else if(typeof sharePic == 'string' && sharePic.search(/http/i) == -1) {
      shareImage = SITEURL + sharePic;
  }
  $.ajax({type:"GET",url:"http://wx.5usport.com/Jsapisign",data:{signurl:e},dataType:"json",success:function(e){wx.config({debug:!1,appId:e.appid,timestamp:e.timestamp,nonceStr:e.noncestr,signature:e.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage"]})},error:function(){alert("数据有误！")}}),wx.ready(function(){wx.showOptionMenu(),wx.onMenuShareAppMessage({title:shareTitle,desc:shareDescription,link:shareUrl,imgUrl:shareImage,trigger:function(e){},success:function(e){},cancel:function(e){},fail:function(e){}}),wx.onMenuShareTimeline({title:shareTitle,link:shareUrl,imgUrl:shareImage,trigger:function(e){},success:function(e){},cancel:function(e){},fail:function(e){}})})});