define("js/ci_ticket",["jquery"],function(a){
    "user strict";var $=a("jquery");
    var initialize =function(){
       function getRandomNum(lbound,ubound){
        return(Math.floor(Math.random() * (ubound - lbound)) + lbound);
       }
       var r=getRandomNum(1,100);
       isOk=0;
    }
    var c1;
    var ctx;
    var ismousedown;
    var isOk=0;
    var fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);
    var imgImg=document.getElementById('imageIMG');
    initialize();
    c1=document.getElementById('c1');
    c1.width=c1.clientWidth;
    c1.height=c1.clientHeight;
    ctx=c1.getContext('2d');
    c1.addEventListener('mousemove',eventMove,false);
    c1.addEventListener('mousedown',eventDown,false);
    c1.addEventListener('mouseup',eventUp,false);
    c1.addEventListener('touchstart',eventDown,false);
    c1.addEventListener('touchend',eventUp,false);
    c1.addEventListener('touchmove',eventMove,false);
    initCanvas();
    function initCanvas(){
      ctx.globalCompositeOperation='source-over';
      //ctx.drawImage(imgr,0,0);
      ctx.fillStyle='#b5b5b6';
      ctx.fillRect(0,0,c1.clientWidth,c1.clientHeight);
      ctx.fill();
      //把这个属性设为这个就可以做出圆形橡皮擦的效果
          //有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
          //c1.style.backgroundImage="url(/static/images/packet_user/packet-5.png)";
      ctx.drawImage(imgImg,0,0);
      ctx.font="Bold 40px Microsoft YaHei";
      ctx.textAlign="center";
      ctx.fillStyle='#9fa0a0';
      ctx.fillText('刮一刮',c1.width/2,85);
      ctx.globalCompositeOperation='destination-out';
    }
    //鼠标按下 和触摸开始
    function eventDown(e){
      e.preventDefault();
      ismousedown=true;
    }
    //鼠标抬起 和触摸结束
    function eventUp(e){ 
      e.preventDefault();
      //得到canvas的全部数据
      var a=ctx.getImageData(0,0,c1.width,c1.height);
      var j=0;
      for(var i=3; i < a.data.length;i+=4){
        if(a.data[i]==0) j++;
      }
      //当被刮开的区域等于一半时，则可以开始处理结果
      if(j >= a.data.length/8){
        isOk=1;
        $('#layerPop').fadeIn(200);
      }
      ismousedown=false;
    }
    //鼠标移动 和触摸移动
    function eventMove(e){
      e.preventDefault();
      if(ismousedown){
        if(e.changedTouches){
          e=e.changedTouches[e.changedTouches.length-1];
        }
      }
      var topY=document.getElementById('ggcanvas').offsetTop;
      var oX=c1.offsetLeft,oY=c1.offsetTop+topY;
      var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
          y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;
      ctx.beginPath();
      ctx.arc(x, y, fontem*1.2, 0, Math.PI * 2,true);
      //下面3行代码是为了修复部分手机浏览器不支持destination-out
      //我也不是很清楚这样做的原理是什么
      c1.style.display='none';
      c1.offsetHeight;
      c1.style.display='inherit';
      ctx.fill();
    }
    
});

