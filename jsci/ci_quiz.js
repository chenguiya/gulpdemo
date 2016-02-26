define("js/ci_quiz",["jquery"],function(a){
    "user strict";var $=a("jquery");
    //竞猜JS
    $('.quiz div.quiz_box').click(function(){
        $(this).parent().find('.quiz_box').removeClass('quiz_checked');
        $(this).addClass('quiz_checked');
        $('#btn_submit').addClass('quiz_hui');
    });

    //竞猜弹窗
var G={};
G.$=function(sel,context){
  return (context || document).querySelector(sel);
};
G.hasClass = function(o, c) {
  var regexp = new RegExp("(^|\\s+)" + c + '(\\s+|$)');
  return regexp.test(o.className);
};
G.addClass=function(o,c){
  !G.hasClass(o,c) && (o.className +=' ' + c);
};
G.removeClass = function(o, c) {
  o.className = o.className.replace(new RegExp("(^|\\s+)" + c + '(\\s+|$)'), ' ');
}
G.toggleClass = function(o, c) {
  G.hasClass(o, c) ? G.removeClass(o, c) : G.addClass(o, c);
};
G.transition = function(obj,time,prop,fx){
  var fx = fx || 'linear';
  var prop = prop || 'all';
  var prefix = ['','-o-','-ms-','-webkit-','-moz-'];
  for(var i = 0; i < prefix.length; i++){
    obj.style[prefix[i] + 'transition'] = time / 1000 + 's ' + prop + ' ' + fx;
  }
}
if($('.quiz_dialog').length){
;({
  initialize:function(){
    this.navColumn();
  },
  navColumn:function(){
    var ov=document.querySelector('.nav-overlay');
    var ohide=document.querySelector('.nav_hide');
    var column=document.querySelector('.pop_barcom');
    var btn=document.querySelector('.quiz_dialog');
    var timer;
    var ovshow=function(){
      ov.style.display='block';
      column.style.display='block';
      G.transition(ov,250);
        ov.style.opacity=1;
      //setTimeout(function(){
      //  G.transition(ov,250);
      //  ov.style.opacity=1;
        
     // },10);
    };
    var ovhide=function(){
       // clearTimeout(timer);
       ov.style.opacity=0;
        ov.style.display='none';
        column.style.display='none';
       //column.style.display='none';
       //setTimeout(function(){
       //  ov.style.display='none';
      // },250);
    };
    btn.addEventListener('click',function(event){
        if(G.hasClass(column,'pop-show')){
          G.removeClass(column,'pop-show');
          column.style.display='none';
          ovhide();
        }else{
          G.addClass(column,'pop-show');
          column.style.display='block';
          ovshow();
        }
    },false);
    ov.addEventListener('click',function(){
       G.removeClass(column,'pop-show');
       ovhide();
    },false);
    if(ohide){
    ohide.addEventListener('click',function(){
       G.removeClass(column,'pop-show');
       ovhide();
    },false);
     }
    document.addEventListener('touchmove',function(event){
      if(G.hasClass(column,'pop-show')){
        event.preventDefault();
      }
    },false);
  }
}).initialize();
}
});