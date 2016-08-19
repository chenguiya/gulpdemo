define("test/post_lottery",["jquery","common","layer","js/module/layer/skin/layer.css"],function(require, exports, module){
    "user strict";
    var $=require("jquery");var layer=require('layer');var j=require('common');
    require('js/module/layer/skin/layer.css');
    var m={};
    m.init=function(){
        var uploadm=$('#selectUPload');
        uploadm.on({
            click:function(){
                var uphtm='';
                $.ajax({
                    type:'GET',
                    url:homeUrl+'admin/lottery/template?isajax=1',
                    dataType:'json',
                    success:function(data){
                        var tem=eval(data.data);
                        uphtm+='<ul class="lotterDiv">';
                        for(var w=0; w < data.data.length; w++){
                           uphtm+='<li id="'+tem[w].id+'"><img src="'+tem[w].image+'" width="270" height="155"></li>';
                        }
                        uphtm+='</ul>';
                        m.commonHtml(uphtm,'选择模板','720','500','submitupload');
                    },
                    error:function(){
                        j.showmsg('数据偶问题','',1000);
                    }
                });
            }
        },'.uploadBtn_ch');
        var namelist=$('#activityCenter');
        namelist.on({
            click:function(){
               var html='';
               $.ajax({
                type:'GET',
                url:homeUrl+'admin/activity/lists?isajax=1',
                dataType:'json',
                success:function(data){
                    var item=eval(data.data);
                    html+='<ul class="activiUl">';
                    for(var i=0; i < data.data.length; i++){
                        html+='<li><input type="radio" name="activityname" value="" id="'+item[i].tid+'"> <label for="activtiy_'+item[i].tid+'">'+item[i].title+'</label></li>'
                    }
                    html+='</ul>';
                    m.commonHtml(html,'活动列表','560','','subminttrue');
                },
                error:function(){
                    j.showmsg('数据有问题','',1000);
                }
               });
            }
            
        },'.lottery_Jia');
        namelist.on({
            click:function(){
                $(this).parent('.lotteryJbox').hide();
                $(this).parent('.lotteryJbox').siblings('.lottery_Jia').show();
            }
        },'.coverDetele');
        if($('#click_addlottery').length){
            $('#click_addlottery').click(function(){
                var e=$('.lotteryNumItem .itemLot').length;
                var html='<div class="itemLot cl" id="prize_'+e+'">';
                    html+='<p class="av40">'+(e+1)+'等奖：';
                    html+='<input type="hidden" name="prize['+e+'][level]" value="'+(e+1)+'" />';
                    html+='<input type="text" class="input-text" name="prize['+e+'][num]" placeholder="" value="" /> 人';
                    html+='</p>';
                    html+='</div>';
                $(this).parent().siblings('.lotteryNumItem').append(html);
                e++;
            });
        }

    },
    m.commonHtml=function(html,text,width,height,submit){
        var parent=$('#append_parent');
        if(typeof(width) =='undefined'){
            width=400;
        }
        if(typeof(height) == 'undefined'){
            height=400;
        }
        var de='<div id="overpop"><style>html{overflow:hidden}</style><div id="maskover" style="display:block"></div>';
            de+='<div class="layer_shadeCon" style="width:'+width+'px; height:'+height+'px; margin-left:-'+(width/2)+'px;">';
            de+='<div class="maskhd">'+text+'<a href="javascript:;" class="icon-close"></a></div>';
            de+='<div class="layerContent">'+html+'</div>';
            de+='<div class="layer_submit"><a href="javascript:;" class="'+submit+'">确定</a></div>';
            de+='</div></div>';
        parent.append(de);
        if(parent.find('.icon-close').length > 0){
            parent.find('.icon-close').click(function(){
                $(this).parents('#overpop').remove();
            });
        }
        var idva='',idname;
        parent.find('.activiUl li input').click(function(){
            if($(this).is(':checked')){
                idva=$(this).attr('id');
                idname=$(this).siblings('label').text();
            }
        });
        parent.find('.subminttrue').click(function(){
            var child=$(this).parents('#overpop').find('.layerContent li input');
                if(child.is(':checked')){
                    $('#activityCenter input#lottaid').val(idva);
                    $('#activityCenter span.input-text').attr('id',idva);
                    $('#activityCenter span.input-text').text(idname);
                    $('#activityCenter .lotteryJbox').show();
                    $('#activityCenter .lottery_Jia').hide();
                    $(this).parents('#overpop').remove();
                }else{
                    j.showmsg('请选择活动名称','',1000);
                }      
        });
        var guehover,gueimg;
        parent.find('.lotterDiv li').click(function(){
            parent.find('.lotterDiv li').removeClass('hover');
            $(this).addClass('hover');
            guehover=$(this).attr('id');
            gueimg=$(this).find('img').attr('src');
        });
        parent.find('.submitupload').click(function(){
            if(typeof(guehover) !=='undefined'){
                var uh='<div class="coverPop" id="coverDetle"><img src="'+gueimg+'"><a href="javascript:void(0)" class="coverDetele icon-cw" id="coverDetele" onclick="shell.hideK()"></a></div>'
                $('#templateid').val(guehover);
                $(this).parents('#overpop').remove();
                $('#selectUPload .btn_upload').hide();
                $('#selectUPload #previewid').append(uh);
            }else{
                j.showmsg('请选择模板','',1000);
            }
        })
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

