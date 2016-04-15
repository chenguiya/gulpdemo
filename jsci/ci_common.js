function showmsg(msg, offsetObj, delay) {
      delay = delay || 2000;
      msg = msg || '操作成功';
      var timeid = '';
      if (!offsetObj) {
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      }
      var winWidth = document.body.clientWidth || window.innerWidth;

      if (!$('#toptip').length) {
        $(document.body).prepend('<div id="jsapend" style="position:relative;"><div id="toptip" style="position: absolute; font-size: 18px; color: #fff;  font-family: Microsoft YaHei;  text-align: center; border-radius: 5px; line-height: 50px; padding: 0 30px 0 30px; min-height: 50px;background: rgba(0,0,0,0.5);z-index: 999999;">' + msg + '</div></div>');
      } else {
        $('#toptip').fadeOut('fast').html(msg);
      }

      if (!offsetObj) {
        offsetObj = {'top': document.body.scrollTop + winHeight / 2, 'left': winWidth / 2 - $('#toptip').outerWidth(true) / 2};
      } else if (!offsetObj.left) {
        offsetObj.left = winWidth / 2 - $('#toptip').outerWidth(true) / 2;
      } else {
        offsetObj.left = offsetObj.left - $('#toptip').outerWidth(true) / 2;
      }

      $('#toptip').css(offsetObj).stop().fadeIn('normal', function() {
        if (timeid)
          clearTimeout(timeid);
        timeid = setTimeout(function() {
          $('#toptip').fadeOut();
        }, delay);
      });
};

