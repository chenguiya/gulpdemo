define("test/post",["jquery","ajaxupload","common","layer","js/module/layer/skin/layer.css"],function(require, exports, module){
    "user strict";var $=require("jquery");var d=require('ajaxupload');var j=require("common");var layer=require('layer');require('js/module/layer/skin/layer.css');
    //活动编辑器
    var ue = UE.getEditor('editor',{
         toolbars: [
           ['bold', 'italic', 'underline', 'forecolor', 'justifyleft','justifycenter','justifyright','justifyjustify','|','fontsize','simpleupload']
         ],
         elementPathEnabled :false,
         wordCount:false
    });
       //活动发布选项增加删除
    if($('#click_addpoll').length){
        $('#click_addpoll').click(function(){
            var ir=$('#itemDIv .itemHc').length;
            //var a=$('#packhidden').html();
            //a=a.replace(/av10\"\>1\<\/p\>/i,'av10">'+(ir+1)+'</p>');
            //a=a.replace(/package\[y\]\[name\]/i, 'package['+ir+'][name]');
            //a=a.replace(/package\[y\]\[price\]/i, 'package['+ir+'][price]');
            //a=a.replace(/package\[y\]\[num\]/i, 'package['+ir+'][num]');
            //a=a.replace('/value=\"\"/i')
            var html='<div class="itemHc cl" id="package_'+ir+'">';
                html+='<p class="av10">'+(ir+1)+'</p>';
                html+='<p class="av40"><input type="text" class="input-text" name="package['+ir+'][name]" placeholder="请填写收费项目名称" value="" /></p>';
                html+='<p class="av25"><input type="text" class="input-text" name="package['+ir+'][price]" placeholder="请填写金额，须为整数" value="" /></p>';
                html+='<p class="av25"><input type="text" class="input-text" name="package['+ir+'][num]" placeholder="不填则不限制" value="" /></p>';
                html+='</div>';
            $('#click_addpoll').parent().siblings('#itemDIv').append(html);
            ir++;  
        });
    }
    //收费与免费活动切换
    $('.activityTab li').click(function(){
        $('.activityTab li').removeClass('active');
        $(this).addClass('active');
        $('.ulboxMain').css('display','none');
        var ID=$(this).attr('id');
        //设置是否付费
        if(ID == 'payevent') {
            $("#free-event").val('1');
        } else if(ID == 'freeevent') {
            $("#free-event").val('0');
        }
        $('#'+ID+'Center').show();
        return false;
    });
    //自定义设置
       $('#defined_btn').click(function(){
            var html='<div style="text-align:center; padding-right:20px; padding-top:55px;">'+
                     '<ul class="recruitDiv cl">'+
                          '<li><a href="javascript:void(0)" data-click="单行字设置,/admin/defined_field/add?formtype=text,570,470">单行字</a></li>'+
                          '<li><a href="javascript:void(0)" data-click="多行字设置,/admin/defined_field/add?formtype=textarea,570,470">多行字</a></li>'+
                          '<li><a href="javascript:void(0)" data-click="单选设置,/admin/defined_field/add?formtype=radio,570,570">单选</a></li>'+
                          '<li><a href="javascript:void(0)" data-click="多选设置,/admin/defined_field/add?formtype=select,570,570">多选</a></li>'+
                     '</ul>'+
                     '</div>';
            j.layerShow({
               html:html,
               title:'添加需填写信息项',
               width:'540',
               height:'200',
               type:true
            })
      });
       //编辑自定义弹窗
       var editbtn=$('#editAdd_type');
       editbtn.on({
          click:function(){
              var arr=$(this).attr('data-click').split(",");
              m.layer_show(arr[0],arr[1],arr[2],arr[3]);
          }
       },'.edit_define');
       //删除自定义弹窗
       editbtn.on({
          click:function(){
             var self=$(this);
             var field=parseInt(self.closest('.edit_input').data('field'));
             $.ajax({
                type:'POST',
                url:homeUrl+'admin/defined_field/delete',
                data:{fieldid:field},
                cache:false,
                dataTyep:'json',
                success:function(data){
                    j.showmsg(data.message,'',1000);
                    self.closest('.edit_input').remove();
                    //var arr=$('#fieldids').attr('name').match(/\d+/g).toString().split(',');
                    var arr=$('#fieldids').val().split(',');
                    if(arr.length<6){
                       $('#defined_btn').css('display','block');
                    }
                    for(var i=0; i < arr.length; i++){
                       if(arr[i]==field){
                        arr.splice(i,1);
                       }
                    }
                    //$('#fieldids').attr('name','fieldids['+arr+']');
                    $('#fieldids').val(arr);
                },
                error:function(){
                     j.showmsg('数据返回异常','',1000);
                }
             })
          }
       },'.close_defined')
       //弹窗里面的
       var sets=$('#append_parent');
       sets.on({
         click:function(){
            $(this).parents('#overpop').remove();
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
         }
       },'a');
    //设置活动时间
    if($('#starttimefrom').length){
        $('#starttimefrom').focus(function(){
        var _self=$(this);
       WdatePicker({
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        onpicked:function(dp){
            $('#starttimefrom').val(dp.cal.getNewDateStr());
        }
       })

       });
    };
    if($('#startimeto').length){
       $('#startimeto').focus(function(){
        WdatePicker({
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        onpicked:function(dp){
            $('#startimeto').val(dp.cal.getNewDateStr());
        }
       })
      }); 
    }
    if($('#expiration').length){
        $('#expiration').focus(function(){
        WdatePicker({
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        onpicked:function(dp){
            $('#expiration').val(dp.cal.getNewDateStr());
        }
       })
      })
    }
    $(document).on('change', '#fileCover', function() {
         /*var ImgObj=new Image(); 
         var ImgFileSize=Math.round(ImgObj.fileSize/1024*100)/100;//取得图片文件的大小 
         var fso=new ActiveXObject("Scripting.FileSystemObject"); 
         var f=fso.GetFile(files); 
         var mySize = f.size/1024; 
         alert(mySize)*/
            $.ajaxfileupload({
                type: 'post',
                url:homeUrl+'upload/index',
                timeout:1000,
                dataType:'json',    
                fileElementId:'fileCover',
                success:function(data){
                    if(data.code==200){
                    var data=eval(data.data[0]);
                        if(data.file_size<=1024){
                     $('#previewid').html('<input type="hidden" id="aid" name="aid" value="' + data.aid + '" /><div class="coverPop" id="coverDetle"><img src="/upload/attachment/forum/'+data.attachment+'"><a href="javascript:void(0)" class="coverDetele icon-cw" id="coverDetele" onclick="shell.hideK()"></a></div>');
                     $('.btn_upload').hide();
                        }else{
                            alert('亲，图片大小不超过1M哦！');
                        }
                   }else{
                      alert(data.message);
                   }
                },
                error: function(data, status, e) {
                    alert(e);
                }
            });
       //}

    });
    var m={};
    m.layer_show=function(title,url,w,h){
        if (title == null || title == '') {
            title=false;
        };
        if (url == null || url == '') {
            url="404.html";
        };
        if (w == null || w == '') {
            w=800;
        };
        if (h == null || h == '') {
            h=($(window).height() - 50);
        };
        layer.open({
            type: 2,
            area: [w+'px', h +'px'],
            fix: false, //不固定
            maxmin: true,
            scrollbar:false,
            shade:0.4,
            title: title,
            content: url
        });
    }
});

