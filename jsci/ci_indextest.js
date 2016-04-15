define("js/ci_indextest",["jquery","swiper"],function(a){
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
    //评论加载更多
    if(document.getElementById('J_loading')){
        var page=2,flag=true,loading=false,totalpage=parseInt($('#J_loading').attr('totalpage'));
        $(window).scroll(function(){
            if( $(document).height()-$(this).scrollTop()-$(this).height()< 200){
                if(document.getElementById('J_loading')){
                    flag=true;
                    document.getElementById('J_loading').style.display="block";
                    setTimeout(function(){
                        if(flag){
                            getlist();
                            page++;
                            if(page==totalpage+1){
                                $('#J_loading').remove();
                            }
                        }
                        flag=false;
                    },1000);                   
                }
            }
        });
    }
    function getlist(){
        $.ajax({
            type:'GET',
            url:location.href,
            data:{page:page},
            dataType:'json',
            success:function(data){
                        $('#J_loading').hide();
                         var count=data.replylists.length;
                         var arr=data.replylists;
                         for(var i=0;i < count ;i++){
                            var arrlist='<div class="chtwo cl">';
                                arrlist+='<div class="viewhd webox">';
                                arrlist+='<div class="avatar_img"><a href="javascript:avatarBack('+arr[i].authorid+')"><img src="'+arr[i].avatar+'" class="img_noerror">';
                                if(arr[i].author_vip >0){
                                    arrlist+='<span class="v_icon_vv">v</span>';
                                }
                                arrlist+='</a></div>';
                                arrlist+='<div class="auth_wrap">';
                                arrlist+='<div class="authi_top">';
                                if(data.member_info.uid > 0){
                                    if(data.member_info.isadmin == 2 || data.ismanager == true){
                                         arrlist+='<a href="javascript:showWindow(\'rep_'+arr[i].pid+'\','+arr[i].pid+','+arr[i].tid+','+arr[i].authorid+','+data.fid+',\''+arr[i].author+'\');" rel="nofollow" class="look_at">...</a>';
                                    }else{
                                    arrlist+='<a href="javascript:showOrdinary(\'rep_'+arr[i].pid+'\','+arr[i].pid+','+arr[i].tid+','+arr[i].authorid+','+data.fid+',\''+arr[i].author+'\');" rel="nofollow" class="look_at">...</a>';
                                    }
                                }else{
                                    arrlist+='<a href="javascript:showReports(\'rep_'+arr[i].pid+'\','+arr[i].pid+','+arr[i].tid+','+arr[i].authorid+','+data.fid+',\''+arr[i].author+'\');" rel="nofollow" class="look_at">...</a>';
                                }
                                arrlist+='<a href="javascript:void(0);" class="elecnation_dr"';
                                if(arr[i].author_vip >0){
                                   arrlist+=' style="color:#eb6100"';
                                 }
                                arrlist+='>'+arr[i].author+'';
                                if(arr[i].author_hotfansclub_logo !==''){
                                    arrlist+='<img src="'+arr[i].author_hotfansclub_logo+'" align="middle" style="border-radius: 50%; width: 16px; margin-left: 8px;">';
                                }
                                arrlist+='</a><span class="lou_dr">'+arr[i].new_position+'楼</span>';
                                arrlist+='<a href="javascript:void(0);" class="icon-zans paire_zg" data-url="'+cid_url+'/api/misc/like?pid='+arr[i].pid+'&tid'+arr[i].tid+'&authorid='+arr[i].authorid+'&fid='+data.fid+'&uid='+data.member_info.uid+'"><em>'+arr[i].support+'</em></a>';
                                arrlist+='</div>';
                                arrlist+='<div class="authi_p"><span>'+arr[i].dateline+'</span></div>';
                                arrlist+='<div class="message">'+arr[i].message+'</div>';
                                if(arr[i].reply.length){
                                    var brr=arr[i].reply;
                                    var b_count=brr.length;
                                    arrlist+='<div class="reply_cont">';
                                    for(var m=0;m < b_count; m++){
                                        arrlist+='<p class="rep_nor">'+brr[m].author+'：'+brr[m].message+'</p>';
                                    }
                                    arrlist+='</div>';
                                }
                                arrlist+='</div></div>';
                                arrlist+='</div>';
                            $('#colume_listid').append(arrlist);
                         }

                    },
                    error:function(){
                        showmsg('数据获取失败');
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
                        shellmodule.login(item.message);
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
                        shellmodule.login(data.message);
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
    if($('#fastEmoteArea').length){
        var namer=$('#fastEmoteArea').attr('data-name');
        //var namers=shellmodule.Base64Encode(shellmodule.Utf8Tosix(namer));
        $('#fastEmoteArea li').on('click', function(event) {
            var dataid=$(this).attr('data-id');
            shellmodule.ShowReply(0,namer,dataid);
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
                   shellmodule.login(data.message);
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
                        shellmodule.login(data.message);
                    }else if(data.code === 404){
                        showmsg(data.message,'',1000);
                    }else if(data.code === 402){
                        showmsg(data.message,'',1000);
                    }else if(data.code === 200){
                        showmsg(data.message,'',1000);
                        if(isIOS){
                            window.location.href="ios://NativeThreadUpdate";
                            setTimeout(function(){
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
                            shellmodule.login(data.message);
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
                            shellmodule.login(data.message);
                        }else if(data.code === 405){
                            showmsg(data.message);
                        }else if(data.code === 404){
                            showmsg(data.message);
                        }else if(data.code === 200){
                            if($('#ispay').length){
                              window.location.reload();
                            }else{
                                showmsg(data.message,'',1000);
                                setTimeout(function(){
                                   window.location.reload();
                                },1500);
                            }
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
    //帖子内页标签弹窗
    if($('#tagLabel').length){
        $('#tagLabel a').click(function(){
            $('#tagsLandID').show();
            return false;
        })
        $('#tagsClosed').click(function(){
            $('#tagsLandID').hide();
            return false;
        })
    }
    //帖子内页图片ajax
    if($('#thread_imgid').length || $('.thread_imgs').length){
        $('.Photoidurl').on('click',function(){
            var imgid=$('#thread_imgid').attr('data-tid');
            var id=$(this).attr('id');
            if(isIOS){
               window.location.href=cid_url+'/api/version3/show/photos?tid='+imgid+'&id='+id; 
            }else{
            window.location.href=cid_url+'/api/show/photos?tid='+imgid+'&id='+id;
            }
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
                            shellmodule.login(data.message);
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
                                  window.location.href=cid_url+'/api/show?tid='+tid;
                                },1500)
                        }else{
                            showmsg('数据错误');
                        }
                    }else{
                        showmsg('请稍候再试');
                    }
                },
                error:function(){
                    showmsg('数据有误，请稍候再试！');
                }
            })
            return false;
        });
    }
     
    //链接可点击
    if($('.thread_mess').length){
        var textR=$('.thread_mess').html();
        var reg = /(http:\/\/|https:\/\/|www)((\w|=|\?|\.|\/|&|-)+)/g;
        var reghttp=/http:\/\/|https:\/\//g;
        var imgSRC=$('.thread_mess img').attr('src');
        var urlUR=$('.thread_mess a').attr('href');
        var textQIU=$('#qiniu_video').html();
        if(reg.exec(imgSRC) || reg.exec(urlUR) || reg.exec(textQIU)){
            //return false
        }else{
            if(reghttp.exec(textR)){
               textR = textR.replace(reg, "<a href='$1$2'>$1$2</a>"); 
            }else{
               textR = textR.replace(reg, "<a href='http:\/\/$1$2'>$1$2</a>");  
            }
        document.getElementById('thread_imgid').innerHTML = textR;
        }
        
    }
    //话题点击到话题页面
    if($('.topic_name').length){
        $('.topic_name').on('click',function(){
            var topicValue=$(this).attr('data-name');
            //alert(topicValue);
            shellmodule.ShowTopicName(topicValue);
            return false;
        });
    }
    //头像加载不成功触发
    $('img.img_noerror').on('error',function(){
        var img=event.srcElement; 
        img.src=cid_url+'/static/images/nopic.png'; 
        img.onerror=null; //控制不要一直跳动 
    });
});