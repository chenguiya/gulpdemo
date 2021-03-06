define("test/analysis_nature",["jquery","echart"],function(require, exports, module){
    "user strict";var $ = require("jquery");var e=require("echart");
    var a={};
    a.nature=function(){
    	//性别分布
    	var dom = document.getElementById("sex-bar");
    	var myChart = echarts.init(dom);
    	var option = {
    		tooltip : {       //图例组件
    			trigger: 'axis',
    			padding:0,
    			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    			   type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    			}
    		},
    		color:['#fac871','#ff9587','#7acbe0'],
    		legend: {
    			right:'0',
    			bottom:'0',
    			data: ['未知', '女','男']    //图例的数据数组
    		}, 
    		grid: {   //直角坐标系内绘图网格
    			show:true,
    			left: '1%',
    			top:'2%',
    			bottom:'0',
    			width:'97%',
    			height:60,
    			padding:0,
    			backgroundColor:'#eef3f5',
    			borderWidth:0,
    			containLabel: true
    		},
    		xAxis:  {
    			type: 'value',
    			splitLine:{  //坐标轴在 grid 区域中的分隔线
    				show:true,
    				lineStyle:{
    					color:'#eef3f5'
    				}
    			},
    			axisLine:{
    				lineStyle:{   // X轴线线条颜色
    					width:0,
    					color:'#b5b5b5'
    				}
    			}
    		},
    		yAxis: {
    			type: 'category',
    			axisLine:{
    				lineStyle:{   // Y轴线线条颜色
    					width:0
    				}
    			},
    			axisTick:{   //显示刻度线
    				show:false
    			},
    			splitLine:{  //坐标轴在 grid 区域中的分隔线
    				show:false
    			},
    			data: ['']
    		},
    		series: [
    		{
    			name: '未知',
    			type: 'bar',
    			stack: '总量',
    			label: {
    				normal: {
    					show: false
    				}
    			},
    			itemStyle:{
    				normal:{
    					borderWidth:[0,1,0,0],
    					borderColor:"#000"
    				}
    			},
    			data: [configs.sex_no],
    			barWidth:'40px'  //柱条的宽度
    		},
    		{
    			name: '女',
    			type: 'bar',
    			stack: '总量',
    			label: {
    				normal: {
    					show: false
    				}
    			},
    			data: [configs.sex_nv],
    			barWidth:'40px'  //柱条的宽度
    		},
    		{
    			name: '男',
    			type: 'bar',
    			stack: '总量',
    			label: {
    				normal: {
    					show: false
    				}
    			},
    			data: [configs.sex_nan],
    			barWidth:'40px'  //柱条的宽度
    		}
    		]
    	};
    	myChart.setOption(option, true);
    	//年龄分布
    	var ageBar = echarts.init(document.getElementById('age-bar'));
    	ageBar.setOption({
    		tooltip: {
    			trigger: 'item',
    			formatter: "{a} <br/>{b}: {c} ({d}%)"
    		},
    		color:['#fa685d','#07a4cb'],
    		legend: {
    			x : 'center',
    			data:[
    			{
		        	name:'女',
		        	icon:'pin'
		        },
		        {
		        	name:'男',
		        	icon:'pin'
		        }
		        ]
		    },
		    grid: {
		    	left: '1%',
		    	right: '2%',
		    	bottom: '0%',
		    	top: '30%',
		    },
		    calculable : true,
		    series: [
	        {
	            name:'女',
	            type:'pie',
	            radius: ['30%', '50%'],
	            center:['25%','40%'],
	            label: {
				    normal: {
			        	show: true,
				        textStyle: {
				            color: '#fb8e86'
				        }
				    }
				},
            	labelLine: {
			        normal: {
				        lineStyle: {
				            color: '#fb8e86'
				        }
			        }
			    },
	            data:[
		            {
		            	value:configs.female[1],
		            	name:'0-16岁'+configs.female[1]+'人,'+configs.female_percent[1]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#fca59e'
			                }
		                }
		            },
		            {
	                	value:configs.female[2],
	                	name:'16-26岁'+configs.female[2]+'人,'+configs.female_percent[2]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#fb867e'
			                }
		                }
		            },
		            {
	                	value:configs.female[3],
	                	name:'26-36岁'+configs.female[3]+'人,'+configs.female_percent[3]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#fa685d'
			                }
		                }
		            },
		            {
	                	value:configs.female[4],
	                	name:'36岁以上'+configs.female[4]+'人,'+configs.female_percent[4]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#fee1df'
			                }
		                }
		            },
		            {
	                	value:configs.female[0],
	                	name:'未知'+configs.female[0]+'人,'+configs.female_percent[0]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#fdc2be'
			                }
		                }
		            }
	            ]
	        },
	        {
	            name:'男',
	            type:'pie',
	            radius: ['30%', '50%'],
	            center:['75%','40%'],
	            label: {
				    normal: {
				        textStyle: {
				            color: '#6ac8e0'
				        }
				    }
				},
            	labelLine: {
			        normal: {
				        lineStyle: {
				            color: '#a6deec'
				        }
			        }
			    },
	            data:[
		            {
		            	value:configs.male[1],
		            	name:'0-16岁'+configs.male[1]+'人,'+configs.male_percent[1]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#6ac8e0'
			                }
		                }
		            },
		            {
	                	value:configs.male[2],
	                	name:'16-26岁'+configs.male[2]+'人,'+configs.male_percent[2]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#39b6d5'
			                }
		                }
		            },
		            {
	                	value:configs.male[3],
	                	name:'26-36岁'+configs.male[3]+'人,'+configs.male_percent[3]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#07a4cb'
			                }
		                }
		            },
		            {
	                	value:configs.male[4],
	                	name:'36岁以上'+configs.male[4]+'人,'+configs.male_percent[4]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#cdedf5'
			                }
		                }
		            },
		            {
	                	value:configs.male[0],
	                	name:'未知'+configs.male[0]+'人,'+configs.male_percent[0]+'',
		                itemStyle:{
		                	normal:{
			                	color:'#9cdbea'
			                }
		                }
		            }
	            ]
	        }
	    ]
	});
	       
    }
    module.exports = a;
    
});


