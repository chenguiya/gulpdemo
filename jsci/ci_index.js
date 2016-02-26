define("js/ci_index",["jquery","swiper"],function(a){
    "user strict";var $=a("jquery");
    var DISMENU = new Object;
var display = {
    init : function() {
        var $this = this;
        $('.display').each(function(index, obj) {
            obj = $(obj);
            var dis = $(obj.attr('href'));
            if(dis && dis.attr('display')) {
                dis.css({'display':'none'});
                dis.css({'z-index':'10002'});
                DISMENU[dis.attr('id')] = dis;
                obj.on('click', function(e) {
                   
                    $this.maskinit();
                    if(dis.attr('display') == 'true') {
                        dis.css('display', 'block');
                        dis.attr('display', 'false');
                        $('#mask').css({'display':'block','width':'100%','height':'100%','position':'fixed','top':'0','left':'0','background':'rgba(0,0,0,.4)','z-index':'10001'});
                    }
                    return false;
                });
            }
        });
    },
    maskinit : function() {
        var $this = this;
        $('#mask').off().on('click', function() {
            $this.hide();
        });
    },
    hide : function() {
        $('#mask').css('display', 'none');
        $.each(DISMENU, function(index, obj) {
            obj.css('display', 'none');
            obj.attr('display', 'true');
        });
    }
};
if($('.display').length > 0) {
        display.init();
    }
    //签到与未签到ajax
    if($("#act_rowLeft_id").length){
        var page=2,flag=true,loading=false;
        $(window).scroll(function(){
            if($(document).height()-$(this).scrollTop()-$(this).height() < 300){
                if(loading){
                    $("#J_loading").html("加载完毕");
                    $("#J_loading").show();
                }
                flag=true;
                $("#J_loading").show();
                setTimeout(function(){
                    if(flag){
                        $.getJSON(location.href,{page:page},function(item){
                            if(item.code==201){
                                $("#J_loading").html("加载完毕");
                                $("#J_loading").hide();
                            }
                            $("#J_loading").hide();
                            var count=item.data.length;
                            var data=item.data;
                            for(var i=0;i<=count; i++){
                                var signlist='<tr>';
                                signlist +='<td class="one_t"><img src="'+data[i].avatar+'" alt="'+data[i].username+'" width="30" height="30" class="img_r">'+data[i].username+'</td>';
                                signlist +='<td class="two_t">'+data[i].ufielddata.realname+'</td>';
                                signlist +='<td class="one_t">--</td>';
                                signlist +='</tr>';
                                $('#act_rowLeft_id').append(signlist);
                            }
                        });
                        page++;
                    }
                    flag=false;
                },200);
            }    
        });
    }
    //详情页点赞ajax
    if($('#zan_btnGod').length){
      $('#zan_btnGod').on('click',function(){
         var $self=$(this);
         $.ajax({
            type: 'GET',
            url: $self.attr('data-url'),
            dataType: 'json',
            success: function(item){
                if(item){
                    if(item.code === 401){
                        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                            showmsg(item.message,'',1000);
                            setTimeout(function(){
                                window.location.href ="ios://NativeLogin";
                            },1500);
                        }else if (/(Android)/i.test(navigator.userAgent)) {
                            showmsg(item.message,'',1000);
                            setTimeout(function(){
                               window.Android.NativeLogin();
                            },1500);  
                        }else{
                            showmsg(item.message);
                        }
                    }else if(item.code === 404){
                        showmsg(item.message);
                    }else if(item.code === 409){ 
                        showmsg(item.message);
                    }else if(item.code === 406){
                        showmsg(item.message);
                    }else if(item.code === 200){
                        $self.addClass('icon_o');
                        $self.find('em').text(parseInt($self.find('em').text()) +1);
                        if(item.data.gold){
                        showmsg(item.message +'+'+ item.data.gold + '金币');
                        }
                    }
                    else{
                        showmsg('请稍后再试！');
                    }
                }else{
                    showmsg('数据有误！');
                }
            },
            error: function(){
                showmsg('出错了，请稍后再试!');
            }
         });
         return false;
      });
    }
    //详情评论点赞ajax
    if($('.colume').length){
         $('.paire_zg').on('click',function(){
            var $selzg=$(this);
         $.ajax({
            type: 'GET',
            url: $(this).attr('data-url'),
            dataType:'json',
            success: function(data){
                if(data){
                    if(data.code === 401){
                        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                            showmsg(data.message,'',1000);
                            setTimeout(function(){
                                window.location.href ="ios://NativeLogin";
                            },1500);
                        }else if (/(Android)/i.test(navigator.userAgent)) {
                            showmsg(data.message,'',1000);
                            setTimeout(function(){
                               window.Android.NativeLogin();
                            },1500);  
                        }else{
                            showmsg(data.message);
                        }
                    }else if(data.code === 409){
                        showmsg(data.message);
                    }else if(data.code === 406){
                        showmsg(data.message);
                    }else if(data.code === 200){
                        $selzg.addClass('zans-hover');
                        $selzg.find('em').text(parseInt($selzg.find('em').text()) +1);
                        if(data.data.gold){
                        showmsg(data.message +'+'+ data.data.gold + '金币');
                        }
                    }else{
                        showmsg('数据读取错误！');
                    }
                }
            },
            error:function(){
                showmsg('出错了，请稍后再试');
            }

         });
         return false;
      });
    }
    //帖子详情页回复ajax
    if($('.elecnation_fastpost').length){
        var form = $('#fastpostform');
        
        $('#fastpostsubmit').on('click', function(event) {
            var msgobj = $('#fastpostmessage');
            if(msgobj.val() == '说一句') {
                msgobj.attr('value', '');
            }
            var postdata = { 
                    fid:$('#fid').val(),     
                    tid:$('#tid').val(),     
                    message:msgobj.val()         
                };
            $.ajax({
                type:'POST',
                url:form.attr('action'),
                //data:form.serialize(),
                data:postdata,
                dataType:'json',
                success:function(data){
                    if(data){
                        if(data.code === 401){
                            if(isIOS){
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                   window.location.href ="ios://NativeLogin";
                                },1500);
                            }else if (isAndroid) {
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                   window.Android.NativeLogin();
                                },1500);  
                            }else{
                                showmsg(data.message);
                            }
                        }else if(data.code === 402){
                            showmsg(data.message);
                        }else if(data.code === 403){
                            showmsg(data.message);
                        }else if(data.code === 408){
                            showmsg(data.message);
                        }else if(data.code === 200){
                            $('#colume_listid').prepend(data.data.html);
                            $('#fastpostmessage').val('');
                            $('#columeyr').find('span').text(parseInt($('#columeyr').find('span').text()) +1);
                            showmsg(data.message);
                            var columeyroffset=$('#columeyr').offset().top;
                            scrollTo(0,columeyroffset);
                        }else if(data.code === 404){
                            showmsg(data.message);
                        }
                    }
                },
                error:function(){
                    showmsg('出错了，请稍后再试');
                }
            });
            event.preventDefault();
            return false;
        });
    }
    //帖子置顶ajax
    if($('#stickIdno').length){
      $('#stickIdno').on('click',function(){
        var $stick=$(this);
        var datafid=$(this).attr('data-fid');
        var datatid=$(this).attr('data-tid');
        $.ajax({
            type: 'GET',
            url: cid_url + '/api/misc/stick',
            data: {fid:datafid,tid:datatid},
            dataType: 'json',
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
                 }else if(data.code === 402){
                    showmsg(data.message);
                 }else if(data.code === 404){
                    showmsg(data.message);
                 }else if(data.code === 405){
                    showmsg(data.message);
                 }else if(data.code === 200){
                    showmsg(data.message,'',1000);
                    if(isIOS){
                        window.location.href='ios://NativeThreadUpdate';
                    }else if(isAndroid){
                        window.Android.NativeThreadUpdate();
                    }

                 }else{
                    showmsg('请稍后再试');
                 }

              }else{
                showmsg('数据有误');
              }
              setTimeout(function(){
                   $('.nav-overlay').hide();
                   $('#pop_barids').hide().removeClass('pop-show');
               },1500);
            },
            error: function(){
                showmsg('出错了，请稍后再试');
            }
        });
        return false;
      });
    }
    //帖子举报ajax
    if($('#reportId').length){
        $('#reportId').on('click',function(){
            var $reps=$(this);
            var rfid=$(this).attr('data-fid');
            var rtid=$(this).attr('data-tid');
            var rauthor=$(this).attr('data-author');
            var rauthorid=$(this).attr('data-authorid');
            var rpid=$(this).attr('data-pid');
            $.ajax({
                type:'GET',
                url: cid_url + '/api/misc/report',
                data:{fid:rfid,tid:rtid,author:rauthor,authorid:rauthorid,pid:rpid,type:'thread'},
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
                            showmsg('请稍后再试');
                        }
                    }else{
                        showmsg('数据有误');
                    }
                },
                error:function(){
                    showmsg('出错了，请稍候再试');
                }
            });
            return false;
        });
    }
    //帖子删除ajax
    if($('#deleteId').length){
      $('#deleteId').on('click',function(){
        var $dele=$(this);
        var datafid=$(this).attr('data-fid');
        var datapid=$(this).attr('data-pid');
        var datatid=$(this).attr('data-tid');
        var dataauthorid=$(this).attr('data-authorid');
        $.ajax({
            type:'GET',
            url: cid_url + '/api/feed_manage/delete',
            data: {fid:datafid,pid:datapid,tid:datatid,authorid:dataauthorid,type:'feed'},
            dataType: 'json',
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
                    }else if(data.code === 200){
                        showmsg(data.message,'',1000);
                        if(isIOS){
                            setTimeout(function(){
                              window.location.href="iOS://NativeThreadUpdate";
                              window.location.href="ios://NativeBack";
                            },1500);
                        }else if(isAndroid){
                            setTimeout(function(){
                              window.Android.NativeThreadUpdate();
                              window.Android.NativeBack();
                            },1500);
                        }else{
                            window.location.href=cid_url+'/home/gold_task';
                        }
                        
                    }else{
                        showmsg('请稍后再试');
                    }
                }else{
                    showmsg('数据有误');
                }
                setTimeout(function(){
                   $('.nav-overlay').hide();
                   $('#pop_barids').hide().removeClass('pop-show');
               },1500);
            },
            error: function(){
                showmsg('出错了，请稍后再试');
            }
        });
        return false;
      });
    }
    //帖子评论回复评论ajax
    if($('#postsubreplay').length){
        var formr=$('#replyform');
        $('#postsubreplay').on('click',function(e){
            var msgreply=$('#replymessage');
            var tid=$('#replytid').val();
            $.ajax({
                type:'POST',
                url: formr.attr('action'),
                data:{fid:$('#replyfid').val(),tid:tid,parentid:$('#replayparenttid').val(),message:msgreply.val()},
                dataType: 'json',
                success: function(data){
                    if(data){
                        if(data.code === 401){
                            if(isIOS){
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                   window.location.href ="ios://NativeLogin";
                                },1500);
                            }else if(isAndroid){
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                   window.Android.NativeLogin();
                                },1500);  
                            }else{
                                showmsg(data.message);
                            }
                        }else if(data.code === 402){
                            showmsg(data.message);
                        }else if(data.code === 403){
                            showmsg(data.message);
                        }else if(data.code === 404){
                            showmsg(data.message);
                        }else if(data.code === 408){
                            showmsg(data.message);
                        }else if(data.code === 200){
                            showmsg(data.message,'',1000);
                            msgreply.val('');
                            if(isIOS){
                                window.location.href="ios://NativeBackAndReload";
                            }else if(isAndroid){
                                window.Android.NativeBackAndReload();
                            }else{
                            window.location.href = cid_url+'/api/show?tid='+tid;
                            }

                        }else{
                            showmsg('请稍后再试');
                        }
                    }else{
                        showmsg('有误，请稍后再试');
                    }
                },
                error: function(){
                    showmsg('出错了，请稍后再试');
                }
            });
            e.preventDefault();
            return false;
        })
    }
    //投票内页提交ajax
    //活动内页报名成功ajax
    if($('#act_chact').length){
        var formact=$('#activityform');
        $('#activitysubmit').on('click',function(e){
            var tid=$('#tid').val();
            if($('#name').val() =='' || $('#phones').val() == ''){
                showmsg('请完善你的姓名和手机号');
            }else{
            $.ajax({
                type:'POST',
                url:formact.attr('action'),
                data:{tid:$('#tid').val(),name:$('#name').val(),phones:$('#phones').val()},
                dataType:'json',
                success:function(data){
                    if(data){
                        if(data.code === 401){
                            if(isIOS){
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                   window.location.href ="ios://NativeLogin";
                                },1500);
                            }else if(isAndroid){
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                   window.Android.NativeLogin();
                                },1500);
                            }else{
                                showmsg(data.message);
                            }
                        }else if(data.code === 405){
                            showmsg(data.message);
                        }else if(data.code === 404){
                            showmsg(data.message);
                        }else if(data.code === 200){
                            showmsg(data.message,'',1000);
                                setTimeout(function(){
                                   window.location.reload();
                                },1500);
                            
                        }else{
                            showmsg('稍后再试');
                        }
                    }else{
                        showmsg('出错了请稍候再试');
                    }
                },
                error:function(){
                    showmsg('请稍候再试');
                }
            })
         }
            e.preventDefault();
            return false;
        });
        $('#sub_resetid').on('click',function(e){
            display.hide();
            e.preventDefault();
            return false;
        });
    }
    //帖子内页图片ajax
    if($('#thread_imgid').length){
        $('.Photoidurl').on('click',function(){
            var imgid=$('#thread_imgid').attr('data-tid');
            var id=$(this).attr('id');
            window.location.href=cid_url+'/api/show/photos?tid='+imgid+'&id='+id;
        });
    }
    //立即签到ajax
    if($('#sin_noid').length){
        $('#sin_noid').on('click',function(){
            var $sin=$(this);
            var tid=$(this).attr('data-tid');
            $.ajax({
                type:'GET',
                url:cid_url+'/fansclub/activity/sign_in?tid='+tid,
                dataType:'json',
                success:function(data){
                    if(data){
                        if(data.code === 401){
                            if(isIOS){
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                  window.location.href ="ios://NativeLogin";
                                },1500);
                            }else if(isAndroid){
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                  window.Android.NativeLogin();
                                },1500);
                            }else{
                                showmsg(data.message);
                            }
                        }else if(data.code === 402){
                            showmsg(data.message);
                        }else if(data.code === 405){
                            showmsg(data.message);
                        }else if(data.code === 406){
                            showmsg(data.message);
                        }else if(data.code === 407){
                            showmsg(data.message);
                        }else if(data.code === 404){
                            showmsg(data.message);
                        }else if(data.code === 200){
                            showmsg(data.message,'',1000);
                                setTimeout(function(){
                                  window.location.reload();
                                },1500)
                        }else{
                            showmsg('数据有误');
                        }
                    }else{
                        showmsg('请稍候再试');
                    }
                },
                error:function(){
                    showmsg('有误，请稍候再试！');
                }
            })
            return false;
        });
    }
    //链接可点击
    if($('.thread_mess').length){
        var textR=$('.thread_mess').text();
        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        textR = textR.replace(reg, "<a href='$1$2'>$1$2</a>");
        //alert(textR);
        document.getElementById('thread_imgid').innerHTML = textR;
    }
    //头像加载不成功触发
    $('img.img_noerror').on('error',function(){
        var img=event.srcElement; 
        img.src=cid_url+'/static/images/nopic.png'; 
        img.onerror=null; //控制不要一直跳动 
    });
    //固定底部焦点获取
    if($('.fast_postwap').length){
        if(isIOS){
           window.res = null;
           var i = 0;
           function fixedWatch(el) {
              if(document.activeElement.nodeName == 'INPUT'){
                el.css({'position':'static','bottom':'auto','margin-top':'-53px'});
              } else {
                el.css({'position':'fixed','bottom':'0'});
                if(window.res ) { clearInterval(window.res ); window.res  = null; }
              }
           }
           $('.fast_postwap input').focus(function () {
              if(!window.res) {
                  fixedWatch($('.fast_postwap'));
                  window.res = setInterval(function () {
                    fixedWatch($('.fast_postwap'));
                  }, 500);
              }
          });
       }
   }

});