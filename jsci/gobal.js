define("sea_js/gobal",["jquery","sea_js/swiper"],function(a){
	"user strict";var $=a("jquery"),c=a("sea_js/swiper");
  var R={};
  var ovshow=function(){
         nav.style.display='block';
         setTimeout(function(){
           R.transition(nav,250);
           ov.style.display='block';
         },10);
    };
    var ovhide=function(){
       //ov.style.display='none';
       setTimeout(function(){
         ov.style.display='none';
       },250);
    };
  R.transition = function(obj,time,prop,fx){
  var fx = fx || 'linear';
  var prop = prop || 'all';
  var prefix = ['','-o-','-ms-','-webkit-','-moz-'];
  for(var i = 0; i < prefix.length; i++){
    obj.style[prefix[i] + 'transition'] = time / 1000 + 's ' + prop + ' ' + fx;
  }
};
R.addClass=function(o,c){
  !R.hasClass(o,c) && (o.className +=' ' + c);
};
R.hasClass = function(o, c) {
  var regexp = new RegExp("(^|\\s+)" + c + '(\\s+|$)');
  return regexp.test(o.className);
};
R.removeClass = function(o, c) {
  o.className = o.className.replace(new RegExp("(^|\\s+)" + c + '(\\s+|$)'), ' ');
}
var nav=document.querySelector('#filter_maskbox');
var ov=document.querySelector('.nav-overlay');
	if($("#swiper-container2").length){
	var mySwiper2 = new Swiper('#swiper-container2',{
      onInit: function(swiper){
        document.getElementById("active-num").innerHTML=swiper.activeIndex+1;
        document.getElementById("all-num").innerHTML=swiper.slides.length;
      },
      onSlideChangeEnd: function(swiper){
        document.getElementById("active-num").innerHTML=swiper.activeIndex+1;
      }
     }); 
    };
    if($("#bs_slides").length){
    var baokuan=new Swiper('#bs_slides',{
    	autoplay: 5000,pagination:'.swiper-pagination',paginationClickable:true
    });
    }
    if($('#sortCH_id').length){
      document.querySelector('#sortCH_id').addEventListener('click',function(){
        R.addClass(nav,'maskShow');
        ovshow();
      },false);
      document.querySelector('#jiaWap').addEventListener('click',function(){
        R.removeClass(nav,'maskShow');
        ovhide();
      },false);
    }
});
function backbone(){
       if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { 
           window.location.href ="ios://NativeBack";
          } else if (/(Android)/i.test(navigator.userAgent)) { 
           window.Android.NativeBack();
        } else {
           history.back();
        };
}

function relogin()
{
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))
    {
        window.location.href = "ios://NativeLogin";
    }
    else if(/(Android)/i.test(navigator.userAgent))
    {
        window.Android.NativeLogin();
    }
    else
    {
        window.location.href = "./index.php?m=default&c=user&a=login&step=flow";
    }
}
