define(function(require, exports, module){
 var $=require("jquery");
function showmsg(msg, offsetObj, delay) {
      delay = delay || 2000;
      msg = msg || '操作成功';
      var timeid = '';
      if (!offsetObj) {
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      }
      var winWidth = document.body.clientWidth || window.innerWidth;

      if (!$('#toptip').length) {
        $(document.body).prepend('<div id="jsapend" style="position:relative;"><div id="toptip" style="position: absolute; font-size: 15px; color: #fefefe;  font-family: Microsoft YaHei;  text-align: center; border-radius: 5px; line-height: 50px; padding: 0 30px 0 30px; min-height: 50px;background: #3d4859;z-index: 999999;">' + msg + '</div></div>');
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
function showmess(msg, offsetObj, delay) {
      delay = delay || 5000;
      msg = msg || '操作成功';
      var timeid = '';
      if (!offsetObj) {
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      }
      var winWidth = document.body.clientWidth || window.innerWidth;

      if (!$('#toptip').length) {
        $(document.body).prepend('<div id="jsapend" style="position:relative;"><div id="toptip" style="position: absolute; font-size: 13px; color: #fefefe;  font-family: Microsoft YaHei;  text-align: center; border-radius: 3px; line-height: 50px; padding: 0 40px 0 25px; min-height: 50px;background: #3d4859;z-index: 999999;"><i class="icon-dui"></i><em>'+msg+'</em><a href="javascript:;" class="icon-cuo" id="hideDete"></a></div></div>');
      } else {
        $('#toptip em').fadeIn('fast').html(msg);
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
      $('#toptip').on({
        click:function(){
           $('#toptip').fadeOut();
        }
      },'#hideDete')
};
var layerShow=function(settings){
  var defaults={
    html:'',
    title:'',
    width:400,
    height:400,
    submit:'',
    type:false
  };
  var config=$.extend(defaults,settings);
    var parent=$('#append_parent');
        if(typeof(config.width) =='undefined' || config.width=='' || !config.width){
            config.width=400;
        }
        if(typeof(config.height) == 'undefined' || config.height=='' || !config.height){
            config.height=400;
        }
        var de='<div id="overpop">';
            if(config.type == true){
               de+='<style>html{overflow:hidden}</style>';
            }
            de+='<div id="maskover" style="display:block"></div>';
            de+='<div class="layer_shadeCon" style="width:'+config.width+'px; height:'+config.height+'px; margin-left:-'+(config.width/2)+'px; margin-top:-'+(config.height/2)+'px">';
            de+='<div class="maskhd">'+config.title+'<a href="javascript:;" class="icon-close"></a></div>';
            de+='<div class="layerContent">'+config.html+'</div>';
            if(config.submit){
              de+='<div class="layer_submit"><a href="javascript:;" class="'+config.submit+'">确定</a></div>';
            }
            de+='</div></div>';
        parent.append(de);
        if(parent.find('.icon-close').length > 0){
            parent.find('.icon-close').click(function(){
                $(this).parents('#overpop').remove();
            });
        }
};
var shared=function(bdtext,desc,url,pic){
  window._bd_share_config = {
        common : {
            bdText : bdtext,    
            bdDesc : desc,    
            bdUrl : url,   
            bdPic : pic
        },
        share : [{
            "tag":"pictureShare",
            "bdSize" : 32
        }]
    }
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
};
exports.showmsg=showmsg;
exports.showmess=showmess;
exports.layerShow=layerShow;
exports.shared=shared;
});
