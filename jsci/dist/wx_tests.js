wx.config({debug:!1,appId:shareData.appId,timestamp:shareData.timestamp,nonceStr:shareData.nonceStr,signature:shareData.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","chooseImage","previewImage","uploadImage","downloadImage","getLocation"]}),wx.ready(function(){document.querySelector("#getLocation").onclick=function(){wx.getLocation({success:function(e){alert(JSON.stringify(e));var a=e.latitude,n=e.longitude,t=e.speed,o=e.accuracy,r="";r+="<p>纬度："+a+"</p>",r+="<p>经度："+n+"</p>",r+="<p>速度："+t+"</p>",r+="<p>位置："+o+"</p>",$("#location_get").append(r)}})}}),wx.error(function(e){alert(e.errMsg)});