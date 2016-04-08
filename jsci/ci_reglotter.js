define("js/ci_reglotters",["jquery"],function(a){
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
    $('#reglot_mask .reglot_m_title div').html(htmltext);
  },
  openu:function(text){
     $('.reglot_popmenu').show();
     $('.reglot_popmenu .reglot_m_title div').html(text);
  }
};
var click=false;
window.onload=function(){
  lottery.init('reglot_box');
  $("#reglot_box a").click(function(){
    $.ajax({
      type:'GET',
      url:cid_url+'/api/lottery/do_lottery',
      dataType:'json',
      success:function(data){
        if(data.code===401){
          shellmodule.login(data.message);
        }else if(data.code === 203){
          lottery.openu(data.message);
          //showmsg(data.message,'',1000);
        }else if(data.code === 402){
          showmsg(data.message,'',1000);
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
    lottery.open(data.message);
    lottery.prize=-1;
    lottery.times=0;
    click=false;
  }else{
    if (lottery.times<lottery.cycle) {
      lottery.speed -= 10;
    }else if(lottery.times==lottery.cycle) {
      var index = Math.random()*(lottery.count)|0;
      lottery.prize = data.data;    
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

  $('.reglog_btn_share').on('click',function(){
    var shareurl=cid_url+'/static/images/reglot_table/share_20160309.jpg';
      var basechar, i, len;  
    var c1, c2, c3;  
    len = shareurl.length;  
    i = 0;  
    basechar = "";  
    while (i < len) {  
        c1 = shareurl.charCodeAt(i++) & 0xff;  
        if (i == len) {  
            basechar += base64EncodeChars.charAt(c1 >> 2);  
            basechar += base64EncodeChars.charAt((c1 & 0x3) << 4);  
            basechar += "==";  
            break;  
        }  
        c2 = shareurl.charCodeAt(i++);  
        if (i == len) {  
            basechar += base64EncodeChars.charAt(c1 >> 2);  
            basechar += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
            basechar += base64EncodeChars.charAt((c2 & 0xF) << 2);  
            basechar += "=";  
            break;  
        }  
        c3 = shareurl.charCodeAt(i++);  
        basechar += base64EncodeChars.charAt(c1 >> 2);  
        basechar += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
        basechar += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
        basechar += base64EncodeChars.charAt(c3 & 0x3F);  
    }  
    //return out; 
    shellmodule.ShareLottery(basechar);
      return false;
  });

});

