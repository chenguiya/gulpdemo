define("test/mobile/analysis_rank",["jquery","common"],function(require, exports, module){
    "user strict";var $ = require("jquery");var j=require('common');
    var a={};
    a.init=function(){
        var tab=$('#analysis_tab');
        var cont=$('#analysisTable');
        a.ajaxsubmit(1);
        $('#analysis_tab li').click(function(){
            var _self=$(this);
            if(!$(this).hasClass('active')){
                $('#analysis_tab li').removeClass('active');
                $(this).addClass('active');
                var type=parseInt($(this).attr('data-type'));
                if(!(cont.find('#id_'+type+'').length > 0)){
                    cont.find('table').hide();
                    a.ajaxsubmit(type);
                }else{
                   cont.find('table').hide(); 
                   cont.find('#id_'+type+'').show();
                  
                }
                
            }
        })
     },
     a.ajaxsubmit=function(type){
        var content=$('#analysisTable');
        $.ajax({
            type:'GET',
            url:homeUrl+'misc/exec_search',
            data:{fid:fid,type:type},
            dataType:'json',
            success:function(data){
                if(data.code == 200){
                   var item=eval(data.data.list);
                var html='<table width="100%" border="0" cellspacing="0" cellpadding="0" id="id_'+type+'">';
                    html+='<tr><th style="width:18%;">排名</th><th class="activeL">会员</th><th style="width:18%;text-align:center;">活动</th><th style="width:22%;padding-right:0;text-align:center;">放飞机</th></tr>';
                for(var i=0; i < data.data.list.length; i++){
                    html+='<tr>';
                    if(item[i].rank <4){
                        html+='<td class="c-eb6100">'+item[i].rank+'</td>';
                    }else{
                        html+='<td>'+item[i].rank+'</td>';
                    }
                    html+='<td class="activeL"><img src="'+item[i].avatar+'" alt="'+item[i].username+'">'+item[i].username+'</td>';
                    html+='<td>'+item[i].join_count+'</td>';
                    html+='<td>'+item[i].miss_count+'</td>';
                    html+='</tr>';
                 }
                    html+='</table>';
                    if(content.find('table').length > 0){
                        content.append(html);
                    }
                    else{
                        content.html(html);
                    } 
                }else{
                   content.html('<div style="text-align:center;padding:5% 0;">'+data.message+'</div>') 
                }     
            },
            error:function(){
                j.showmsg('数据有问题','',1000);
            }
        });
     }
    module.exports = a;
    
});

