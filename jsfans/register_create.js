define("test/register_create",["jquery","ajaxupload","common","validate"],function(require, exports, module){
    "user strict";
    var $=require("jquery");var j=require('common');var d=require('ajaxupload');var dat=require('validate');
    var m={};
    var InterValObj; //timer变量，控制时间
    var count = 5; //间隔函数，1秒执行
    var curCount = 60;//当前剩余秒数
    m.init=function(){
        //发送手机验证码
        $('#btnSendCode').click(function(){
            $('#err-msg').html('');
            var phone=$('#phone').val();
            //alert($('#phone').isEmpty)
            if(dat.isEmpty(phone)){
               $('#err-msg').html('<i>!</i>请输入手机号码');
               return;

            }
            if(!dat.isMobile(phone)){
              $('#err-msg').html('<i>!</i>无效的手机号码');
              return ;
            }
            $.ajax({
                type:'POST',
                url:homeUrl+'create/exec_step_1',
                data:{phone:phone},
                cache:false,
                timeout:10000,
                dataType:'json',
                success:function(data){
                    if(data.code==200){
                       $("#token").val(data.data);
                       $('#btnSendCode').attr('disabled','true');
                       $('#btnSendCode').val(curCount + "'");
                       InterValObj= window.setInterval(m.set_remain_time,1000); //启动计时器，1秒执行一次
                    }else{
                       $('#err-msg').html('<i>!</i>'+data.err);
                    }
                },
                error:function(){
                  j.showmsg('数据返回异常，稍后再试','',1000);
                }
            })
        });
        //第一步确定按钮点击第二步
        $('#next_step').click(function(){
            var token=$('#token').val();
            var verify_code=$('#verify_code').val();
            var invite_code=$('#invite_code').val();
            if(dat.isEmpty(verify_code)){
               $("#err-yzm").html("<i>!</i>请输入验证码");
               return;
            }
            $.ajax({
            url: homeUrl+"create/exec_step_2",
            type: "post",
            dataType: "json",
            data: 'token='+token+'&verify_code='+verify_code+'&invite_code='+invite_code,
            timeout: 10000,
            cache: false,
            beforeSend: function(XMLHttpRequest){},
            success: function(data, textStatus){
                console.log(data);
                if(typeof(data.err) != "undefined"){
                    if(data.code == 200){
                      window.location.href = homeUrl+"create/index/"+data.data['step']+"/"+data.data['token'];
                    }else{
                      $("#err-msg").html('<i>!</i>'+data.err);
                    }
                }
            },
            complete: function(XMLHttpRequest, textStatus){},
            error: function(){
              $("#err-msg").html("返回异常");
            }
          });
            
        });
        $('#name').focus(function(){
            $('#err-yhm').html('');
        });
        $('#realname').focus(function(){
           $('#err-xm').html('');
        });
        $('#password').focus(function(){
          var password=$(this).val();
           if(!/^.{8,16}$/.test(password)){
              $('#err-mm').html('<i>!</i>密码长度8~16位，数字、字母、字符至少包含两种');
           }else{
              $('#err-mm').html('');
           }
           
        }).keyup(function(){
           $('#err-mm').html('');
        })
        $('#com_password').focus(function(){
           $('#err-msg').html('');
        });
        //第二步填写个人信息
        $('#next_step_userinfo').click(function(){
           $('#err-yhm').html('');
            $('#err-xm').html('');
            $('#err-mm').html('');
            $('#err-msg').html('');
           var token = $("#token").val();
           var name = $("#name").val();
           var realname = $("#realname").val();
           var password = $("#password").val();
           var com_password = $("#com_password").val();
           if(dat.isEmpty(name)){
              $('#err-yhm').html('<i>!</i>请输入用户名！');
              return false;
           }
           if(dat.isEmpty(realname)){
              $('#err-xm').html('<i>!</i>请输入真实姓名！');
              return false;
           }
           if(dat.isEmpty(password)){
             $('#err-mm').html('<i>!</i>请输入密码！');
             return false;
           }else if(!/^.{8,16}$/.test(password)){
              $('#err-mm').html('<i>!</i>密码长度8~16位，数字、字母、字符至少包含两种');
             return false;
           }
           if(dat.isEmpty(com_password)){
             $('#err-msg').html('<i>!</i>请输入确认密码！');
             return false;
           }else if(com_password !== password){
              $('#err-msg').html('<i>!</i>两次输入的密码不一致哦！');
              return false;
           }
           $.ajax({
                url: homeUrl+"create/exec_step_3",
                type: "post",
                dataType: "json",
                data: 'token='+token+'&name='+name+'&realname='+realname+'&password='+password+'&com_password='+com_password,
                timeout: 10000,
                cache: false,
                beforeSend: function(XMLHttpRequest){},
                success: function(data, textStatus){
                    console.log(data);
                    if(typeof(data.err) != "undefined"){
                        if(data.code == 200){
                            window.location.href = homeUrl+"create/index/3/"+data.data;
                        }else{
                           j.showmsg(data.err,'',1000);
                        }
                    }
                },
                complete: function(XMLHttpRequest, textStatus){},
                error: function(){
                    j.showmsg('数据返回有误，请稍后再试!','',1000);
                }
           });
        });
        //第三步省份、城市、联赛、球队
        $('#province_id').on('change',function(){
          $('#err-province').html('');
            var province_id=$('#province_id').val();
            var opt='<option value="0" selected="true">请选择城市</option>';
            $.ajax({
                type:'POST',
                url:homeUrl+'create/exec_change_province',
                data:{province_id:province_id},
                timeout:10000,
                cache:false,
                dataType:'json',
                success:function(data){
                  if(typeof(data.err) !='undefined'){
                     if(data.code==200){
                         var city_list=data.data;
                         for(var i=0; i<city_list.length; i++){
                            opt+='<option value="'+city_list[i]['id']+'">'+city_list[i]['name']+'</option>'
                         }
                         $('#city_id').html(opt);
                     }else{
                        $('#city_id').html(opt);
                     }
                  }else{
                     $('#city_id').html(opt)
                  }
                },
                error:function(){
                  j.showmsg('数据返回有误，请稍后再试!','',1000);
                }
            });
        });
        $('#city_id').on('change',function(){
           $('#err-province').html('');
        });
        //联赛
        $('#league_id').on('change',function(){
          $('#err-province').html('');
            var league_id=$('#league_id').val();
            var opt='<option value="0" selected="true">请选择球队</option>';
            $.ajax({
                type:'POST',
                url:homeUrl+'create/exec_change_league',
                data:{league_id:league_id},
                timeout:10000,
                chache:false,
                dataType:'json',
                success:function(data){
                    if(typeof(data.err) !='undefined'){
                        if(data.code==200){
                           var team_list=data.data;
                           for(var i=0; i < team_list.length; i++){
                              opt+='<option value="'+team_list[i]['id']+'">'+team_list[i]['name']+'</option>'
                           }
                           $('#team_id').html(opt);
                        }else{
                            $('#team_id').html(opt);
                        }
                    }else{
                       $('#team_id').html(opt);
                    }
                },
                error:function(){
                    j.showmsg('数据返回有误，请稍后再试!','',1000);
                }
            })
        });
        $('#team_id').on('change',function(){
           $('#err-msg').html('');
        })
        //图片上传
        $(document).on('change', '#file', function() {
            $.ajaxfileupload({
                type: 'post',
                url:homeUrl+'upload/fansclub_logo',
                dataType:'json',    
                fileElementId:'file',
                success:function(data){
                    if(data.code==200){
                        if(data.data.width !==data.data.height){
                          alert('亲，球迷会LOGO必须为正方形哦！');
                        }else{
                          $('#fansclub_logo').val(data.data.logo);
                        $('.btn-upload').html('<img style="position:absolute; left:0; top:0; width:115px; height:115px" src="'+homeUrl+'upload/'+data.data.logo+'" width="115" height="115">');
                        $('#err-file').html('');
                        }      
                   }else{
                      alert(data.message);
                   }
                    
                },
                error: function(data, status, e) {
                    alert(e);
                }
            });

        });
        $('#fansclub-name').focus(function(e){
            $('#err-fansclub-name').html('');
        });
        //第三步球迷会资料点击第四步
        $('#next_step_fansclubinfo').click(function(){
            var fansclub_logo=$('#fansclub_logo').val();
            var fansclub_name=$('#fansclub-name').val();
            var province_id=$('#province_id').val();
            var city_id=$('#city_id').val();
            var league_id=$('#league_id').val();
            var team_id=$('#team_id').val();
            if(dat.isEmpty(fansclub_logo)){
              $('#err-file').html('<i>!</i>请上传球迷会logo');
              return false;
            }
            if(dat.isEmpty(fansclub_name)){
               $('#err-fansclub-name').html('<i>!</i>请输入球迷会名称！');
               return false;
            }
            if(province_id==0 || city_id==0){
              $('#err-province').html('<i>!</i>请选择省份或城市！');
              return false;
            }
            if(league_id==0 || team_id==0){
              $('#err-msg').html('<i>!</i>请选择联赛或者球队哦！');
              return false;
            }
            $.ajax({
              type: "post",
              url: homeUrl+"create/exec_step_4",
              data: $('#form-fansclub-create-3').serialize(),
              dataType: "json",
              cache: false,
              success: function(data, textStatus){
                //console.log(data);
                if(typeof(data.err) != "undefined"){
                    if(data.code == 200){
                      window.location.href = homeUrl+"create/index/4/"+data.data;
                    }else{
                      j.showmsg(data.err,'',1000);
                    }
                }
              },
              complete: function(XMLHttpRequest, textStatus){},
              error: function(){
                  j.showmsg('数据返回有误，请稍后再试!','',1000);
              }
            });
        });
        //第四步点击进行登陆
        $('#next_login').click(function(){
          var token = $("#token").val();
          $.ajax({
              url: homeUrl+"create/exec_step_5",
              type: "post",
              dataType: "json",
              data: 'token='+token,
              timeout: 10000,
              cache: false,
              beforeSend: function(XMLHttpRequest){},
              success: function(data, textStatus){
                  console.log(data);
                  if(data.code == 200){
                     window.location.href = homeUrl+"index";
                  }else{
                     alert(data.message);
                  }
              },
              complete: function(XMLHttpRequest, textStatus){},
              error: function(){
                  alert("登录异常");
              }
          });
        });
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

