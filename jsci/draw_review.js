define("js/draw_review",["jquery"],function(a){
    "user strict";var $=a("jquery");
    function showmsg(msg, offsetObj, delay) {
      delay = delay || 2000;
      msg = msg || '操作成功';
      var timeid = '';
      if (!offsetObj) {
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      }
      var winWidth = document.body.clientWidth || window.innerWidth;

      if (!$('#toptip').length) {
        $(document.body).prepend('<div id="jsapend" style="position:relative;"><div id="toptip" style="position: absolute; font-size: 18px; color: #fff;  font-family: Microsoft YaHei;  text-align: center; border-radius: 5px; line-height: 50px; padding: 0 30px 0 30px; min-height: 50px;background: rgba(0,0,0,0.5);z-index: 999999;">' + msg + '</div></div>');
      } else {
        $('#toptip').fadeOut('fast').html(msg);
      }

      if (!offsetObj) {
        offsetObj = {'top': document.body.scrollTop + winHeight / 2, 'left': winWidth / 2 - $('#toptip').outerWidth(true) / 2};
      } else if (!offsetObj.left) {
        offsetObj.left = winWidth / 2 - $('#toptip').outerWidth(true) / 2;
      } else {
        offsetObj.left = offsetObj.left - $('#toptip').outerWidth(true) / 2;
      }

      $('#toptip').css(offsetObj).stop().fadeIn('normal', function() {
        if (timeid)
          clearTimeout(timeid);
        timeid = setTimeout(function() {
          $('#toptip').fadeOut();
        }, delay);
      });
};
  var flag=false;
  var page=2;
  var loading=false;
  var stop=true;
  if($('#reviewLoading').length){
    var maxpage=parseInt($('#reviewLoading').attr('maxpage'));
    $(window).scroll(function(){
       if($(document).height()-$(this).scrollTop()-$(this).height() < 100){
          if(document.getElementById('reviewLoading')){
              flag=true;
          $('#reviewLoading').css('display','block');
          setTimeout(function(){
            if(flag){
              $.ajax({
                type:'GET',
                url:location.href,
                data:{page:page},
                dataType:'json',
                cache:false,
                success:function(data){
                  $('#reviewLoading').hide();
                  var count=data.data.length;
                  var arr=eval(data.data);
                  for(var i=0; i < count; i++){
                    var html='<li>'+
                                 '<a href="drawcash/details?id='+arr[i].id+'">'+
                                    '<div class="contL">'+
                                          '<div class="name">'+arr[i].title+'</div>'+
                                          '<div class="prices"><p>'+arr[i].cash+'元</p>'+arr[i].dateline+'</div>'+
                                    '</div>'+
                                    '<div class="contCenter">'+arr[i].step_wap+'</div>'+
                                 '</a>'+
                              '</li>';
                    $('.reviewList ul').append(html);
                  }
                  page++;
                  if(page > maxpage){
                    $('#reviewLoading').remove()
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
})