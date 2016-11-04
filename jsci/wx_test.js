/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 */
wx.config({
  debug:false,
  appId:shareData.appId,
  timestamp:shareData.timestamp,
  nonceStr:shareData.nonceStr,
  signature:shareData.signature,
  jsApiList:[
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getLocation'
  ]
});
//wx属于微信内置的对象，页面添加点击的状态是无效的，还是要做指引浏览器
wx.ready(function(){
  
  // 7 地理位置接口
  // 7.2 获取当前地理位置
  document.querySelector('#getLocation').onclick=function(){
     wx.getLocation({
        success:function(res){
            alert(JSON.stringify(res));
            var latitude=res.latitude;  //纬度，浮点数，范围为90~-90
            var longitude=res.longitude;  //经度，浮点数，范围为180~-180
            var speed=res.speed;  //速度，以米/每秒计时
            var accuracy=res.accuracy; //位置精度
            var dhml='';
            dhml+='<p>纬度：'+latitude+'</p>';
            dhml+='<p>经度：'+longitude+'</p>';
            dhml+='<p>速度：'+speed+'</p>';
            dhml+='<p>位置：'+accuracy+'</p>';
            $('#location_get').append(dhml);
        }
     })
  }
});
wx.error(function(e){
  alert(e.errMsg)
});