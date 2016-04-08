define(function(require, exports, module){
 var $=require("jquery");
 $.fn.derbyanswer=function(settings){
 	var defaults={
 		jsons:null,
 		endText:'已经结束',
 		shortURL:null,
 		sendResultsURL:null,
 		resultComment:{
 			ninety:"90%",
 			eighty:"80%",
 			seventy:"70%",
 			sixty:"60%",
 			fifty:"50%",
 			forty:"40%",
 			thirty:"30%",
 			twenty:"20%"
 		}
 	};
 	var config=$.extend(defaults,settings);
 	var isweiXin=navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
 	var superContainer =$(this),
 	inum=0,
 	titleName,
 	answers=[],
 	imgURL=cid_url+'/static/images/derby/derby_logo.jpg',
 	imgCodeurl=cid_url+'/static/images/derby/derby_code.jpg',
 	imgweiXin=cid_url+'/static/images/derby/download_wxl.png',
 	forwadURL=cid_url+'/api/debi',
 	counterFob='<div class="resul_time_cotainer df"><span class="J_counter">60\'</span><span class="tion-number"><em>'+inum+'</em></span></div>',
 	exitFob='<div class="result_container">\
 	              <div class="tion_title">答题结束<span></span><a id="icon_closeid" class="icon-nots" href="javascript:void(0);"></a></div>\
 	              <div class="tion_area">\
 	                   <div class="tion_question">\
 	                        <span class="results_title">答题结束</span>\
 	                        <div class="results_avatar flex_center"><img src="'+config.jsons.avatar+'"></div>\
 	                        <div class="results_ok"></div>\
 	                        <div class="results_btn">\
 	                             <a href="javascript:void(0);" class="results_share_btn">分享</a>\
 	                        </div>\
 	                   </div>\
 	                   <div class="tion_answers flex_center"><img src="'+imgCodeurl+'"></div>\
 	              </div>\
 	         </div>',
 	weiXinFob='<div class="weiXin_pop" id="weiXin_pop"><img src="'+imgweiXin+'"></div>',
 	contentFob='',
 	questionsIteratorIndex,
 	answersIteratorIndex,
 	bnCounter=60,
 	typeid,
 	timeoutTopBn;
 	for(questionsIteratorIndex = 0; questionsIteratorIndex < config.jsons.questions.length; questionsIteratorIndex ++){
 		contentFob +='<div class="tion_container">';
 		contentFob +='<div class="tion_title">第'+(questionsIteratorIndex + 1)+'题<span></span></div>';
 		contentFob +='<div class="tion_area">';
 		contentFob +='<div class="tion_question">'+config.jsons.questions[questionsIteratorIndex].question+'';
 		if(config.jsons.questions[questionsIteratorIndex].attach.length){
 			 contentFob +='<span><img src="'+config.jsons.questions[questionsIteratorIndex].attach+'"></span>';
 		}
 		contentFob +='</div>';
 		contentFob +='<ol type="A" class="tion_answers" data-types="'+config.jsons.questions[questionsIteratorIndex].answer+'">';
 		for(answersIteratorIndex = 0; answersIteratorIndex < config.jsons.questions[questionsIteratorIndex].option.length; answersIteratorIndex++){
 			contentFob +='<li>'+config.jsons.questions[questionsIteratorIndex].option[answersIteratorIndex]+'</li>';
 		}
        contentFob +='</ol></div>';   
        //contentFob +='<div class="tion-number"><em>'+(questionsIteratorIndex +1)+'</em></div>';
        contentFob +='</div>';
        answers.push(config.jsons.questions[questionsIteratorIndex].answer);
 	}
 	superContainer.html(contentFob + exitFob + counterFob + weiXinFob);
 	if(config.jsons.team == 1){
 		document.body.style.background='#e93e47';
 		superContainer.addClass('redStyle');
 		titleName='恒大';

 	}else if(config.jsons.team == 2){
 		document.body.style.background='#2b56a3';
 		superContainer.addClass('blueStyle');
 		titleName='富力';
 	}else if(config.jsons.team ==3){
 		//$('body').css({'background':'url(/static/images/derby/basa_bgs.jpg) repeat-y center top'})
 		//document.body.classLi('addClass');
 		document.body.style.background='#004899';
 		superContainer.addClass('basaStyle');
 		titleName='巴萨';
 	}else if(config.jsons.team ==4){
 		document.body.style.background='#f6c52d';
 		superContainer.addClass('huangmaStyle');
 		titleName='皇马';
 	}
	superContainer.find('.resul_time_cotainer').css({'display':'block'});
	timeoutTopBn = window.setInterval(function(){
            countDown();
            },1000);
	var userAnswers=[],
	    questionLength=config.jsons.questions.length,
	    slideList=superContainer.find('.tion_container');
	function checkAnswers(){
		var resultArr=[],
		    flag=false;
		for(i=0 ; i < answers.length; i++){
			if(answers[i] == userAnswers[i]){
				flag=true;
			}else{
				flag=false;
			}
			resultArr.push(flag);
		}
		return resultArr;
	}
	function roundReloaded(num,dec){
		var result = Math.round(num * Math.pow(10,dec) / Math.pow(10,dec));
		return result;
	}
	function judgeSore(score){
		if(score >=80) return config.resultComment.ninety;
		else if(score >=70) return config.resultComment.eighty;
		else if(score >=60) return config.resultComment.seventy;
		else if(score >=50) return config.resultComment.sixty;
		else if(score >=40) return config.resultComment.fifty;
		else if(score >=30) return config.resultComment.forty;
		else if(score >=20) return config.resultComment.thirty;
		else return config.resultComment.twenty;
	}
	function showOK(){
		var results=checkAnswers(),
		    resultSet='',
		    trueCount=0,
		    shareButton='',
		    score,
		    url;
		for(var i=0; i < results.length; i++){
			if(results[i] === true){
				trueCount ++;
				isCorrect=true;
			}
		}
		$.ajax({
		   type:'GET',
		   url:cid_url+'/api/debi/usermark',
		   data:{team:config.jsons.team,score:trueCount,uid:config.jsons.uid},
		   dataType:'json',
		   success:function(data){
		   	 resultSet +='<span>恭喜'+config.jsons.username+'！您答对'+trueCount+'道题，获得'+trueCount+'分，超过'+judgeSore(trueCount)+'的'+titleName+'球迷！分享出去获得更多的答题机会！^_^</span>';
 	         superContainer.find('.tion_container').fadeOut(100,function(){
 	         	superContainer.find('.result_container').show();
 	         	superContainer.find('.results_ok').html(resultSet);
 	         });
 	        
		   },
		   error:function(){
		   	showmsg('数据有误');
		   }
		});	   
	}
	function countDown(){
		bnCounter -=1;
		if(bnCounter <0){
			window.clearInterval(timeoutTopBn);
			//superContainer.find('.J_counter').text('');
            superContainer.find('.tion_answers').each(function(index){
                $(this).find('li.selected').each(function(j){
                    userAnswers.push($(this).parents('.tion_answers').children('li').index($(this).parents('.tion_answers').find('li.selected')) + 1);
                });
                if(!$(this).find('li').hasClass('selected')){
                    userAnswers.push(5);
                }
		    });
		    //alert(userAnswers);
		    showOK();
		    //superContainer.find('.result_container').show();
		}else{
		   superContainer.find('.J_counter').text(bnCounter+'\'');
		}
	}

    slideList.hide().first().fadeIn(500);
    superContainer.find('li').click(function(){
    	var thisLi=$(this);
    	var types=thisLi.parent().attr('data-types');
    	var indexLi=thisLi.index() + 1;
    	//alert(indexLi);
    	if(indexLi == types){
    		thisLi.parents('.tion_answers').children('li').removeClass('selected');
            thisLi.addClass('selected');
            inum++;
            superContainer.find('.tion-number em').text(inum);
    	}else{
            thisLi.addClass('no_selected');
    	}
        thisLi.parents('.tion_container').fadeOut(500,function(){
             $(this).next().fadeIn(500);
        });
    });
    //分享出去
    superContainer.find('.results_share_btn').click(function(){
    	if(isweiXin){
    		if(config.jsons.team == 3 || config.jsons.team==4){
    			typeid=1;
    		}else{
    			typeid=0;
    		}
    		$.ajax({
	    			type:'GET',
	    			url:cid_url+'/api/debi/weixinshare',
	    			data:{uid:config.jsons.uid,type:'reg_lottery',typeid:typeid},
	    			dataType:'json',
	    			success:function(data){
	    				superContainer.find('#weiXin_pop').fadeIn(200);
	    			},
	    			error:function(){
	    				showmsg('数据有误');
	    			}
	    		});
    	}else{
    	 if(config.jsons.team ==3 || config.jsons.tema==4){
    	 	var shareiurl=cid_url+'/static/images/derby/xibanya_share.jpg';
    	 }else{
    	 	var shareiurl=cid_url+'/static/images/derby/share_20160330.jpg';
    	 }
    	var baseshareurl=shellmodule.Base64Encode(shareiurl);
    	shellmodule.ShareLottery(baseshareurl);
        }
	});
	superContainer.find('#weiXin_pop img').click(function(){
		superContainer.find('#weiXin_pop').fadeOut(200);
	});
	if(config.jsons.team ==3 || config.jsons.team ==4){
		superContainer.find('#icon_closeid').click(function(){
		if(isweiXin){
			window.location.href='http://wx.5usport.com/index.php/Access?oid=&fid=1&type=&stype=10001&backurl=http%3A%2F%2Fcid.5usport.com%2Fapi%2Fdebi%2Findex%3Fderbyid%3D2';
		}else{
			window.location.href=cid_url+'/api/debi/index?derbyid=2';
		}
	   });
	}else{
	superContainer.find('#icon_closeid').click(function(){
		if(isweiXin){
			window.location.href='http://wx.5usport.com/index.php/Access?oid=&fid=1&type=&stype=10001&backurl=http%3A%2F%2Fcid.5usport.com%2Fapi%2Fdebi%2Findex';
		}else{
			window.location.href=cid_url+'/api/debi';
		}
	 })
     }
	};
});