function cg(e,a){for(var s=1;3>=s;s++)jq("#"+e+"_lb_"+s).removeClass(" active"),jq("#"+e+"_div_"+s).css("display","none"),a==s&&(jq("#"+e+"_lb_"+s).addClass(" active"),jq("#"+e+"_div_"+s).css("display",""))}var listIndex={seven_Nav:jq("#seven_Nav"),seven_table:jq("#seven_table"),req_lock:1,init:function(){var e=this;e.seven_Nav.find("li").on("click",function(){e.goList(jq(this))})},goList:function(e){if(e.hasClass("hover"))return!1;var a=listIndex.seven_Nav.parent().find(".hover"),s=a.attr("data-sevenid"),t=e.addClass("hover").attr("data-sevenid");if(0==jq("#seven_Nav"+t).length&&1==listIndex.req_lock){var i=SITEURL+"forum.php?mod=forumdisplay&fid=1390&ac=forumdisplay_schedule&league_id=1&num_round_id="+t;listIndex.req_lock=0,jq.ajax({type:"GET",url:i,dataType:"json",success:function(i){if(listIndex.req_lock=1,0==i.code){var n=i.match;listIndex.createList(n,t),jq("#seven_table"+s).hide(),jq("#seven_table"+t).show(),a.removeClass("hover"),e.addClass("hover")}},error:function(e,a,s){}})}else jq("#seven_table"+s).hide(),jq("#seven_table"+t).show(),a.removeClass("hover"),e.addClass("hover")},createList:function(e,a){var s=e.length,t='<table border="0" cellpadding="0" cellspacing="0" width="100%" id="seven_table'+a+'" class="com_shooter c_match none">';t+='<colgroup>            <col width="190">            <col width="510">            <col width="auto">            </colgroup>';for(var i=0;s-1>=i;i++){var n=e[i];t+="<tr>",t+='<td>                     <span class="mat_time">'+n.date+'</span>                     <span class="mat_span">'+n.time+"</span>                     </td>",t+='<td class="mat_ma cl">',t+='<div class="mat_left">',t+=""==n.a_logo?'<img src="template/usportstyle/common/images/sche_nopic.png">':'<img src="'+n.a_logo+'">',t+="<span>"+n.a_name+"</span>                     </div>",t+=""==n.a_score?'<div class="mat_cent">VS</div>':'<div class="mat_cent">'+n.a_score+"-"+n.b_score+"</div>",t+='<div class="mat_left">',t+=""==n.b_logo?'<img src="template/usportstyle/common/images/sche_nopic.png">':'<img src="'+n.b_logo+'">',t+="<span>"+n.b_name+"</span>                    </div>",t+="</td>",t+="<td>场地："+n.address+"</td>",t+="</tr>"}t+="</table>",listIndex.seven_table.append(jq(t))}},listfiveIndex={seven_Nav:jq("#five_Nav"),seven_table:jq("#five_table"),req_lock:1,init:function(){var e=this;e.seven_Nav.find("li").on("click",function(){e.goList(jq(this))})},goList:function(e){if(e.hasClass("hover"))return!1;var a=listfiveIndex.seven_Nav.parent().find(".hover"),s=a.attr("data-fiveid"),t=e.addClass("hover").attr("data-fiveid");if(0==jq("#five_Nav"+t).length&&1==listfiveIndex.req_lock){var i=SITEURL+"forum.php?mod=forumdisplay&fid=1390&ac=forumdisplay_schedule&league_id=2&num_round_id="+t;listfiveIndex.req_lock=0,jq.ajax({type:"GET",url:i,dataType:"json",success:function(i){if(listfiveIndex.req_lock=1,0==i.code){var n=i.match;listfiveIndex.createList(n,t),jq("#five_table"+s).hide(),jq("#five_table"+t).show(),a.removeClass("hover"),e.addClass("hover")}},error:function(e,a,s){}})}else jq("#five_table"+s).hide(),jq("#five_table"+t).show(),a.removeClass("hover"),e.addClass("hover")},createList:function(e,a){var s=e.length,t='<table border="0" cellpadding="0" cellspacing="0" width="100%" id="five_table'+a+'" class="com_shooter c_match none">';t+='<colgroup>            <col width="190">            <col width="510">            <col width="auto">            </colgroup>';for(var i=0;s-1>=i;i++){var n=e[i];t+="<tr>",t+='<td>                     <span class="mat_time">'+n.date+'</span>                     <span class="mat_span">'+n.time+"</span>                     </td>",t+='<td class="mat_ma cl">',t+='<div class="mat_left">',t+=""==n.a_logo?'<img src="template/usportstyle/common/images/sche_nopic.png">':'<img src="'+n.a_logo+'">',t+="<span>"+n.a_name+"</span>                     </div>",t+=""==n.a_score?'<div class="mat_cent">VS</div>':'<div class="mat_cent">'+n.a_score+"-"+n.b_score+"</div>",t+='<div class="mat_left">',t+=""==n.b_logo?'<img src="template/usportstyle/common/images/sche_nopic.png">':'<img src="'+n.b_logo+'">',t+="<span>"+n.b_name+"</span>                    </div>",t+="</td>",t+="<td>场地："+n.address+"</td>",t+="</tr>"}t+="</table>",listfiveIndex.seven_table.append(jq(t))}};jQuery.noConflict(),jQuery(function(e){listIndex.init(),listfiveIndex.init()});