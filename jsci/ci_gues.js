define("js/ci_gues",["jquery"],function(a){
    "user strict";var $=a("jquery");
    $(window).load(function(){if(isIOS)window.location.href="ios://NativeTitle/美女猜拳";else{if(!isAndroid)return!1;window.Android.NativeTitle("美女猜拳")}});
    function showImg(imgurl, offsetObj, delay) {
      delay = delay || 2000;
      imgurl = imgurl ||'';
      var timeid = '';
      if (!offsetObj) {
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      }
      var winWidth = document.body.clientWidth || window.innerWidth;

      if (!$('#Imgtoptip').length) {
        $(document.body).prepend('<div id="Imgjsapend" style="position:absolute; left:0; top:0;background: rgba(0,0,0,0.5); width:100%; height:100%; z-index:10;"><div id="Imgtoptip" style="position: absolute; font-size: 20px; color: #fff;  font-family: Microsoft YaHei;  text-align: center;z-index: 999999;"><img src="'+imgurl+'" width="300"></div></div>');
      } else {
        $('#Imgtoptip').fadeOut('fast').html(imgurl);
      }

      if (!offsetObj) {
        offsetObj = {'top': document.body.scrollTop + winHeight / 2, 'left': winWidth / 2 - $('#Imgtoptip').outerWidth(true) / 2};
      } else if (!offsetObj.left) {
        offsetObj.left = winWidth / 2 - $('#Imgtoptip').outerWidth(true) / 2;
      } else {
        offsetObj.left = offsetObj.left - $('#Imgtoptip').outerWidth(true) / 2;
      }

      $('#Imgtoptip').css(offsetObj).stop().fadeIn('normal', function() {
        if (timeid)
          clearTimeout(timeid);
        timeid = setTimeout(function() {
          $('#Imgtoptip').fadeOut();
          $('#Imgjsapend').fadeOut();
        }, delay);
      });
}
    var dice1 = $("#dice1");
    var dice2 = $("#dice2");
  $("#dice_btn span").click(function(){
    $('#dice_btn').append('<div id="dice_mask"></div>');
    var btone=$(this).attr('data-id');
    $.ajax({
      type: 'GET',
      url:cid_url +'/lottery/index',
      data:{action:'guess',u_guess:btone},
      dataType: 'json',
      success:function(data){
        var win=data.iswin;
        if(win === 2){
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
        }else if(win === 4){
          showmsg(data.message,'',1000);
          setTimeout(function(){
            $('#dice_mask').remove();
          },2000);
        }else if(win === 5){
          showmsg(data.message,'',1000);
          setTimeout(function(){
            $('#dice_mask').remove();
          },2000);
        }else{
        var num1=data.c_guess;
        var num2=data.u_guess;  
        diceroll(dice1,num1);
        diceroll(dice2,btone);
        setTimeout(function(){
        if(win === 1){
          showmsg(data.message,'',1000);
        }else if(win === 3 && data.allwin === 0){
          showmsg(data.message,'',1000);
        }else if(win === 3 && data.allwin === 3){
          showImg(data.imgurl,'',2000);
        }else if(win === 3 && data.allwin === 7){
          showImg(data.imgurl,'',2000);
        }else if(win === 0 && data.alllost === 0){
          showmsg(data.message,'',1000);
        }else if(win === 0 && data.alllost === 3){
          showImg(data.imgurl,'',2000);
        }
        $('#dice_mask').remove();
         },2500);
        }
      },
      error:function(){
        showmsg('错误');
      }
    });
  });

});

