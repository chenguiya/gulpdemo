define("js/draw_review",["jquery"],function(a){"user strict";function showmsg(e,t,i){i=i||2e3,e=e||"操作成功";var a="";if(!t)var o=document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight;var n=document.body.clientWidth||window.innerWidth;$("#toptip").length?$("#toptip").fadeOut("fast").html(e):$(document.body).prepend('<div id="jsapend" style="position:relative;"><div id="toptip" style="position: absolute; font-size: 18px; color: #fff;  font-family: Microsoft YaHei;  text-align: center; border-radius: 5px; line-height: 50px; padding: 0 30px 0 30px; min-height: 50px;background: rgba(0,0,0,0.5);z-index: 999999;">'+e+"</div></div>"),t?t.left?t.left=t.left-$("#toptip").outerWidth(!0)/2:t.left=n/2-$("#toptip").outerWidth(!0)/2:t={top:document.body.scrollTop+o/2,left:n/2-$("#toptip").outerWidth(!0)/2},$("#toptip").css(t).stop().fadeIn("normal",function(){a&&clearTimeout(a),a=setTimeout(function(){$("#toptip").fadeOut()},i)})}var $=a("jquery"),flag=!1,page=2,loading=!1,stop=!0;if($("#reviewLoading").length){var maxpage=parseInt($("#reviewLoading").attr("maxpage"));$(window).scroll(function(){$(document).height()-$(this).scrollTop()-$(this).height()<100&&document.getElementById("reviewLoading")&&(flag=!0,$("#reviewLoading").css("display","block"),setTimeout(function(){flag&&$.ajax({type:"GET",url:location.href,data:{page:page},dataType:"json",cache:!1,success:function(data){$("#reviewLoading").hide();for(var count=data.data.length,arr=eval(data.data),i=0;count>i;i++){var html='<li><a href="drawcash/details?id='+arr[i].id+'"><div class="contL"><div class="name">'+arr[i].title+'</div><div class="prices"><p>'+arr[i].cash+"元</p>"+arr[i].dateline+'</div></div><div class="contCenter">'+arr[i].step_wap+"</div></a></li>";$(".reviewList ul").append(html)}page++,page>maxpage&&$("#reviewLoading").remove()},error:function(){showmsg("数据返回异常","",1e3)}}),flag=!1},1e3))})}});