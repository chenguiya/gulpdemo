function totime(t){var t=t.replace(/-/g,"/"),e=new Date(t),a=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds()));return t=a.getTime()/1e3-28800}$(function(){var isWeiXin=-1!=navigator.userAgent.toLowerCase().indexOf("micromessenger");if($("#actMores").on("click",function(){var t,e,a=parseInt($(this).attr("data-page")),i=parseInt($(this).attr("data-totalpage")),n=parseInt($(this).attr("data-id"));e=isWeiXin?location.href:"forum.php?mod=viewthread&tid="+n,$.ajax({type:"GET",url:e,data:{page:a},dataType:"html",success:function(e){i>=a?($("#sectionBoxd").append($(e).find("#postBoxd .chtwo")),t=a+1,$("#actMores").attr("data-page",t),t==i+1&&$("#actMores").html("没有更多了")):$("#actMores").html("没有更多了")},error:function(){alert("数据问题")}})}),$("#applylist_more").on("click",function(){var t,e,a=parseInt($(this).attr("page")),i=parseInt($(this).attr("totalpage")),n=parseInt($(this).attr("data-id"));t="forum.php?mod=misc&action=activityapplylist&tid="+n,$.ajax({type:"GET",url:t,data:{page:a},dataType:"html",success:function(t){i>=a?($("#folat_labelModel").append($(t).find("#folat_labelModel")),e=a+1,$("#applylist_more").attr("page",e),e==i+1&&$("#applylist_more").html("没有更多了")):$("#applylist_more").html("没有更多了")},error:function(){alert("数据问题")}})}),$("#SignOutMore").on("click",function(){var t,e,a=parseInt($(this).attr("page")),i=parseInt($(this).attr("totalpage")),n=parseInt($(this).attr("data-id"));t=isWeiXin?location.href:"forum.php?mod=misc&action=signinlist&tid="+n+"&issigined=0&mobile=2",i>=a?$.ajax({type:"GET",url:t,data:{page:a},dataType:"html",success:function(t){$("#tableSign").append($(t).find("#tableSign tbody tr")),e=a+1,$("#SignOutMore").attr("page",e),e==i+1&&$("#SignOutMore").html("没有更多了")},error:function(){alert("数据有问题")}}):$("#SignOutMore").html("没有更多了")}),$("#SignInMore").on("click",function(){var t,e,a=parseInt($(this).attr("page")),i=parseInt($(this).attr("totalpage")),n=parseInt($(this).attr("data-id"));t=isWeiXin?location.href:"forum.php?mod=misc&action=signinlist&tid="+n+"&mobile=2",i>=a?$.ajax({type:"GET",url:t,data:{page:a},dataType:"html",success:function(t){$("#tableSign").append($(t).find("#tableSign tbody tr")),e=a+1,$("#SignInMore").attr("page",e),e==i+1&&$("#SignInMore").html("没有更多了")},error:function(){alert("数据有问题")}}):$("#SignInMore").html("没有更多了")}),$("#actbox_More").on("click",function(){var t,e,a=parseInt($(this).attr("page")),i=parseInt($(this).attr("totalpage"));t="forum.php?mod=activity&page="+a+"&mobile=2",i>=a?$.get(t,function(t){$("#ch_actbox").append($(t).find("#ch_actbox li")),e=a+1,$("#actbox_More").attr("page",e),e==i+1&&$("#actbox_More").html("没有更多了")}):$("#actbox_More").html("没有更多了")}),$("#notice_More").on("click",function(){var t,e="home.php"+window.location.search,a=parseInt($(this).attr("page")),i=parseInt($(this).attr("totalpage"));i>=a?$.get(e,{page:a},function(e){$("#notice_box").append($(e).find("#notice_box li")),t=a+1,$("#notice_More").attr("page",t),t==i+1&&$("#notice_More").html("没有更多了")}):$("#notice_More").html("没有更多了")}),$("#add_banner #ic_error").on("click",function(){$("#add_banner").remove()}),$(".quiz div.quiz_box").click(function(){$(this).parent().find(".quiz_box").removeClass("quiz_checked"),$(this).addClass("quiz_checked"),$("#btn_submit").addClass("quiz_hui")}),$(function($){var bdshare_content="",bdshare_desc="",bdshare_pic="",bdshare_url="",share_thread=function(){$("a.share_thread").off("click.share_thread"),$("a.share_thread").on("click.share_thread",function(){bdshare_url=location.href,bdshare_pic=$(".message img:first").attr("src"),"string"==typeof bdshare_pic&&-1==bdshare_pic.search(/http/i)&&(bdshare_pic=location.hostname+"/"+bdshare_pic),bdshare_content=$("#elecnation_post_title").attr("data-title"),bdshare_desc=""})},baiduShare=function(){with(window._bd_share_config={common:{bdText:"",bdDesc:"",bdUrl:"",bdPic:"",bdSign:"",bdMini:"",bdMiniList:"",onBeforeClick:function(t,e){return e.bdText=bdshare_content,e.bdPic=bdshare_pic,e.bdUrl=bdshare_url||location.href,e.bdDesc=bdshare_desc,$.get("/plugin.php",{id:"fansclub:api",ac:"passport",op:"share",cmd:t}),e},bdPopupOffsetLeft:"",bdPopupOffsetTop:"",bdCustomStyle:""},share:[{tag:"share_thread",bdSize:32}]},document)0[(getElementsByTagName("head")[0]||body).appendChild(createElement("script")).src="http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion="+~(-new Date/36e5)]};share_thread(),baiduShare()}($)),$("#leagueMatch").length){var isFloat=!1,bar=$("#tab_actY").offset().top;if($(window).on("scroll",function(){var t=$(document).scrollTop();t>bar?($("#tab_actY").addClass("tab_brBOX"),isFloat=!0):($("#tab_actY").removeClass("tab_brBOX"),isFloat=!1)}),$(".teamSchedule").length){var time=new Date,m=time.getMonth()+1,t=parseInt(totime(time.getFullYear()+"-"+m+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()));$(".teamSchedule").each(function(){var e=parseInt(totime($(this).find(".listSchedule:eq(0) .rowtime").attr("data-match"))),a=parseInt(totime($(this).find(".listSchedule:eq(0) .rowtime").attr("data-endtime")));if(t>=e&&a>=t){if($(this).attr("id","sced_id"),$(this).attr("name","sced_id"),/#sced_id/.test(location.href))return;window.location.href=location.href+"#sced_id"}})}}});var G={};G.$=function(t,e){return(e||document).querySelector(t)},G.hasClass=function(t,e){var a=new RegExp("(^|\\s+)"+e+"(\\s+|$)");return a.test(t.className)},G.addClass=function(t,e){!G.hasClass(t,e)&&(t.className+=" "+e)},G.removeClass=function(t,e){t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ")},G.toggleClass=function(t,e){G.hasClass(t,e)?G.removeClass(t,e):G.addClass(t,e)},G.transition=function(t,e,a,i){for(var i=i||"linear",a=a||"all",n=["","-o-","-ms-","-webkit-","-moz-"],o=0;o<n.length;o++)t.style[n[o]+"transition"]=e/1e3+"s "+a+" "+i},$(".quiz_dialog").length&&{initialize:function(){this.navColumn()},navColumn:function(){var t=document.querySelector(".nav-overlay"),e=document.querySelector(".pop_barcom"),a=document.querySelector(".quiz_dialog"),i=function(){t.style.display="block",setTimeout(function(){G.transition(t,250),t.style.opacity=1},10)},n=function(){t.style.opacity=0,setTimeout(function(){t.style.display="none"},250)};a.addEventListener("click",function(t){G.hasClass(e,"pop-show")?(G.removeClass(e,"pop-show"),n()):(G.addClass(e,"pop-show"),i())},!1),t.addEventListener("click",function(){G.removeClass(e,"pop-show"),n()},!1),document.addEventListener("touchmove",function(t){G.hasClass(e,"pop-show")&&t.preventDefault()},!1)}}.initialize();