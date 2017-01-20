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
  wx.getLocation({
      success:function(res){
          var latitude=res.latitude;  //纬度，浮点数，范围为90~-90
          var longitude=res.longitude;  //经度，浮点数，范围为180~-180
          var Arr=[longitude,latitude];
          var script = document.createElement('script');
          var paramUrl='http://api.map.baidu.com/geoconv/v1/?coords='+Arr.toString()+'&from=1&to=5&ak=820fef90c4bf9795c46a5111e7b4f9d2&callback=dealResult';
          script.src = paramUrl;
          document.getElementsByTagName("head")[0].appendChild(script);
      }
  })
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
function dealResult(msg){              
                if(msg.status != 0){
                    alert('无正确的返回结果')
                    return;
                }
                console.log(msg.result[0].x);
                var bai_latitude=msg.result[0].y;
                var bai_longitude=msg.result[0].x;
                var bai_Arr=[bai_latitude,bai_longitude];
                var bai_script=document.createElement('script');
                var bai_paramUrl='http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location='+bai_Arr.toString()+'&output=json&pois=1&ak=820fef90c4bf9795c46a5111e7b4f9d2';
                bai_script.src=bai_paramUrl;
                document.getElementsByTagName("head")[0].appendChild(bai_script);
            }
function renderReverse(msg){
  if(msg.status==0){
      alert(msg.result.formatted_address)
  }
}