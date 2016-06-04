define("js/ci_betcup",["jquery"],function(a){
    "user strict";var $=a("jquery");
    if($('#bettIng').length){
      $('.betBtn').click(function(){
        var chosebet=$(this).attr('data-type');
        $(this).parents('.bettList').find('.betBtn').removeClass('betHover');
        $(this).addClass('betHover');
        //alert(chosebet);
      });
      //
      $('.submitBtn').click(function(){
        var arrbet=new Array();
        var arruid=new Array();
        var arrmarch=new Array();
        var i=0;
        //var martchNum=$('.bettList').length;
        $('.bettList').find('a.betBtn').each(function(){
          if($(this).hasClass('betHover')){
            arrmarch[i]=$(this).parents('.bettList').attr('data-matchid');
            arrbet[i]=$(this).attr('data-type');
            arruid[i]=$(this).attr('data-id');
            i++;
          }
        });

          var str_martch=arrmarch.join();
          var str_uid=arruid.join();
          var str_bet=arrbet.join();
          var url=cid_url+'/api/wx_eurocup/gobetting?matchId='+str_martch+'&uid='+str_uid+'&bet='+str_bet;
          $.ajax({
             type:'GET',
             url:url,
             dataType:'json',
             success:function(data){
               window.location.href=cid_url+'/api/wx_eurocup/bettfinish';  
             },
             error:function(){
              showmsg('数据有误');
             }
          });
        //alert(arrmarch.length);
      });
    }
    
});

