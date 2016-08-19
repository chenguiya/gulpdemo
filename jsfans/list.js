define("test/list",["jquery","common","layer","js/module/layer/skin/layer.css"],function(require, exports, module){
    "user strict";var $=require("jquery");var layer=require('layer');var mon=require("common");
    var a={};
    require('js/module/layer/skin/layer.css');
    a.notice=function(){
        var notice=$('#noticeList');
        //公告列表删除<?=HOME_URL?>admin/thread/logic_del?tid=<?=$value['tid']?>
        notice.on({
            click:function(){
                var tid=$(this).attr('data-tid'),_self=$(this);
                $.ajax({
                    type:'GET',
                    url:homeUrl+'admin/thread/logic_del',
                    data:{tid:tid},
                    dataType:'json',
                    success:function(data){
                        if(data.code === 200){
                            mon.showmess('删除成功！','',1000);
                            _self.parents('tr').remove();
                        }else{
                            mon.showmess(data.message,'',1000);
                        }
                    },
                    error:function(){
                        mon.showmess('数据有问题','',1000)
                    }
                })
            }
        },'.deteleL');
        notice.on({
            click:function(){
                var _self=$(this);
                var arr=$(this).attr('data-click').split(",");
                a.layer_show(arr[0],arr[1],arr[2],arr[3]);
            }
        },'.shareNoticeA');
        
    },
    a.recruit=function(){
        var ruit=$('#recruitLists');
        ruit.on({
            click:function(){
                var _self=$(this);
                var arr=$(this).attr('data-click').split(",");
                a.layer_show(arr[0],arr[1],arr[2],arr[3]);
            }
        },'.ruitshareA');
    },
    a.activity=function(){
        var act=$('#activyLists');
        act.on({
            click:function(){
                var _self=$(this);
                var arr=$(this).attr('data-click').split(",");
                a.layer_show(arr[0],arr[1],arr[2],arr[3]);
            }
        },'.activyshareA');
        //下一页点击
        /*act.on({
            click:function(){
                var url=window.location.href;
                var _self=$(this);
                var page=parseInt($(this).prev('.page_num').find('.first').text());
                var maxpage=parseInt($(this).prev('.page_num').find('.last').text());
                if(page < maxpage){
                    $.ajax({
                    type:'GET',
                    url:url,
                    data:{page:page+1},
                    dataType:'html',
                    success:function(data){
                        var data=$(data).find('#activyLists .actListTable');
                        $('#activyLists .actListTable').html(data);
                        _self.parent('.page_nav_area').find('#page_prevbtn').show();
                        
                    },
                    error:function(){
                        mon.showmsg('数据有问题','',1000);
                    }
                 });
                    $(this).prev('.page_num').find('.first').text(page+1);
                    if(maxpage===page+1){
                        _self.hide(); 
                    }
                }else{
                    _self.hide();
                }
                return false;  
            }
        },'#page_nextbtn');
        //上一页点击
        act.on({
            click:function(){
                var url=window.location.href;
                var _self=$(this);
                var page=parseInt($(this).next('.page_num').find('.first').text());
                var maxpage=parseInt($(this).next('.page_num').find('.last').text());
                if(page > 1){
                    $.ajax({
                    type:'GET',
                    url:url,
                    data:{page:page-1},
                    dataType:'html',
                    success:function(data){
                        var data=$(data).find('#activyLists .actListTable');
                        $('#activyLists .actListTable').html(data);
                        _self.parent('.page_nav_area').find('#page_nextbtn').show();
                        
                    },
                    error:function(){
                        mon.showmsg('数据有问题','',1000);
                    }
                 });
                    $(this).next('.page_num').find('.first').text(page-1);
                    if(page-1===1){
                        _self.hide(); 
                    }
                }
                return false;
            }
        },'#page_prevbtn');
        //跳转点击
        act.on({
            click:function(){
                var _self=$(this);
                var prev=_self.parent('.goto_area').prev().find('#page_prevbtn');
                var next=_self.parent('.goto_area').prev().find('#page_nextbtn');
                var input=_self.prev().val();
                var res=/^\d+$/;
                var url=window.location.href;
                var maxpage=parseInt($(this).parent('.goto_area').prev().find('.page_num .last').text());
                if(input == '' || input > maxpage || !res.test(input)){
                    mon.showmsg('请输入正确页码');
                }else{
                    $.ajax({
                        type:'GET',
                        url:url,
                        data:{page:parseInt(input)},
                        dataType:'html',
                        success:function(data){
                            var data=$(data).find('#activyLists .actListTable');
                            $('#activyLists .actListTable').html(data);
                            _self.parent('.goto_area').prev().find('.first').text();
                        },
                        error:function(){
                            mon.showmsg('数据有问题','',1000)
                        }
                    });
                    $(this).parent('.goto_area').prev('.page_nav_area').find('.first').text(parseInt(input));
                    if(maxpage == parseInt(input)){
                        prev.show();
                        next.hide();
                    }else if(parseInt(input) == 1){
                        next.show();
                        prev.hide();
                    }else{
                        prev.show();
                        next.show();
                    }
                }
            }
        },'#page_gobtn')*/
    },
    a.temp=function(){
        var temp=$('.recruitTEM');
        temp.on({
            click:function(){
                var img=$(this).parent('.add_delete').prev().find('img').attr('src');
                a.tempClick(img);

            }
        },'.Lpreview');
    },
    a.tempClick=function(img){
        var parent=$('#append_parent');
        var html='<div class="templateCom"><img src="'+img+'"><span class="deteleIcon"><i class="icon-cuo"></i></span></div>';
        parent.append(html);
        parent.find('.deteleIcon').click(function(){
            $(this).parent('.templateCom').remove();
        })
    },
    a.layer_show=function(title,url,w,h){
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
    module.exports = a;

});

