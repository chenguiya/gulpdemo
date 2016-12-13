define("test/mobile/fans_all",["jquery","common","iscroll"],function(require,exports,module){
    "user strict";
    var $=require("jquery");var j=require("common");var IScroll=require("iscroll");
    var m={};
    m.init=function(){
        var Height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
        var bannerHeight=$('.banner').height();
        var myScroll_left;          
        var myScroll_right;
        $('#warp').height(Height-bannerHeight-15);   
        $('#scroller').height(Height-bannerHeight-15);
        //console.log(bannerHeight);        
        $('#scroller li').on('click',function(){
              $('#scroller li').removeClass('on');
              $(this).addClass('on');
              $(this).siblings().find('.onMenuHover a').removeClass('hover'); 
        });
        loaded();
        function loaded(){
            //myScroll_left=new IScroll('#left_Menu',{mouseWheel:true,click:true,scrollbars:true});
            myScroll_right=new IScroll('#right_Menu',{mouseWheel:true,click:true});
        }
        //º”‘ÿ«Ú√‘ª·
        $('#scroller li a.hot').click(function(){
            $.ajax({
                type:'GET',
                url:homeUrl+'misc/get_hot_fansclub',
                cache:false,
                dataType:'json',
                success:function(data){
                    m.ajaxsubmit(data);
                },
                error:function(){
                    j.showmsg('\u6570\u636e\u8fd4\u56de\u5f02\u5e38','',1000);
                }
            });
        });
        $('#scroller li a.classis').click(function(){
            var clubid=$(this).attr('id');
            $(this).parent('.onMenuHover').find('a').removeClass('hover');
            $(this).addClass('hover');
            $.ajax({
                type:'GET',
                url:homeUrl+'misc/get_fansclub',
                data:{clubid:clubid},
                cache:false,
                dataType:'json',
                success:function(data){
                    m.ajaxsubmit(data);
                },
                error:function(){
                    j.showmsg('\u6570\u636e\u8fd4\u56de\u5f02\u5e38','',1000);
                }
            })
        })
    },
    m.ajaxsubmit=function(data){
        var htm='';
        for(var i=0; i < data.data.length; i++){
            var line=data.data[i];
            if(line.logo!==''){
                htm+='<li><a href="'+homeUrl+'fansclub/introduce?fid='+line.fid+'"><img src="'+homeUrl+'upload/'+line.logo+'" alt="'+line.name+'" /><p class="fans"><span>'+line.name+'</span></p></a></li>';
            }else{
                htm+='<li><a href="'+homeUrl+'fansclub/introduce?fid='+line.fid+'"><img src="'+homeUrl+'static/images/no_logo.png" alt="'+line.name+'" /><p class="fans"><span>'+line.name+'</span></p></a></li>'
            }
        }
        $('#scroller2 ul').html(htm);
        var refre_scroll_right=new IScroll('#right_Menu',{mouseWheel:false,click:true});
    }
    module.exports = m; 
});

  