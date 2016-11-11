define("test/defined_field_set",["common","layer","js/module/layer/skin/layer.css"],function(require, exports, module){
    "user strict";var j=require('common');var layer=require('layer'); require('js/module/layer/skin/layer.css');
      var fid=$('#fid').val();
      var formtype=$('#formtype').val();
      var res=/^\d+$/;
      //弹窗取消
      $('#btn_cancels').click(function(){
          var index = parent.layer.getFrameIndex(window.name);
          //parent.location.reload();
          parent.layer.close(index);
      });
      //必填判断
      var invisible;
      var title_type=false;
      //单字、多子title判断
      $('#title').focus(function(){
        var obj=$(this);
            obj.next().removeClass('Tipshow');
      }).blur(function(){
        var obj=$(this);
         var title=obj.val();
         var length=title.length;
         if(formtype=='text'){
         if(length > 10 || title==''){
            obj.next().html('最多不能超过10个字符');
            obj.next().addClass('Tipshow');
            title_type=false;
            return false;
         }else{
          title_type=true;
          obj.next().html('');
          obj.next().removeClass('Tipshow');
         }
       }else{
         if(length > 20){
           obj.next().html('最多不能超过20个字符');
            obj.next().addClass('Tipshow');
            title_type=false;
            return false;
         }else{
          title_type=true;
          obj.next().html('');
          obj.next().removeClass('Tipshow');
         }
       }
      });
      //单字、多字发布
      $('#btn_ok').click(function(){
              var fid=$('#fid').val();
              var formtype=$('#formtype').val();
              var title=$('#title').val();
          var minlength=parseInt($('#minlength').val());
          var min=parseInt($('#minlength').attr('min'));
          var maxlength=parseInt($('#maxlength').val());
          var max=parseInt($('#maxlength').attr('max'));
          var fieldid=$(this).data('field');
          $('.recruit_radioico').each(function(){
          var selfwap=$(this);
          if(selfwap.find('input').is(':checked')){
              invisible=selfwap.find('input').val();
          }
      });
          //内容判断
          if(minlength=='' || minlength < min){
             minlength=1;
          }else if(!res.test(minlength)){
              j.showmsg('亲，内容选项中要输入数字哦！','',1000);
              return false;
          }else if(minlength > maxlength || minlength > max){
             j.showmsg('亲，最少项不能超过最大项哦','',1000);
             return false;
          }
          if(maxlength=='' || maxlength <= min){
            maxlength=max;
          }else if(!res.test(maxlength)){
              j.showmsg('亲，内容选项中要输入数字哦！','',1000);
              return false;
          }else if(maxlength > max){
             j.showmsg('亲，最大项不能超过默认'+max+'个字符哦','',1000);
             return false;
          }
           if(fieldid !==''){
             $.ajax({
                     type:'POST',
                     url:homeUrl+'admin/defined_field/edit',
                     data:{fieldid:fieldid,fid:fid,formtype:formtype,title:title,minlength:minlength,maxlength:maxlength,invisible:invisible,do_submit:'do_submit'},
                     cache:false,
                     dataType:'json',
                     success:function(data){
                        m.defindeedit(data);
                     },
                     error:function(){
                       j.showmsg('数据返回异常','',1000);
                     }
             });
           }else{
              if(title_type){
              $.ajax({
                type:'POST',
                url:homeUrl+'admin/defined_field/add',
                data:{fid:fid,formtype:formtype,title:title,minlength:minlength,maxlength:maxlength,invisible:invisible,do_submit:'do_submit'},
                cache:false,
                dataType:'json',
                success:function(data){
                    m.defindeok(data);
                },
                error:function(){
                    j.showmsg('数据返回异常','',1000);
                }
              });
             }else{
               j.showmsg('请完善数据再确定哦','',1000);
               return false;
             }
          }
      });
      //选项增加
      $('#click_addpoll').click(function(){
        var len=$('.opitionItem p').length;
         var html='<p><input type="text" class="input-text" name="package_'+len+'" placeholder="最多不能超过20个字符" value="" /><span class="pack_colse"></span><span class="Tipover"></span></p>';
         $('.opitionItem').append(html);
         len++;
         if($('#maxlength').length){
          $('#maxlength').val(len);
         }
         //alert(len);
         if(len >9){
           $(this).parent().css('display','none');
         }
      });
      var option=$('.opitionItem');
      option.on({
        click:function(){
           var self=$(this);
           self.parent().remove();
           var len=$('.opitionItem').find('p').length;
           if($('#maxlength').length){
              $('#maxlength').val(len);
           }
           if(len < 10){
             $('#click_addpoll').parent().css('display','block');
           }
        }
      },'.pack_colse');
      var option_type=false;
      option.on({
         focus:function(){
          var obj=$(this);
           obj.next('.Tipover').removeClass('Tipshow');
         },
         blur:function(){
        var obj=$(this);
         var title=obj.val();
          var length=m.CheckLength(title);
          //alert(length);
          if(length > 20 || title==''){
              obj.parent().find('.Tipover').html('最多不能超过20个字符');
              obj.parent().find('.Tipover').addClass('Tipshow');
            option_type=false;
            return false;
         }else{
          option_type=true;
              obj.parent().find('.Tipover').html('');
              obj.parent().find('.Tipover').removeClass('Tipshow');
         }
         }
      },'p input');

      //单选ajax
      $('#btn_radiook').click(function(){
        var fieldid=$(this).data('field');
          var arr=new Array();
          var falg=true;
          var fid=$('#fid').val();
          var formtype=$('#formtype').val();
          var title=$('#title').val();
          var pLen=option.find('p').length;
          //alert(pLen)
          option.find('p').each(function(i){
              arr[i]=$(this).find('input').val();
              var lencheck=m.CheckLength(arr[i]);
              if(arr[i]=='' || lencheck >20){
                option.find('p').eq(i).children('.Tipover').html('最多不能超过20个字符');
                option.find('p').eq(i).children('.Tipover').addClass('Tipshow');
                falg=false;
              }
          });
          //alert(arr)
          $('.recruit_radioico').each(function(){
          var selfwap=$(this);
          if(selfwap.find('input').is(':checked')){
              invisible=selfwap.find('input').val();
          }
      });
          var str_arr=arr.join();
          if(fieldid !==''){
              if(falg){
                  $.ajax({
                    type:'POST',
                    url:homeUrl+'admin/defined_field/edit',
                    data:{fieldid:fieldid,fid:fid,formtype:formtype,title:title,option:arr,invisible:invisible,do_submit:'do_submit'},
                    cache:false,
                    dataType:'json',
                    success:function(data){
                       m.defindeedit(data);
                    },
                    error:function(){
                       j.showmsg('数据返回异常','',1000);
                    }
                });
              }
          }else{
              if(title_type && option_type){
          if(falg){
                $.ajax({
                    type:'POST',
                    url:homeUrl+'admin/defined_field/add',
                    data:{fid:fid,formtype:formtype,title:title,option:arr,invisible:invisible,do_submit:'do_submit'},
                    cache:false,
                    dataType:'json',
                    success:function(data){
                       m.defindeok(data);
                    },
                    error:function(){
                       j.showmsg('数据返回异常','',1000);
                    }
                });
          }
         }else{
            j.showmsg('请完善数据再确定哦','',1000);
          }
          }
      });
      //多选ajax
      $('#btn_selectok').click(function(){
          var fieldid=$(this).data('field');
              var arr=new Array();
              var flag=true;
              var fid=$('#fid').val();
              var formtype=$('#formtype').val();
              var title=$('#title').val();
              var minlength=parseInt($('#minlength').val());
              var min=parseInt($('#minlength').attr('min'));
              var maxlength=parseInt($('#maxlength').val());
              var max=parseInt($('#maxlength').attr('max'));
              option.find('p').each(function(i){
                  arr[i]=$(this).find('input').val();
                  var lencheck=m.CheckLength(arr[i]);
                  if(arr[i]=='' || lencheck > 20){
                      option.find('p').eq(i).children('.Tipover').html('最多不能超过20个字符');
                      option.find('p').eq(i).children('.Tipover').addClass('Tipshow');
                      flag=false;
                  }
              });
              $('.recruit_radioico').each(function(){
          var selfwap=$(this);
          if(selfwap.find('input').is(':checked')){
              invisible=selfwap.find('input').val();
                  }
              });
              var pleng=option.find('p').length;
              //内容判断
              if(minlength=='' || minlength < min){
                minlength=1;
              }else if(!res.test(minlength)){
                 j.showmsg('亲，内容选项中要输入数字哦！','',1000);
                 return false;
              }else if(minlength > maxlength || minlength > max || minlength > pleng){
                j.showmsg('亲，最少选项不能超过最多选项项哦','',1000);
                return false;
              }
              if(maxlength=='' || maxlength <= min){
                maxlength=max;
              }else if(!res.test(maxlength)){
                j.showmsg('亲，内容选项中要输入数字哦！','',1000);
                return false;
              }else if(maxlength > pleng){
                j.showmsg('亲，最多选项不能超过'+pleng+'项','',1000);
                return false;
              }
              var str_arr=arr.join();
          if(fieldid !==''){
               if(flag){
                  $.ajax({
                       type:'POST',
                       url:homeUrl+'admin/defined_field/edit',
                       data:{fieldid:fieldid,fid:fid,formtype:formtype,title:title,option:arr,minlength:minlength,maxlength:maxlength,invisible:invisible,do_submit:'do_submit'},
                       cache:false,
                       dataType:'json',
                       success:function(data){
                            m.defindeedit(data);
                       },
                       error:function(){
                           j.showmsg('数据返回异常','',1000);
                       }
                  });
              }
          }else{
             if(title_type && option_type){
              if(flag){
                  $.ajax({
                       type:'POST',
                       url:homeUrl+'admin/defined_field/add',
                       data:{fid:fid,formtype:formtype,title:title,option:arr,minlength:minlength,maxlength:maxlength,invisible:invisible,do_submit:'do_submit'},
                       cache:false,
                       dataType:'json',
                       success:function(data){
                            m.defindeok(data);
                       },
                       error:function(){
                           j.showmsg('数据返回异常','',1000);
                       }
                  });
              }
          }else{
            j.showmsg('请完善数据再确定哦','',1000);
          }
          }
      });
    var m={};
    m.defindeok=function(data){
       if(data.code==200){
            var html='<div class="edit_input" data-field="'+data.data.fieldid+'"><span class="edit_type"><em>'+data.data.title+'</em><i class="close_defined"></i></span><a href="javascript:void(0)" class="edit_define" data-click="编辑设置,/admin/defined_field/edit?fieldid='+data.data.fieldid+',570,570">编辑>></a></div>';
            parent.$('#editAdd_each').append(html);
            //parent.$('#edit_rowNew').css('display','block');
            var m=parent.$('#editAdd_type').find('.edit_input').length;
            if(m >4){
              parent.$('#defined_btn').css('display','none');
            }
            var arrsuit=new Array();
            parent.$('#editAdd_each').find('.edit_input').each(function(i){
              arrsuit[i]=$(this).data('field');
            });
            //parent.$('#fieldids').attr('name','fieldids['+arrsuit+']');
            parent.$('#fieldids').val(arrsuit);
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
       }else{
            j.showmsg(data.message,'',1000);
       }
    },
    m.defindeedit=function(data){
        if(data.code==200){
            parent.$('#editAdd_type').find('.edit_input[data-field="'+data.data.fieldid+'"] .edit_type').html('<em>'+data.data.title+'</em><i class="close_defined"></i>');
              var index = parent.layer.getFrameIndex(window.name);
              parent.layer.close(index);
            
       }else{
            j.showmsg(data.message,'',1000);
       }
    },
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
});

