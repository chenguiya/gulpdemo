$(function(){
  var isWeiXin = navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
   //内页评论加载 
   $("#actMores").on("click",function(){
    var num,locationUR;
     var page=parseInt($(this).attr('data-page'));
     var totalpage=parseInt($(this).attr('data-totalpage'));
     var tid=parseInt($(this).attr('data-id'));
     if(isWeiXin){
      locationUR=location.href
     }else{
      locationUR='forum.php?mod=viewthread&tid='+tid;
     }
    $.ajax({
       type:'GET',
       url:locationUR,
       data:{page:page},
       dataType:'html',
       success:function(data){
          if(page <= totalpage){
             $('#sectionBoxd').append($(data).find('#postBoxd .chtwo'));
              num=page+1;
              $('#actMores').attr('data-page',num);
              if(num==totalpage+1){
                  $('#actMores').html("没有更多了");
              }
          }else{
              $('#actMores').html('没有更多了');
          }
       },
       error:function(){
        alert('数据问题');
       }
     })
    });
   //申请报名加载
  $('#applylist_more').on("click",function(){
     var url,num;
     var page=parseInt($(this).attr('page'));
     var totalpage=parseInt($(this).attr('totalpage'));
     var tid=parseInt($(this).attr('data-id'));
      url=location.href;
     //url='forum.php?mod=misc&action=activityapplylist&tid='+tid;
     //http://www.5usport.com/forum.php?mod=misc&action=activityapplylist&tid=79251&page=3
     url=location.href;
     $.ajax({
      type:'GET',
      url:url,
      data:{page:page},
      dataType:'html',
      success:function(data){
        if(page <=totalpage){
          $('#folat_labelModel').append($(data).find('#folat_labelModel'));
          num=page+1;
          $('#applylist_more').attr('page',num);
          if(num == totalpage+1){
            $('#applylist_more').html('没有更多了');
          }
        }else{
          $('#applylist_more').html('没有更多了');
        }
      },
      error:function(){
        alert('数据问题');
      }
     });      
  });
  //未签到加载
  $('#SignOutMore').on('click',function(){
    var url,num;
    var page=parseInt($(this).attr('page'));
    var totalpage=parseInt($(this).attr('totalpage'));
    var tid=parseInt($(this).attr('data-id'));
    if(isWeiXin){
      url=location.href;
    }else{
      url='forum.php?mod=misc&action=signinlist&tid='+tid+'&issigined=0&mobile=2';
    }
    if(page <=totalpage){
      $.ajax({
        type:'GET',
        url:url,
        data:{page:page},
        dataType:'html',
        success:function(data){
          $('#tableSign').append($(data).find('#tableSign tbody tr'));
          num=page+1;
          $('#SignOutMore').attr('page',num);
          if(num == totalpage +1){
            $('#SignOutMore').html('没有更多了');
          }
        },
        error:function(){
          alert('数据有问题');
        }
      });
    }else{
      $('#SignOutMore').html('没有更多了');
    }
  });
  //已签到加载
  $('#SignInMore').on('click',function(){
     var url,num;
     var page=parseInt($(this).attr('page'));
     var totalpage=parseInt($(this).attr('totalpage'));
     var tid=parseInt($(this).attr('data-id'));
     if(isWeiXin){
      url=location.href;
     }else{
      url='forum.php?mod=misc&action=signinlist&tid='+tid+'&mobile=2'
     }
     if(page <= totalpage){
        $.ajax({
          type:'GET',
          url:url,
          data:{page:page},
          dataType:'html',
          success:function(data){
            $('#tableSign').append($(data).find('#tableSign tbody tr'));
            num=page+1;
            $('#SignInMore').attr('page',num);
            if(num == totalpage +1){
              $('#SignInMore').html('没有更多了');
            }
          },
          error:function(){
            alert('数据有问题');
          }
        });
     }else{
      $('#SignInMore').html('没有更多了');
     }
  });
  $('#actbox_More').on("click",function(){
    var url,num;
    var page=parseInt($(this).attr('page'));
    var totalpage=parseInt($(this).attr('totalpage'));
    url='forum.php?mod=activity'+'&page='+page+'&mobile=2';
    if(page <= totalpage){
    $.get(url,function(data){   
          $("#ch_actbox").append($(data).find("#ch_actbox li"));
          num=page+1;
          $("#actbox_More").attr("page",num);
          if(num==totalpage+1)
          {
            $("#actbox_More").html('没有更多了');
          }
      });
    }else{
       $("#actbox_More").html('没有更多了');
    }
  });

  $('#notice_More').on("click",function(){
     var num;
     var url='home.php'+window.location.search;
     var page=parseInt($(this).attr('page'));
     var totalpage=parseInt($(this).attr('totalpage'));
     if(page <= totalpage){
        $.get(url,{page:page},function(data){
            $("#notice_box").append($(data).find("#notice_box li"));
            num=page+1;
            $("#notice_More").attr("page",num);
            if(num==totalpage+1){
              $("#notice_More").html("没有更多了");
            }
        });
      }else{
        $("#notice_More").html("没有更多了");
      }
  });
  //banner
  $('#add_banner #ic_error').on('click',function(){
    $('#add_banner').remove();
  });

  //forumdisplay_quiz
  $('.quiz div.quiz_box').click(function(){
      $(this).parent().find('.quiz_box').removeClass('quiz_checked');
      $(this).addClass('quiz_checked');
      $('#btn_submit').addClass('quiz_hui');
  });

  //share
  $(function($) {
            var bdshare_content = '';
            var bdshare_desc = '';
            var bdshare_pic = '';
            var bdshare_url = '';
            var share_thread = function() {
                $('a.share_thread').off('click.share_thread');
                $('a.share_thread').on('click.share_thread', function() {
                    bdshare_url = location.href;
                    bdshare_pic = $('.message img:first').attr('src');
                    
                    if (typeof bdshare_pic == 'string' && bdshare_pic.search(/http/i) == -1) {
                        bdshare_pic = location.hostname + '/' + bdshare_pic;
                    }
                    bdshare_content = $('#elecnation_post_title').attr('data-title');
                    bdshare_desc = '';
                });
            };
            var baiduShare = function() {
                window._bd_share_config = {
                    common: {
                        bdText: '',
                        bdDesc: '',
                        bdUrl: '',
                        bdPic: '',
                        bdSign: '',
                        bdMini: '',
                        bdMiniList: '',
                        onBeforeClick: function(cmd, config) {
                            config.bdText = bdshare_content;
                            config.bdPic = bdshare_pic;
                            config.bdUrl = bdshare_url || location.href;
                            config.bdDesc = bdshare_desc;
                            
                            $.get("/plugin.php", { 'id' : 'fansclub:api', 'ac' : 'passport', 'op' : 'share', 'cmd' : cmd});
                            return config;
                        },
                        bdPopupOffsetLeft: '',
                        bdPopupOffsetTop: '',
                        bdCustomStyle: ''
                    },
                    share: [
                        {tag: 'share_thread', bdSize:32}
                    ]
                };
                with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
            };
            
            share_thread();
            baiduShare();
        }($));
  //赛程定位
  if($('#leagueMatch').length){
    var isFloat=false;
    var bar=$('#tab_actY').offset().top;
    $(window).on('scroll',function(){
        var nu=$(document).scrollTop();
        if(nu > bar){
            $('#tab_actY').addClass('tab_brBOX');
            isFloat=true;
        }else{
            $('#tab_actY').removeClass('tab_brBOX');
            isFloat=false;
        }
    });
   if($('.teamSchedule').length){    
        var time = new Date();
        var m = time.getMonth() + 1;
        var t =parseInt(totime(time.getFullYear() + "-" + m + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()));
        $('.teamSchedule').each(function(){
            var martch_time=parseInt(totime($(this).find('.listSchedule:eq(0) .rowtime').attr('data-match')));
            var end_time=parseInt(totime($(this).find('.listSchedule:eq(0) .rowtime').attr('data-endtime')));

            if(martch_time <= t && t <= end_time){
                $(this).attr('id','sced_id');
                $(this).attr('name','sced_id');
                if((/#sced_id/).test(location.href)){
                    return;
                }else{
                 window.location.href=location.href + '#sced_id';
                    
                }
            }
        });
}
  }

  
});

//@ch 转换str
function totime(str){
  var str = str.replace(/-/g,"/");
  var date = new Date(str); 
  var humanDate = new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(), date.getSeconds()));
  str = (humanDate.getTime()/1000 - 8*60*60);
  return str;
}


