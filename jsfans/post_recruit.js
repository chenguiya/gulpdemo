define("test/post_recruit",[,"common","layer","kditor","js/module/layer/skin/layer.css"],function(require,exports,module){
    "user strict";
    var layer=require('layer');var j=require('common');
    var kind=require('kditor');
    require('js/module/layer/skin/layer.css');
    var m={};
    m.init=function(){
        var arry=[];var i=0;
       var rect=$('.createScope');
       var editor;
       //招募规则kindeditor编辑器
       KindEditor.ready(function(K) {
        editor = K.create('textarea[name="content"]', {
          basePath:homeUrl+'static/js/module/',
          themesPath:'../static/js/module/kditor/',
          langType:'../kditor/lang/zh_CN',
          resizeType : 1,
          allowPreviewEmoticons : false,
          allowImageUpload : false,
          items : []
        });
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
      }) ;
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
       //点击模板背景图
       rect.on({
        click:function(){
            var img=$(this).find('img').attr('src');
            var id=$(this).attr('id');
            rect.find('.Li_draggable').removeClass('activer');
            $(this).addClass('activer');
            if(rect.find('.pageCreatNum p').hasClass('activer')){
                rect.find('.pageCreatNum p.activer').attr('data-id',id);
                rect.find('.pageCreatNum p.activer').attr('data-image',img);
                var iwp=parseInt(rect.find('.pageCreatNum p.activer').attr('data-tid'));
                if(iwp==1){
                  m.Oneclick(rect,img);
                }else if(iwp == 2){
                  m.Twoclick(rect,img);
                }else if(iwp == 3){
                  m.Threeclick(rect,img);
                }
                rect.find('.pageCreatNum p').each(function(index){
                     arry[index]=$(this).attr('data-id');
                 });
                $('#templateid').val(arry);
            }else{
                return false;
            }
        }
       },'.Li_draggable');
       //增加屏幕
       rect.on({
        click:function(){
            var _this=$(this);
            var arr=['一','二','三'];
            var num=$('.pageCreatNum p').length;
            var html='<p class="activer" data-tid="'+(num+1)+'" data-id="0" data-image=""><a href="javascript:;" class="pageIc" >第'+arr[num]+'屏</a><a href="javascript:;" class="trash_Icon"></a></p>';
            _this.parent('.add_pagedrage').prev().find('p').removeClass('activer');
            $('.pageCreatNum').append(html);
            rect.find('.compText').html('');
            rect.find('.Li_draggable').removeClass('activer');
            num++;
            if(num > 2){
                _this.parent('.add_pagedrage').remove();
            }
            
        }
       },'.add_pagedrage .pageIc');
       //点击屏幕
       rect.on({
           click:function(){
             rect.find('.pageCreatNum p').removeClass('activer');
             $(this).parent('p').addClass('activer');
             var idpage=$(this).parent().attr('data-id');
             var image=$(this).parent().attr('data-image');
             var inum=parseInt($(this).parent().attr('data-tid'));
             rect.find('.Li_draggable').removeClass('activer');
             if(image !==''){
               if(inum == 1){
                  m.Oneclick(rect,image);
                }else if(inum == 2){
                  m.Twoclick(rect,image);
                }else if(inum == 3){
                  m.Threeclick(rect,image);
                } 
             }else{
              rect.find('.compText').html('');
             }
           }
       },'.pageCreatNum .pageIc');
       //删除屏幕
       rect.on({
          click:function(){
            var dataid=$(this).parent('p').attr('data-id');
            if(dataid == ''){
                j.showmsg('背景还没添加哦！')
            }else{
                rect.find('.compText').html('');
                $(this).parent('p').attr('data-id','');
                $(this).parent('p').attr('data-image','');
                rect.find('.pageCreatNum p').each(function(index){
                    arry[index]=$(this).attr('data-id');
                });
               $('#templateid').val(arry);
            }
          }
       },'.trash_Icon');
       /*$('#form-article-add').submit(function(){
        alert('rr');
        return false
       })*/
    },
    m.Oneclick=function(self,img){
      var title=$('#title').val();
      var html='<div class="compRizeOne">'+
                          '<img src="'+img+'">'+
                          '<div class="comOne">'+
                               '<p class="logo"><img src="'+config.fans_logo+'"></p>'+
                               '<p class="ruit-name">'+config.fans_name+'</p>'+
                               '<p class="ruit-title">'+
                                  '<img src="/static/images/wap/titleBG_rec.png">'+
                                  '<span>'+title+'</span>'+
                               '</p>'+
                               '<p class="ruit-join">加入</p>'+
                          '</div>'+
                     '</div>';
      self.find('.compText').html(html);
    },
    m.Twoclick=function(self,img){
      var ar=[];
      $('.malCod').each(function(e){
          if($(this).is(':checked')){
            ar.push($(this).parent().next().text());
          }  
      });
      var html='<div class="compRizeTwo">';
              html+='<img src="'+img+'">';
              html+='<div class="Twotable">';
                   html+='<p class="tow-name">欢迎加入<br />'+config.fans_name+'</p>';
                   html+='<div class="comTwo">';
                        for(var i=0; i < ar.length; i++){
                          html+='<p class="Twoinput"><label>'+ar[i]+'</label><input type="text" name="name" value=""></p>';
                        }
                   html+='</div>';
              html+='</div>';
              html+='<p class="two-submit">提交</p>';
          html+='</div>';
      self.find('.compText').html(html);
    },
    m.Threeclick=function(self,img){
      var html='<div class="compRizeThree">'+
                          '<img src="'+img+'">'+
                          '<div class="comThree">'+
                               '<p class="ster">恭喜您申请成功！</p>'+
                               '<p class="follow">关注“'+config.fans_name+'”服务号第一时间接收球迷会通知</p>'+
                               '<p class="code"><img src="/static/images/app_code.png"></p>'+
                          '</div>'+
                     '</div>';
      self.find('.compText').html(html);
    },
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
   module.exports = m;
});