function back_home(){
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { 
          window.location.href ="ios://NativeBack";
    } else if (/(Android)/i.test(navigator.userAgent)) { 
          window.Android.NativeBack();
    } else {
          history.go(-1);
    };
}
//浏览器访问不到头像触发
function nofindPic(){ 
   var img=event.srcElement; 
   img.src=cid_url+'/static/images/nopic.png'; 
   img.onerror=null; //控制不要一直跳动 
} 
//评论禁言
function muzzledid(k,fid,authorid){
  var muzzurl=cid_url + '/fansclub/member/blacklist_add?'+'fid='+fid+'&vuid='+authorid;
  $.ajax({
    type: 'GET',
    url: muzzurl,
    dataType:'json',
    success: function(data){
      if(data){
         if(data.code === 401){
            if(isIOS){
               showmsg(data.message,'',1000);
               setTimeout(function(){
                  window.location.href="ios://NativeLogin";
               },1500);
            }else if(isAndroid){
              showmsg(data.message,'',1000);
              setTimeout(function(){
                 window.Android.NativeLogin();
              },1500);
            }else{
              showmsg(data.message,'',1000);
            }
         }else if(data.code === 404){
            showmsg(data.message,'',1000);
         }else if(data.code === 402){
            showmsg(data.message,'',1000);
         }else if(data.code === 405){
            showmsg(data.message,'',1000);
         }else if(data.code === 406){
            showmsg(data.message,'',1000);
         }else if(data.code === 200){
            showmsg(data.message,'',1000);
            setTimeout(function(){
              window.location.reload();
            },1500);
         }else{
            showmsg('请稍后再试');
         }
      }else{
        showmsg('数据有误');
      }
      setTimeout(function(){
           hideWindow(k);
        },1500);
    },
    error:function(){
      showmsg('出错了，请稍后再试');
    }
  });
}
//评论举报
function reportsid(k,fid,tid,author,authorid,pid){
  var authrname=escape(author);
  var url=cid_url + '/api/misc/report?fid='+fid+'&tid='+tid+'&author='+authrname+'&authorid='+authorid+'&pid='+pid+'&type=reply';
  $.ajax({
    type:'GET',
    url:url,
    dataType:'json',
    success:function(data){
      if(data){
         if(data.code === 404){
          showmsg(data.message,'',1000);
          window.location.reload();
         }else if(data.code === 200){
          showmsg(data.message,'',1000);
          window.location.reload();
         }else{
          showmsg('请稍候再试');
         }
      }else{
        showmsg('数据有误');
      }
    },
    error:function(){
      showmsg('出错了，请稍后再试');
    }
  });
}
//评论删除
function deletoid(k,pid,tid,authorid,fid){
  var url=cid_url + '/api/feed_manage/delete?'+'fid='+fid+'&pid='+pid+'&tid='+tid+'&authorid='+authorid+'&type=reply';
  $.ajax({
     type:'GET',
     url:url,
     dataType:'json',
     success: function(data){
        if(data){
          if(data.code ===401){
             if(isIOS){
                showmsg(data.message,'',1000);
                setTimeout(function(){
                      window.location.href="ios://NativeLogin";
                },1500);
             }else if(isAndroid){
                showmsg(data.message,'',1000);
                setTimeout(function(){
                    window.Android.NativeLogin();
                },1500);
             }else{
                showmsg(data.message,'',1000);
             }
          }else if(data.code === 404){
               showmsg(data.message,'',1000);
          }else if(data.code === 402){
               showmsg(data.message,'',1000);
          }else if(data.code === 200){
               showmsg(data.message,'',1000);
               setTimeout(function(){
                      window.location.reload();
                },1500);
          }else{
            showmsg('请稍后再试');
          }

        }else{
          showmsg('数据有误');
        }
        setTimeout(function(){
           hideWindow(k);
        },1500);
     },
     error: function(){
       showmsg('出错了，请稍后再试');
     }
  });

}
function hideWindow(k){
 if(document.getElementById('fwin_' + k)){
   document.getElementById('append_parent').removeChild(document.getElementById('fwin_' + k));
  }
}
//管理员回复
function showWindow(k,pid,tid,authorid,fid,yname) {
    var rename =escape(yname);
    var menuid = 'fwin_' + k;
  var menuObj = document.getElementById(menuid);
  var drag=null;
  var loadingst=null;
  var hidedom='';
    menuObj = document.createElement('div');
    menuObj.id = menuid;
    menuObj.className = 'ux_popmenu';
    document.getElementById('append_parent').appendChild(menuObj);
    evtspan=' onclick="hideWindow(\'' + k + '\')"';
    var s='<div class="content_onlay" id="fwin_content_'+k+'"><ul class="pop_ulCOp">';
     s +='<li><a href="'+cid_url+'/api/post/newreply?fid='+fid+'&tid='+tid+'&parentid='+pid+'&rename='+rename+'&submitreply=0">回复</a></li>';
     s +='<li><a href="javascript:deletoid(\''+k+'\','+pid+','+tid+','+authorid+','+fid+');">删除</a></li>';
     s +='<li><a href="javascript:muzzledid(\''+k+'\','+fid+','+authorid+');">禁言</a></li>';
     s +='<li><a href="javascript:reportsid(\''+k+'\','+fid+','+tid+',\''+yname+'\','+authorid+','+pid+');">举报</a></li>';
     s +='<li class="li_cancel"><a href="javascript:void(0)"' + evtspan + ' class="nav_hide">取消</a></li>';
     s +='</ul></div>';
     s +='<div style="width: 100%; height: 100%; position: fixed; z-index: 105; top: 0px; left: 0px; overflow: hidden; background:rgba(0,0,0,.45);"' + evtspan + '></div>';
     menuObj.innerHTML=s;
}
//普通用户回复
function showOrdinary(k,pid,tid,authorid,fid,yname){
  var rename =escape(yname);
    var menuid = 'fwin_' + k;
  var menuObj = document.getElementById(menuid);
  var drag=null;
  var loadingst=null;
  var hidedom='';
    menuObj = document.createElement('div');
    menuObj.id = menuid;
    menuObj.className = 'ux_popmenu';
    document.getElementById('append_parent').appendChild(menuObj);
    evtspan=' onclick="hideWindow(\'' + k + '\')"';
    var s='<div class="content_onlay" id="fwin_content_'+k+'"><ul class="pop_ulCOp">';
     s +='<li><a href="'+cid_url+'/api/post/newreply?fid='+fid+'&tid='+tid+'&parentid='+pid+'&rename='+rename+'&submitreply=0">回复</a></li>';
     s +='<li><a href="javascript:reportsid(\''+k+'\','+fid+','+tid+',\''+yname+'\','+authorid+','+pid+');">举报</a></li>';
     s +='<li class="li_cancel"><a href="javascript:void(0)"' + evtspan + ' class="nav_hide">取消</a></li>';
     s +='</ul></div>';
     s +='<div style="width: 100%; height: 100%; position: fixed; z-index: 105; top: 0px; left: 0px; overflow: hidden; background:rgba(0,0,0,.45);"' + evtspan + '></div>';
     menuObj.innerHTML=s;
}
//游客举报
function showReports(k,pid,tid,authorid,fid,yname){
  var rename =escape(yname);
    var menuid = 'fwin_' + k;
  var menuObj = document.getElementById(menuid);
  var drag=null;
  var loadingst=null;
  var hidedom='';
    menuObj = document.createElement('div');
    menuObj.id = menuid;
    menuObj.className = 'ux_popmenu';
    document.getElementById('append_parent').appendChild(menuObj);
    evtspan=' onclick="hideWindow(\'' + k + '\')"';
    var s='<div class="content_onlay" id="fwin_content_'+k+'"><ul class="pop_ulCOp">';
     s +='<li><a href="javascript:reportsid(\''+k+'\','+fid+','+tid+',\''+yname+'\','+authorid+','+pid+');">举报</a></li>';
     s +='<li class="li_cancel"><a href="javascript:void(0)"' + evtspan + ' class="nav_hide">取消</a></li>';
     s +='</ul></div>';
     s +='<div style="width: 100%; height: 100%; position: fixed; z-index: 105; top: 0px; left: 0px; overflow: hidden; background:rgba(0,0,0,.45);"' + evtspan + '></div>';
     menuObj.innerHTML=s;
}
//帖子内页头像获取
function avatarBack(k){
  if(k !==''){
      if (isIOS) { 
           window.location.href ='ios://NativeOtherMemberInfo/'+k;
        } else if (/(Android)/i.test(navigator.userAgent)) { 
           window.Android.NativeOtherMemberInfo(k);
        } else {
            return false;
        };
  }else{
    return false;
  }
}
//活动内页未签到、签到
var actpassNow = function(tid,statusid){
  if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
    window.location.href='ios://NativeUnauditedActivityMembers/' + tid +'/' + statusid;
  }else if(isAndroid){
    window.Android.NativeUnauditedActivityMembers(tid,statusid);
  }else{
    return false;
  }

}  
//美女猜拳游戏
function diceroll(dice,num){
  dice.attr("class","dice");
  dice.animate({left: '0px'}, 10,function(){
    dice.addClass("dice_1");
  }).delay(100).animate({top:'0'},400,function(){
    dice.removeClass("dice_1").addClass("dice_2");
  }).delay(100).animate({opacity: 'show'},400,function(){
    dice.removeClass("dice_2").addClass("dice_3");
  }).delay(100).animate({left:'0',top:'0'},400,function(){
    dice.removeClass("dice_3").addClass("dice_"+num);
    dice.css('cursor','pointer');
  });
}
  
