define(function(require, exports, module){
 var $=require("jquery");
 $.fn.packetset=function(settings){
 	var defaults={
 		json:null,
 		starttime:null,
 		shareURL:null,
 		endtime:null,
 		shareUid:null,
 		canvasMove:null
 	};
 	var config=$.extend(defaults,settings);
 	var isweiXin=navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
 	var thisDiv=$(this);
 	//分享出去
 	thisDiv.find('#packetShare').click(function(){
 		$.ajax({
 			type:'GET',
 			url:cid_url+'/api/packet_share/check',
 			dataType:'json',
 			success: function(data){
 				if(data.code === 401){
 					shellmodule.login(data.message);
 				}else if(data.code ===402){
 					showmsg(data.message,'',1000);
 				}else if(data.code === 403){
 					showmsg(data.message,'',1000);
 				}else{
 					shellmodule.ShareModule('','',config.shareURL,'','al_redpacket');
 				}
 			},
 			error:function(){
 				showmsg('数据有误');
 			}
 		});
 		//return false;
 	});

 	function countDown(endtime,starttime,day_elem,hour_elem,minute_elem,second_elem){
    //if(typeof end_time == "string")
    var end_time = new Date(endtime).getTime(),//月份是实际月份-1
    current_time = new Date(starttime).getTime(),
    sys_second = (end_time-current_time)/1000;
    var timer = setInterval(function(){
        if (sys_second > 0) {
            sys_second -= 1;
            var day = Math.floor((sys_second / 3600) / 24);
            var hour = Math.floor((sys_second / 3600) % 24);
            var minute = Math.floor((sys_second / 60) % 60);
            var second = Math.floor(sys_second % 60);
            day_elem && $(day_elem).text(day);//计算天
            thisDiv.find(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
            thisDiv.find(minute_elem).text(minute<10?"0"+minute:minute);//计算分
            thisDiv.find(second_elem).text(second<10?"0"+second:second);// 计算秒
        } else { 
            clearInterval(timer);
            window.location.reload();
            console.log(timer);
        }
    }, 1000);
}

    if(config.endtime !== null && config.starttime !==null){
    	countDown(config.endtime,config.starttime,null,"#znq_countdown .hours","#znq_countdown .minute","#znq_countdown .second");

    }
    if(config.canvasMove !==null && config.shareUid !==null){
    	var t = 1; 
        var initialize  = function () {
            function getRandomNum(lbound, ubound) {
                return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
            }
            var r = getRandomNum(1,100);
            isOk = 0;
        };
        var c1;
        var ctx;
        var ismousedown;
        var isOk=0;
        var fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);
        var imgr=document.getElementById('imageIMG');
        initialize()
        c1=document.getElementById('c1');
        c1.width=c1.clientWidth;
        c1.height=c1.clientHeight;
        ctx=c1.getContext('2d');
        c1.addEventListener("mousemove",eventMove,false);
        c1.addEventListener("mousedown",eventDown,false);
        c1.addEventListener("mouseup",eventUp,false);
        c1.addEventListener('touchstart', eventDown,false);
        c1.addEventListener('touchend', eventUp,false);
        c1.addEventListener('touchmove', eventMove,false);
        initCanvas();
        function initCanvas(){
        	ctx.globalCompositeOperation='source-over';
        	//ctx.drawImage(imgr,0,0);
        	ctx.fillStyle='#f8b62d';
        	ctx.fillRect(0,0,c1.clientWidth,c1.clientHeight);
        	ctx.fill();
        	//把这个属性设为这个就可以做出圆形橡皮擦的效果
        	//有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
        	//c1.style.backgroundImage="url(/static/images/packet_user/packet-5.png)";
        	ctx.drawImage(imageIMG,0,0);
        	ctx.font="Bold 40px Microsoft YaHei";
        	ctx.textAlign="center";
        	ctx.fillStyle="#ed6819";
        	ctx.fillText('刮一刮',c1.width/2,50);
        	ctx.globalCompositeOperation = 'destination-out';
        }
        //鼠标按下 和 触摸开始
        function eventDown(e){
        	e.preventDefault();
        	ismousedown=true;
        }
        //鼠标抬起 和 触摸结束
        function eventUp(e){
        	e.preventDefault();
        	//得到canvas的全部数据
        	var a=ctx.getImageData(0,0,c1.width,c1.height);
        	var j=0;
        	for(var i=3;i < a.data.length;i+=4){
        		if(a.data[i]==0) j++;
        	}
        	//当被刮开的区域等于一半时，则可以开始处理结果
        	if(j >= a.data.length/8){
        		isOk=1;
        		$.ajax({
        			type:'GET',
        			url:cid_url+'/api/packet_share/join_act',
        			data:{uid:config.shareUid},
        			dataType:'json',
        			success:function(data){
        				thisDiv.find('#ggcanvas').append('<div id="dice_mask"></div>');
        				console.log(data.message);
        			},
        			error:function(){
        				showmsg('数据有问题');
        			}
        		});
        	}
        	ismousedown=false;
        }
        //鼠标移动 和触摸移动
        function eventMove(e){
        	e.preventDefault();
        	if(ismousedown){
        		if(e.changedTouches){
        			e=e.changedTouches[e.changedTouches.length-1];
        		}
        		var topY=document.getElementById('ggcanvas').offsetTop;
        		var oX=c1.offsetLeft,oY=c1.offsetTop+topY;
        		var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
        		    y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;
        		ctx.beginPath();
        		ctx.arc(x, y, fontem*1.2, 0, Math.PI * 2,true);
        		//下面3行代码是为了修复部分手机浏览器不支持destination-out
        		//我也不是很清楚这样做的原理是什么
        		c1.style.display = 'none';
        		c1.offsetHeight;
        		c1.style.display = 'inherit'; 
        		ctx.fill();
        	}
        }

    }
 	//结束
	};
});