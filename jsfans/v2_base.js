var core={};core.confirm=function(i,a){var d='<div id="core_alert"><div class="layer"></div><div class="tips modal-content"><div class="title">';d+=i,d+='</div><div class="modal-footer"><div class="btn btn-default" data-action="cancel">取消</div><div class="btn btn-primary" data-action="ok">确定</div>',d+="</div></div></div>",$("#core_tip").length>0&&$("#core_tip").remove();var t=$(d);$(document.body).append(t),$(".layer",t).fadeIn(100),$(".tips",t).fadeIn(100),t.find(".btn").unbind("click").click(function(){var i=$(this).data("action");"ok"==i&&a&&a(),t.remove()})};
$(function(){
	function isEmpty(str){
       return $.trim(str) == '' || str == undefined
    }
    //input
    $('.subCompanyName').val(subCompanyName)
    //alarmSuggestion
    if($('#alarmSuggestion').length){
    	var url=hostUrl+'monitor-api/taiPtnActiveFault/getTaiPtnActiveFaultList';//数据接口
        function getTaiPtnActiveFaultList(){
            $.ajax({
            type:'GET',
            url:url+'?page=1&rows=10',
            cache:false,
            dataType:'json',
            success:function(data){
                var options={
                 "id":"example2_paginate",
                 "data":url,
                 "maxshowpageitem":6,
                 "pagelistcount":10,
                 callBack:function(result){
                    var html='<thead><tr><th width="150">维护建议</th><th width="auto">监控网元</th><th width="187">设备状态</th><th width="197">告警时间</th><th width="120">告警确认时间</th><th width="100">维护确认</th></tr></thead><tbody>';
                    for(var i=0;i < result.list.length; i++){
                        var line=result.list[i];
                        html+='<tr>';
                          html+='<td>'+line.handleSuggestion+'</td>';
                          html+='<td>'+line.meName+'</td>';
                          html+='<td>'+line.switchStateName+'</td>';
                          html+='<td>'+line.raiseTime+'</td>';
                          html+='<td>'+line.confirmTime+'</td>';
                         if(line.handleResult==0 || line.handleResult==3){
                             html+='<td><a href="javascript:void(0)" class="btn btn-sm btn-success btnConfirm" data-alarmid="'+line.alarmID+'">确认</a></td>';
                          }else if(line.handleResult==2 || line.handleResult==4){
                            html+='<td><a href="javascript:void(0)" class="btn btn-sm btn-info btnHandle" data-alarmid="'+line.alarmID+'">完成确认</a></td>';
                          }else{
                            html+='<td><a href="javascript:void(0)" class="btn btn-sm btn-success" data-alarmid="'+line.alarmID+'">其他状态出现</a></td>';
                          }
                         
                        html+='</tr>';
                    }
                      html+='</tbody>';
                    $('#example_ajaxForm').html(html);
                 }

              };
              page.init(data.total,1,options);
            },
            error:function(){
                alert('数据有问题');
            }
         });
        }
        getTaiPtnActiveFaultList();
        setInterval(getTaiPtnActiveFaultList,time);
    	//confirm
    	$('#alarmSuggestion').on({
    		click:function(){
    			var _this=$(this),alarmid=$(this).data('alarmid');
    			core.confirm('告警维护是否确认？',function(){
    				$.ajax({
    				    type:'POST',
    				    url:hostUrl+'monitor-api/taiPtnActiveFault/confirmTaiPtnActiveFault',
    				    data:{alarmID:alarmid},
    				    cache:false,
    				    dataType:'json',
    				    success:function(data){
    					    if(data.code==00){
    						   // _this.closest('tr').remove();
                               window.location.reload();
    					    }else{
    						   alert(data.message);
    					    }
    				    },
    				    error:function(){
    					   alert('数据有问题');
    				    }
    			   });
    			});	
    		}
    	},'.btnConfirm');
        //确认处理
        $('#alarmSuggestion').on({
            click:function(){
                var _this=$(this),alarmid=$(this).data('alarmid');
                core.confirm('告警维护是否确认完成?',function(){
                    $.ajax({
                        type:'POST',
                        url:hostUrl+'monitor-api/taiPtnActiveFault/handleTaiPtnActiveFault',
                        data:{alarmID:alarmid},
                        cache:false,
                        success:function(data){
                            if(data.code==00){
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
        },'.btnHandle')
    }
    //activeAlarm
    if($('#activeAlarm').length){
    	document.title='活动告警';
    	var url=hostUrl+'monitor-api/taiPtnActiveFault/getTaiPtnActiveInfoList?alarmID=be6ad0d9-5de8-4fd3-b971-571767f964f0';
    	function querySearch(meName){
    		var pageurl,urlhost;
    		if(meName){
    			pageurl=url+'&meName='+meName;
    			urlhost='&page=1&rows=10';
    		}else{
    			pageurl=url;
    			urlhost='&page=1&rows=10';
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
			     	       var html='<thead><tr><th width="auto">网元名称</th><th width="113">设备类型</th><th width="187">告警类型</th><th width="226">告警时间</th><th width="226">告警清除时间</th><th width="114">告警级别</th></tr></thead><tbody>';
			     	       if(result.error_code==0001){
			     		      html+='<tr><td colspan="6" class="divAlign">'+result.error_msg+'</td></tr>';
			     		      $('#example_ajaxForm').html(html);
			     		      return false;
			     	       }
			     	       for(var i=0;i < result.list.length; i++){
			     		      var line=result.list[i];
			     		      html+='<tr>';
			     		         html+='<td>'+line.meName+'</td>';
			     		         html+='<td>'+line.vendorName+'</td>';
			     		         html+='<td>'+line.nativeProbableCause+'</td>';
			     		         html+='<td>'+line.raiseTime+'</td>';
			     		         html+='<td>'+line.clearTime+'</td>';
			     		         html+='<td>'+line.alarmSeverityText+'</td>';
			     		      html+='</tr>';
			               }
			                  html+='</tbody>';
			                  $('#example_ajaxForm').html(html);
			           }
			       };
			       page.init(data.total,1,options);
    		   },
    		   error:function(){
    			   alert('数据有问题');
    		   }
    	    });
    	}
    	querySearch();
    	//query
    	$('#queryConfirm').click(function(){
    		var textval=$('#alarmText').val();
    		querySearch(textval);
    		return false;
    	});
    }
    //netElementList
    if($('#netElementList').length){
    	document.title="网元列表";
    	var url=hostUrl+'monitor-api/taiResNode/getTaiResNodeList';
    	function netListSearch(nodeName){
    		var pageurl,urlhost;
    		if(nodeName){
    			pageurl=url+'?nodeName='+nodeName;
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
			     	       var html='<thead><tr><th width="auto">网元名称</th><th width="140">网元节点状态</th><th width="205">创建时间</th><th width="205">最后修改时间</th><th width="78">位置</th><th width="100">厂家</th></tr></thead><tbody>';
			     	       if(result.list.length <=0){
			     		      html+='<tr><td colspan="6" class="divAlign">暂无数据记录</td></tr>';
			     		      $('#example_ajaxForm').html(html);
			     		      return false;
			     	       }
			     	       for(var i=0;i < result.list.length; i++){
			     		      var line=result.list[i];
			     		      html+='<tr>';
			     		         html+='<td>'+line.nodeName+'</td>';
			     		         html+='<td>'+line.nodeStateName+'</td>';
			     		         html+='<td>'+line.createTime+'</td>';
			     		         html+='<td>'+line.lastModifyTime+'</td>';
			     		         html+='<td>'+line.locationName+'</td>';
			     		         html+='<td>'+line.vendorName+'</td>';
			     		      html+='</tr>';
			               }
			                  html+='</tbody>';
			                  $('#example_ajaxForm').html(html);
			           }
			       };
			       page.init(data.total,1,options);
    			},
    			error:function(){
    				alert('数据有问题');
    			}
    		});
    	}
    	netListSearch();
    	//query
    	$('#queryConfirm').click(function(){
    		var textval=$('#alarmText').val();
    		netListSearch(textval);
    		return false;
    	});
    }
    //netElementPort
    if($('#netElementPort').length){
    	document.title='网元端口关系';
    	var url=hostUrl+'monitor-api/taiResNode/getTaiResLinkList';
    	function netPortSearch(nodeName){
    		var pageurl,urlhost;
    		if(nodeName){
    			pageurl=url+'?nodeName='+nodeName;
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
			     	       var html='<thead><tr><th width="auto">网元端口连接关系</th><th width="200">创建时间</th><th width="90">空间</th><th width="90">厂家</th></tr></thead><tbody>';
			     	       if(result.list.length <=0){
			     		      html+='<tr><td colspan="4" class="divAlign">暂无数据记录</td></tr>';
			     		      $('#example_ajaxForm').html(html);
			     		      return false;
			     	       }
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
			                  $('#example_ajaxForm').html(html);
			           }
			       };
			       page.init(data.total,1,options);
    			},
    			error:function(){
    				alert('数据有问题');
    			}
    		})
    	}
    	netPortSearch();
    	//query
    	$('#queryConfirm').click(function(){
    		var textval=$('#alarmText').val();
    		netPortSearch(textval);
    		return false;
    	});
    }
    //netElementConfig
    if($('#netElementConfig').length){
    	document.title='监控网元配置';
    	var url=hostUrl+'monitor-api/taiResNode/getTaiResNodeProtectedList';
    	function netConfigSearch(nodeName){
    		var pageurl,urlhost;
    		if(nodeName){
    			pageurl=url+'?nodeName='+nodeName;
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
			     	       if(result.list.length <=0){
			     		      html+='<tr><td colspan="7" class="divAlign">暂无数据记录</td></tr>';
			     		      $('#example_ajaxForm').html(html);
			     		      return false;
			     	       }
			     	       for(var i=0;i < result.list.length; i++){
			     		      var line=result.list[i];
			     		      html+='<tr ids="'+line.resID+'">';
			     		         html+='<td>'+line.emsName+'</td>';
			     		         html+='<td>'+line.nodeName+'</td>';
			     		         html+='<td>'+line.emR3NodeName+'</td>';
			     		         html+='<td>'+line.emR4NodeName+'</td>';
			     		         html+='<td>'+line.locationName+'</td>';
			     		         html+='<td>'+line.memo+'</td>';
			     		         html+='<td><a href="javascript:void(0)" class="btn btn-sm btn-success" data-id="'+line.resID+'">修改</a><a href="javascript:void(0)" class="btn btn-sm btn-danger" data-id="'+line.resID+'">删除</a></td>';
			     		      html+='</tr>';
			               }
			                  $('#example_ajaxForm').html(html);
			           }
			       };
			       page.init(data.total,1,options);
    			},
    			error:function(){
    				alert('数据有问题');
    			}
    		})
    	}
    	function ajax_node_wap(nodeUuid,emR3NodeId,emR4NodeId,locationId,updateId){
    		if(updateId){
    			$('#updateId').val(updateId);
    		}else{
    			$('#emsName_id').val('');
    			$('#memo_id').val('');
    		}
    		//网元id下拉
    		$.ajax({
    			type:'GET',
    			url:hostUrl+'monitor-api/taiResNode/getTaiResNodeAllList',
    			cache:false,
    			dataType:'json',
    			success:function(data){
    				var opt='';
    				for(var i=0; i<data.list.length;i++){
    					var line=data.list[i];
    					if(line.nodeUuid==nodeUuid){
    						opt+='<option value="'+line.nodeUuid+'" selected="true">'+line.nodeName+'</option>';
    					}else{
    						opt+='<option value="'+line.nodeUuid+'">'+line.nodeName+'</option>';
    					}	
    				}
    				$('#nodeUuid_id').html(opt);
                    var nodes=$('#nodeUuid_id').val();
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
    		//位置id
    		$.ajax({
    			type:'GET',
    			url:hostUrl+'monitor-api/taiResNode/getResLocationAllList',
    			cache:false,
    			dataType:'json',
    			success:function(data){
    				var opt='';
    				for(var i=0; i<data.list.length;i++){
    					var line=data.list[i];
    					if(line.locationId==locationId){
    						opt+='<option value="'+line.locationId+'" selected="true">'+line.locationName+'</option>';
    					}else{
    						opt+='<option value="'+line.locationId+'">'+line.locationName+'</option>';
    					}	
    				}
    				$('#locationName_id').html(opt);
    			},
    			error:function(){
    				alert('数据有问题');
    			}
    		})
    	}
        function nodes_emR3NodeId(nodes,emR3NodeId,emR4NodeId){
            //左右网元id下拉
            $.ajax({
                type:'GET',
                url:hostUrl+'monitor-api/taiResNode/getTaiResNodeUUidList?nodeUuid='+nodes,
                cache:false,
                dataType:'json',
                success:function(data){
                    var opt='',opts='';
                    for(var i=0; i <data.list.length; i++){
                        var line=data.list[i];
                        if(line.nodeUuid==emR3NodeId){
                            opt+='<option value="'+line.nodeUuid+'" selected="true">'+line.nodeName+'</option>';
                        }else{
                            opt+='<option value="'+line.nodeUuid+'">'+line.nodeName+'</option>';
                        }
                        if(line.nodeUuid==emR4NodeId){
                            opts+='<option value="'+line.nodeUuid+'" selected="true">'+line.nodeName+'</option>';
                        }else{
                            opts+='<option value="'+line.nodeUuid+'">'+line.nodeName+'</option>';
                        }
                    }
                    $('#emR3NodeName_id').html(opt);
                    $('#emR4NodeName_id').html(opts);
                },
                error:function(){
                    alert('数据有问题');
                }
            });
        }
    	netConfigSearch();
        //点击获取id
        $('#nodeUuid_id').on('change',function(){
            var nodes=$(this).val();
            nodes_emR3NodeId(nodes);
        });
    	//query
    	$('#queryConfirm').click(function(){
    		var textval=$('#alarmText').val();
    		netConfigSearch(textval);
    		return false;
    	});
    	//触发add
    	$('#myModal').on('show.bs.modal',function(){
    		ajax_node_wap();
    	});
    	//add
    	var bntshow=false;
    	$('#myModal .btn-primary').on('click',function(){
    		var emsName_name=$('#emsName_id').val(),nodeUuid_id=$('#nodeUuid_id').val(),nodeUuid_name=$('#nodeUuid_id option[value="'+nodeUuid_id+'"]').text(),emR3NodeName_id=$('#emR3NodeName_id').val(),emR3NodeName_name=$('#emR3NodeName_id option[value="'+emR3NodeName_id+'"]').text(),emR4NodeName_id=$('#emR4NodeName_id').val(),emR4NodeName_name=$('#emR4NodeName_id option[value="'+emR4NodeName_id+'"]').text(),locationName_id=$('#locationName_id').val(),locationName_name=$('#locationName_id option[value="'+locationName_id+'"]').text(),memo_name=$('#memo_id').val(),updateId=$('#updateId').val();
    		var paramAdd={nodeUuid:nodeUuid_id,emName:emsName_name,emR3NodeId:emR3NodeName_id,emR4NodeId:emR4NodeName_id,locationId:locationName_id,memo:memo_name};
    		var paramedit={emId:updateId,nodeUuid:nodeUuid_id,emName:emsName_name,emR3NodeId:emR3NodeName_id,emR4NodeId:emR4NodeName_id,locationId:locationName_id,memo:memo_name};
    		if(isEmpty(emsName_name)){
    			alert('请填写断电装置名称再提交哦!');
    			return false;
    		}
    		if(bntshow){
    			$.ajax({
    				type:'POST',
    				url:hostUrl+'monitor-api/taiPtnEmdev/saveTaiPtnEmdev',
    				data:{params:JSON.stringify(paramedit)},
    				cache:false,
    				dataType:'json',
    				success:function(data){
    					if(data.code==00){
    						var po='<td>'+emsName_name+'</td>';
    						    po+='<td>'+nodeUuid_name+'</td>';
    						    po+='<td>'+emR3NodeName_name+'</td>';
    						    po+='<td>'+emR4NodeName_name+'</td>';
    						    po+='<td>'+locationName_name+'</td>';
    						    po+='<td>'+memo_name+'</td>';
    						    po+='<td><a href="javascript:void(0)" class="btn btn-sm btn-success" data-id="'+updateId+'">修改</a><a href="javascript:void(0)" class="btn btn-sm btn-danger" data-id="'+updateId+'">删除</a></td>';
    						$('#example_ajaxForm tr[ids="'+updateId+'"]').html(po);
                            $('#myModal').modal('hide');
                            bntshow=false;
    					}else{
    						alert(data.message);
    					}
    				},
    				error:function(){
    					alert('数据返回有问题');
    				}
    			})
    		}else{
    			$.ajax({
    				type:'POST',
    				url:hostUrl+'monitor-api/taiPtnEmdev/saveTaiPtnEmdev',
    				data:{params:JSON.stringify(paramAdd)},
    				cache:false,
    				dataType:'json',
    				success:function(data){
    					if(data.code==00){
    						var html='<tr ids="'+data.emId+'">';
    						    html+='<td>'+emsName_name+'</td>';
    						    html+='<td>'+nodeUuid_name+'</td>';
    						    html+='<td>'+emR3NodeName_name+'</td>';
    						    html+='<td>'+emR4NodeName_name+'</td>';
    						    html+='<td>'+locationName_name+'</td>';
    						    html+='<td>'+memo_name+'</td>';
    						    html+='<td><a href="javascript:void(0)" class="btn btn-sm btn-success" data-id="'+data.emId+'">修改</a><a href="javascript:void(0)" class="btn btn-sm btn-danger" data-id="'+data.emId+'">删除</a></td>';
    						    html+='</tr>';
    						   $('#example_ajaxForm').prepend(html);
                               if($('#example_ajaxForm').find('.divAlign').length){
                                $('#example_ajaxForm').find('.divAlign').closest('tr').remove();
                               }
    						   $('#myModal').modal('hide');
    					}else{
    						alert(data.message);
    					}
    				},
    				error:function(){
    					alert('数据有问题');
    				}
    			})
    		}
    	});
    	//edit
    	$('#netElementConfig').on({
    		click:function(){
    			$('#myModal').modal('toggle');
    			bntshow=true;
    			var ids=$(this).data('id');
    			$.ajax({
    				type:'GET',
    				url:hostUrl+'monitor-api/taiPtnEmdev/getTaiPtnEmdev?emId='+ids,
    				cache:false,
    				dataType:'json',
    				success:function(data){
    					$('#emsName_id').val(data.taiPtnEmdev.emName);
    					$('#memo_id').val(data.taiPtnEmdev.memo);
    					ajax_node_wap(data.taiPtnEmdev.nodeUuid,data.taiPtnEmdev.emR3NodeId,data.taiPtnEmdev.emR4NodeId,data.taiPtnEmdev.locationId,ids);
    				},
    				error:function(){
    					alert('数据有问题');
    				}
    			})
    		}
    	},'.btn-success');
        //delete
        $('#netElementConfig').on({
            click:function(){
                var ids=$(this).data('id');
                var _this=$(this);
                core.confirm('是否确认删除此信息！删除后将无法恢复',function(){
                    $.ajax({
                        type:'DELETE',
                        url:hostUrl+'monitor-api/taiPtnEmdev/deleteTaiPtnEmdev?emId='+ids,
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
    }
    //netAlarmLog
    if($('#netAlarmLog').length){
        document.title='告警维护日志';
        var url=hostUrl+'monitor-api/taiPtnActiveFault/getTaiPtnHisFaultInfoList';
        $.ajax({
            type:'GET',
            url:url+'?page=1&rows=10',
            cache:false,
            dataType:'json',
            success:function(data){
                var options={
                 "id":"example2_paginate",
                 "data":url,
                 "maxshowpageitem":6,
                 "pagelistcount":10,
                 callBack:function(result){
                    var html='<thead><tr><th width="100">维护建议</th><th width="242">断电网元</th><th width="auto">关联网元名称</th><th width="150">设备状态</th><th width="155">告警时间</th><th width="155">确认时间</th></tr></thead><tbody>';
                for(var i=0; i<data.list.length;i++){
                    var line=data.list[i];
                    html+='<tr>';
                    html+='<td>'+line.handleSuggestion+'</td>';
                    html+='<td>'+line.aMeName+'</td>';
                    html+='<td>'+line.meName+'</td>';
                    html+='<td>'+line.switchState+'</td>';
                    html+='<td>'+line.raiseTime+'</td>';
                    html+='<td>'+line.confirmTime+'</td>';
                    html+='</tr>';
                }
                html+='</tbody>';
                $('#example_ajaxForm').html(html);
                 }

              };
              page.init(data.total,1,options);
                
            },
            error:function(){
                alert('数据有问题');
            }
        })
    }
    //nav
    var nav_exec=/(activeAlarm|netElementList|netElementPort|netElementConfig|netAlarmLog)/.exec(location.href);
    var aRegExp={activeAlarm:1,netElementList:2,netElementPort:3,netElementConfig:4,netAlarmLog:5};
    if(nav_exec==null || nav_exec==''){
    	$('#cssmenu li').eq(0).addClass('active');
    }else{
    	$('#cssmenu li').removeClass('active');
    	$('#cssmenu li').eq(aRegExp[nav_exec[0]]).addClass('active');
    }
	//login
	$('#email').focus(function(){
		$('#tit_tip').html('');
	});
	$('#password').focus(function(){
		$('#tit_tip').html('');
	})
	$('#loginBtn').click(function(){
		if(isEmpty($('#email').val())){
			$('#tit_tip').html('账号不能为空哦！');
			return false;
		}
		if(isEmpty($('#password').val())){
			$('#tit_tip').html('密码不能为空哦!');
			return false;
		}
		$.ajax({
			type:'POST',
			url:hostUrl+'monitor-api/login/m_v2/userLogin',
			data:{userName:$('#email').val(),password:$('#password').val()},
			cache:false,
			dataType:'json',
			success:function(data){
				if(data.code==00){
					window.location.href='/monitor-web/menu/m_v2/alarmSuggestion.html';
				}else{
					$('#tit_tip').html(data.message);
				}
			},
			error:function(){
				alert('数据有问题！');
			}
		});
	});
});
