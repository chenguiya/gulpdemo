var mySwiper2 = new Swiper('#swiper-container2',{
      onInit: function(swiper){//回调函数，初始化后执行。
        document.getElementById("active-num").innerHTML=swiper.activeIndex+1;
        document.getElementById("all-num").innerHTML=swiper.slides.length;
      },
      onSlideChangeEnd: function(swiper){ //回调函数，slider切换结束时执行。
        document.getElementById("active-num").innerHTML=swiper.activeIndex+1;
      }
     }); 