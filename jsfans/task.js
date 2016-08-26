define("test/task", ["jquery", "poshytip","common","datePicker"],function(require, exports, module) {
    "user strict";
    var $ = require("jquery");var t=require("common");
    var a={};
    a.tooltip=require("poshytip"),
    a.Datepick=require("datePicker"),
    a.init=function(){
        var task=$('#taskList');
        task.on({
            click:function(e){
                //alert('bb');
                var li=$(this).closest('li');
                var ul=li.children('ul');
                if(ul.length > 0){
                    var e=li.children('.singleTreeTask');
                    e.find('.TaskAdd').removeClass('on').addClass('off').end();
                    ul.slideDown();
                }else{}
                //e.stopPropagation();
            }
        },'.TaskAdd.on');
        task.on({
            click:function(e){
                var li=$(this).closest('li');
                var ul=li.children('.singleTreeTask');
                ul.find('.TaskAdd').removeClass('off').addClass('on');
                li.children('ul').slideUp(function(){
                    if(li.children('ul').find('li').is('.addSubTask')){
                    li.children('ul').find('li.addSubTask').remove();
                }
                });
                
            }
        },'.TaskAdd.off');
        //删除大任务状态
        task.on({
            click:function(){
                var _self=$(this).closest('li');
                var id=parseInt($(this).attr('data-taskid'));
                $.ajax({
                    type:'GET',
                    url:homeUrl+'admin/task/delete',
                    data:{taskid:id},
                    dataType:'json',
                    success:function(data){
                     // alert(data.message);
                     if(data.code == 200){
                        if(_self.parent('.singleSubTask').find('li').length <= 1){
                            _self.parent('.singleSubTask').prev().find('.TaskAdd').removeClass('off');
                            _self.parents('.singleSubTask').remove();
                            
                        }
                        _self.remove();
                        t.showmsg('删除任务成功');
                        
                     }      
                    },
                    error:function(){
                        alert('数据有问题');
                    }
                });
            }
        },'.task_signalDetele');
        //编辑大任务状态
        task.on({
            keyup:function(d){
                var self=$(this);
                var id=parseInt(self.attr('titleid'));
                var title=self.val();
                if(d.keyCode==13){
                    $.ajax({
                        type:'GET',
                        url:homeUrl+'admin/task/edit',
                        data:{taskid:id,title:title},
                        dataType:'json',
                        success:function(data){
                            t.showmsg('修改成功','',1000);
                        },
                        error:function(){
                            alert('数据有问题');
                        }
                    });
                }
            }
        },'.subTaskName');
        //大任务keyup成功状态
        task.on({
            keyup:function(b){
                var self=$(this);
                if(b.keyCode==13){
                    $.ajax({
                        type:'POST',
                        url:homeUrl+'admin/task/addnew',
                        data:{parentid:0,title:self.val()},
                        dataType:'json',
                        success:function(data){
                            self.val('');
                            var hml='<li class="">';
                                hml+='<div class="singleTreeTask" style="padding-left:0px;">';
                                hml+='<span class="TaskAdd"></span>';
                                hml+='<span class="defaultListColorTask whiteTask"></span>';
                                hml+='<span class="treeMark">';
                                hml+='<span class="markTask" data-id="'+data.data.taskid+'" data-val="1" title="标记完成"></span>';
                                hml+='</span>';
                                hml+='<div class="taskListName">';
                                hml+='<input class="subTaskName" titleid="'+data.data.taskid+'" data-title="'+data.data.name+'" maxlength="256" value="'+data.data.name+'">';
                                           hml+='</div>';
                                hml+='<div class="operation">';
                                hml+='<span class="taskListDate"  name="starttimefrom_'+data.data.taskid+'" id="starttimefrom_'+data.data.taskid+'" data-id="'+data.data.taskid+'"><span data-date="null" class="deteLine">设置到期时间</span></span>';
                                                hml+='<i class="icon-task-signal" data-parentid="'+data.data.taskid+'" tip="子任务">子任务</i>';
                                                hml+='<span class="task_signalDetele" data-taskid="'+data.data.taskid+'" title="删除"></span>'
                                           hml+='</div>';
                                     hml+='</div>';
                                 hml+='</li>';
                             if($('#taskList ul').is('.singleTask')){
                                $('#taskList ul').prepend(hml);
                                self.parents('.createNewTask').remove();
                             }
                            //alert('成功了');
                        },
                        error:function(){
                            alert('数据有问题');
                        }
                    });
                }
            }
        },'.txtSingleName');
        //大任务点击按钮
        $('#diskMain').on({
            click:a.createTaskBig
        },'.add_taskad');
        //小任务增加Start
        //<?=HOME_URL?>admin/task/addnew?parentid=<?=$value['taskid']?>&title=XXX
        task.on({
            click:function(){
                var t=$(this),parentid=t.attr('data-parentid'),ul=t.closest('li').children('ul');
                if(ul.length > 0){
                    if(ul.is(":hidden")){
                        ul.prev().find('.TaskAdd').removeClass('on').addClass('off').end();
                        ul.slideDown();
                    }
                    a.createTasksmall(t,parentid); 
                }else{
                    t.closest('li').append('<ul class="singleSubTask"></ul>');
                    a.createTasksmall(t,parentid);
                } 

            }
        },'.icon-task-signal');
        task.on({
            keyup:function(b){
                var self=$(this);var parentid=parseInt(self.attr('data-id'));
                if(b.keyCode == 13){
                    $.ajax({
                        type:'POST',
                        url:homeUrl+'admin/task/addnew',
                        data:{parentid:parentid,title:self.val()},
                        dataType:'json',
                        success:function(e){
                            self.val();
                            var hl='';
                                hl+='<li class="tLine">';
                                         hl+='<div class="tliLine" style="left:20px;"></div>';
                                         hl+='<div class="singleTreeTask">';
                                              hl+='<span class="subJoinLine"></span>';
                                              hl+='<span class="InlineBlockTop subNoneNode"></span>';
                                              hl+='<span class="nodeCircleSmall circle "></span>';
                                              hl+='<span class="defaultListColorTask whiteTask"></span>';
                                              hl+='<span class="treeMark"><span class="markTask" title="标记完成"></span></span>';
                                              hl+='<div class="taskListName">';
                                                   hl+='<input class="subTaskName" maxlength="256" value="'+e.data.name+'">';
                                              hl+='</div>';
                                              hl+='<div class="operation">';
                                                   hl+='<span class="taskListDate" name="starttimefrom_'+e.data.taskid+'" id="starttimefrom_'+e.data.taskid+'" data-id="'+e.data.taskid+'"><span data-date="null" class="deteLine">设置到期时间</span></span>';
                                                   hl+='<i class="task_None" tip="子任务"></i>';
                                                   hl+='<span class="task_signalDetele" data-id="" title="删除"></span>';
                                              hl+='</div>';
                                         hl+='</div>';
                                     hl+='</li>';
                            self.closest('.addSubTask').parent('.singleSubTask').prepend(hl);
                            self.parents('.singleSubTask').prev().find('.TaskAdd').addClass('off');
                            self.parents('.addSubTask').remove();
                            t.showmsg('添加子任务成功','',1500);
                        },
                        error:function(){
                            t.showmsg('数据有问题','',1000);
                        }
                    });
                }
            }
        },'.addsubTaskName');
        //修改完成与未完成状态
        task.on({
            click:function(e){
                var self=$(this),val=parseInt(self.attr('data-val')),id=parseInt(self.attr('data-id'));
                $.ajax({
                    type:'GET',
                    url:homeUrl+'admin/task/change_status',
                    data:{taskid:id,status:val},
                    dataType:'json',
                    success:function(data){
                        var titles;
                        if(self.hasClass('completeHook')){
                            self.removeClass('completeHook');
                            self.parent().next('.taskListName').find('.subTaskName').removeClass('over_ellipsis');                                                                                            
                            titles='标记完成';
                            self.attr('data-val',1);
                        }else{
                            self.addClass('completeHook');
                            self.parent().next('.taskListName').find('.subTaskName').addClass('over_ellipsis');
                            titles='标记为未完成';
                            self.attr('data-val',0);
                        }
                        self.poshytip({
                            content:titles,
                            className: 'tip-twitter',
                            showTimeout: 1,
                            alignTo: 'target',
                            alignX: 'center',
                            alignY: 'bottom',
                            offsetY: 5,
                            allowTipHover: false,
                            fade: false,
                            slide: false
                        });
                    },
                    error:function(){
                        alert('数据有问题');
                    }
                })
                return false;
               }
        },'.markTask');
        //日期设置
        //http://fans-home.chenhua.cc/admin/task/set_expiration?taskid=180&expiration=2016-08-26  //大任务日期
        task.on({
            click:function(){
                var idr=$(this).attr('id'),selfts=$(this),idval=parseInt($(this).attr('data-id'));
                WdatePicker({
                    dateFmt:'yyyy-MM-dd',
                    //maxDate:'#F{$dp.$D(\''+idr+'\')||\'%y-%M-%d\'}',
                    onpicked:function(dp){
                        $.ajax({
                            type:'GET',
                            url:homeUrl+'admin/task/set_expiration',
                            data:{taskid:idval,expiration:dp.cal.getDateStr()},
                            dataType:'json',
                            success:function(data){
                                if(data.code == 200){
                                    t.showmess(data.message,'',1000);
                                }else{
                                    t.showmess(data.message,'',1000);
                                }
                            },
                            error:function(){
                                alert('数据有问题');
                            }
                        });
                        //selfts.attr('data-line',dp.cal.getDateStr());
                    }
                })
            }
        },'.taskListDate');
        //tip设置
        $('#taskList .markTask').poshytip({
            className: 'tip-twitter',
            showTimeout: 1,
            alignTo: 'target',
            alignX: 'center',
            alignY: 'bottom',
            offsetY: 5,
            allowTipHover: false,
            fade: false,
            slide: false
        });
        
      // task.on({
      //  click:a.createTaskHandler
       //},'.icon-task-signal');
    },
    a.createTaskBig=function(e){  //大任务添加框
        var html='';
        html+='<div class="createNewTask">';
                    html+='<div class="createNewSingle ThemeBGColor5">';
                         html+='<span class="markTask"></span>';
                         html+='<input type="text" class="txtSingleName" maxlength="256" placeholder="输入名称后按回车创建">';
                    html+='</div>';
               html+='</div>';
        if(!($('#taskList .txtSingleName').length > 0)){
            $('#taskList>div').prepend(html);
        } 
       return false;
    },
    a.createTasksmall=function(e,parentid){
        var whtml='';
        whtml='<li class="addSubTask">';
                   whtml+='<div class="tliLine" style="left:20px;"></div>';
                        whtml+='<div class="singleTreeTask">';
                             whtml+='<span class="subJoinLine"></span>';
                             whtml+='<span class="InlineBlockTop subNoneNode"></span>';
                             whtml+='<span class="nodeCircleSmall circle "></span>';
                             whtml+='<span class="defaultListColorTask whiteTask"></span>';
                             whtml+='<span class="treeMark"><span class="markTask" title="标记完成"></span></span>';
                             whtml+='<div class="taskListName">';
                                  whtml+='<input class="addsubTaskName" data-id="'+parentid+'" maxlength="256" placeholder="输入名称后按回车创建">';
                             whtml+='</div>';
                             whtml+='<div class="operation">';
                                  whtml+='<span class="taskListDate" name="starttimefrom_'+parentid+'" id="starttimefrom_'+parentid+'"><span data-date="null" class="deteLine">设置到期时间</span></span>';
                                  whtml+='<i class="task_None" tip="子任务"></i>';
                                  whtml+='<span class="task_signalDetele" title="删除"></span>';
                             whtml+='</div>';
                        whtml+='</div>';
               whtml+='</li>';
        if(!($('#taskList .addsubTaskName').length > 0)){
            e.closest('li').children('.singleSubTask').prepend(whtml);
        }
        return false;
    }
    module.exports = a;
});

