function dealResult(e){if(0!=e.status)return void alert("无正确的返回结果");var t=e.result[0].y,r=e.result[0].x,n=[t,r],o=document.createElement("script"),a="http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location="+n.toString()+"&output=json&pois=1&ak=820fef90c4bf9795c46a5111e7b4f9d2";o.src=a,document.getElementsByTagName("head")[0].appendChild(o)}function renderReverse(e){return 0!=e.status?void alert("无正确的返回结果"):void $.ajax({type:"POST",url:homeUrl+"location/save",data:{tid:recruitTid,latitude:e.result.location.lat,longitude:e.result.location.lng,province:e.result.addressComponent.province,city:e.result.addressComponent.city,district:e.result.addressComponent.district,address:e.result.formatted_address},dataType:"json",cache:!1,success:function(e){200==e.code?console.log(e.message):console.log(e.message)},error:function(){alert("数据返回异常")}})}define("test/mobile/recruit_app",["jquery","common","mobtime","js/module/mobtime/mobtime.css","http://res.wx.qq.com/open/js/jweixin-1.0.0.js"],function(e){"user strict";var t=e("jquery"),r=e("common"),n=(e("mobtime"),e("http://res.wx.qq.com/open/js/jweixin-1.0.0.js"));e("test/module/mobiscroll.2.13.2.css");var o=encodeURIComponent(urls);if(t("#birthday").length){var a=((new Date).getFullYear(),{"default":{theme:"default",mode:"scroller",display:"modal",animate:"fade",endYear:"2030"},dateYMD:{preset:"date",dateFormat:"yyyy-mm-dd",defaultValue:new Date(new Date),invalid:{daysOfWeek:[0,6],daysOfMonth:["5/1","12/24","12/25"]}}});t("#birthday").scroller(t.extend(a.dateYMD,a["default"]))}t(".rectInput").length&&t(".rectScroll .rectInput").click(function(e){var e=t(this).index(".rectInput"),r=t(".rectInput").eq(e-1).outerHeight()+8;setTimeout(function(){t(".rectScroll").scrollTop(e*r)},500)}),t("#rectTJ").click(function(){for(var e=t(".rectScroll").find(".inputS").length,n=t(".rectScroll").find(".inputS"),o=0;e>o;o++){var a=n.eq(o).val();if(""==a||null==a)return r.showmsg("亲，带*号为必填项哦！请先完善","",1e3),!1}for(var s=t(".rectScroll").find(".textSet").length,c=t(".rectScroll").find(".textSet"),o=0;s>o;o++){var l=c.eq(o).data("name"),d=parseInt(c.eq(o).attr("minlength")),u=parseInt(c.eq(o).attr("maxlength")),m=c.eq(o).find("input").val(),f=i.CheckLength(m);if(c.eq(o).find(".c-red").length){if(""==m)return r.showmsg("亲，带*号为必填项哦！请先完善","",1e3),!1;if(d>f||f>u)return r.showmsg("亲，【"+l+"】最多输入"+u+"个字符哦","",1e3),!1}else if(f>u>0)return r.showmsg("亲，【"+l+"】最多输入"+u+"个字符哦","",1e3),!1}for(var p=t(".rectScroll").find(".option_mouse").length,h=t(".rectScroll").find(".option_mouse"),o=0;p>o;o++){var g=h.eq(o).data("name"),v=parseInt(h.eq(o).attr("minlength")),w=parseInt(h.eq(o).attr("maxlength")),q=h.eq(o).find("textarea").val(),f=i.CheckLength(q);if(h.eq(o).find(".c-red").length){if(""==q)return r.showmsg("亲，带*号为必填项哦！请先完善","",1e3),!1;if(v>f||f>w)return r.showmsg("亲，【"+g+"】最多输入"+w+"个字符哦","",1e3),!1}else if(f>w>0)return r.showmsg("亲，【"+g+"】最多输入"+w+"个字符哦","",1e3),!1}for(var S=t(".rectScroll").find(".option_radio").length,y=t(".rectScroll").find(".option_radio"),o=0;S>o;o++){y.eq(o).data("name");if(y.eq(o).find(".c-red").length&&!y.eq(o).find("input").is(":checked"))return r.showmsg("亲，带*号为必填项哦！请先完善","",1e3),!1}for(var b=t(".rectScroll").find(".option_select").length,x=t(".rectScroll").find(".option_select"),o=0;b>o;o++){var j=x.eq(o).data("name"),k=parseInt(x.eq(o).attr("minlength")),T=parseInt(x.eq(o).attr("maxlength")),I=(x.eq(o).find(":checkbox").size(),x.eq(o).find(":checkbox:checked").size());if(x.eq(o).find(".c-red").length){if(0==I)return r.showmsg("亲，带*号为必填项哦！请先完善","",1e3),!1;if(k>I)return r.showmsg("亲，【"+j+"】最少选择"+k+"项哦","",1e3),!1;if(I>T)return r.showmsg("亲，【"+j+"】最多选择"+T+"项哦","",1e3),!1}else if(0!==I&&(I>T||k>I))return r.showmsg("亲，【"+j+"】最少选"+k+"项最多选"+T+"项哦!","",1e3),!1}var C=t("#tid").val();t.ajax({type:"POST",url:homeUrl+"misc/recruit_apply",data:t("#formRecruit").serialize(),cache:!1,dataType:"json",success:function(e){return 200!==e.code?(r.showmsg(e.message,"",1e3),!1):void(window.location.href=homeUrl+"recruit?id="+C+"&step="+e.data.step+"&gender="+e.data.gender+"&mobile="+e.data.mobile+"&openid="+openid)}})});var i={};i.CheckLength=function(e){var t,r;for(r=0,t=0;t<e.length;t++)r+=(e.charCodeAt(t)>0&&e.charCodeAt(t)<=255,1);return r},window.navigator.userAgent.toLowerCase().indexOf("micromessenger")&&(t.ajax({type:"GET",url:"http://fansclub.5usport.com/wx/winterface/jsapisign",data:{signurl:o},dataType:"json",success:function(e){n.config({debug:!1,appId:e.appid,timestamp:e.timestamp,nonceStr:e.noncestr,signature:e.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","getLocation","openLocation"]})},error:function(){showmsg("数据有误","",1e3)}}),n.ready(function(){n.showOptionMenu(),n.onMenuShareAppMessage({title:shareTitle,desc:shareDescription,link:shareUrl,imgUrl:shareImage,trigger:function(e){},success:function(e){},cancel:function(e){},fail:function(e){}}),n.onMenuShareTimeline({title:shareTitle,link:shareUrl,imgUrl:shareImage,trigger:function(e){},success:function(e){},cancel:function(e){},fail:function(e){}}),n.getLocation({success:function(e){var t=e.latitude,r=e.longitude,n=[r,t],o=document.createElement("script"),a="http://api.map.baidu.com/geoconv/v1/?coords="+n.toString()+"&from=1&to=5&ak=820fef90c4bf9795c46a5111e7b4f9d2&callback=dealResult";o.src=a,document.getElementsByTagName("head")[0].appendChild(o)}})}),n.error(function(e){alert(e.errMsg)}))});