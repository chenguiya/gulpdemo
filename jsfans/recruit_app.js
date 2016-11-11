define("test/mobile/recruit_app",["jquery","common","mobtime","js/module/mobtime/mobtime.css","http://res.wx.qq.com/open/js/jweixin-1.0.0.js"],function(a){
    "user strict";var $=a("jquery");var j=a("common");var mobcroll=a("mobtime");var wx=a('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
    a("test/module/mobiscroll.2.13.2.css");
    var d=encodeURIComponent(urls);
    if($('#birthday').length){
      var curr = new Date().getFullYear();
            var opt = {  
                'default': {
                    theme: 'default',
                    mode: 'scroller',
                    display: 'modal',
                    animate: 'fade',
                    endYear:'2030'
                }, 
                'dateYMD': {
                    preset: 'date',
                    dateFormat: 'yyyy-mm-dd',
                    defaultValue: new Date(new Date()),
                    invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
                }
            };
     $('#birthday').scroller($.extend(opt['dateYMD'],opt['default']));
    }
    if($('.rectInput').length){
        $('.rectScroll .rectInput').click(function(index){
              var index = $(this).index(".rectInput");
                var height=$('.rectInput').eq(index-1).outerHeight()+8;
               // alert(index)
              setTimeout(function(){
                 // console.log(index*height);
                $('.rectScroll').scrollTop(index*height);
              },500)
              //console.log($(this).offset().top);
        })  
    }
    //第二步骤:申请招募报名
    $('#rectTJ').click(function(){
      //j.showmsg("吃文件哦人我放假我额片就", '', 1000);
      var inputLen=$('.rectScroll').find('.inputS').length;
      var inputobj=$('.rectScroll').find('.inputS');
      for(var i=0; i < inputLen; i++){
        var input_input=inputobj.eq(i).val();
        if(input_input=='' || input_input==null){
           j.showmsg('亲，带*号为必填项哦！请先完善','',1000);
           return false;
        }
      }
      
      //单字
      var textLen=$('.rectScroll').find('.textSet').length;
      var textobj=$('.rectScroll').find('.textSet');
      for(var i=0; i<textLen; i++){
         var text_name=textobj.eq(i).data('name');
         var text_min=parseInt(textobj.eq(i).attr('minlength'));
         var text_max=parseInt(textobj.eq(i).attr('maxlength'));
         var text_input=textobj.eq(i).find('input').val();
         var len=m.CheckLength(text_input);
         if(textobj.eq(i).find('.c-red').length){
            if(text_input==''){
                j.showmsg('亲，带*号为必填项哦！请先完善','',1000);
                return false;
            }else if(len < text_min || len > text_max){
                j.showmsg('亲，【'+text_name+'】最多输入'+text_max+'个字符哦','',1000);
                return false;
            } 
          }else{
             if(len > text_max > 0){
               j.showmsg('亲，【'+text_name+'】最多输入'+text_max+'个字符哦','',1000);
                return false;
             }
          }
      }
      //多字
      var textareaLen=$('.rectScroll').find('.option_mouse').length;
      var textareaobj=$('.rectScroll').find('.option_mouse');
      for(var i=0; i < textareaLen; i++){
         var textarea_name=textareaobj.eq(i).data('name');
         var textarea_min=parseInt(textareaobj.eq(i).attr('minlength'));
         var textarea_max=parseInt(textareaobj.eq(i).attr('maxlength'));
         var textarea_input=textareaobj.eq(i).find('textarea').val();
         var len=m.CheckLength(textarea_input);
         if(textareaobj.eq(i).find('.c-red').length){
            if(textarea_input==''){
               j.showmsg('亲，带*号为必填项哦！请先完善','',1000);
                return false;
            }else if(len < textarea_min || len > textarea_max){
                j.showmsg('亲，【'+textarea_name+'】最多输入'+textarea_max+'个字符哦','',1000);
                return false;
            } 
         }else{
           if(len > textarea_max > 0){
              j.showmsg('亲，【'+textarea_name+'】最多输入'+textarea_max+'个字符哦','',1000);
                return false;
           }
         }
      }
      //单选
      var radioLen=$('.rectScroll').find('.option_radio').length;
      var radioobj=$('.rectScroll').find('.option_radio');
      for(var i=0; i < radioLen; i++){
         var radio_name=radioobj.eq(i).data('name');
         if(radioobj.eq(i).find('.c-red').length){
            if(!(radioobj.eq(i).find('input').is(':checked'))){
               j.showmsg('亲，带*号为必填项哦！请先完善','',1000);
                return false;
            }
         }
      }
      //多选
      var selectLen=$('.rectScroll').find('.option_select').length;
      var selectobj=$('.rectScroll').find('.option_select');
      for(var i=0; i < selectLen; i++){
        var select_name=selectobj.eq(i).data('name');
         var select_min=parseInt(selectobj.eq(i).attr('minlength'));
         var select_max=parseInt(selectobj.eq(i).attr('maxlength'));
         var num_all=selectobj.eq(i).find(':checkbox').size(); //选项总个数
         var num_checked=selectobj.eq(i).find(':checkbox:checked').size();   //选中个数
         if(selectobj.eq(i).find('.c-red').length){
           if(num_checked==0){
              j.showmsg('亲，带*号为必填项哦！请先完善','',1000);
                return false;
           }else if(num_checked < select_min){
              j.showmsg('亲，【'+select_name+'】最少选择'+select_min+'项哦','',1000);
                return false;
           }else if(num_checked > select_max){
              j.showmsg('亲，【'+select_name+'】最多选择'+select_max+'项哦','',1000);
                return false;
           }
         }else{
            if(num_checked !==0){
              if(num_checked > select_max || num_checked < select_min){
               j.showmsg('亲，【'+select_name+'】最少选'+select_min+'项最多选'+select_max+'项哦!','',1000);
                return false;
            }
            }
            
         }
      }
      /*var form = $('#formRecruit'),phone = $("input[name='mobile']").val();
      if(!/^1[345789]{1}[0-9]{9}$/i.test(phone)){
            j.showmsg('手机格式不正确！请重写！');
            return false;
      }*/
      var tid=$('#tid').val();
        $.ajax({
            type: "POST",
            url: homeUrl+"misc/recruit_apply",
            data: $("#formRecruit").serialize(),
            cache:false,
            dataType: "json",
            success: function(data) {
                if(data.code === 200) {
                      window.location.href = homeUrl+'recruit?id='+tid+'&step=' + data.data.step + '&gender=' + data.data.gender + '&mobile='+ data.data.mobile + '&openid='+openid;                                
                } else {
                  j.showmsg(data.message, '', 1000);
                  return false;
                }
            }
        });
    });
    var m={};
    m.CheckLength=function(strTemp){
         var i,sum;
         sum=0;
         for(i=0;i<strTemp.length;i++)
         {
          if((strTemp.charCodeAt(i)>0) && (strTemp.charCodeAt(i)<=255)){
            sum=sum+1
          }else{
            sum=sum+1
          }
        }
        return sum;
    }
    if(window.navigator.userAgent.toLowerCase().indexOf("micromessenger")){
    $.ajax({
        type:"GET",
        url:"http://wx.5usport.com/Jsapisign",
        data:{signurl:d},
        dataType:"json",
        success:function(e){
           //alert(e.appid);
           wx.config({
              debug:!1,
              appId:e.appid,
              timestamp:e.timestamp,
              nonceStr:e.noncestr,
              signature:e.signature,
              jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage"]
            })
        },
        error:function(){
           showmsg('数据有误','',1000)
        }
    })
    wx.ready(function(){
        wx.showOptionMenu(),
        wx.onMenuShareAppMessage({
            title:shareTitle,
            desc:shareDescription,
            link:shareUrl,
            imgUrl:shareImage,
            trigger:function(e){},
            success:function(e){},
            cancel:function(e){},
            fail:function(e){}
        })
        wx.onMenuShareTimeline({
            title:shareTitle,
            link:shareUrl,
            imgUrl:shareImage,
            trigger:function(e){},
            success:function(e){},
            cancel:function(e){},
            fail:function(e){}
        })
    })
    wx.error(function(e){
        alert(e.errMsg)
    });
    }

});