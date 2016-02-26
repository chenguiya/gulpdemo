define("js/ci_album",["jquery","swiper"],function(a){
    "user strict";var $=a("jquery");var b=a("swiper");
    var tidalbum=$('#postalbumid').attr('data-tid');
    $('.posta_ok').on('click',function(){
      var str=$(this).attr('data-url');
      var basechar, i, len;  
    var c1, c2, c3;  
    len = str.length;  
    i = 0;  
    basechar = "";  
    while (i < len) {  
        c1 = str.charCodeAt(i++) & 0xff;  
        if (i == len) {  
            basechar += base64EncodeChars.charAt(c1 >> 2);  
            basechar += base64EncodeChars.charAt((c1 & 0x3) << 4);  
            basechar += "==";  
            break;  
        }  
        c2 = str.charCodeAt(i++);  
        if (i == len) {  
            basechar += base64EncodeChars.charAt(c1 >> 2);  
            basechar += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
            basechar += base64EncodeChars.charAt((c2 & 0xF) << 2);  
            basechar += "=";  
            break;  
        }  
        c3 = str.charCodeAt(i++);  
        basechar += base64EncodeChars.charAt(c1 >> 2);  
        basechar += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
        basechar += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
        basechar += base64EncodeChars.charAt(c3 & 0x3F);  
    }  
    //return out;  
      if(isIOS){
        window.location.href='ios://NativeSaveImage/'+basechar;
      }else if(isAndroid){
        window.Android.NativeSaveImage(basechar);
      }else{
        return false;
      }
      return false;
    });
function mygetnativeevent(event) {

  while(event && typeof event.originalEvent !== "undefined") {
    event = event.originalEvent;
  }
  return event;
}
(function(){
  var support3d = ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix());
  var curkey =rentnum;
  var count = $('.postalbum_c li').length;
  var imglist = [];
  for(var i=0; i < count ; i++){
    imglist[i] =(new Image()).src=$('.postalbum_c').find('img').eq(i).attr('zsrc');
  }


  var width = document.body.clientWidth || window.innerWidth;
  var height = document.documentElement.clientHeight;
  $('.postalbum').css({'display':'block', 'height':height + 'px'});
  $('.postalbum_u').css({'height':height + 'px', 'width':width + 'px'});
  $('.postalbum_i').css({'max-height':'100%', 'visibility':'visible'});
  if(support3d) {
    $('.postalbum_c').css({'line-height':height + 'px', 'width':width * count + 'px'});
    slidmoving('-' + curkey * width);
  } else {
    $('.postalbum_c').css({'display':'block', 'height':height * count + 'px'});
    $('.postalbum_c').css({'top': '-' + curkey * height + 'px'});
  }

  var position = {};
  var status = true;
  var posalbum_touch_interval = 0;
  var postalbum_timeoutid = null;
  touchaction = function(postalbum, postalbum_u, fun) {
    postalbum.on('touchstart', postalbum_u, function(e) {
      e = mygetnativeevent(e);
      position.x1 = e.touches[0].pageX;
      position.y1 = e.touches[0].pageY;
      position.hori = true;
      status = true;
    }).on('touchmove', postalbum_u, function(e) {
      status = false;
      e = mygetnativeevent(e);
      position.x2 = e.touches[0].pageX;
      position.y2 = e.touches[0].pageY;
      position.distx = position.x2 - position.x1;
      position.disty = position.y2 - position.y2;
      if(Math.abs(position.distx) < 2 * Math.abs(position.disty)) {
        position.hori = false;
      } else {
        e.preventDefault();
      }
    }).on('touchend', postalbum_u, function(e) {
      e = mygetnativeevent(e);
      if(position.x2 && Math.abs(position.distx) > 30 && position.hori && !status) {
        var swipedire = position.distx > 0 ? 'right' : 'left';
        fun.call(this, swipedire, e);
      } else if(status) {
        postalbum_touch_interval = new Date().getTime();
        if(!postalbum_timeoutid) {
          postalbum_timeoutid = setTimeout(function() {
            var interval = new Date().getTime() - postalbum_touch_interval;
            if(interval >= 250) {
              fun.call(this, 'tap', e);
            }
            postalbum_touch_interval = 0;
            postalbum_timeoutid = null;
          }, 250);
        }
      }
    });
  };

  var curkeyimg = $('#img_' + curkey);
  curkeyimg.css({'-webkit-transition':'all 200ms', '-moz-transition':'all 200ms', '-o-transition':'all 200ms', 'transition':'all 200ms'});
  imgchange(curkeyimg, 1, 0, 0);
  setTimeout(function() {
    fiximgmove(curkeyimg);
  }, 350);

  var imgscale = 1;
  var oldscalex = 0;
  var oldscaley = 0;
  var newscalex = 0;
  var newscaley = 0;
  var imgmovestatus = false;
  var touch_interval = 0;
  var timeoutid = null;
  var imgtouchpos = {};
  $('.postalbum_u').on('touchstart', '.postalbum_i', function(e) {
    if(!imgmovestatus) {
      return;
    }
    e = mygetnativeevent(e);
    imgtouchpos.x1 = e.touches[0].pageX;
    imgtouchpos.y1 = e.touches[0].pageY;
  }).on('touchmove', '.postalbum_i', function(e) {
    if(!imgmovestatus) {
      return;
    }
    e = mygetnativeevent(e);
    imgtouchpos.x2 = e.touches[0].pageX;
    imgtouchpos.y2 = e.touches[0].pageY;
    imgtouchpos.distx = imgtouchpos.x2 - imgtouchpos.x1;
    imgtouchpos.disty = imgtouchpos.y2 - imgtouchpos.y1;

    newscalex = imgtouchpos.distx / imgscale + oldscalex;
    newscaley = imgtouchpos.disty / imgscale + oldscaley;

    imgchange($('#img_' + curkey), imgscale, newscalex, newscaley);

  }).on('touchend', '.postalbum_i', function(e) {

    touch_interval = new Date().getTime();
    if(!timeoutid) {
      timeoutid = setTimeout(function() {
        var interval = new Date().getTime() - touch_interval;
        var obj = $('#img_' + curkey);
        if(interval < 250) {
          imgscale = imgscale == 1 ? 2 : 1;
          imgmovestatus = (imgscale == 1) ? false : true;
          if(imgmovestatus) {
            obj.attr('src', obj.attr('orig'));
          }
          imgchange(obj, imgscale, newscalex, newscaley);
          setTimeout(function() {
            fiximgmove(obj);
          }, 250);
        } else {
          if(imgmovestatus) {
            oldscalex = newscalex;
            oldscaley = newscaley;
            fiximgmove(obj);
          }
        }
        touch_interval = 0;
        timeoutid = null;
      }, 250);
    }
  });

  function imgchange(img, scale, x, y) {
    if(!img[0]) {
      return;
    }
    scale = scale || 1;
    x = x || 0;
    y = y || 0;

    img.css('-webkit-transform', 'scale(' + scale + ')');
    img.css('-moz-transform', 'scale(' + scale + ')');
    img.css('-o-transform', 'scale(' + scale + ')');
    img.css('transform', 'scale(' + scale + ')');

    var pimg = img.parent();
    var translatetxt = (support3d ? "translate3d": "translate") + "(" + x * scale + "px, " + y * scale + "px" + (support3d ? ", 0px)": ")");
    pimg.css('-webkit-transform', translatetxt);
    pimg.css('-moz-transform', translatetxt);
    pimg.css('-o-transform', translatetxt);
    pimg.css('transform', translatetxt);
  }

  function fiximgmove(imgobj) {
    var offset = imgobj.offset();
    var movex = imgobj.width() * imgscale - width;
    var movey = imgobj.height() * imgscale - height;
    if(movey > 0) {
      var yoffset = offset.top - $('.postalbum').offset().top;
      if(yoffset > 0) {
        oldscaley = oldscaley - yoffset / imgscale;
      } else {
        if(yoffset + imgobj.height() * imgscale - height < 0) {
          oldscaley = oldscaley - (yoffset + imgobj.height() * imgscale - height) / imgscale;
        }
      }
    } else {
      oldscaley = 0;
    }

    if(movex > 0) {
      if(offset.left > 0) {
        oldscalex = oldscalex - offset.left / imgscale;
      } else {
        if(offset.left + imgobj.width() * imgscale - width < 0) {
          oldscalex = oldscalex - (offset.left + imgobj.width() * imgscale - width) / imgscale;
        }
      }
    } else {
      oldscalex = 0;
    }

    if(imgscale < 1) {
      imgscale = 1;
    }
    newscalex = oldscalex;
    newscaley = oldscaley;
    imgchange(imgobj, imgscale, oldscalex, oldscaley);
  }

  var headerstatus = true;
  touchaction($('.postalbum'), '.postalbum_u', function(swipedire, touchevent) {
    if(imgmovestatus) {
      return;
    }
    switch(swipedire) {
      case 'left':
        if(curkey >= count - 1) {
          return false;
        } else {
          for(var i=0; i<3; i++) {
            if(!$('#img_' + (curkey + i)).attr('src')) {
              $('#img_' + (curkey + i)).attr('src', $('#img_'+(curkey + i)).attr('zsrc'));
            }
          }
          $('.posta_ok').attr('data-url',imglist[curkey + 1]);
          curkey++;
          if(support3d) {
            slidmoving('-' + curkey * width);
          } else {
            $('.postalbum_c').css({'top': '-' + curkey * height + 'px'});
          }
          $('#curpic').text(curkey + 1);
        }
        break;
      case 'right':
        if(curkey <= 0) {
         return false;
        } else {
          for(var i=-3; i<0; i++) {
            if(!$('#img_' + (curkey + i)).attr('src')) {
              $('#img_' + (curkey + i)).attr('src', $('#img_'+(curkey + i)).attr('zsrc'));
            }
          }
           $('.posta_ok').attr('data-url',imglist[curkey - 1]);
          curkey--;
          if(support3d) {
            slidmoving('-' + curkey * width);
          } else {
            $('.postalbum_c').css({'top': '-' + curkey * height + 'px'});
          }
          $('#curpic').text(curkey + 1);
        }
        break;
      case 'tap':
        var obj = $('.postalbum_h');
         if(isIOS){
        window.location.href='ios://NativeBack';
      }else if(isAndroid){
        window.Android.NativeBack();
      }else{
         window.location.href=cid_url+'/api/show/?tid='+tidalbum;
      }
        break;
    }
  });

  function slidmoving(distx) {
    $('.postalbum_c').css('-webkit-transform', 'translate3d('+ distx + 'px, 0, 0)');
    $('.postalbum_c').css('-moz-transform', 'translate3d('+ distx + 'px, 0, 0)');
    $('.postalbum_c').css('-o-transform', 'translate3d('+ distx + 'px, 0, 0)');
    $('.postalbum_c').css('transform', 'translate3d('+ distx + 'px, 0, 0)');
    return true;
  }

})();

});