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
                                        html+='<div class="flex time_btn"><p class="flex time"><i class="icon-time"></i>'+line.starttimefrom+' 至 '+line.starttimeto+'</p>';
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
    }
    module.exports = m;
});

