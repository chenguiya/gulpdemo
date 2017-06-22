define("test/mobile/activity_all",["jquery","common"],function(t,a,e){"user strict";var i=t("jquery"),c=t("common"),s={};s.init=function(){var t=1,a=!1,e=!0,s=parseInt(i("#Getloading").attr("totalpage"));i(window).scroll(function(){a||i(document).height()-i(this).scrollTop()-i(this).height()<200&&1==e&&(e=!1,t++,setTimeout(function(){i.ajax({type:"GET",url:homeUrl+"fansclub/hot_activity",data:{page:t},cache:!1,dataType:"json",success:function(c){e=!0;for(var o="",n=0;n<c.data.length;n++){var l=c.data[n];o+='<li><a href="'+homeUrl+"activity?id="+l.tid+'">',o+='<p class="name">'+l.title+"</p>",o+='<p class="img" style="background:url('+l.cover+') no-repeat center center;background-size:100% auto;"></p>',o+='<div class="flex time_btn"><p class="flex time"><i class="icon-time"></i>'+l.starttimefrom+"</p>",o+=2==l.status?'<p class="flex submitover">已结束</p>':'<p class="flex submitok">立即报名</p>',o+="</div>",o+='<p class="flex fans"><img src="'+l.fansclub_logo+'" width="78" height="78" alt="logo">'+l.fansclub_name+"</p>",o+="</a></li>"}return i("#acty_Listid").append(o),t>=s?(i("#Getloading").html("全部加载完毕"),void(a=!0)):void 0},error:function(){c.showmsg("加载数据返回异常！","",1e3)}})},1e3))})},s.recruit=function(){var t=1,a=!1,e=!0,s=parseInt(i("#Getloading").attr("totalpage"));i(window).scroll(function(){a||i(document).height()-i(this).scrollTop()-i(this).height()<200&&1==e&&(e=!1,t++,setTimeout(function(){i.ajax({type:"GET",url:homeUrl+"fansclub/hot_recruit",data:{page:t},cache:!1,dataType:"json",success:function(c){e=!0;for(var o="",n=0;n<c.data.length;n++){var l=c.data[n];o+='<li><a href="'+homeUrl+"recruit?id="+l.tid+'">',o+='<p class="name">'+l.title+"</p>",o+='<div class="flex time_btn">',o+='<p class="flex time"><img src="'+l.fansclub_logo+'" width="78" height="78" alt="logo">'+l.fansclub_name+"</p>",o+='<p class="flex submitok">立即报名</p>',o+="</div>",o+="</a></li>"}return i("#acty_Listid").append(o),t>=s?(i("#Getloading").html("全部加载完毕"),void(a=!0)):void 0},error:function(){c.showmsg("加载数据返回异常","",1e3)}})},1e3))})},s.joinActivity=function(){var t=1,a=!1,e=!0,s=parseInt(i("#Getloading").attr("totalpage"));i(window).scroll(function(){a||i(document).height()-i(this).scrollTop()-i(this).height()<200&&1==e&&(e=!1,t++,setTimeout(function(){i.ajax({type:"GET",url:homeUrl+"wechat/fans_assistant/my_joined_activity",data:{page:t},dataType:"json",cache:!1,success:function(c){e=!0;for(var o="",n=0;n<c.data.length;n++){var l=c.data[n];o+='<li><a href="'+homeUrl+"activity?id="+l.tid+'">',o+='<p class="name">'+l.title+"</p>",o+='<p class="img" style="background:url('+l.cover+') no-repeat center center;background-size:100% auto;"></p>',o+='<div class="flex time_btn">',o+=""!==l.fansclub_logo?'<p class="flex fans"><img src="'+l.fansclub_logo+'" ></p>':'<p class="flex fans"><img src="'+homeUrl+'static/images/no_logo.png" ></p>',o+='<div class="time">',o+='<h3 class="fans_name">'+l.fansclub_name+"</h3>",o+="<p>"+l.starttimefrom+"</p>",o+="</div>",o+=2==l.status?'<p class="flex submitover">已结束</p>':'<p class="flex submitok">活动详情</p>',o+="</div>",o+="</a></li>"}return i("#activityJoin").append(o),t>=s?(i("#Getloading").html("全部加载完毕"),void(a=!0)):void 0},error:function(){c.showmsg("数据加载返回异常","",1e3)}})},1e3))})},s.actpush=function(){i("#selectsFanId").on("change",function(){activity_tid=i("#selectsFanId").val(),s.actTidNum(activity_tid)}),i(".submitpush").on("click",function(){var t,a=i("#selectsFanId").val(),e=0;return i(".actLpush .opt").each(function(){var a=i(this);a.find(".magic-radio").is(":checked")&&(t=a.find(".magic-radio").val())}),i(".optchecked .magic-checkbox:checked").each(function(){e=1}),i.ajax({type:"POST",url:homeUrl+"misc/fansclub_admin_push",data:{id:a,type:t,sms:e},dataType:"json",cache:!1,success:function(t){200==t.code?(c.showmsg("推送成功","",2e3),setTimeout(function(){window.location.reload()},2e3)):c.showmsg(t.message,"",2e3)},error:function(){c.showmsg("数据加载返回异常","",1e3)}}),!1})},s.actsuperpush=function(){var t;i("#fansSelect").on("change",function(){var a=i("#fansSelect").val(),e="";i.ajax({type:"POST",url:homeUrl+"misc/get_push_activity_data",data:{fid:a},dataType:"json",cache:!1,success:function(a){if(200==a.code)if(a.data.length>0){for(var o=0;o<a.data.length;o++){var n=a.data[o];e+='<option value="'+n.tid+'">'+n.title+"</option>"}i("#activitySelect").html(e),t=i("#activitySelect").val(),s.actTidNum(t)}else{var l='<option value="0">暂无活动</option>';i("#activitySelect").html(l),c.showmsg("该球迷会暂无活动！","",1e3)}else c.showmsg(a.message,"",2e3)},error:function(){c.showmsg("数据加载返回异常","",1e3)}})}),i("#activitySelect").on("change",function(){var t=i("#activitySelect").val();s.actTidNum(t)}),i(".submitpush").on("click",function(){var t,a=0,e=i("#fansSelect").val();if(0==e)return c.showmsg("请选择球迷会再推送哦!","",1e3),!1;var s=i("#activitySelect").val();return 0==s?(c.showmsg("该球迷会暂无活动，请选择其他球迷会","",1e3),!1):(i(".actLpush .opt").each(function(){var a=i(this);a.find(".magic-radio").is(":checked")&&(t=a.find(".magic-radio").val())}),i(".optchecked .magic-checkbox:checked").each(function(){a=1}),i.ajax({type:"POST",url:homeUrl+"misc/super_admin_push",data:{id:s,type:t,sms:a},dataType:"json",cache:!1,success:function(t){200==t.code?(c.showmsg("推送成功","",1500),setTimeout(function(){window.location.reload()},2e3)):c.showmsg(t.message,"",2e3)},error:function(){c.showmsg("数据加载返回异常","",1e3)}}),!1)})},s.actTidNum=function(t){i.ajax({type:"POST",url:homeUrl+"misc/count_activityapply_num",data:{tid:t},dataType:"json",cache:!1,success:function(t){200==t.code?i("#apply_nums").html("("+t.data.num+")"):c.showmsg(t.message,"",1e3)},error:function(){c.showmsg("数据加载返回异常","",1e3)}})},e.exports=s});