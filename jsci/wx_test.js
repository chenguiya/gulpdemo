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
    'getLocation',
    'openLocation'
  ]
});
//wx属于微信内置的对象，页面添加点击的状态是无效的，还是要做指引浏览器
wx.ready(function(){
  
  // 7 地理位置接口
  // 7.2 获取当前地理位置
  document.querySelector('#getLocation').onclick=function(){
     wx.getLocation({
        success:function(res){
            //alert(JSON.stringify(res));
            var latitude=res.latitude;  //纬度，浮点数，范围为90~-90
            var longitude=res.longitude;  //经度，浮点数，范围为180~-180
            var speed=res.speed;  //速度，以米/每秒计时
            var accuracy=res.accuracy; //位置精度
            var dhml='';
            var resArr=new Array();
            dhml+='<p>纬度：'+latitude+'</p>';
            dhml+='<p>经度：'+longitude+'</p>';
            dhml+='<p>速度：'+speed+'</p>';
            dhml+='<p>位置：'+accuracy+'</p>';
            $('#location_get').append(dhml);
            var paramUrl='http://api.map.baidu.com/geoconv/v1/?coords='+res.longitude+','+res.latitude+'&from=1&to=5&ak=820fef90c4bf9795c46a5111e7b4f9d2';
            //http://api.map.baidu.com/geoconv/v1/?coords=114.21892734521,29.575429778924;114.21892734521,29.575429778924&from=1&to=5&ak=820fef90c4bf9795c46a5111e7b4f9d2    微信经纬度转换成百度经纬度
            $.ajax({
                type:'GET',
                url:paramUrl,
                cache:false,
                dataType:'json',
                success:function(data){
                  alert(data.result);
                  alert(JSON.stringify(data));
                },
                error:function(){
                  alert('数据有问题');
                }
            });
            //http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=23.118997935412,113.28561218549&output=json&pois=1&ak=820fef90c4bf9795c46a5111e7b4f9d2
        }
     });
  }; 
  document.querySelector('#get-openLocation').onclick=function(){
     wx.getLocation({
         type: 'gcj02', 
         success:function(res){
             var latitude=res.latitude;  
             var longitude=res.longitude;
             wx.openLocation({
                 latitude: latitude, 
                 longitude: longitude,
                 scale:14 
             });
         }
     });
  }
});
wx.error(function(e){
  alert(e.errMsg)
});