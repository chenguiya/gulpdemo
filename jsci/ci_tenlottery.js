define("js/ci_tenlotterys",["jquery"],function(a){
    "user strict";var $=a("jquery");
  var lottery={
  index:-1, //当前转动到哪个位置，起点位置(上一个位置)
  count:0,  //总共有多少个位置
  timer:100,  //setTimeout的ID，用clearTimeout清除
  speed:20, //初始转动速度
  times:0,  //转动次数
  cycle:50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
  prize:-1, //中奖位置
  init:function(id){
    if ($("#"+id).find(".reglot_unit").length>0) {
      $lottery = $("#"+id);
      $units = $lottery.find(".reglot_unit");
      this.obj = $lottery;
      this.count = $units.length;
      $lottery.find(".reglot-unit-"+this.index).addClass("active");
    };
  },
  roll:function(){
    var index = this.index;
    var count = this.count;
    var lottery = this.obj;
    $(lottery).find(".reglot-unit-"+index).removeClass("active");
    index += 1;
    if (index>count-1) {
      index = 0;
    };
    $(lottery).find(".reglot-unit-"+index).addClass("active");
    this.index=index;
    return false;
  },
  stop1:function(index){
    this.prize=index;
    return false;
  },
  open:function(htmltext){
    $("#reglot_mask").show();
    $('#reglot_mask .reglot_m_title div.reglotImg img').attr('src',htmltext);
  },
  openu:function(text){
     $('.reglot_popmenu').show();
     $('.reglot_popmenu .reglot_m_title div').html(text);
  }
};
var click=false;
window.onload=function(){
  lottery.init('tenlotery_box');
  $("#tenlotery_box a").click(function(){
    $.ajax({
      type:'POST',
      url:cid_url+'/api/wx_activity/handle_l',
      data:{lid:13},
      dataType:'json',
      success:function(data){
        if(data.code===401){
          shellmodule.login(data.message);
        }else if(data.code === 402){
          if(data.rank==-2){
            showmsg(data.message,'',1000);
          }else if(data.rank==-1){
            lottery.open(data.img);
          }
        }else{
           if (click) {
               return false;
           }else{
                lottery.speed=100;
                function roll1(){
                   lottery.times += 1;
  lottery.roll();
  if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
    clearTimeout(lottery.timer);
    lottery.open(data.img);
    lottery.prize=-1;
    lottery.times=0;
    click=false;
  }else{
    if (lottery.times<lottery.cycle) {
      lottery.speed -= 10;
    }else if(lottery.times==lottery.cycle) {
      var index = Math.random()*(lottery.count)|0;
      lottery.prize = data.rank;    
    }else{
      if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
        lottery.speed += 110;
      }else{
        lottery.speed += 20;
      }
    }
    if (lottery.speed<40) {
      lottery.speed=40;
    };
    //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
    lottery.timer = setTimeout(roll1,lottery.speed);
  }
  return false;
}
roll1();
         // alert(data.data.yes);
          click=true;
           return false;
        }
      }
      
      },
      error:function(){
        showmsg('返回异常');
      }
    })
  });

  $(".reglog_btn_certain").click(function() {
    $(this).parents('#reglot_mask').hide();
    window.location.reload();
  });
  };


});

