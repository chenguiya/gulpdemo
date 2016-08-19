define("test/message", ["jquery", "emotion","common"],function(require, exports, module) {
    "user strict";
    var $ = require("jquery");var j=require("common");
    var a={};
    a.emotion=require("emotion"),
    a.init=function(){
        var mess=$('#actMessage');
        mess.on({
            click:function(e){
                var t=$(this),ul=t.closest('li').children('.actSublist');
                var tid=t.attr('data-tid');
                var pid=t.attr('data-pid');
                var html='<div class="comment_form">';
                    html+='<textarea class="inputText" id="saytext_'+pid+'" name="saytext"></textarea>';
                    html+='<p><input type="button" class="faces_btn" value="提交"><span class="icon-emotion"> 可输入140字</span></p>';
                    html+='</div>';
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
                                            var whtm='<li>';
                                                whtm+='<span class="actreply"><em>'+data.data.author+'的回复：</em>'+data.data.message+'</span>';
                                                whtm+='<span class="actime art">'+data.data.publishdate+'</span>';
                                                whtm+='<span class="actoperation"><a href="javascript:;" data-pid="'+data.data.pid+'" class="deletePid">删除</a></span>';
                                                whtm+='</li>';
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
                    t.closest('li').append('<div class="actSublist"><ul></ul></div>');
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
                                            var whtm='<li>';
                                                whtm+='<span class="actreply"><em>'+data.data.author+'的回复：</em>'+data.data.message+'</span>';
                                                whtm+='<span class="actime art">'+data.data.publishdate+'</span>';
                                                whtm+='<span class="actoperation"><a href="javascript:;">删除</a></span>';
                                                whtm+='</li>';
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
        //分页
        var messlist=$('#messageLists');
        //下一页点击
        messlist.on({
            click:function(){
                var url=window.location.href;
                var _self=$(this);
                var page=parseInt($(this).prev('.page_num').find('.first').text())+1;
                var maxpage=parseInt($(this).prev('.page_num').find('.last').text());
                a.ajaxsubmit(_self,url,page,maxpage,'next'); 
            }
        },'#page_nextbtn');
        //上一页点击
        messlist.on({
            click:function(){
                var url=window.location.href;
                var _self=$(this);
                var page=parseInt($(this).next('.page_num').find('.first').text())-1;
                var maxpage=parseInt($(this).next('.page_num').find('.last').text());
                a.ajaxsubmit(_self,url,page,maxpage,'prev'); 
            }
        },'#page_prevbtn');
        //跳转点击
        messlist.on({
            click:function(){
                var _self=$(this);
                var prev=_self.parent('.goto_area').prev().find('#page_prevbtn');
                var next=_self.parent('.goto_area').prev().find('#page_nextbtn');
                var input=_self.prev().val();
                var page=parseInt(input);
                var res=/^\d+$/;
                var url=window.location.href;
                var maxpage=parseInt($(this).parent('.goto_area').prev().find('.page_num .last').text());
                if(input == '' || input > maxpage || !res.test(input)){
                    j.showmsg('请输入正确页码');
                }else{
                    a.ajaxsubmit(_self,url,page,maxpage,'pagego'); 
                }
            }
        },'#page_gobtn');
    },
    a.replace_em=function (str){
        str = str.replace(/\</g,'&lt;');
        str = str.replace(/\>/g,'&gt;');
        str = str.replace(/\n/g,'<br/>');
        str = str.replace(/\[em_([0-9]*)\]/g,'<img src="/static/face/$1.gif" border="0" />');
        return str;
    },
    a.ajaxsubmit=function(_self,url,page,maxpage,type){
        $.ajax({
            type:'GET',
            url:url,
            data:{page:page},
            dataType:'html',
            success:function(data){
                var data=$(data).find('#messageLists #actMessage');
                $('#messageLists #actMessage').html(data);
                if(type == 'next'){
                    _self.parent('.page_nav_area').find('#page_prevbtn').show();
                    _self.prev('.page_num').find('.first').text(page);
                    if(maxpage==page){
                        _self.hide(); 
                    }
                }else if(type =='prev'){
                    _self.parent('.page_nav_area').find('#page_nextbtn').show();
                    _self.next('.page_num').find('.first').text(page);
                    if(page==1){
                        _self.hide(); 
                    }
                }else if(type == 'pagego'){
                    _self.parent('.goto_area').prev('.page_nav_area').find('.first').text(page);
                    var prev=_self.parent('.goto_area').prev().find('#page_prevbtn');
                    var next=_self.parent('.goto_area').prev().find('#page_nextbtn');
                    if(maxpage == page){
                        prev.show();
                        next.hide();
                    }else if(page == 1){
                        next.show();
                        prev.hide();
                    }else{
                        prev.show();
                        next.show();
                    }
                }
               
            },
            error:function(){
                j.showmsg('数据有问题','',1000);
            }
        });
    }

    module.exports = a;
});

