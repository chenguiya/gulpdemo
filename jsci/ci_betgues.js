define("js/ci_betgues",["jquery","echart"],function(a){
    "user strict";var $=a("jquery");var e=a("echart");
    var minHeightY=document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    if($('#singIndexMod').length){
      $('#singIndexMod').height(minHeightY);
      var myChart = echarts.init(document.getElementById('main')); 
      var option = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable : false,
        color:[
           dataJson.colorO,
           dataJson.colorT
        ],
        series : [
          {
            name:'访问来源',
            type:'pie',
            radius : ['30%', '60%'],
            center: ['48%', '50%'],
            startAngle: 320,
            data:[
                {
                    value:dataJson.keValue,
                    name:dataJson.keName,
                    itemStyle : {
                        normal : {
                            labelLine : {
                                length : 5
                            }
                        }
                    }
                },
                {
                    value:dataJson.zhuValue, 
                    name:dataJson.zhuName,
                    itemStyle : {
                        normal : {
                            labelLine : {
                                length : 5
                            }
                        }
                    }
                }
            ]
          }
        ]
    };
    // 为echarts对象加载数据 
    myChart.setOption(option); 
    }
    //竞猜中心加载
    if(document.getElementById('Cetloading')){
        var currpage=2,flag=true,loading=false;
        var pagesize=parseInt($('#Cetloading').attr('pagesize'));
        var totalpage=parseInt($('#Cetloading').attr('totalpage'));
        $(window).scroll(function(){
            if($(document).height()-$(this).scrollTop()-$(this).height() < 200){
                if(document.getElementById('Cetloading')){
                    flag=true;
                    document.getElementById('Cetloading').style.display="block";
                    setTimeout(function(){
                        if(flag){
                            $.ajax({
                                type:'GET',
                                url:cid_url+'/api/guess/guess_center',
                                data:{pagesize:pagesize,currpage:currpage,totalpage:totalpage,token:token},
                                dataType:'html',
                                success:function(data){
                                    $('#guessCenter').append($(data).find('.guess_box'));
                                    currpage++;
                                    if(currpage==totalpage+1){
                                        $('#Cetloading').remove();
                                    }
                                },
                                error:function(){
                                    showmsg('数据获取失败');
                                }
                            });
                        }
                        flag=false;
                    },1000);
                }
            }
        })
    }
    //弹窗
    function showPop(k,message){
     var menuid = 'fwin_' + k;
     var menuObj = document.getElementById(menuid);
     menuObj = document.createElement('div');
     menuObj.id = menuid;
     menuObj.className = 'BetPopupTX';
     document.getElementById('append_parent').appendChild(menuObj);
     evtspan=' onclick="hideWindow(\'' + k + '\')"';
     var s='<div class="TX_container">';
         s+='<div class="tion_title"><a href="javascript:void(0);"' + evtspan + ' class="icon-nots"></a></div>';
         s+='<div class="TX_area">'+message+'</div>';
         s+='</div>';
         s+='</div>';
     menuObj.innerHTML=s;
    }
    function showBetPopup(k,guess,stake){
      var menuid = 'fwin_' + k;
     var menuObj = document.getElementById(menuid);
     menuObj = document.createElement('div');
     menuObj.id = menuid;
     menuObj.className = 'BetPopup';
     document.getElementById('append_parent').appendChild(menuObj);
     evtspan=' onclick="hideWindow(\'' + k + '\')"';
     var s='<div class="tion_container">';
           s+='<div class="tion_title"><span></span><a href="javascript:void(0);"' + evtspan + ' class="icon-nots"></a></div>';
           s+='<div class="tion_area">';
               s+='<div class="tion_statue cl">';
                  s+='<div class="tionLeft">\
                         <p class="Img"><img src="'+dataVal.zhulogo+'" width="100%"></p>\
                         <p class="Name">'+dataVal.zhuname+'</p>';
                         if(guess == 3){
                           s+='<p class="Btn cuphover">主胜 '+dataVal.zhudiscount+'</p>';
                         }else{
                            s+='<p class="Btn">主胜 '+dataVal.zhudiscount+'</p>';
                         }
                    s+='</div>\
                    <div class="tionCenter">\
                         <p class="cName">'+dataVal.leguename+'<span>VS</span></p>\
                         <p class="Time">'+dataVal.datatime+'</p>\
                         <p class="Hand">亚盘<span>'+dataVal.pakou+'</span></p>\
                    </div>\
                    <div class="tionLeft">\
                         <p class="Img"><img src="'+dataVal.kelogo+'" width="100%"></p>\
                         <p class="Name">'+dataVal.kename+'</p>';
                         if(guess == 0){
                            s+='<p class="Btn cuphover">客胜 '+dataVal.kediscount+'</p>';
                         }else{
                            s+='<p class="Btn">客胜 '+dataVal.kediscount+'</p>';
                         }
                         
                    s+='</div>';
               s+='</div>';
               if(guess == 3){
                s+='<div class="tionNext">已投注：<span>主胜  金币'+stake+'</span></div>';
               }else if(guess == 0){
                s+='<div class="tionNext">已投注：<span>客胜  金币'+stake+'</span></div>';
               }
               
           s+='</div>';
           s+='<div class="icon-ok tionOk">成功下注</div>';
         s+='</div>';
     menuObj.innerHTML=s;  
    }
    function doublePop(k){
     var menuid = 'fwin_' + k;
     var menuObj = document.getElementById(menuid);
     menuObj = document.createElement('div');
     menuObj.id = menuid;
     menuObj.className = 'bet-popBox';
     document.getElementById('append_parent').appendChild(menuObj);
     evtspan=' onclick="hideWindow(\'' + k + '\')"';
     var s='<div class="bet-boxMain">';
         s+='<div class="popClosed"><a href="javascript:void(0);"' + evtspan + ' class="icon-nots"></a></div>';
         s+='<div class="bet-ok"><div><i class="icon-result"></i>成功下注</div><a href="http://app.5usport.com/wap.html">开奖结果请下载“5U球迷联盟”APP查看</a></div>';
         s+='</div>';
         s+='</div>';
     menuObj.innerHTML=s;
    }
    //竞猜单场
    if($('#singIndexMod').length){
        
        //减去
        $('.sup').click(function(){
            var stake_val = $("#stake").val();
            var all_gold = parseInt($("#all_gold").text());
           if(stake_val - 10 < 0)
            {
                showPop('single','不能再减了');
            }else{
              $("#stake").val(parseInt(stake_val)-10);
              $("#all_gold").text(all_gold+10);
            }
        });
        //加去
        $('.plus').click(function(){
            var stake_val = $("#stake").val();
            var all_gold = parseInt($("#all_gold").text());
            if(all_gold - 10 < 0)
            {
                showPop('single','金币不足');
            }
            else
            {
                $("#stake").val(parseInt(stake_val)+10);
                $("#all_gold").text(all_gold-10);
            }
        });
        //选择
        $('.sheng').click(function(){
            var this_text = $(this).text();
            var this_guess = $(this).attr('data-val');
            $(".sheng").each(function(){
                var chose_guess = $(this).attr('data-val');
                if(chose_guess == this_guess)
                {
                    guess = chose_guess;
                    $(this).addClass('cuphover');
                }
                else
                {
                    $(this).removeClass('cuphover');
                }
            });
        });
        //下注
        $('.BetThree').click(function(){
            var stake_val = parseInt($("#stake").val());
            if(guess < 0)
            {
               showPop('single','您还没有完成选择');
            }
            else if(stake_val <= 0)
            {
                showPop('single','请下注！');
            }
            else
            {
            var str_param = 'uid='+uid+'&gid='+gid+'&guess='+guess+'&stake='+stake_val;
            $.ajax({
                url: "handle_bet",
                type: "get",
                dataType: "json",
                data: str_param,
                timeout: 10000,
                cache: false,
                beforeSend: function(XMLHttpRequest){},
                success: function(data, textStatus){
                    if(typeof(data.message) != "undefined")
                    {
                        if(data.code == 200 && data.message == '下注成功')
                        {
            
                            showBetPopup('single',guess,stake_val);
                            //showPop('single',data.message);
                        }
                        else
                        {
                           showPop('single',data.message);
                        }
                    }
                },
                complete: function(XMLHttpRequest, textStatus){},
                error: function(){
                    alert("返回异常！");
                }
            });
            }
        });
        
    }
    //组合竞猜
    if($('#guess_double').length){
        //减法
        $('.downsup').click(function(){
            var stake_val=parseInt($('#stake').val());
            var all_gold=parseInt($('#all_gold').text());
            var bet_gold=parseInt($('#bet_gold').text());
            if(bet_gold - tengold <0){
                showPop('double','不能再减了');
            }else{
                $('#stake').val(stake_val-1);
                $('#bet_gold').text((stake_val-1)*tengold);
                $('#all_gold').text(all_gold + tengold);
            }
        });
        //加法
        $('.upplus').click(function(){
            var stake_val=parseInt($('#stake').val());
            var all_gold=parseInt($('#all_gold').text());
            if(all_gold - tengold <0){
                showPop('double','金币不足');
            }else{
                $('#stake').val(stake_val +1);
                $('#all_gold').text(all_gold - tengold);
                $('#bet_gold').text((stake_val +1)* tengold);
            }
        });
        //选择
        $('.sheng').click(function(){
            var this_guess=$(this).attr('data-val');
            $(this).parents('ul').find('.sheng').each(function(){
                var chose_guess=$(this).attr('data-val');
                if(chose_guess == this_guess){
                    $(this).addClass('active');
                }else{
                    $(this).removeClass('active');
                }
            })
        });
        //下注http://cid.chenhua.cc/api/guess/handle_bet?uid=256&gid=1001044&guess=1,0,0&stake=0&_=1463114355820
        $('#betAnte').click(function(){
            var stake_val=parseInt($('#stake').val());
            var arrGuess=new Array();
            var i=0;
            $('.gd-list').find('a.sheng').each(function(){
                if($(this).hasClass('active')){
                    arrGuess[i]=$(this).attr('data-val');
                    i++;
                }
            });
            if(arrGuess.length < matchNum){
                showPop('double','您还没有完成选择');
            }else if(stake_val <= 0){
                showPop('double','请下注哦');
            }else{
                var str_guess=arrGuess.join();
                var str_param = 'uid='+uid+'&gid='+gid+'&guess='+str_guess+'&stake='+stake_val;
                $.ajax({
                url: "handle_bet",
                type: "get",
                dataType: "json",
                data: str_param,
                timeout: 10000,
                cache: false,
                beforeSend: function(XMLHttpRequest){},
                success: function(data, textStatus){
                    if(typeof(data.message) != "undefined")
                    {
                        if(data.code == 200 && data.message == '下注成功')
                        {
                            doublePop('double');
                        }
                        else
                        {
                           showPop('double',data.message);
                        }
                    }
                },
                complete: function(XMLHttpRequest, textStatus){},
                error: function(){
                    showPop('double','返回异常');
                }
            });
            }

        })
    }
    //
    
});

