define("js/ci_europe",["jquery"],function(a){
    "user strict";var $=a("jquery");
  if($('#eurpeTabnle').length){
    var i,iIndex,contentFob='';
    $.ajax({
      type:'GET',
      url:cid_url+'/api/eurocup/standings',
      dataType:'json',
      success:function(data){
        var arr=data.data;
        for(i=0; i < data.data.length;i++){
          contentFob +='<table border="0" cellpadding="0" cellspacing="0" width="100%">';
          contentFob +='<tr>\
        <th class="onve">'+arr[i].group_type+'</th>\
        <th>赛</th>\
        <th>胜/平/负</th>\
        <th>得/失</th>\
        <th>净胜</th>\
        <th width="8%">分</th>\
      </tr>';
          for(iIndex=0; iIndex < data.data[i].team_data.length; iIndex++){
            contentFob +='<tr>\
            <td class="onve"><em>'+arr[i].team_data[iIndex].rangking+'</em><img src="'+arr[i].team_data[iIndex].team_logo+'" alt="'+arr[i].team_data[iIndex].team_name+'">'+arr[i].team_data[iIndex].team_name+'</td>\
            <td>'+arr[i].team_data[iIndex].total+'</td>\
            <td>'+arr[i].team_data[iIndex].success+'/'+arr[i].team_data[iIndex].draw+'/'+arr[i].team_data[iIndex].lose+'</td>\
            <td>'+arr[i].team_data[iIndex].goal+'/'+arr[i].team_data[iIndex].fumble+'</td>\
            <td>'+arr[i].team_data[iIndex].net+'</td>\
            <td>'+arr[i].team_data[iIndex].points+'</td>\
      </tr>';
          }
          contentFob +='</table>';
        }
        $('#eurpeTabnle').html(contentFob);
      },
      error:function(){
        console.log('数据有误');
      }
    }); 
  }
  if($('#shooterTable').length){
    var m,html='';
    $.ajax({
      type:'GET',
      url:cid_url+'/api/eurocup/dqd_get_shooter',
      dataType:'json',
      success:function(data){
        html +='<table border="0" cellpadding="0" cellspacing="0" width="100%">';
        html +='<tr><th width="10%" class="onve">排名</th><th width="20%">球员</th><th width="12%" class="onve">进球数</th><th width="25%">球队</th> </tr>';
        for(m=0; m < data.data.length; m++){
          html +='<tr>';
          html +='<td class="onve">'+data.data[m].rangking+'</td>';
          html +='<td>'+data.data[m].player_name+'</td>';
          html +='<td class="onve">'+data.data[m].goals+'</td>';
          html +='<td>'+data.data[m].team+'</td>';
          html +='</tr>';
        }
        html +='</table>';
        $('#shooterTable').html(html);
      },
      error:function(){
        console.log('数据有误');
      }
    });
  }
  if($('#assistTable').length){
    var m,html='';
    $.ajax({
      type:'GET',
      url:cid_url+'/api/eurocup/dqd_get_assist',
      dataType:'json',
      success:function(data){
        html +='<table border="0" cellpadding="0" cellspacing="0" width="100%">';
        html +='<tr><th width="12%" class="onve">排名</th><th width="20%">球员</th><th width="20%" class="onve">助攻数</th><th width="25%">球队</th> </tr>';
        for(m=0; m < data.data.length; m++){
          html +='<tr>';
          html +='<td class="onve">'+data.data[m].rangking+'</td>';
          html +='<td>'+data.data[m].player_name+'</td>';
          html +='<td class="onve">'+data.data[m].assists+'</td>';
          html +='<td>'+data.data[m].team+'</td>';
          html +='</tr>';
        }
        html +='</table>';
        $('#assistTable').html(html);
      },
      error:function(){
        console.log('数据有误');
      }
    });
  }
});

