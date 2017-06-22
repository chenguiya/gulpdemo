define("test/mobile/activity_all",["jquery","common"],function(require,exports,module){
    "user strict";
    var $=require("jquery");var j=require("common");
    var m={};
    m.init=function(){
        //alert('m');
        //加载更多
        var page=1;
        var loaded=false;
        var stop=true;
        var totalpage=parseInt($('#Getloading').attr('totalpage'));
        $(window).scroll(function(){
            if(loaded){
                return;
            }
            if($(document).height()-$(this).scrollTop()-$(this).height() < 200){
                if(stop==true){
                    stop=false;
                    page++;
                    setTimeout(function(){
                        $.ajax({
                            type:'GET',
                            url:homeUrl+'fansclub/hot_activity',
                            data:{page:page},
                            cache:false,
                            dataType:'json',
                            success:function(data){
                                stop=true;
                                var html='';
                                for(var i=0; i < data.data.length; i++){
                                    var line=data.data[i];
                                    html+='<li><a href="'+homeUrl+'activity?id='+line.tid+'">';
                                        html+='<p class="name">'+line.title+'</p>'; 
                                        html+='<p class="img" style="background:url('+line.cover+') no-repeat center center;background-size:100% auto;"></p>';
                                        //html+='<p class="img"><img src="'+line.cover+'" alt="cover"></p>';
                                        html+='<div class="flex time_btn"><p class="flex time"><i class="icon-time"></i>'+line.starttimefrom+'</p>';
                                        if(line.status==2){
                                            html+='<p class="flex submitover">已结束</p>';
                                        }else{
                                            html+='<p class="flex submitok">立即报名</p>';
                                        }
                                        html+='</div>';
                                        html+='<p class="flex fans"><img src="'+line.fansclub_logo+'" width="78" height="78" alt="logo">'+line.fansclub_name+'</p>';
                                    html+='</a></li>'; 
                                }
                                $('#acty_Listid').append(html);
                                if(page >= totalpage){
                                    $('#Getloading').html('全部加载完毕');
                                    loaded=true;
                                    return;
                                }
                            
                            },
                            error:function(){
                                j.showmsg('加载数据返回异常！','',1000);
                            }
                        });
                    },1000)
                }
            }
        })
    },
    m.recruit=function(){
        //加载更多
        var page=1;
        var loaded=false;
        var stop=true;
        var totalpage=parseInt($('#Getloading').attr('totalpage'));
        $(window).scroll(function(){
            if(loaded){
                return;
            }
            if($(document).height()-$(this).scrollTop()-$(this).height() < 200){
                if(stop==true){
                    stop=false;
                    page++;
                    setTimeout(function(){
                        $.ajax({
                            type:'GET',
                            url:homeUrl+'fansclub/hot_recruit',
                            data:{page:page},
                            cache:false,
                            dataType:'json',
                            success:function(data){
                                stop=true;
                                var html='';
                                for(var i=0; i < data.data.length; i++){
                                    var line=data.data[i];
                                    html+='<li><a href="'+homeUrl+'recruit?id='+line.tid+'">'; 
                                        html+='<p class="name">'+line.title+'</p>';
                                        html+='<div class="flex time_btn">';
                                             html+='<p class="flex time"><img src="'+line.fansclub_logo+'" width="78" height="78" alt="logo">'+line.fansclub_name+'</p>';
                                             html+='<p class="flex submitok">立即报名</p>';
                                        html+='</div>';
                                    html+='</a></li>';
                                }
                                $('#acty_Listid').append(html);
                                if(page >= totalpage){
                                    $('#Getloading').html('全部加载完毕');
                                    loaded=true;
                                    return;
                                }
                            },
                            error:function(){
                                j.showmsg('加载数据返回异常','',1000);
                            }
                        })
                    },1000)
                }
            }
        });
    },
    m.joinActivity=function(){
        //参与过活动分页接口
        //http://fans-home.chenhua.cc/wechat/fans_assistant/my_joined_activity?page=3
        var page=1;
        var loaded=false;
        var stop=true;
        var totalpage=parseInt($('#Getloading').attr('totalpage'));
        $(window).scroll(function(){
            if(loaded){
                return;
            }
            if($(document).height()-$(this).scrollTop()-$(this).height() < 200){
                if(stop==true){
                    stop=false;
                    page++;
                    setTimeout(function(){
                        $.ajax({
                            type:'GET',
                            url:homeUrl+'wechat/fans_assistant/my_joined_activity',
                            data:{page:page},
                            dataType:'json',
                            cache:false,
                            success:function(data){
                                stop=true;
                                var html='';
                                for(var i=0; i < data.data.length; i++){
                                    var linedata=data.data[i];
                                    html+='<li><a href="'+homeUrl+'activity?id='+linedata.tid+'">';
                                        html+='<p class="name">'+linedata.title+'</p>';
                                        html+='<p class="img" style="background:url('+linedata.cover+') no-repeat center center;background-size:100% auto;"></p>';
                                        html+='<div class="flex time_btn">';
                                        if(linedata.fansclub_logo !==''){
                                            html+='<p class="flex fans"><img src="'+linedata.fansclub_logo+'" ></p>';
                                        }else{
                                            html+='<p class="flex fans"><img src="'+homeUrl+'static/images/no_logo.png" ></p>';
                                        }
                                            html+='<div class="time">';
                                                html+='<h3 class="fans_name">'+linedata.fansclub_name+'</h3>'; 
                                                html+='<p>'+linedata.starttimefrom+'</p>';
                                            html+='</div>';
                                        if(linedata.status==2){
                                            html+='<p class="flex submitover">已结束</p>';   
                                        }else{
                                            html+='<p class="flex submitok">活动详情</p>';
                                        }
                                        html+='</div>';
                                    html+='</a></li>';
                                }
                                $('#activityJoin').append(html);
                                if(page >= totalpage){
                                    $('#Getloading').html('全部加载完毕');
                                    loaded=true;
                                    return;
                                }
                            },
                            error:function(){
                                j.showmsg('数据加载返回异常','',1000);
                            }
                        })
                    },1000)
                }
            }
        })
    },
    m.actpush=function(){
        $('#selectsFanId').on('change',function(){
            activity_tid=$('#selectsFanId').val();
            m.actTidNum(activity_tid);
        });
        $('.submitpush').on('click',function(){
            var id=$('#selectsFanId').val();
            var type_val;
            var sms_val=0;
            $('.actLpush .opt').each(function(){
                var _this=$(this);
                if(_this.find('.magic-radio').is(':checked')){
                    type_val=_this.find('.magic-radio').val()
                }
            });
            $('.optchecked .magic-checkbox:checked').each(function(){
                sms_val=1;
            });
            $.ajax({
                type:'POST',
                url:homeUrl+'misc/fansclub_admin_push',
                data:{id:id,type:type_val,sms:sms_val},
                dataType:'json',
                cache:false,
                success:function(data){
                    if(data.code==200){
                        j.showmsg('推送成功','',2000);
                        setTimeout(function(){
                            window.location.reload();
                        },2000);
                    }else{
                        j.showmsg(data.message,'',2000);
                    }
                },
                error:function(){
                    j.showmsg('数据加载返回异常','',1000);
                }
            });
            return false;
        })
    },
    m.actsuperpush=function(){    //超级活动推送接口
        //获取球迷会活动tid
        var actTid;
        $('#fansSelect').on('change',function(){
            var fid=$('#fansSelect').val();
            var opt='';
            $.ajax({
                type:'POST',
                url:homeUrl+'misc/get_push_activity_data',
                data:{fid:fid},
                dataType:'json',
                cache:false,
                success:function(data){
                    if(data.code==200){
                        if(data.data.length > 0){
                            for(var i=0; i<data.data.length; i++){
                               var activity_list=data.data[i];
                               opt+='<option value="'+activity_list.tid+'">'+activity_list.title+'</option>';  
                            }
                            $('#activitySelect').html(opt);
                            actTid=$('#activitySelect').val();
                            m.actTidNum(actTid);
                        }else{
                            var optnone='<option value="0">暂无活动</option>';
                            $('#activitySelect').html(optnone);
                            j.showmsg('该球迷会暂无活动！','',1000);
                        }
                    }else{
                        j.showmsg(data.message,'',2000);
                    }
                },
                error:function(){
                    j.showmsg('数据加载返回异常','',1000);
                }
            });
        });
        //点击活动获取此活动会员
        $('#activitySelect').on('change',function(){
            var tid=$('#activitySelect').val();
            m.actTidNum(tid);
        });
        //点击超级推送
        $('.submitpush').on('click',function(){
            var type_val;
            var sms_val=0;
            var fid=$('#fansSelect').val();
            if(fid==0){
                j.showmsg('请选择球迷会再推送哦!','',1000);
                return false;
            }
            var tid=$('#activitySelect').val();
            if(tid==0){
                j.showmsg('该球迷会暂无活动，请选择其他球迷会','',1000);
                return false;
            }
            $('.actLpush .opt').each(function(){
                var _this=$(this);
                if(_this.find('.magic-radio').is(':checked')){
                    type_val=_this.find('.magic-radio').val()
                }
            });
            $('.optchecked .magic-checkbox:checked').each(function(){
                sms_val=1;
            });
            $.ajax({
                type:'POST',
                url:homeUrl+'misc/super_admin_push',
                data:{id:tid,type:type_val,sms:sms_val},
                dataType:'json',
                cache:false,
                success:function(data){
                    if(data.code==200){
                        j.showmsg('推送成功','',1500);
                        setTimeout(function(){
                            window.location.reload();
                        },2000);
                    }else{
                        j.showmsg(data.message,'',2000);
                    }
                },
                error:function(){
                    j.showmsg('数据加载返回异常','',1000);
                }
            })
            return false;
        })
    },
    m.actTidNum=function(num){  //获取活动报名人数接口
        $.ajax({
            type:'POST',
            url:homeUrl+'misc/count_activityapply_num',
            data:{tid:num},
            dataType:'json',
            cache:false,
            success:function(data){
                if(data.code==200){
                    $('#apply_nums').html('('+data.data.num+')');
                }else{
                    j.showmsg(data.message,'',1000);
                }
            },
            error:function(){
                j.showmsg('数据加载返回异常','',1000);
            }
        })
    }
    module.exports = m;
});

