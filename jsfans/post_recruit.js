define("test/post_recruit",["jquery","common"],function(require, exports, module){
    "user strict";
    var $=require("jquery");var layer=require('layer');var j=require('common');
    var m={};
    m.init=function(){
        var arry=[];var i=0;
       var rect=$('.createScope');
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
    }
   module.exports = m;
});

