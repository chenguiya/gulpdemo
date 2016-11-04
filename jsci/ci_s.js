$(function(){
  var width=document.body.clientWidth;
  if(width <=1366){
    $('body').css({'background':'url(/static/images/websize/bg1366.jpg) repeat-x center center fixed'});
    $('.uchHeader').css({'width':'1220px'});
    $('.uchfooter').css({'width':'1220px', 'margin': '35px auto 0px', 'padding-bottom': '0'});
    $('#posterTvGridRoll').css({'margin': '28px auto 0'});
    $('.newsListbox').css({'padding-bottom': '30px'});
  }
  $('.Headermenu li').hover(function(){
    $(this).addClass('hoverover');
  },function(){
    $(this).removeClass('hoverover');
  })
  var r=/(about|news|recruit|contact)/.exec(location.href);
  var result={
    about:1,
    news:2,
    recruit:3,
    contact:4
  };
  if(r==null || r==''){
        $('.Headermenu li').eq(0).find('a').addClass('hover');
  }else{
    $('.Headermenu li').find('a').removeClass('hover');
    $('.Headermenu li').eq(result[r[0]]).find('a:eq(0)').addClass('hover')
  }
  
})