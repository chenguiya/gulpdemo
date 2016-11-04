var shell={
	hideK:function(){
		if(document.getElementById('coverDetele')){
			document.getElementById('previewid').removeChild(document.getElementById('coverDetle'));
			document.getElementById('uploadID').style.display='inline-block';
		}
	},
	checkForm:function(form){
	    var msg=new Array();
	    var err=false;
	    var ress=/^\d+$/;
	    if(form.elements['title']){
	    	if(form.elements['title'].value==0 || form.elements['title'].value==''){
	    		msg.push('活动名称不能为空');
	    		err=true;
	    	}else if(form.elements['title'].value.length >20){
	    		msg.push('活动名称不能超过20个字');
	    		err=true;
	    	}
	    }
	    if(form.elements['class'] && form.elements['class'].value=='默认类型'){
	    	msg.push('活动类型需选择');
	    	err=true;
	    }
	    if(form.elements['starttimefrom'] && form.elements['starttimefrom'].value == 0){
	    	err=true;
	    	msg.push('活动开始时间不能为空');
	    }
	    if(form.elements['starttimeto'] && form.elements['starttimeto'].value == 0){
	    	err=true;
	    	msg.push('活动结束时间不能为空');
	    }
	    if(form.elements['expiration'] && form.elements['expiration'].value == 0){
	    	err=true;
	    	msg.push('活动截止时间不能为空');
	    }
	    if(form.elements['place'] && form.elements['place'].value == 0){
	    	err=true;
	    	msg.push('活动地址需填写');
	    }
	    if(form.elements['aid'] && form.elements['aid'].value == ''){
	    	err=true;
	    	msg.push('活动封面需上传')
	    }
	    if(form.elements['free-event'] && form.elements['free-event'].value == 1){
	    	if(form.elements['package[0][name]'].value==''){
	    	    err=true;
	    	    msg.push('收费活动设置最少填写一项');
	        }else{
	        	var leng=$('itemHc').length;
	        	for(var i=0; i < leng; i++){
	        		var h=form.elements['package['+i+'][name]'].value;
	        		if(form.elements['package['+i+'][name]'].value !==''){
	        			if(form.elements['package['+i+'][price]'].value !==''){
	        				if(form.elements['package['+i+'][price]'].value ==0){
	        					err=true;
	        					msg.push('这是收费活动哦，【'+h+'】付费套餐金额不要填写0嘛！');
	        				}
	        				if(!ress.test(form.elements['package['+i+'][price]'].value)){
	        					err=true;
	        				    msg.push('亲，【'+h+'】套餐费用必须为整数哦！');
	        				}
	        			}else{
	        				err=true;
	        				msg.push('这是收费活动哦，【'+h+'】付费套餐金额不要留空嘛！');
	        			}
	        		}else{
	        			err=true;
	        			msg.push('亲，收费活动选项【'+(i+1)+'】要填写完善哦！');
	        		}
	        		/*if(!ress.test(form.elements['package['+i+'][price]'].value)){
	        			var h=form.elements['package['+i+'][name]'].value;
	        			if(h!==''){
	        				err=true;
	        				msg.push('亲，'+h+'套餐费用必须为整数哦！');
	        			}	
	        		}else if(form.elements['package['+i+'][price]'].value==0){
	        			var h=form.elements['package['+i+'][name]'].value;
	        			if(h!==''){
	        				err=true;
	        				msg.push('这是收费活动哦，【'+h+'】付费套餐不要填写0元嘛！');
	        			}
	        			
	        		}*/
	        	}
	        }  
	    }
	    var le=$('isCod').length;
	    if(le){
	    	var u=0;
	      for(var i=0; i<le; i++){
	      	if($('isCod')[i].checked==false){
	      		u++;
	      	}
	      }
         if(u==le){
	      		err=true;
	      		msg.push('报名设置最少勾选一项');
	      	}
	    }
	    var ue = UE.getEditor('editor');
	    ue.ready(function() {
		if(this.getContent()==''){
			err=true;
			msg.push('活动内容不能为空');
		}
	    });
	    if(err){
	    	message=msg.join('\n');
		   alert(message)
	     }
	     return !err;
    },
    checkNoticeForm:function(form){
    	var msg=new Array();
	    var err=false;
    	if(form.elements['title'] && form.elements['title'].value == 0){
    		err=true;
    		msg.push(title_not_null);
    	}
    	var ue = UE.getEditor('editor');
	    ue.ready(function() {
		if(this.getContent()==''){
			err=true;
			msg.push(editor_not_null);
		}
	    });
    	if(err){
    		messnotice=msg.join('\n');
    		alert(messnotice);
    	}
    	return !err;
    },
    checklotteryForm:function(form){
    	var msg=new Array();
    	var err=false;
    	if(form.elements['templateid'] && form.elements['templateid'].value == 0){
    		err=true;
    		msg.push('模板选择不能为空，请选择模板');
    	}
    	if(form.elements['title'] && form.elements['title'].value == 0){
    		err=true;
    		msg.push('抽奖活动标题名称不能为空');
    	}
    	if(form.elements['lottaid'] && form.elements['lottaid'].value == 0){
    		err=true;
    		msg.push('活动抽奖不能为空，请选择');
    	}
    	if(err){
    		messlottry=msg.join('\n');
    		alert(messlottry);
    	}
    	return !err;
    },
    checkrecruitForm:function(form){
    	var msg=new Array();
    	var err=false;
    	var ress=/^\d+$/;
    	if(form.elements['title'] && form.elements['title'].value == 0){
    		err=true;
    		msg.push('招募标题不能为空！');
    	}else if(form.elements['title'].value.length > 8){
    		err=true;
    		msg.push('招募标题不能多于8个字');
    	}
    	var male=form.getElementsByClassName('malCod').length;
    	if(male){
    		var w=0;
    		for(var i=0; i < male; i++){
    			if(form.getElementsByClassName('malCod')[i].checked == false){
    				w++;
    			}
    		}
    		if(w==male){
    			err=true;
    			msg.push('报名设置最好选一项');
    		}
    	}
    	if(form.elements['number-dues'].value !=='' && !ress.test(form.elements['number-dues'].value)){
    		err=true;
    		msg.push('亲，会费金额必须要填写整数哦！');
    	}
    	if(form.elements['female-dues'].value !=='' && !ress.test(form.elements['female-dues'].value)){
    		err=true;
    		msg.push('女生金额必须要填写整数哦！');
    	}
    	if(form.elements['template'] && form.elements['template'].value ==0){
    		err=true;
    		msg.push('模板设置请选择！')
    	}
    	if(err){
    		messrecruit=msg.join('\n');
    		alert(messrecruit);
    	}
    	return !err;
    }
};