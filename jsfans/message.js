define("js/message", ["jquery", "js/module/emotion/emotion","common"],function(require, exports, module) {
    "user strict";
    var $ = require("jquery");var j=require("common");
    var a={};
    a.emotion=require("js/module/emotion/emotion"),
    a.init=function(){
        var mess=$('#actMessage');
        mess.on({
            click:function(e){
                var t=$(this),ul=t.closest('li').children('.actSublist');
                var tid=t.attr('data-tid');
                var pid=t.attr('data-pid');
                var html='<div class="comment_form">\
                          <textarea class="inputText" id="saytext_'+pid+'" name="saytext"></textarea>\
                          <p><input type="button" class="faces_btn" value="提交"><span class="icon-emotion"> 可输入140字</span></p>\
                          </div>';
                if(ul.length > 0){
                    if(ul.is(':hidden')){
                        ul.prepend(html);
                        ul.slideDown(function(){
                            mess.find('.icon-emotion').qqFace({
                                 id : 'facebox', //表情盒子的ID
                                 assign:'saytext_'+pid, //给那个控件赋值
                                 path:homeUrl+'static/face/'    //表情存放的路径
                            });
                            mess.find(".faces_btn").click(function(){
                                var str = $("#saytext_"+pid).val();
                                if(str == ''){
                                    j.showmsg('留言不能为空');
                                }else{
                                    $.ajax({
                                        type:'POST',
                                        url:homeUrl+'admin/post',
                                        data:{action:'reply',tid:tid,parentid:pid,postsubmit:1,message:str},
                                        dataType:'json',
                                        success:function(data){
                                            var whtm='<li>\
                                                <span class="actreply"><em>'+data.data.author+'的回复：</em>'+data.data.message+'</span>\
                                                <span class="actime art">'+data.data.publishdate+'</span>\
                                                <span class="actoperation"><a href="javascript:;">删除</a></span>\
                                                </li>';
                                                j.showmsg(data.message,'',1000);
                                                $("#saytext_"+pid).val('');
                                                $("#saytext_"+pid).parent('.comment_form').next().prepend(whtm);
                                        },
                                        error:function(){
                                            j.showmsg('数据有问题','',1000);
                                        }
                                    })
                                }
                            });
                        });
                    }else{
                        ul.slideUp(function(){
                            ul.find('.comment_form').remove();
                        });
                          
                    }  
                }else{
                    t.closest('li').append('<div class="actSublist"></div>');
                    t.closest('li').find('.actSublist').prepend(html);
                    t.closest('li').find('.actSublist').slideDown(function(){
                            mess.find('.icon-emotion').qqFace({
                                 id : 'facebox', //表情盒子的ID
                                 assign:'saytext_'+pid, //给那个控件赋值
                                 path:homeUrl+'static/face/'    //表情存放的路径
                            });
                            mess.find(".faces_btn").click(function(){
                               var str = $("#saytext_"+pid).val();
                                if(str == ''){
                                    j.showmsg('留言不能为空');
                                }else{
                                    $.ajax({
                                        type:'POST',
                                        url:homeUrl+'admin/post',
                                        data:{action:'reply',tid:tid,parentid:pid,postsubmit:1,message:str},
                                        dataType:'json',
                                        success:function(data){
                                            var whtm='<li>\
                                                <span class="actreply"><em>'+data.data.author+'的回复：</em>'+data.data.message+'</span>\
                                                <span class="actime art">'+data.data.publishdate+'</span>\
                                                <span class="actoperation"><a href="javascript:;">删除</a></span>\
                                                </li>';
                                                j.showmsg(data.message,'',1000);
                                                $("#saytext_"+pid).val('');
                                                $("#saytext_"+pid).parent('.comment_form').next().prepend(whtm);
                                        },
                                        error:function(){
                                            j.showmsg('数据有问题','',1000);
                                        }
                                    })
                                }
                            });
                        });
                }
                return false;
            }
        },'.messReply');
        mess.on({
            click:function(e){
                var pid=parseInt($(this).attr('data-pid'));
                var _self=$(this);
            $.ajax({
                type:'GET',
                url:homeUrl+'admin/post',
                data:{action:'delete',pid:pid},
                dataType:'json',
                success:function(data){
                    _self.closest('li').remove();
                    j.showmsg('删除成功','',1000);
                },
                error:function(){
                    j.showmsg('数据有问题','',1000);
                }
            })
            }
            
        },'.deletePid');
    },
    a.replace_em=function (str){
        str = str.replace(/\</g,'&lt;');
        str = str.replace(/\>/g,'&gt;');
        str = str.replace(/\n/g,'<br/>');
        str = str.replace(/\[em_([0-9]*)\]/g,'<img src="/static/face/$1.gif" border="0" />');
        return str;
    }

    module.exports = a;
});

