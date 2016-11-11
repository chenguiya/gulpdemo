//用户参加活动报名
function apply() {
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
    var textLen=$('.act_enroll').find('.textSet').length;
    var textobj=$('.act_enroll').find('.textSet');
      for(var i=0; i<textLen; i++){
         var text_name=textobj.eq(i).data('name');
         var text_min=parseInt(textobj.eq(i).attr('minlength'));
         var text_max=parseInt(textobj.eq(i).attr('maxlength'));
         var text_input=textobj.eq(i).find('input').val();
         var len=m.CheckLength(text_input);
         if(textobj.eq(i).find('.c-red').length){
            if(text_input==''){
                showmsg('亲，带*号为必填项哦！请先完善','',1000);
                return false;
            }else if(len < text_min || len > text_max){
                showmsg('亲，【'+text_name+'】最多输入'+text_max+'个字符哦','',1000);
                return false;
            } 
          }else{
            if(len > text_max > 0){
               showmsg('亲，【'+text_name+'】最多输入'+text_max+'个字符哦','',1000);
                return false;
            }
          }
      }
    //多字
    var textareaLen=$('.act_enroll').find('.option_mouse').length;
    var textareaobj=$('.act_enroll').find('.option_mouse');
      for(var i=0; i < textareaLen; i++){
         var textarea_name=textareaobj.eq(i).data('name');
         var textarea_min=parseInt(textareaobj.eq(i).attr('minlength'));
         var textarea_max=parseInt(textareaobj.eq(i).attr('maxlength'));
         var textarea_input=textareaobj.eq(i).find('textarea').val();
         var len=m.CheckLength(textarea_input);
         if(textareaobj.eq(i).find('.c-red').length){
            if(textarea_input==''){
               showmsg('亲，带*号为必填项哦！请先完善','',1000);
                return false;
            }else if(len < textarea_min || len > textarea_max){
                showmsg('亲，【'+textarea_name+'】最多输入'+textarea_max+'个字符哦','',1000);
                return false;
            } 
         }else{
            if(len > textarea_max > 0){
                showmsg('亲，【'+textarea_name+'】最多输入'+textarea_max+'个字符哦','',1000);
                return false;
            } 
         }
      }
    //单选
    var radioLen=$('.act_enroll').find('.option_radio').length;
    var radioobj=$('.act_enroll').find('.option_radio');
      for(var i=0; i < radioLen; i++){
         var radio_name=radioobj.eq(i).data('name');
         if(radioobj.eq(i).find('.c-red').length){
            if(!(radioobj.eq(i).find('input').is(':checked'))){
               showmsg('亲，带*号为必填项哦！请先完善','',1000);
                return false;
            }
         }
      }
    //多选
      var selectLen=$('.act_enroll').find('.option_select').length;
      var selectobj=$('.act_enroll').find('.option_select');
      for(var i=0; i < selectLen; i++){
        var select_name=selectobj.eq(i).data('name');
         var select_min=parseInt(selectobj.eq(i).attr('minlength'));
         var select_max=parseInt(selectobj.eq(i).attr('maxlength'));
         var num_all=selectobj.eq(i).find(':checkbox').size(); //选项总个数
         var num_checked=selectobj.eq(i).find(':checkbox:checked').size();   //选中个数
         if(selectobj.eq(i).find('.c-red').length){
           if(num_checked==0){
              showmsg('亲，带*号为必填项哦！请先完善','',1000);
                return false;
           }else if(num_checked < select_min){
              showmsg('亲，【'+select_name+'】最少选择'+select_min+'项哦','',1000);
                return false;
           }else if(num_checked > select_max){
              showmsg('亲，【'+select_name+'】最多选择'+select_max+'项哦','',1000);
                return false;
           }
         }else{
            if(num_checked !==0){
              if(num_checked > select_max || num_checked < select_min){
               showmsg('亲，【'+select_name+'】最少选'+select_min+'项最多选'+select_max+'项哦!','',1000);
                return false;
              }
           }
         }
      }
      //ajax交互
      var tid=$('#tid').val();
      var openid=$('#openid').val();
      $.ajax({
        type: "POST",
        url: "misc/activityapply",
        data: $("#formApply").serialize(),
        cache:false,
        dataType: "json",
        success: function(data) {
          if(data.code == 200) {
            $('#act_end').fadeIn();
            $('.end_guanbi').click(function(){
               $('#act_end').fadeOut();
               document.location.href =homeUrl+'activity?id='+tid+'&openid='+openid;
            })
          } else if(data.code == 201) {
            payment();
            $('#act_enroll').hide();
            $('#act_pay').show();   
          } else {
            showmsg(data.message, '', '1000');
            return false;
          }
        }
      });
}
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
$(function(){
  //生日弹窗
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
  //焦点停留在手机可视范围
  if($('.act_cl').length){
        $('.inputSr .act_cl').click(function(index){
                var index = $(this).index(".act_cl");
                var height=$('.act_cl').eq(index-1).outerHeight();
               console.log(height)
                setTimeout(function(){
                 // console.log(index*height);
                $('.inputSr').scrollTop(index*height);
              },500)
              //console.log($(this).offset().top);
        })  
    }
});