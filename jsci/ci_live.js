define("js/ci_live",["jquery"],function(a){
    "user strict";var $=a("jquery");
   //详情页ajax点赞
   if(('.culume').length){
    $('.live_zansid').on('click',function(){
        var $livezg=$(this);
        $.ajax({
            type:'GET',
            url:$livezg.attr('data-url'),
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
                    }else if(data.code === 200){
                        $livezg.addClass('zans-hover');
                        $livezg.find('em').text(data.data);
                    }else if(data.code === 405){
                        showmsg(data.message);
                    }else if(data.code === 404){
                        showmsg(data.message);
                    }else{
                        showmsg('数据读取错误');
                    }
                  }
                },
            error:function(){
                showmsg('出错了，请稍后再试');
            }
        });
        return false;
    })
   }
   //资讯内页发表ajax
   if($('.eleclive_fastpost').length){
    var forms = $('#fastpostform');
    $('#fastpostsubmit').on('click',function(e){
        var msgid=$('#fastpostmessage');
        var tid=$('#hidTid').val();
        var token=$('#hidToken').val();
        $.ajax({
          type:'POST',
          url:forms.attr('action'),
          data:{tid:$('#hidTid').val(),content:msgid.val(),token:$('#hidToken').val()},
          dataType:'json',
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
                }else if(data.code === 403){
                    showmsg(data.message);
                }else if(data.code === 404){
                    showmsg(data.message);
                }else if(data.code === 402){
                    showmsg(data.message);
                }else if(data.code === 200){
                    var item=data.data;
                    var commt='<div class="chtwo cl">';
                        commt +='<div class="viewhd webox">';
                        commt +='<div class="avatar_img"><a href="javascript:void(0);"><img src="'+item.useravatar+'" width="100%"></a></div>';
                        commt +='<div class="auth_wrap">';
                        commt +='<div class="authi_top"><a href="javascript:void(0);" class="elecnation_dr">'+item.username+'</a><a href="javascript:void(0);" class="icon-zans live_zansid" data-url="'+cid_url+'/fansclub/news/likes?cid='+tid+'&token='+token+'"><em>'+item.likes+'</em></a></div>';
                        commt +='<div class="authi_p"><span>'+item.createtime+'</span></div>';
                        commt +='<div class="message">'+item.content+'</div>';
                        commt +='</div>';
                        commt +='</div></div>';
                        if($('#live_comonId .no_comment').length){
                            $('.no_comment').remove();
                        }
                        $('#live_comonId').prepend(commt);
                        $('#fastpostmessage').val('');
                        $('#colliveyr').find('span').text(parseInt($('#colliveyr').find('span').text()) +1);
                        showmsg(data.message);
                    if((/#colliveyr/).test(location.href)){
                        window.location.href=location.href; 
                    }else{
                        window.location.href=location.href + '#colliveyr';
                    }
                }else{
                    showmsg('请稍后再试');
                }
             }
          },
          error: function(){
            showmsg('出错了，请稍后再试');
          }
        });
        e.preventDefault();
        return false;
    });
  }
   //
});