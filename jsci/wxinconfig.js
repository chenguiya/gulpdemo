$(function(){
  var urlyr=encodeURIComponent(urls);
  $.ajax({
      type:'GET',
      url:'http://wx.5usport.com/Jsapisign',
      data: {signurl:urlyr},
      dataType:'json',
      //async:false,
      success:function(data){
        console.log(data);
        wx.config({
          debug: false,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]
        });
      },
      error:function(){
        alert('数据有误！');
      }
    });
  //微信执行
    wx.ready(function (){
        wx.showOptionMenu();
        wx.onMenuShareAppMessage({
          title: shareTitle,
          desc: shareDescription,
          link: shareUrl,
          imgUrl: shareImage,
          trigger: function (res) {
            //alert('用户点击发送给朋友');
          },
          success: function (res) {
            //alert('已分享');
          },
          cancel: function (res) {
            //alert('已取消');
          },
          fail: function (res) {
            //alert(JSON.stringify(res));
          }
        });
        wx.onMenuShareTimeline({
          title:shareTitle,
          link: shareUrl,
          imgUrl: shareImage,
          trigger: function (res) {
            //alert('用户点击分享到朋友圈');
          },
          success: function (res) {
            //alert('已分享');
          },
          cancel: function (res) {
            //alert('已取消');
          },
          fail: function (res) {
            //alert(JSON.stringify(res));
          }
        });
    });
    wx.error(function (res) {
        alert(res.errMsg);
    });
})
    
 

