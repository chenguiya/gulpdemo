var d=encodeURIComponent(urls);
$(function(){

$.ajax({
  type:"GET",
  url:"http://fansclub.5usport.com/wx/winterface/jsapisign",
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
      jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","getLocation","openLocation","chooseWXPay"]
      })
    },
  error:function(){
    showmsg('数据有误','',1000)
  }
})
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
  wx.getLocation({
    success:function(res){
       var latitude=res.latitude;  //纬度
       var longitude=res.longitude; //经度
       var Arr=[longitude,latitude];
       var script=document.createElement('script');
       var paramUrl='http://api.map.baidu.com/geoconv/v1/?coords='+Arr.toString()+'&from=1&to=5&ak=820fef90c4bf9795c46a5111e7b4f9d2&callback=dealResult';
       script.src=paramUrl;
       document.getElementsByTagName("head")[0].appendChild(script);
    }
  })
})
wx.error(function(e){
  alert(e.errMsg)
});

function dealResult(msg){
  if(msg.status !=0){
    alert('无正确的返回结果');
    return;
  }
  var bai_latitude=msg.result[0].y;
  var bai_longitude=msg.result[0].x;
  var bai_Arr=[bai_latitude,bai_longitude];
  var bai_script=document.createElement('script');
  var bai_paramUrl='http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location='+bai_Arr.toString()+'&output=json&pois=1&ak=820fef90c4bf9795c46a5111e7b4f9d2';
  bai_script.src=bai_paramUrl;
  document.getElementsByTagName("head")[0].appendChild(bai_script);
}
function renderReverse(msg){
   if(msg.status !=0){
      alert('无正确的返回结果');
      return;
   }
   $.ajax({
      type:'POST',
      url:homeUrl+'location/save',
      data:{tid:actTid,latitude:msg.result.location.lat,longitude:msg.result.location.lng,province:msg.result.addressComponent.province,city:msg.result.addressComponent.city,district:msg.result.addressComponent.district,address:msg.result.formatted_address},
      dataType:'json',
      cache:false,
      success:function(data){
         if(data.code==200){
          console.log(data.message)
        }else{
          console.log(data.message);
        }
      },
      error:function(){
        alert('数据返回异常');
      }
})
}
