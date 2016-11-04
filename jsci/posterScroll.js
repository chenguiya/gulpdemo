//电视剧大图滚动
(function(jq){
	var posterTvGrid = function(o, options, data){
		this.parent = jq("#"+ o);
		this.body   = jq("body");
		if (this.parent.length <= 0) { 
			return false;
		}
		
		this.options = jq.extend({}, posterTvGrid.options, options);
		if(typeof(data) !== 'object') return false;

		this.data = data || {};
		this.reset();
		//处理页面resize
		var _this = this;
		jq(window).resize(function(){
				_this.reset();
		});
	};
	posterTvGrid.prototype = {
		reset: function(options){
			if(typeof(options) == 'object'){
				jq.extend(this.options, options);	
			}
			if(parseInt(this.body.outerWidth())>1800 || navigator.userAgent.indexOf('iPad') !== -1){
				this.options.width = 1900;
				this.minwidth=862;
				this.minheight=610;
				this.preLeft = 240;
				this.nheight=862;
			
			}else if(parseInt(this.body.outerWidth())>1399 || navigator.userAgent.indexOf('iPad') !== -1){
				this.options.width = 1400;
				this.options.height = 490;
				this.options.maxwidth=693;
				this.options.maxheight=490;
				this.minwidth=614;
				this.minheight=434;
				this.preLeft = 176;
			
			}else if(parseInt(this.body.outerWidth())>1300 || navigator.userAgent.indexOf('iPad') !== -1){
				this.options.width = 1340;
				this.options.height = 434;
				this.options.maxwidth=614;
				this.options.maxheight=434;
				this.minwidth=534;
				this.minheight=378;
				this.preLeft = 181;
			}else{
				this.options.width = 1000;
				this.options.height=375;
				this.options.maxwidth=530;
				this.options.maxheight=375;
				this.minwidth=452;
				this.minheight=320;
			    this.preLeft = 117;

			}
			this.total = this.data.length;
			this.pageNow = this.options.initPage;
			this.preNLeft = -530;
			this.nextNLeft = this.options.width;
			this.leftNav=this.preLeft+this.preLeft/2;  //箭头position左右定位
			this.margintop=28;  //第二张图片距离第一张的margin
			this.nextLeft = this.options.width-this.minwidth-this.preLeft;
			this.nheight=this.options.width-this.minwidth; //第三屏幕图片的left距离
			this.pageNowLeft = (this.options.width-this.options.maxwidth)/2;  //最大图左边距离
			this.drawContent();
		},
		drawContent: function(){
			this.parent.empty();
			this.parent.css({width:this.options.width+"px", height:this.options.height+"px", position: "relative"});
			this.content = document.createElement("DIV");
			this.content.className = this.options.className;
			this.content.cssText = "width:"+this.options.width+"px;height:"+this.options.height+"px;cursor:move;position:absolute;";
				this.bottomNav = document.createElement("DIV");
				this.bottomNav.className = "bottomNav";
				for(var i=1; i<= this.total; i++){
					var bottomItem = document.createElement("DIV");
					bottomItem.className = "bottomNavButtonOFF";
					if(i == this.pageNow){
						bottomItem.className = "bottomNavButtonOFF bottomNavButtonON";
					}
					bottomItem.setAttribute("ref", i);
					this.bottomNav.appendChild(bottomItem);
				}
				this.content.appendChild(this.bottomNav);
				this.bannerControls = '<div class="bannerControls"> <div class="leftNav" style="display: block; left:'+this.leftNav+'px"></div> <div class="rightNav" style="display: block;right:'+this.leftNav+'px"></div> </div>';
				this.content.innerHTML += this.bannerControls;

			this.contentHolder = document.createElement("DIV");
			this.contentHolder.style.width = this.options.width + 'px';
			this.contentHolder.style.height = this.options.height + 'px';
			
			for(var item=0, i = 1, l= this.data.length ; item < l ; ++item, ++i){
				var contentHolderUnit = document.createElement("DIV");
				contentHolderUnit.className = "contentHolderUnit";
				contentHolderUnit.setAttribute("ref", i);
				contentHolderUnit.setAttribute("id", 'contentHolderUnit' + (i));
				var unitItem = '<a href="'+this.data[item].url+'" target="_blank" class="elementLink">';
				unitItem += '</a>';
				unitItem += '<img src="'+this.data[item].img+'" alt="'+this.data[item].title+'"/>';
				unitItem += '<span class="elementOverlay"></span>';
				//unitItem += '<span class="leftShadow"></span>';
				//unitItem += '<span class="rightShadow"></span>';
				contentHolderUnit.innerHTML = unitItem;
				this.contentHolder.appendChild(contentHolderUnit);
			}
			this.content.appendChild(this.contentHolder);
			this.parent.append(this.content);
			this.parent.css({overflow:'hidden'});
			this.initContent();
			this.bind();
			this.start();
		},
		initContent: function(){
			contentHolderUnit = this.parent.find(".contentHolderUnit");
			contentHolderUnit.css({width:this.minwidth,height:this.minheight, opacity: 1, left:'0px', zIndex:0, marginTop: this.margintop});
			this.parent.find(".contentHolderUnit .elementOverlay").css({opacity:0.6});
			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+")").css({width:this.options.maxwidth,height:this.options.maxheight, opacity: 1, left: this.pageNowLeft+'px', zIndex: 3, marginTop: 0});
			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .elementOverlay").css({opacity:0});
			//this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .leftShadow").css({opacity:1});
			//this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .rightShadow").css({opacity:1});
			
			var pre = this.pageNow > 1 ? this.pageNow -1: this.total;
			var next = this.pageNow == this.total ? 1 : this.pageNow + 1;
			var nextN = next + 1 > this.total ? 1 : next+1;
			this.parent.find(".contentHolderUnit:nth-child("+pre+")").css({opacity: 1, left: this.preLeft+'px',height: this.minheight, width:this.minwidth, zIndex: 1, marginTop: this.margintop});
			this.parent.find(".contentHolderUnit:nth-child("+next+")").css({opacity: 1, left: this.nextLeft+'px',height: this.minheight, width: this.minwidth, zIndex: 1, marginTop: this.margintop});
			this.parent.find(".contentHolderUnit:nth-child("+nextN+")").css({opacity: 1, left: this.nheight+'px',height: this.minheight, width: this.minwidth, marginTop: this.margintop});
		},
		bind: function(){
			this.leftNav = this.parent.find(".leftNav");
			this.rightNav = this.parent.find(".rightNav");
			this.bottonNav = this.parent.find(".bottomNavButtonOFF");
			this.lists = this.parent.find(".contentHolderUnit");
			var _this = this;
			this.parent.mouseover(function(){
				_this.stop();
				_this.leftNav.show();
				_this.rightNav.show();
			});
			this.parent.mouseout(function(){
				_this.start();
				//_this.leftNav.hide();
				//_this.rightNav.hide();
			});
			
			_this.leftNav.click(function(){
				_this.turn("right");					 
			});
			_this.rightNav.click(function(){
				_this.turn("left");					 
			});
			_this.bottonNav.click(function(){
				var ref = parseInt(this.getAttribute("ref"));
				if(_this.pageNow == ref) return false;

				if(_this.pageNow < ref){
					var rightAbs = ref - _this.pageNow;
					var leftAbs = _this.pageNow + _this.total - ref;
				}else{
					var rightAbs = _this.total - _this.pageNow + ref;
					var leftAbs = _this.pageNow - ref;
				}
				if(leftAbs < rightAbs){
					 dir = "right";	
				}else{
					 dir = "left";	
				}

				_this.turnpage(ref, dir);
				return false;
			});
			
			_this.lists.click(function(e){
				var ref = parseInt(this.getAttribute("ref"));
				if(_this.pageNow == ref) {
					return true;
				}else{
					e.preventDefault();
				}
				if(_this.pageNow < ref){
					var rightAbs = ref - _this.pageNow;
					var leftAbs = _this.pageNow + _this.total - ref;
				}else{
					var rightAbs = _this.total - _this.pageNow + ref;
					var leftAbs = _this.pageNow - ref;
				}
				if(leftAbs < rightAbs){
					 dir = "right";	
				}else{
					 dir = "left";	
				}
				_this.turnpage(ref, dir);	

			});
		},
		initBottomNav: function(){
				this.parent.find(".bottomNavButtonOFF").removeClass("bottomNavButtonON");
				this.parent.find(".bottomNavButtonOFF:nth-child("+this.pageNow+")").addClass("bottomNavButtonON");
		},
		start: function(){
			var _this = this;
			if(_this.timerId) _this.stop();
			_this.timerId = setInterval(function(){
				if(_this.options.direct == "left"){
					_this.turn("left");	
				}else{
					_this.turn("right");	
				}
			}, _this.options.delay);
		},
		stop: function(){
			clearInterval(this.timerId);
		},
		turn: function(dir){
			var _this = this;
			
			if(dir == "right"){
				var page = _this.pageNow -1;
				if(page <= 0) page = _this.total;
			}else{
				var page = _this.pageNow + 1;
				if(page > _this.total) page = 1;
			}
			_this.turnpage(page, dir);
		},
		turnpage: function(page, dir){
			var _this = this;
			if(_this.locked) return false;
			_this.locked = true;
			if(_this.pageNow == page) return false;
			
			var run = function(page, dir, t){
				//alert(page);
				var pre = page > 1 ? page -1: _this.total;
				var next = page == _this.total ? 1 : page + 1;
				var preP = pre - 1 >= 1 ? pre-1 : _this.total;
				var nextN = next + 1 > _this.total ? 1 : next+1;
				if(pre != _this.pageNow && next != _this.pageNow){
					var nowpre = _this.pageNow > 1 ? _this.pageNow -1: _this.total;
					var nownext = _this.pageNow == _this.total ? 1 : _this.pageNow + 1;
					_this.parent.find(".contentHolderUnit:nth-child("+nowpre+")").animate({opacity: 1,width:_this.minwidth,height:_this.minheight, left:_this.nheight+'px', zIndex:0, marginTop: _this.margintop}, t);
					_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").animate({width:_this.minwidth,height:_this.minheight, opacity: 1, left:_this.nheight+'px', zIndex:0, marginTop:_this.margintop}, t);
					_this.parent.find(".contentHolderUnit:nth-child("+nownext+")").animate({width:_this.minwidth,height:_this.minheight, opacity: 1, left:_this.nheight+'px', zIndex:0, marginTop: _this.margintop}, t);
				}
				if(dir == 'left'){					
					//_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").css({zIndex: 1});
					_this.parent.find(".contentHolderUnit .elementOverlay").css({opacity:0.6});
					_this.parent.find(".contentHolderUnit:nth-child("+preP+")").css({zIndex:1});
					_this.parent.find(".contentHolderUnit:nth-child("+preP+")").animate({ opacity: 1,left:'0px',width:_this.minwidth,height:_this.minheight, zIndex:1, marginTop: _this.margintop},t, "", function(){_this.locked=false;});

					_this.parent.find(".contentHolderUnit:nth-child("+pre+")").css({zIndex:2});
					_this.parent.find(".contentHolderUnit:nth-child("+pre+")").animate({opacity: 1, left: _this.preLeft+'px', height: _this.minheight, width: _this.minwidth, zIndex: 2, marginTop:_this.margintop}, t);
					
					_this.parent.find(".contentHolderUnit:nth-child("+page+")").css({zIndex: 3});
					_this.parent.find(".contentHolderUnit:nth-child("+page+")").animate({opacity: 1, left: _this.pageNowLeft+'px', height:_this.options.maxheight, width:_this.options.maxwidth, zIndex: 3, marginTop: '0'}, t);
					_this.parent.find(".contentHolderUnit:nth-child("+page+") .elementOverlay").css({opacity:0});

					_this.parent.find(".contentHolderUnit:nth-child("+next+")").css({zIndex:2});
					_this.parent.find(".contentHolderUnit:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', height: _this.minheight, width:_this.minwidth, zIndex: 2, marginTop:_this.margintop}, t);

					_this.parent.find(".contentHolderUnit:nth-child("+nextN+")").css({zIndex:0});
					_this.parent.find(".contentHolderUnit:nth-child("+nextN+")").animate({opacity: 1,zIndex:1 ,left: _this.nheight+'px',height: _this.minheight, width: _this.minwidth, marginTop: _this.margintop},t, "", function(){_this.locked=false;});
		
					
				}else{
					//_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").css({zIndex: 0});  
					_this.parent.find(".contentHolderUnit .elementOverlay").css({opacity:0.6})
					_this.parent.find(".contentHolderUnit:nth-child("+preP+")").css({zIndex:0});
					_this.parent.find(".contentHolderUnit:nth-child("+preP+")").animate({width:_this.minwidth,height:_this.minheight, opacity: 1, left:'0px', zIndex:0, marginTop: _this.margintop},t, "", function(){_this.locked=false;});

					_this.parent.find(".contentHolderUnit:nth-child("+pre+")").css({zIndex:2});
					_this.parent.find(".contentHolderUnit:nth-child("+pre+")").animate({opacity: 1, left: _this.preLeft+'px', height:_this.minheight, width: _this.minwidth, zIndex: 2, marginTop:_this.margintop}, t);

					_this.parent.find(".contentHolderUnit:nth-child("+page+")").css({zIndex: 3});
					_this.parent.find(".contentHolderUnit:nth-child("+page+")").animate({opacity: 1, left: _this.pageNowLeft+'px', height: _this.options.maxheight, width: _this.options.maxwidth, zIndex: 3, marginTop: '0px'}, t);
					_this.parent.find(".contentHolderUnit:nth-child("+page+") .elementOverlay").css({opacity:0});
					
					_this.parent.find(".contentHolderUnit:nth-child("+next+")").css({zIndex:2});
					_this.parent.find(".contentHolderUnit:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', height: _this.minheight, width: _this.minwidth, zIndex: 2, marginTop:_this.margintop}, t);

					_this.parent.find(".contentHolderUnit:nth-child("+nextN+")").css({zIndex:1})
					_this.parent.find(".contentHolderUnit:nth-child("+nextN+")").animate({width:_this.minwidth,height:_this.minheight, opacity: 1,zIndex:1, left:_this.nheight+'px', zIndex:0, marginTop: _this.margintop}, t, "",function(){_this.locked=false;});
				}
			
				_this.pageNow = page;
				_this.initBottomNav();
			};
			
			run(page, dir,_this.options.speed);					
			
		}
		
	};

	posterTvGrid.options = {
		offsetPages : 5,//默认可视最大条数
		direct : "left",//滚动的方向
		initPage : 1,//默认当前显示第几条
		className : "posterTvGrid",//最外层样式
		autoWidth : true,//默认不用设置宽
		width : 970,//最外层宽，需要使用的时候在传,默认由程序自动判断
		height : 665,//最外层高 
		maxwidth:940,//屏幕为1152时的尺寸宽
		maxheight:665, //屏幕为1152时的尺寸高
		delay : 5000,//滚动间隔（毫秒）
		speed : 500 //滚动速度毫秒
	};
	
	window.posterTvGrid = posterTvGrid;
})(jQuery);