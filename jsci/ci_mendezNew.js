define("js/ci_mendezNew",["jquery"],function(a){
    "user strict";var $=a("jquery");
    var mentComm=$('.DetailComment');
    //资讯内页点赞
    mentComm.on({
        click:function(){
            var _selft=$(this);
            var commnetid=parseInt($(this).data('commentid'));
            //alert(commnetid)
            $.ajax({
                type:'GET',
                url:cid_url+'/mendez_do/zan',
                data:{comment_id:commnetid},
                dataType:'json',
                cache:false,
                success:function(data){
                    if(data){
                        if(data.code==200){
                            _selft.addClass('zans-hover');
                            _selft.find('em').text(parseInt(_selft.find('em').text())+1);
                            showmsg(data.message,'',1000);
                        }else{
                            showmsg(data.message,'',1000);
                        }
                    }
                },
                error:function(){
                    showmsg('数据返回异常！','',1000);
                }
            });
        }
    },'.paire_zg');
    //评论
    var newComment=$('#newCommnet');
    $('#postsubreplay').on('click',function(){
        var msgreplay=$('#replymessage');
        $.ajax({
            type:'POST',
            url:cid_url+'/mendez_do/comment',
            data:{relation_id:fig.report_id,comment:msgreplay.val(),token:fig.token},
            dataType:'json',
            cache:false,
            success:function(data){
                if(data){
                    if(data.code==401){
                        shellmodule.login(data.message);
                    }else if(data.code == 200){
                        showmsg(data.message,'',1000);
                        msgreplay.val('');
                        var html='<div class="chment cl">'+
                                       '<div class="viewhd webox">'+
                                             '<div class="avatar_img"><a href="javascript:;"><img src="'+data.data.avatar+'" class="img_noerror"></a></div>'+
                                             '<div class="auth_wrap">'+
                                                   '<div class="authi_top">'+
                                                         '<a href="javascript:;" rel="nofollow" class="look_at">。。。</a>'+
                                                         '<a href="javascript:void(0);" class="elecnation_dr">'+data.data.username+'</a>'+
                                                         '<a href="javascript:void(0);" class="icon-zans paire_zg" data-commentid="'+data.data.comment_id+'"><em>'+data.data.zan+'</em></a>'+
                                                         '<div class="popOver">'+
                                                               '<a href="javascript:void(0)" class="replayCom" data-commentid="'+data.data.comment_id+'" data-name="'+data.data.username+'">回复</a><a href="javascript:void(0)" class="repotation">举报</a>'+
                                                         '</div>'+
                                                   '</div>'+
                                                   '<div class="authi_p"><span>'+data.data.dateline_desc+'</span></div>'+
                                                   '<div class="message">'+data.data.comment+'</div>'+              
                                             '</div>'+
                                       '</div>'+
                                  '</div>';
                        if(newComment.find('.CommentList').length >0){
                          newComment.find('.CommentList').prepend(html);
                        }else{
                          var br='<div class="Commenthd">最新评论</div>';
                              br+='<div class="CommentList">'+html+'</div>';
                            newComment.append(br);
                        }         
                        var offsets=$('#newCommnet').offset().top;
                        scrollTo(0,offsets);  
                    }else{
                        showmsg(data.message,'',1000);
                    }
                }
            },
            error:function(){
                showmsg('数据返回异常！','',1000);
            }
        })
    });
    //点击回复与举报弹窗
    mentComm.on({
        click:function(event){
            var ele=event.target;
    $('.DetailComment').find('.popOver').hide(200);
      $(this).parent('.authi_top').find('.popOver').show(200);
      document.addEventListener('touchmove',function(e){
        if($(ele).parent().find('.popOver').css('display')=='block'){
         $(ele).parent().find('.popOver').hide(200)
    }
   },false) 
        }
    },'.look_at')
    
    //点击回复ajax
    var commid;
    mentComm.on({
        click:function(){
            var _self=$(this);
            commid=parseInt($(this).data('commentid'));
            var name=$(this).attr('data-name');
            $('#postsubreplay').css('display','none');
            $('#postreplays').css('display',"block");
            $('#replymessage').attr('placeholder','回复：'+name);
            $('#replymessage').focus();
        }
    },'.replayCom');
    $('#postreplays').on('click',function(){
        var msgreplay=$('#replymessage');
        $.ajax({
            type:'POST',
            url:cid_url+'/mendez_do/comment',
            data:{relation_id:fig.report_id,parent_id:commid,comment:msgreplay.val(),token:fig.token},
            dataType:'json',
            cache:false,
            success:function(data){
                if(data.code==401){
                  shellmodule.login(data.message);
                }else if(data.code==200){
                    showmsg(data.message,'',1000);
                    setTimeout(function(){
                        window.location.reload();
                    })
                }else{
                    showmsg(data.message,'',1000);
                }
            },
            error:function(){
                showmsg('数据返回异常！','',1000);
            }
        })
    });
    //点击举报
    mentComm.on({
        click:function(){
            showmsg('举报成功','',1000);
        }
    },'.repotation');
    //评论定位热门评论
    $('#repliesBtn').click(function(){
        var hotsets=$('#hotCommnet').offset().top;
        scrollTo(0,hotsets);
    });
    //评论加载更多
    var endid;
    if(document.getElementById('Newsloading')){
        endid=parseInt($('#Newsloading').attr('endid'));
        var flag=true,loading=false;
        $(window).scroll(function(){
            if($(document).height()-$(this).scrollTop()-$(this).height() < 200){
                if(document.getElementById('Newsloading')){
                    flag=true;
                    document.getElementById('Newsloading').style.display='block';
                    setTimeout(function(){
                        if(flag){
                           $.ajax({
                             type:'GET',
                             url:location.href,
                             data:{endid:endid},
                             dataType:'json',
                             cache:false,
                             success:function(data){
                                $('#Newsloading').hide();
                                var count=data.data.comment_list.length;
                                var arr=eval(data.data.comment_list);
                                for(var i=0; i < count ; i++){
                                   var html='<div class="chment cl"><div class="viewhd webox">';
                                        html+='<div class="avatar_img"><a href="javascript:;"><img src="'+arr[i].avatar+'" class="img_noerror"></a></div>';
                                        html+='<div class="auth_wrap">';
                                         html+='<div class="authi_top">';
                                          html+='<a href="javascript:;" rel="nofollow" class="look_at">。。。</a>';
                                          html+='<a href="javascript:void(0);" class="elecnation_dr">'+arr[i].username+'</a>';
                                          html+='<a href="javascript:void(0);" class="icon-zans paire_zg" data-commentid="'+arr[i].comment_id+'"><em>'+arr[i].zan+'</em></a>';
                                          html+='<div class="popOver">'+
                                                      '<a href="javascript:void(0)" class="replayCom" data-commentid="'+arr[i].comment_id+'" data-name="'+arr[i].username+'">回复</a><a href="javascript:void(0)" class="repotation">举报</a>'+
                                                 '</div>';
                                         html+='</div>';
                                         html+='<div class="authi_p"><span>'+arr[i].dateline_desc+'</span></div>';
                                         html+='<div class="message">'+arr[i].comment+'</div>';
                                         if(arr[i].child_list.length){
                                            var brr=eval(arr[i].child_list);
                                            var b_count=brr.length;
                                            html+='<div class="reply_cont">';
                                            for(var j=0 ; j < b_count; j++){
                                                html+='<div class="repCont">'+
                                                            '<div class="repHead">'+
                                                                  '<p class="rep_nor">'+brr[j].username+'<em>'+brr[j].dateline_desc+'</em></p>'+
                                                                  '<a href="javascript:void(0);" class="icon-zans paire_zg" data-commentid="'+brr[j].comment_id+'"><em>'+brr[j].zan+'</em></a>'+
                                                            '</div>'+
                                                            '<p class="message">测试一下问题呀</p>'+
                                                      '</div>';
                                            }
                                            html+='</div>';
                                         }
                                        html+='</div>';
                                       html+='</div></div>';
                                   $('#newCommnet .CommentList').append(html);   
                                }
                                endid=data.data.end_id;
                                if(endid == 0){
                                    $('#Newsloading').remove();
                                }
                             },
                             error:function(){
                                showmsg('数据返回异常','',1000);
                             }
                           })
                        }
                        flag=false;
                    },1000)
                }
            }
        })
    }
   // $(document).off('click.popOver');
   /* $(document).off('click.popOver',function(){
        if(mentComm.find('.popOver').is(':visible')){
            mentComm.find('.popOver').fadeIn(200);
        }
    })*/
});