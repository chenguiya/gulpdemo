wx.config({
      debug: false,
      appId: sign.appId,
      timestamp: sign.timestamp,
      nonceStr: sign.nonceStr,
      signature: sign.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'chooseWXPay'
      ]
  });
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