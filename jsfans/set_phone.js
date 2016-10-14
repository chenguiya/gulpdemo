define("test/set_phone",["jquery","common","layer","js/module/layer/skin/layer.css"],function(require, exports, module){
    "user strict";
    var $=require("jquery");var layer=require('layer');var j=require('common');
    require('js/module/layer/skin/layer.css');
    var m={};
    var InterValObj; //timer变量，控制时间
    var count = 5; //间隔函数，1秒执行
    var curCount = 60;//当前剩余秒数
    m.phonenew=function(){
        //解绑手机验证码
        //http://fans-home.chenhua.cc/admin/wallet/exec_setnewphone_sendcode&step=&fid=&phone=
        $('#btnSendCode').click(function(){
            var step=parseInt($(this).data('code'));
            var fid=$('#fid').val();
            var phone='';
            if(step == 2){
                phone=$('#phone').val();
            }
            $.ajax({
                type:'POST',
                url:homeUrl+'admin/wallet/exec_setnewphone_sendcode',
                data:{step:step,fid:fid,phone:phone},
                timeout:1000,
                cache:false,
                dataType:'json',
                success:function(data){
                    if(typeof(data.err) != "undefined"){
                       if(data.code == 200){
                           $("#btnSendCode").attr("disabled", "true");
                           $("#btnSendCode").val("发送成功");
                           InterValObj = window.setInterval(m.set_remain_time, 1000); //启动计时器，1秒执行一次
                       }else{
                          j.showmsg(data.err,'',1000);
                       }
                    }else{
                         $("#btnSendCode").val("发送验证码失败");
                    }
                },
                error:function(){
                    j.showmsg('数据有问题','',1000);
                }
            })
        });
        //点击下一步绑定新手机
        $('#btnNextStep').click(function(){
            var step=parseInt($(this).data('step'));
            var fid=$('#fid').val();
            var phone='';
            if(step ==2){
                phone=$('#phone').val();
            }
            var code=$('#verify_code').val();
            $.ajax({
                type:'POST',
                url:homeUrl+'admin/wallet/exec_setnewphone_verifycode',
                data:{step:step,fid:fid,phone:phone,verify_code:code},
                timeout:1000,
                cache:false,
                dataType:'json',
                success:function(data){
                    if(typeof(data.err) != "undefined"){
                        if(data.code == 200){
                            step = step + 1;
                            window.location.href = homeUrl+'admin/wallet/setnewphone/'+fid+'/'+step;
                        }else{
                            j.showmsg(data.err,'',1000);
                        }
                    }
                },
                error:function(){
                    j.showmsg('数据有问题','',1000);
                }
            });
        });
        //点击关闭刷新
        $('#layer_close').click(function(){
            var phonee=$(this).data('phone');
            var index = parent.layer.getFrameIndex(window.name);
            parent.$('#contact_edit').text(phonee);
            parent.layer.close(index); 
        })
    },
    m.phone=function(){
       //绑定新手机-发送验证码
       $('#btnSendCode').click(function(){
          var phone=$('#phone').val();
          $.ajax({
              type:'POST',
              url:homeUrl+'admin/wallet/exec_setphone_1',
              data:{phone:phone},
              dataType:'json',
              timeout:1000,
              cache:false,
              success:function(data){
                  if(typeof(data.err) != "undefined"){
                    if(data.code == 200){
                        $("#btnSendCode").attr("disabled", "true");
                        $("#btnSendCode").val("发送成功");
                        InterValObj = window.setInterval(m.set_remain_time, 1000); //启动计时器，1秒执行一次
                    }else{
                        j.showmsg(data.err,'',1000);
                    }
                }else{
                    $("#btnSendCode").val("发送验证码失败");
                }
              },
              error:function(){
                j.showmsg('数据有问题','',1000);
              }
          });
       });
       //提交成功
       $('#btnSubmit').click(function(){
           var fid=$('#fid').val();
           var phone=$('#phone').val();
           var code=$('#verify_code').val();
           $.ajax({
               type:'POST',
               url:homeUrl+'admin/wallet/exec_setphone_2',
               data:{fid:fid,phone:phone,verify_code:code},
               dataType:'json',
               timeout:1000,
               cache:false,
               success:function(data){
                  if(typeof(data.err) != "undefined"){
                    if(data.code == 200){
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.location.reload();
                        parent.layer.close(index);
                    }else{
                        j.showmsg(data.err,'',1000);
                    }
                }
               },
               error:function(){
                 j.showmsg('数据有问题','',1000);
               }
           })
       }); 
    },
    m.setpassword=function(){
      //设置-找回支付密码
      $('#btnSendCode').click(function(){
          var fid=$('#fid').val();
          $.ajax({
              type:'POST',
              url:homeUrl+'admin/wallet/exec_setpassword_1',
              data:{fid:fid},
              timeout:1000,
              cache:false,
              dataType:'json',
              success:function(data){
                  if(data.code == 200){
                      $("#btnSendCode").attr("disabled", "true");
                      $("#btnSendCode").val("发送成功");
                      InterValObj = window.setInterval(m.set_remain_time, 1000); //启动计时器，1秒执行一次
                  }else{
                    j.showmsg(data.err,'',1000);
                  }
              },
              error:function(){
                  j.showmsg('数据有问题','',1000);
              }
          });
      });
      //设置-找回密码-第二步骤
      $('#btnNextStep').click(function(){
          var fid=$('#fid').val();
          var code=$('#verify_code').val();
          $.ajax({
            type: "POST",
            url: homeUrl+"admin/wallet/exec_setpassword_2",
            data:{fid:fid,verify_code:code},
            timeout: 10000,
            cache: false,
            dataType: "json",
            success: function(data){
                if(typeof(data.err) != "undefined"){
                    if(data.code == 200){
                      window.location.href = homeUrl+"admin/wallet/setpassword/"+fid+"/2";
                    }else{
                      j.showmsg(data.err,'',1000);
                    }
                }
            },
            error: function(){
               j.showmsg('数据有问题','',1000);
            }
        });
      });
      //设置-找回密码-输入旧新密码
      $('#btnConfirm').click(function(){
        var fid=$('#fid').val();
        var password=$('#password').val();
        var com_password=$('#com_password').val();
        $.ajax({
           type:'POST',
           url:homeUrl+'admin/wallet/exec_setpassword_3',
           data:{fid:fid,password:password,com_password:com_password},
           timeout:1000,
           cache:false,
           dataType:'json',
           success:function(data){
              if(data.code == 200){
                     window.location.href = homeUrl+"admin/wallet/setpassword/"+fid+"/3";
                    //parent.location.reload();
              }else{
                  j.showmsg(data.err,'',1000);
              }
           },
           error:function(){
              j.showmsg('数据有问题','',1000);
           }
        })
      });
      //点击关闭刷新
        $('#layer_close').click(function(){
            var index = parent.layer.getFrameIndex(window.name);
            parent.location.reload();
            parent.layer.close(index); 
        })
    },
    m.setaccount=function(){
        $('#form-wallet-setaccount').submit(function(){
           var account=$('#account').val();
           if(account==''){
              j.showmsg('请输入支付宝账号','',1000);
              return false;
           }
        });
    },
    m.modify=function(){
       $('#btnConfirm').click(function(){
           var fid=$('#fid').val();
           var old_password=$('#old_password').val();
           var password=$('#password').val();
           var com_password=$('#com_password').val();
           $.ajax({
              type:'POST',
              url:homeUrl+'admin/wallet/exec_modifypassword',
              data:{fid:fid,old_password:old_password,password:password,com_password:com_password},
              timeout:1000,
              cache:false,
              dataType:'json',
              success:function(data){
                  if(data.code == 200){
                      window.location.href = homeUrl+"admin/wallet/setpassword/"+fid+"/3";
                      parent.location.reload();
                    }else{
                      j.showmsg(data.err,'',1000);
                    }
              },
              error:function(){
                  j.showmsg('数据有问题','',1000);
              }
           })
       })
    },
    m.set_remain_time=function(){
        if (curCount == 0) {                
            window.clearInterval(InterValObj);//停止计时器
            $("#btnSendCode").removeAttr("disabled");//启用按钮
            $("#btnSendCode").val("重新发送");
            curCount=60;
        }
        else {
            curCount--;
            $("#btnSendCode").val(curCount + "'");
        }
    }
   module.exports = m;
});

