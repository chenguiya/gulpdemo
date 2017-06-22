var core={};core.confirm=function(i,a){var d='<div id="core_alert"><div class="layer"></div><div class="tips modal-content"><div class="title">';d+=i,d+='</div><div class="modal-footer"><div class="btn btn-default" data-action="cancel">取消</div><div class="btn btn-primary" data-action="ok">确定</div>',d+="</div></div></div>",$("#core_tip").length>0&&$("#core_tip").remove();var t=$(d);$(document.body).append(t),$(".layer",t).fadeIn(100),$(".tips",t).fadeIn(100),t.find(".btn").unbind("click").click(function(){var i=$(this).data("action");"ok"==i&&a&&a(),t.remove()})};
$(function(){
	//input
	$('.subCompanyName').val(subCompanyName);
	//网元监控接口
	if($('#breakMonitor').length){
		function getTaiPtnActiveFaultList(){
			$.ajax({
		   type:'GET',
		   url:hostUrl+'monitor-api/taiPtnActiveFault/getTaiPtnActiveFaultList?page=1&rows=10',
		   cache:false,
		   dataType:'json',
		   success:function(data){
			  var options={
			     "id":"example2_paginate",
			     "data":hostUrl+'monitor-api/taiPtnActiveFault/getTaiPtnActiveFaultList',
			     "maxshowpageitem":6,
			     "pagelistcount":10,
			     callBack:function(result){
			     	console.log(result.list.length);
			     	var html='';
		   	  for(var i=0;i < result.list.length; i++){

		   	  	var line=result.list[i];
		   	  	 html+='<tr class="breakmeName" data-alarmid="'+line.alarmID+'">';
		   	  	
		   	  	    if(line.handleResult==0 || line.handleResult==3){
			   	  	 html+='<td><a href="javascript:void(0)" class="btn btn-sm btn-twitter btnConfirm" data-alarmid="'+line.alarmID+'">确认</a></td>';
		   	  	    }else if(line.handleResult==2 || line.handleResult==4){
				   	 html+='<td><a href="javascript:void(0)" class="btn btn-sm bg-green btnHandle" data-alarmid="'+line.alarmID+'">完成确认</a></td>';
			   	  	}else{
			   	  		html+='<td><a href="javascript:void(0)" class="btn btn-sm bg-red btnClear" data-alarmid="'+line.alarmID+'">其他状态</a></td>';
			   	  	}
		   	  	    html+='<td>'+line.handleSuggestion+'</td>';
		   	  	    html+='<td>'+line.meName+'</td>';
		   	  	    html+='<td>'+line.switchStateName+'</td>';
		   	  	    html+='<td>'+line.raiseTime+'</td>';
		   	  	    html+='<td>'+line.confirmTime+'</td>';
		   	  	 html+='</tr>';
		   	  }
		   	  $('#power_ajaxForm').html(html);
			     }

			  };
			  page.init(data.total,1,options);

		   },
		   error:function(){
			  alert('数据有问题');
		   }
	    });
		console.log('1');
		}
		getTaiPtnActiveFaultList();
	    setInterval(getTaiPtnActiveFaultList,time);
	    //告警同步id传参接口
	    $('#breakMonitor').on({
	    	click:function(){
	    		var alarmid=$(this).data('alarmid');
	    		$.ajax({
	    			type:'GET',
	    			url:hostUrl+'monitor-api/taiPtnActiveFault/getTaiPtnActiveInfoList?alarmID='+alarmid+'&page=1&rows=10',
	    			cache:false,
	    			dataType:'json',
	    			success:function(data){
	    				var html='';
	    				for(var i=0; i < data.list.length;i++){
	    					var daline=data.list[i];
	    					html+='<tr>';
	    					 html+='<td>'+daline.meName+'</td>';
	    					 html+='<td>'+daline.nativeProbableCause+'</td>';
	    					 html+='<td>'+daline.raiseTime+'</td>';
	    					 html+='<td>'+daline.alarmSeverityText+'</td>';
	    					html+='</tr>';
	    				}
	    				$('#alarmStateBox').html(html);
	    			},
	    			error:function(){
	    				alert('数据有问题');
	    			}
	    		});
	    	}
	    },'.breakmeName');
	    //断电监控确认
	    $('#breakMonitor').on({
	    	click:function(){
	    		var _this=$(this);
	    		var alarmid=$(this).data('alarmid');
	    		core.confirm('是否确认修改',function(){
	    			$.ajax({
	    				type:'POST',
	    				url:hostUrl+'monitor-api/taiPtnActiveFault/confirmTaiPtnActiveFault?alarmID='+alarmid,
	    				cache:false,
	    				dataType:'json',
	    				success:function(data){
	    					if(data.code==00){
	    					  // _this.closest('tr').remove();
	    					  // $('#alarmStateBox').html('');
	    					  window.location.reload();
	    					}else{
	    						alert(data.message);
	    					}
	    				},
	    				error:function(){
	    					alert('数据有问题');
	    				}
	    			})
	    		});
	    	}
	    },'.btnConfirm');
	    //断电监控完成确认
	    $('#breakMonitor').on({
	    	click:function(){
	    		var _this=$(this);
	    		var alarmid=$(this).data('alarmid');
	    		core.confirm('是否告警信息确认完成',function(){
	    			$.ajax({
	    				type:'POST',
	    				url:hostUrl+'monitor-api/taiPtnActiveFault/handleTaiPtnActiveFault?alarmID='+alarmid,
	    				cache:false,
	    				dataType:'json',
	    				success:function(data){
	    					if(data.code==0){
	    						window.location.reload();
	    					}else{
	    						alert(data.message);
	    					}
	    				},
	    				error:function(){
	    					alert('数据有问题');
	    				}
	    			})
	    		})
	    	}
	    },'.btnHandle');
	}
	//网元配置
	if($('#elementConfig').length){
		document.title='网元配置';
		function getTsearch(nodeName){
			var url,urlhost;
			if(nodeName){
				url=hostUrl+'monitor-api/taiResNode/getTaiResNodeProtectedList?nodeName='+nodeName;
				urlhost='&page=1&rows=10';
			}else{
				url=hostUrl+'monitor-api/taiResNode/getTaiResNodeProtectedList';
				urlhost='?page=1&rows=10';
			}
			$.ajax({
			type:'GET',
			url:url+urlhost,
			cache:false,
			dataType:'json',
			success:function(data){
				var options={
					"id":"example2_paginate",
					"data":url,
					"maxshowpageitem":6,
			        "pagelistcount":10,
			        callBack:function(result){
			     	    var html='';
			     	    if(result.list.length <=0){
			     	    	 $('#power_ajaxForm').html('<tr><td colspan="6" class="divAlign">暂无数据</td></tr>');
			     	    	 return false;
			     	    }
			     	    for(var i=0;i < result.list.length; i++){
			     	    	var line=result.list[i];
			     	    	html+='<tr ids="'+line.resID+'">';
			     	    	  html+='<td><a href="javascript:void(0)" class="btn btn-sm btn-twitter" data-id="'+line.resID+'">修改</a><a href="javascript:void(0)" target="_blank" class="btn btn-sm btn-danger" data-id="'+line.resID+'">删除</a></td>';
			     	    	  html+='<td>'+line.emsName+'</td>';
			     	    	  html+='<td>'+line.nodeName+'</td>';
			     	    	  html+='<td>'+line.emR3NodeName+'</td>';
			     	    	  html+='<td>'+line.emR4NodeName+'</td>';
			     	    	  html+='<td>'+line.locationName+'</td>';
			     	    	html+='</tr>';
			     	    }
			     	    $('#power_ajaxForm').html(html);
			     	}
			    };
			    page.init(data.total,1,options);
			},
			error:function(){
				alert('数据有问题');
			}
		   });
		}	
		function ajax_node(nodeUuid,locationId,emR3NodeId,emR4NodeId,id){
			if(id){
				$('#updateId').val(id);
			}else{
				$('#usernames').val('');
			}
			//网元id下拉
			$.ajax({
				type:'GET',
				url:hostUrl+'monitor-api/taiResNode/getTaiResNodeAllList',
				cache:false,
				dataType:'json',
				success:function(data){
					var opt='';
					for(var i=0; i < data.list.length;i++){
						var line=data.list[i];
						if(line.nodeUuid==nodeUuid){
							opt+='<option value="'+line.nodeUuid+'" selected="true">'+line.nodeName+'</option>';
						}else{
							opt+='<option value="'+line.nodeUuid+'">'+line.nodeName+'</option>';
						}
					}
					$('#nodeUuidBox').html(opt);
					var nodes=$('#nodeUuidBox').val();
					if(emR3NodeId && emR4NodeId){
						nodes_emR3NodeId(nodes,emR3NodeId,emR4NodeId);
					}else{
						nodes_emR3NodeId(nodes);
					}
					
				},
				error:function(){
					alert('数据有问题');
				}
			});
			//空间位置id
			
			$.ajax({
				type:'GET',
				url:hostUrl+'monitor-api/taiResNode/getResLocationAllList?nodeUuid=',
				cache:false,
				dataType:'json',
				success:function(data){
					var opt='';
					for(var i=0; i< data.list.length;i++){
						var line=data.list[i];
						if(line.locationId==locationId){
							opt+='<option value="'+line.locationId+'" selected="true">'+line.locationName+'</option>';
						}else{
							opt+='<option value="'+line.locationId+'">'+line.locationName+'</option>';
						}
						
					}
					$('#locationIdBox').html(opt);
				},
				error:function(){
					alert('数据有问题');
				}
			});
			
		}
		function nodes_emR3NodeId(nodes,emR3NodeId,emR4NodeId){
			//左右网元id
			$.ajax({
				type:'GET',
				url:hostUrl+'monitor-api/taiResNode/getTaiResNodeUUidList?nodeUuid='+nodes,
				cache:false,
				dataType:'json',
				success:function(data){
					var opt='';
					var optr='';
					for(var i=0; i < data.list.length;i++){
						var line=data.list[i];
						if(line.nodeUuid==emR3NodeId){
							opt+='<option value="'+line.nodeUuid+'" selected="true">'+line.nodeName+'</option>';
							
						}else{
							opt+='<option value="'+line.nodeUuid+'">'+line.nodeName+'</option>';
						}
						if(line.nodeUuid==emR4NodeId){
							optr+='<option value="'+line.nodeUuid+'" selected="true">'+line.nodeName+'</option>';
						}else{
							
							optr+='<option value="'+line.nodeUuid+'">'+line.nodeName+'</option>';
						}
						
					}
					$('#emR3NodeIdLeft').html(opt);
					$('#emR4NodeIdRight').html(optr);
				},
				error:function(){
					alert('数据有问题');
				}
			});
		}
		getTsearch();
		//点击获取id
		$('#nodeUuidBox').on('change',function(){
			var nodes=$(this).val();
			nodes_emR3NodeId(nodes);
		});
		//添加监控网元
		$('#myModal').on('show.bs.modal',function(){
			ajax_node()
			
		});
		var showfalse=false;
		$('#myModal .btn-primary').on('click',function(){
            var username=$('#usernames').val(),nodeUuidBox=$('#nodeUuidBox').val(),nodeUuidBox_name=$('#nodeUuidBox option[value="'+nodeUuidBox+'"]').text(),emR3NodeIdLeft=$('#emR3NodeIdLeft').val(),emR3NodeIdLeft_name=$('#emR3NodeIdLeft option[value="'+emR3NodeIdLeft+'"]').text(),emR4NodeIdRight=$('#emR4NodeIdRight').val(),emR4NodeIdRight_name=$('#emR4NodeIdRight option[value="'+emR4NodeIdRight+'"]').text(),locationIdBox=$('#locationIdBox').val(),locationIdBox_name=$('#locationIdBox option[value="'+locationIdBox+'"]').text(),updateid=$('#updateId').val();

            var parame={nodeUuid:nodeUuidBox,emName:username,emR3NodeId:emR3NodeIdLeft,emR4NodeId:emR4NodeIdRight,locationId:locationIdBox};
            var updateparame={emId:updateid,nodeUuid:nodeUuidBox,emName:username,emR3NodeId:emR3NodeIdLeft,emR4NodeId:emR4NodeIdRight,locationId:locationIdBox};
            //alert(locationIdBox_name);
            if(isEmpty(username)){
            	alert('请填写设备名称再确认哦！');
            	return false;
            }
            if(showfalse){
            	$.ajax({
            		type:'POST',
            		url:hostUrl+'monitor-api/taiPtnEmdev/updateTaiPtnEmdev',
            		data:{params:JSON.stringify(updateparame)},
            		cache:false,
            		dataType:'json',
            		success:function(data){
            			if(data.code==00){
            				var po='';
            				po+='<td><a href="javascript:void(0)" target="_blank" class="btn btn-sm btn-twitter" data-id="'+updateid+'">修改</a><a href="javascript:void(0)" target="_blank" class="btn btn-sm btn-danger" data-id="'+updateid+'">删除</a></td>';
            				po+='<td>'+username+'</td>';
            			    po+='<td>'+nodeUuidBox_name+'</td>';
            			    po+='<td>'+emR3NodeIdLeft_name+'</td>';
            			    po+='<td>'+emR4NodeIdRight_name+'</td>';
            			    po+='<td>'+locationIdBox_name+'</td>';
            				$('#power_ajaxForm tr[ids="'+updateid+'"]').html(po);
            				$('#myModal').modal('hide');
            				showfalse=false
            			}else{
            				alert(data.message);
            			}
            		},
            		error:function(){
            			alert('数据请求有问题')
            		}
            	})
            }else{
            	$.ajax({
            	type:'POST',
            	url:hostUrl+'monitor-api/taiPtnEmdev/saveTaiPtnEmdev',
            	data:{params:JSON.stringify(parame)},
            	cache:false,
            	dataType:'json',
            	success:function(data){
            		if(data.code==00){
            			var html='<tr ids="'+data.emId+'">';
            			    html+='<td><a href="javascript:void(0)" target="_blank" class="btn btn-sm btn-twitter" data-id="'+data.emId+'">修改</a><a href="javascript:void(0)" target="_blank" class="btn btn-sm btn-danger" data-id="'+data.emId+'">删除</a></td>';
            			    html+='<td>'+username+'</td>';
            			    html+='<td>'+nodeUuidBox_name+'</td>';
            			    html+='<td>'+emR3NodeIdLeft_name+'</td>';
            			    html+='<td>'+emR4NodeIdRight_name+'</td>';
            			    html+='<td>'+locationIdBox_name+'</td>';
            			    html+='</tr>';
            			$('#power_ajaxForm').prepend(html);
            			$('#myModal').modal('hide');
            		}else{
            		    alert(data.message);
            		}
                },
            	error:function(){
            		alert('数据有问题');
            	}
               });
            }
        });
        //修改
        $('#elementConfig').on({
        	click:function(){
        		$('#myModal').modal('toggle');
        	    showfalse=true;
        		var id=$(this).data('id');
        		$.ajax({
        			type:'GET',
        			url:hostUrl+'monitor-api/taiPtnEmdev/getTaiPtnEmdev?emId='+id,
        			cache:false,
        			dataType:'json',
        			success:function(data){
        				$('#usernames').val(data.taiPtnEmdev.emName);
        				ajax_node(data.taiPtnEmdev.nodeUuid,data.taiPtnEmdev.locationId,data.taiPtnEmdev.emR3NodeId,data.taiPtnEmdev.emR4NodeId,id);
        			},
        			error:function(){
        				alert('数据有问题');
        			}
        		});
        	}
        },'.btn-twitter');
        //删除
        $('#elementConfig').on({
        	click:function(){
        		var id=$(this).data('id');
        		var _this=$(this);
        		core.confirm('是否确认删除此信息！删除后将无法恢复',function(){
        			$.ajax({
        			    type:'DELETE',
        			    url:hostUrl+'monitor-api/taiPtnEmdev/deleteTaiPtnEmdev?emId='+id,
        			    contentType: 'application/json; charset=utf-8',
        			    cache:false,
        			    dataType:'json',
        			    success:function(data){
        			    	if(data.code==00){
        			    		_this.closest('tr').remove();
        			    	}else{
        			    		alert(data.message);
        			    	}
        			    },
        			    error:function(){
        			    	alert('数据返回有问题');
        			    }
        		    });
        		});
        		return false;
        	}
        },'.btn-danger');
        //查询
        $('#btn_elementConfiy').click(function(){
        	var textval=$('#usertextid').val();
        	getTsearch(textval);
        	return false
        });
	}
	//告警日志
	if($('#alarmLog').length){
		document.title='告警日志';
		var url=hostUrl+'monitor-api/taiPtnActiveFault/getTaiPtnHisFaultInfoList';
		function alarmlogSearch(meName){
			var pageurl,urlhost;
			if(meName){
				pageurl=url+'?meName='+meName;
				urlhost='&page=1&rows=10';
			}else{
				pageurl=url;
				urlhost='?page=1&rows=10';
			}
			$.ajax({
			type:'GET',
			url:pageurl+urlhost,
			cache:false,
			dataType:'json',
			success:function(data){
				var options={
					"id":"example2_paginate",
					"data":pageurl,
					"maxshowpageitem":6,
			        "pagelistcount":10,
			        callBack:function(result){
			     	    var html='';
			     	    if(result.error_code){
			     	    	$('#power_ajaxForm').html('<tr><td colspan="7" class="divAlign">'+result.error_msg+'</td></tr>');
			     	    	return false;
			     	    }
			     	    for(var i=0;i < result.list.length; i++){
			     	    	var line=result.list[i];
			     	    	html+='<tr>';
			     	    	  html+='<td>'+line.handleSuggestion+'</td>';
			     	    	  html+='<td>'+line.aMeName+'</td>';
			     	    	  html+='<td>'+line.meName+'</td>';
			     	    	  html+='<td>'+line.switchState+'</td>';
			     	    	  html+='<td>'+line.alarmState+'</td>';
			     	    	  html+='<td>'+line.raiseTime+'</td>';
			     	    	  html+='<td>'+line.confirmTime+'</td>';
			     	    	html+='</tr>';
			     	    }
			     	    $('#power_ajaxForm').html(html);
			     	}
			    };
			    page.init(data.total,1,options);
			},
			error:function(){
				alert('数据有问题');
			}
		    });
		}
		alarmlogSearch();
		$('#btn_elementConfiy').click(function(){
			var textval=$('#usertextid').val();
			alarmlogSearch(textval);
			return false;
		})
	}
	//网元信息
	if($('#elementInfo').length){
		document.title='网元信息';
		var url_getTaiResNodeList=hostUrl+'monitor-api/taiResNode/getTaiResNodeList';//网元列表
		var url_getTaiResLinkList=hostUrl+'monitor-api/taiResNode/getTaiResLinkList';//端口信息
		var url_getTaiPtnActiveInfoList=hostUrl+'monitor-api/taiPtnActiveFault/getTaiPtnActiveInfoList?alarmID=be6ad0d9-5de8-4fd3-b971-571767f964f0';//活动告警
		ajax_getTaiResNodeList();
		function ajax_getTaiResNodeList(nodeName){
			var pageurl,urlhost;
			if(nodeName){
				pageurl=url_getTaiResNodeList+'?nodeName='+nodeName;
				urlhost='&page=1&rows=10';
			}else{
				pageurl=url_getTaiResNodeList;
				urlhost='?page=1&rows=10'
			}
			$.ajax({
			type:'GET',
			url:pageurl+urlhost,
			cache:false,
			dataType:'json',
			success:function(data){
				var options={
					"id":"example2_paginate",
					"data":pageurl,
					"maxshowpageitem":6,
			        "pagelistcount":10,
			        callBack:function(result){
			     	    var html='<thead><tr><th>网元名称</th><th>创建时间</th><th>位置</th><th>厂家</th></tr></thead><tbody>';
			     	    if(result.list.length <=0){
			     	    	html+='<tr><td colspan="4" class="divAlign">暂无数据</td></tr>';
			     	    	$('#power_ajaxForm').html(html);
			     	    	return false;
			     	    }
			     	    for(var i=0;i < result.list.length; i++){
			     	    	var line=result.list[i];
			     	    	html+='<tr>';
			     	    	  html+='<td>'+line.nodeName+'</td>';
			     	    	  html+='<td>'+line.createTime+'</td>';
			     	    	  html+='<td>'+line.locationName+'</td>';
			     	    	  html+='<td>'+line.vendorName+'</td>';
			     	    	html+='</tr>';
			     	    }
			     	    html+='</tbody>';
			     	    $('#power_ajaxForm').html(html);
			     	}
			    };
			    page.init(data.total,1,options);
			},
			error:function(){
				alert('数据有问题');
			}
		    });
		}
		function ajax_getTaiResLinkList(){
			$.ajax({
				type:'GET',
				url:url_getTaiResLinkList+'?page=1&rows=10',
				cache:false,
				dataType:'json',
				success:function(data){
					var options={
					"id":"example2_paginate",
					"data":url_getTaiResLinkList,
					"maxshowpageitem":6,
			        "pagelistcount":10,
			        callBack:function(result){
			     	    var html='<thead><tr><th width="auto">网元端口连接关系</th><th width="150">创建时间</th><th width="67">位置</th><th width="90">厂家</th></tr></thead><tbody>';
			     	    for(var i=0;i < result.list.length; i++){
			     	    	var line=result.list[i];
			     	    	html+='<tr>';
			     	    	  html+='<td>'+line.linkName+'</td>';
			     	    	  html+='<td>'+line.createTime+'</td>';
			     	    	  html+='<td>'+line.locationName+'</td>';
			     	    	  html+='<td>'+line.vendorName+'</td>';
			     	    	html+='</tr>';
			     	    }
			     	    html+='</tbody>';
			     	    $('#power_ajaxForm').html(html);
			     	}
			    };
			    page.init(data.total,1,options);
				},
				error:function(){
					alert('数据有问题');
				}
			})
		}
		function ajax_getTaiPtnActiveInfoList(){
			$.ajax({
				type:'GET',
				url:url_getTaiPtnActiveInfoList+'&page=1&rows=10',
				cache:false,
				dataType:'json',
				success:function(data){
					var options={
					"id":"example2_paginate",
					"data":url_getTaiPtnActiveInfoList,
					"maxshowpageitem":6,
			        "pagelistcount":10,
			        callBack:function(result){
			     	    var html='<thead><tr><th>网元名称</th><th>告警类型</th><th>告警时间</th><th>告警清除时间</th><th>厂家/设备</th></tr></thead><tbody>';
			     	    for(var i=0;i < result.list.length; i++){
			     	    	var line=result.list[i];
			     	    	html+='<tr>';
			     	    	  html+='<td>'+line.meName+'</td>';
			     	    	  html+='<td>'+line.nativeProbableCause+'</td>';
			     	    	  html+='<td>'+line.raiseTime+'</td>';
			     	    	  html+='<td>'+line.clearTime+'</td>';
			     	    	  html+='<td>'+line.vendorName+'</td>';
			     	    	html+='</tr>';
			     	    }
			     	    html+='</tbody>';
			     	    $('#power_ajaxForm').html(html);
			     	}
			    };
			    page.init(data.total,1,options);
				},
				error:function(){
					alert('数据有问题');
				}
			})
		}
		$('.box_left_ch .btn').click(function(){
			$('.box_left_ch .btn').removeClass('btn-success');
			$(this).addClass('btn-success');
			var InfoGroupId=$(this).data('id');
			if(InfoGroupId=='getTaiResNodeList'){
				//网元列表
				ajax_getTaiResNodeList();
			}else if(InfoGroupId=='getTaiResLinkList'){
				//端口信息
				ajax_getTaiResLinkList();
			}else if(InfoGroupId=='getTaiPtnActiveInfoList'){
				//活动告警
				ajax_getTaiPtnActiveInfoList();
			}
		});
		$('#btn_elementConfiy').click(function(){
			var textval=$('#usertextid').val();
			ajax_getTaiResNodeList(textval)
			return false;
		})
	}
	//nav
	var nav_exec=/(breakMonitor|elementConfig|elementInfo|alarmLog)/.exec(location.href);
	var aRegExp={breakMonitor:1,elementConfig:2,elementInfo:3,alarmLog:4};
	if(nav_exec==null || nav_exec==''){
		$('.sidebar-menu li').eq(0).addClass('active')
	}else{
		$('.sidebar-menu li').removeClass('active');
		$('.sidebar-menu li').eq(aRegExp[nav_exec[0]]).addClass('active');
	}
	//登录
	$('#email').focus(function(){
		$('#tit_tip').html('');
	});
	$('#password').focus(function(){
		$('#tit_tip').html('');
	});
	$('#login_btnSubmit').click(function(){
		if(isEmpty($('#email').val())){
			$('#tit_tip').html('账号不能为空哦！');
			return false;
		}
		if(isEmpty($('#password').val())){
			$('#tit_tip').html('密码不能为空哦！');
			return false;
		}
		$.ajax({
			type:'POST',
			url:hostUrl+'monitor-api/login/m_v1/userLogin',
			data:{userName:$('#email').val(),password:$('#password').val()},
			dataType:'json',
			cache:false,
			success:function(data){
				if(data.code=='00'){
					window.location.href='/monitor-web/menu/m_v1/breakMonitor.html';
				}else{
					$('#tit_tip').html(data.message);
				}
			},
			error:function(){
				alert('数据有问题');
			}
		})
	});
	function isEmpty(str){
       return $.trim(str) == '' || str == undefined
   }
});