//竞猜弹窗
var G={};
G.$=function(sel,context){
  return (context || document).querySelector(sel);
};
G.hasClass = function(o, c) {
  var regexp = new RegExp("(^|\\s+)" + c + '(\\s+|$)');
  return regexp.test(o.className);
};
G.addClass=function(o,c){
  !G.hasClass(o,c) && (o.className +=' ' + c);
};
G.removeClass = function(o, c) {
  o.className = o.className.replace(new RegExp("(^|\\s+)" + c + '(\\s+|$)'), ' ');
}
G.toggleClass = function(o, c) {
  G.hasClass(o, c) ? G.removeClass(o, c) : G.addClass(o, c);
};
G.transition = function(obj,time,prop,fx){
  var fx = fx || 'linear';
  var prop = prop || 'all';
  var prefix = ['','-o-','-ms-','-webkit-','-moz-'];
  for(var i = 0; i < prefix.length; i++){
    obj.style[prefix[i] + 'transition'] = time / 1000 + 's ' + prop + ' ' + fx;
  }
}
if($('.quiz_dialog').length){
;({
  initialize:function(){
    this.navColumn();
  },
  navColumn:function(){
    var ov=document.querySelector('.nav-overlay');
    var column=document.querySelector('.pop_barcom');
    var btn=document.querySelector('.quiz_dialog');
    var ovshow=function(){
      ov.style.display='block';
      //column.style.display='block';
      setTimeout(function(){
        G.transition(ov,250);
        ov.style.opacity=1;
        
      },10);
    };
    var ovhide=function(){
       ov.style.opacity=0;
       //column.style.display='none';
       setTimeout(function(){
         ov.style.display='none';
       },250);
    };
    btn.addEventListener('click',function(event){
        if(G.hasClass(column,'pop-show')){
          G.removeClass(column,'pop-show');
          ovhide();
        }else{
          G.addClass(column,'pop-show');
          ovshow();
        }
    },false);
    ov.addEventListener('click',function(){
       G.removeClass(column,'pop-show');
       ovhide();
    },false);
    document.addEventListener('touchmove',function(event){
      if(G.hasClass(column,'pop-show')){
        event.preventDefault();
      }
    },false);
  }
}).initialize();
}
