define("js/ci_version_addres",["jquery"],function(a){
    "user strict";var $=a("jquery");
    var proveiceValue='',citiValue='',districtValue='';
    //返回市的值
    //http://cid.chenhua.cc/mendez_home/district_change?district_id=7
    $('#selProvinces_0').on('change',function(){
      proveiceValue=$('#selProvinces_0').val();
      $.ajax({
         type:'POST',
         url:cid_url+'/mendez_home/district_change',
         data:{district_id:proveiceValue},
         dataType:'json',
         cache:false,
         success:function(data){
          var count=data.data.district_list.length;
          var arr=eval(data.data.district_list);
          var html='<option value="0">市</option>';
          for(var i=0; i < count; i++){
             html+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>'
          }
          $('#selCities_0').html(html);
         },
         error:function(){
            showmsg('数据返回异常','',1000);
         }
      })
    });
    //返回区列表值
    $('#selCities_0').on('change',function(){
      citiValue=$('#selCities_0').val();
      $.ajax({
        type:'POST',
        url:cid_url+'/mendez_home/district_change',
        data:{district_id:citiValue},
        dataType:'json',
        cache:false,
        success:function(data){
          var count=data.data.district_list.length;
          var arr=eval(data.data.district_list);
          var html='<option value="0">区</option>';
          for(var i=0; i < count; i++){
             html+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>'
          }
          $('#selDistricts_0').html(html);
        },
        error:function(){
          showmsg('数据返回异常','',1000);
        }
      })
    });
    //返回县列表值
    $('#selDistricts_0').on('change',function(){
       districtValue=$('#selDistricts_0').val();
    })

    //新增地址提交
    $('.logout_Data').on('click',function(){
        var addresId=$('#address_id').val();
        var addressValue=$('#address_0').val();
        var nameValue=$('#consignee_0').val();
        var moblieValue=$('#mobile_0').val();
        var defauls;
        $('.ch_lables input[type="radio"]').each(function(){
            if($(this).is(':checked')){
                defauls=$(this).val(); 
            }
        })
      if(addresId !==''){
         //编辑地址
         //http://cid.chenhua.cc/mendez_home/set_address?address_id=11&address=%E6%B8%A9%E7%83%AD%E6%B8%A9%E7%83%AD&contacts=%E8%8A%B1%E8%8A%B1&mobile=13543526897&token=186c05d9560b41815c136a848ff98fea&_=1473410841902
         $.ajax({
               type:'POST',
               url:cid_url+'/mendez_home/set_address',
               data:{address_id:addresId,province_id:$('#selProvinces_0').val(),city_id:$('#selCities_0').val(),district_id:$('#selDistricts_0').val(),address:addressValue,contacts:nameValue,mobile:moblieValue,default:defauls,token:token},
               dataType:'json',
               cache:false,
               success:function(data){
                     if(data.code==200){
                          //window.location.href=cid_url+'/mendez_home/address';
                        ajaxdata(data.message,'修改地址成功');
                     }else{
                          showmsg(data.message,'',1000);    
                     }
               },
               error:function(){
                     showmsg('数据返回异常','',1000);
               }
          });
      }else{
           //新增地址
           //ttp://cid.chenhua.cc/mendez_home/set_address?province_id=2&city_id=55&district_id=885&address=%E4%BA%94%E4%BA%8C%E4%BA%94%E8%80%8C%E7%89%B9%E4%B8%80%E6%97%A5%E4%B8%80%E6%97%A5&contacts=%E7%8E%A9%E5%84%BF%E7%8E%A9%E5%84%BF%E4%BA%BA&mobile=13560838447&default=1&token=19499627a6dd814ff65d5314bb22b9bf&_=1474613253832
          $.ajax({
               type:'POST',
               url:cid_url+'/mendez_home/set_address',
               data:{province_id:proveiceValue,city_id:citiValue,district_id:districtValue,address:addressValue,contacts:nameValue,mobile:moblieValue,default:defauls,token:token},
               dataType:'json',
               cache:false,
               success:function(data){
                     if(data.code==200){
                          ajaxdata(data.message,'新增地址成功');
                     }else{
                          showmsg(data.message,'',1000);
                     }
               },
               error:function(){
                     showmsg('数据返回异常','',1000);
               }
          });
      }
      
    });
    //address_list选择默认地址
    $('.addressAdddef').click(function(){
      addressId=parseInt($(this).data('id'));
      var _self=$(this);
        $.ajax({
               type:'POST',
               url:cid_url+'/mendez_home/set_address',
               data:{address_id:addressId,is_select:1,token:token},
               dataType:'json',
               cache:false,
               success:function(data){
                     if(data.code==200){
                          $('.addrest').find('.defa').remove();
                          _self.parent().append('<em class="defa"></em>');
                          if(isIOS){ 
                             setTimeout(function(){
                                window.location.href ="ios://NativeBack";
                             },500);
                          }else if(isAndroid){
                             setTimeout(function(){
                                 try{
                                    window.Android.NativeBack();
                                }catch(e){
                                    console.log(e);
                                    showmsg('此版本不支持，请安装最新版本','',2000);
                                } 
                              },500);
                           }else{
                            setTimeout(function(){
                              window.location.href =cid_url+'/mendez_home/address?token='+token;
                            },500);
                          } 
                     }else{
                          showmsg(data.message,'',1000);
                     }
               },
               error:function(){
                     showmsg('数据返回异常','',1000);
               }
          });
    });
    //ajax通用
    function ajaxdata(message,tip){
      if(isIOS){ 
          showmsg(tip,'',1000);
          setTimeout(function(){
              window.location.href ="ios://NativeBack";
          },1500);
      }else if(isAndroid){
          showmsg(tip,'',1000);
          setTimeout(function(){
              try{
                  window.Android.NativeBack();
              }catch(e){
                  console.log(e);
                  showmsg('此版本不支持，请安装最新版本','',2000);
              } 
          },1500);
      }else{
          showmsg(message,'',1000);
          setTimeout(function(){
              window.location.href =cid_url+'/mendez_home/address?token='+token;
          },1500);
      } 
    }
});