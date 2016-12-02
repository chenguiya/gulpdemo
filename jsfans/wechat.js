define("test/mobile/wechat",["jquery","common","http://res.wx.qq.com/open/js/jweixin-1.0.0.js"],function(require,exports,module){
    "user strict";
    var $=require("jquery");var j=require("common");var wx=require('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
    var isweiXin=navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
    var m={};
    var InterValObj;//timer变量，控制时间
    var count=5;//间隔函数，1秒执行
    var curCount=60;  //当前剩余秒数
    m.init=function(){
    	if($('#tipContent').length){
    		var o=document.getElementById('tipContent');
    		window.setInterval(function(){m.scrollup(o,40,0)},3000)
    	}
        //微信分享功能
        if(isweiXin){
            if(shareok==1){
                m.share();
            }   
        }
        //未绑定手机进行弹窗
        $('#show_mobile_Now').click(function(){
            $('#mask').css('display','block');
            $('#show_mobile_binding').css('display','table');
        });
        var show_mobile=$('#show_mobile_binding');
        //手机验证
        show_mobile.on({
            click:function(){
                var mobile=$('#mobile').val();
                var actid=$('#actid').val();
                $.ajax({
                    type:'POST',
                    url:homeUrl+'wechat/misc/send_authcode',
                    data:{actid:actid,mobile:mobile},
                    cache:false,
                    dataType:'json',
                    success:function(data){
                        if(data.code==200){
                            $('#sendCode').attr('disabled','true');
                            $('#sendCode').addClass('sendcodeHover');
                            InterValObj=window.setInterval(m.setTime,1000);//启动计时器，1秒执行一次
                        }else{
                            j.showmsg(data.message,'',1000);
                        }
                    },
                    error:function(){
                        j.showmsg('数据有问题，稍后再试！','',1000);
                    }
                })
            }
        },'#sendCode');
        //手机确定按钮跳转购买弹窗
        show_mobile.on({
            click:function(){
                var actid=$('#actid').val();
                var mobile=$('#mobile').val();
                var authcode=$('#authcode').val();
                if(mobile == '' || authcode == ''){
                    j.showmsg('请输入手机号或验证码');
                    return false;
                }
                $.ajax({
                    type:'POST',
                    url:homeUrl+'wechat/misc/check_authcode',
                    data:{actid:actid,mobile:mobile,authcode:authcode},
                    cache:false,
                    dataType:'json',
                    success:function(data){
                        if(data.code==200){
                            $('#show_mobile_binding').css('display','none');
                            $('#show_cart_binding').css('display','table');
                        }else{
                           j.showmsg(data.message,'',1000);
                        }
                    },
                    error:function(){
                        j.showmsg('数据有问题，稍后再试！','',1000);
                    }
                })
            }
        },'#mobile_next_cart');
        //购买弹窗
        $('#show_cart_Now').click(function(){
            $('#mask').css('display','block');
            $('#show_cart_binding').css('display','table');
        });
        var show_cart=$('#show_cart_binding');
        var maxbuy=parseInt(show_cart.find('#maxbuy').text());
        //数量增加
        show_cart.on({
            click:function(){
                 var total=$(this).prev();
                 $(this).parent().find('#btn_minus i').removeClass('icon-minus-out');
                 if(!m.isInt(total.val())){
                    total.val('1');
                 }
                 var num=parseInt(total.val())+1;
                 //var maxnum=maxbuy-num+1;
                 if(num >= maxbuy && maxbuy >0){
                    $(this).find('i').addClass('icon-plus-out');
                    j.showmsg('您最多可购买'+maxbuy+'次！');
                    num=maxbuy;
                   // maxnum=1;
                 }
                 total.val(num);
                 show_cart.find('.numSL em').text(num);
                 //show_cart.find('#maxbuy').text(maxnum)
            }
        },'#btn_plus');
        //数量减少
        show_cart.on({
            click:function(){
                var total=$(this).next();
                $(this).parent().find('#btn_plus i').removeClass('icon-plus-out');
                 if(!m.isInt(total.val())){
                    total.val('1');
                 }
                 var num=parseInt(total.val());
                 if(num-1<1){
                    $(this).find('i').addClass('icon-minus-out');
                    return false;
                 }
                 num--;
                 total.val(num);
                 show_cart.find('.numSL em').text(num);
            }
        },'#btn_minus');
        //手机购买跳转微信支付-跳转弹窗分享
        show_cart.on({
            click:function(){
                var nums=parseInt($('#total').val());
                var actid=parseInt($('#actid').val());
                var fromuid=$('#fromuid').val();
                if(isweiXin){
                    $.ajax({
                    type:'POST',
                    url:homeUrl+'wechat/misc/order',
                    data:{id:actid,times:nums},
                    cache:false,
                    dataType:'json',
                    success:function(data){
                        if(data.code==200){
                            wx.config({
              debug:!1,
              appId:shareDate.appId,
                                timestamp:shareDate.timestamp,
                                nonceStr:shareDate.nonceStr,
                                signature:shareDate.signature,
              jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","hideOptionMenu","showOptionMenu","chooseWXPay"]
        });
                            wx.ready(function(){
                                wx.chooseWXPay({
                                    timestamp: data.data.jsApiParameters.timeStamp,
                                    nonceStr: data.data.jsApiParameters.nonceStr,
                                    package: data.data.jsApiParameters.package,
                                    signType: data.data.jsApiParameters.signType,
                                    paySign: data.data.jsApiParameters.paySign,
                                    appId:shareDate.appId,
                                    success: function(res) {
                                        m.paytrue(data.data.orderid,fromuid);
                                    },
                                    cancel: function(res) {
                                    // code for IE7+, Firefox, Chrome, Opera, Safari
                                        alert('您确定要取消支付?');
                                    },
                                    fail: function(res) {
                                    // code for IE6, IE5
                                        alert('支付失败');
                                    }
                                });
                            });
                            wx.error(function(e){
                                alert(e.errMsg)
                            });
                            //m.chooseWXPay(data.data.orderid,data.data.jsApiParameters.appId,data.data.jsApiParameters.nonceStr,data.data.jsApiParameters.package,data.data.jsApiParameters.signType,data.data.jsApiParameters.timeStamp,data.data.jsApiParameters.paySign,data.data.jsApiParameters.signature);
                        }else{
                            j.showmsg(data.message,'',1000);
                        }
                    },
                    error:function(){
                        j.showmsg('数据有问题，稍后再试！','',1000);
                    }
                    });
                }else{
                    j.showmsg('请在微信中购买哦！亲','',1000);
                }
            }
        },'#cart_next_share');
        var show_share=$('#show_share_binding');
        //分享按钮弹窗
        show_share.on({
            click:function(){
                $('.download_img').css('display','block');
            }
        },'#share_next_ok')
        //关闭弹窗
        $('.icon-close').click(function(){
            $(this).closest('.layer_iframe').css('display','none');
            $('#mask').css('display','none');
            if($('.download_img').css('display')=='block'){
                $('.download_img').css('display','none');
            }
        });
        
    },
    m.luckyShare=function(){
        $('#lucky_share').click(function(){
            $('#mask').css('display','block');
            $('.download_img').css('display','block');
        });
        $('#mask').click(function(){
            $('.download_img').css('display','none');
            $('#mask').css('display','none'); 
        })
    },
    ///滚动主方法
    ///参数:o 滚动块对象
    ///参数:d 每次滚屏高度
    ///参数:c 当前已滚动高度
    m.scrollup=function(o,d,c){
        if(d==c){
            var t=m.getFirstChild(o.firstChild).cloneNode(true);
            o.removeChild(m.getFirstChild(o.firstChild));
            o.appendChild(t);
            t.style.marginTop="0px";
        }else{
        	c+=2;
        	m.getFirstChild(o.firstChild).style.marginTop=-c+"px";
        	window.setTimeout(function(){m.scrollup(o,d,c)},20);
        }
    },
    //解决firefox下会将空格回车作为节点的问题
    m.getFirstChild=function(node){
    	while (node.nodeType!=1)
    	{
    		node=node.nextSibling;
    	}
    	return node;
    },
    m.setTime=function(){
        if(curCount==0){
            window.clearInterval(InterValObj);//停止计时器
            $('#sendCode').removeAttr('disabled');//启用按钮
            $('#sendCode').removeClass('sendcodeHover');
            $('#sendCode').val('重新发送验证码');
            curCount=60;
        }else{
            curCount--;
            $('#sendCode').val(curCount+"'");
        }
    },
    m.isInt=function(str){
        return  /^[-\+]?\d+$/.test($.trim(str));
    },
     m.paytrue=function(orderid,fromuid){
        $.ajax({
            type:'POST',
            url:homeUrl+'wechat/misc/do_payment',
            data:{orderid:orderid,fromuid:fromuid},
            //cache:false,
            dataType:'json',
            success:function(data){
                if(data.code==200){
                j.showmsg('亲，支付成功！','',1000);
                $('#show_cart_binding').css('display','none');
                $('#show_share_binding').css('display','table');
                   if(shareok==0){
                      m.share();
                   }
                }else{
                    alert(data.message);
                }
            },
            error:function(){
                j.showmsg('微信支付有问题','',1000);
            }
        })
     },
     m.share=function(){
            wx.config({
                debug:!1,
                appId:shareDate.appId,
                timestamp:shareDate.timestamp,
                nonceStr:shareDate.nonceStr,
                signature:shareDate.signature,
                jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","hideOptionMenu","showOptionMenu","chooseWXPay"]
            });
            
            wx.ready(function(){
                wx.showOptionMenu(),
                wx.onMenuShareAppMessage({
                    title:shareTitle,
                    desc:shareDescription,
                    link:shareUrl,
                    imgUrl:shareImage,
                    trigger:function(e){},
                    success:function(e){
                    },
                    cancel:function(e){},
                    fail:function(e){}
                });
                wx.onMenuShareTimeline({
                    title:shareTitle,
                    link:shareUrl,
                    imgUrl:shareImage,
                    trigger:function(e){},
                    success:function(e){
                    },
                    cancel:function(e){},
                    fail:function(e){}
                })
            });
            wx.error(function(e){
                alert(e.errMsg)
            });
     }
    /*m.chooseWXPay=function(orderid,appIdType,nonceStrType,packageType,signTypeType,timeStampType,paySignType,signatureType){
        wx.ready(function(){
            wx.chooseWXPay({
                timestamp: timeStampType,
                nonceStr: nonceStrType,
                package: packageType,
                signType: signTypeType,
                paySign: paySignType,
                success: function(res) {
                    alert('支付成功')
                },
                cancel: function(res) {
                    // code for IE7+, Firefox, Chrome, Opera, Safari
                    alert('您确定要取消支付?');
                },
                fail: function(res) {
                    // code for IE6, IE5
                    alert('支付失败');
                }
            });
        });
        wx.error(function(e){
            alert(e.errMsg)
        });
    },*/
    /*m.wechatShow=function(settings){
        var defaults={
            html:''
        };
        settings=$.extend(defaults,settings);
        var parent=$('#parent_body');
        var dhtm='<div id="overpop"><div class="layer_shadow"></div><div class="layer_iframe">';
              dhtm+='<div class="layer_section">';
                dhtm+='<div class="layer_firstchild m-anim-scale">';
                  dhtm+='<div class="layer_title"><span class="title">请先验证手机号码以通知中奖</span><span class="icon-close"></span></div>';
                  dhtm+='<div class="layer_Content">'+settings.html+'</div>';
                dhtm+='</div>';
              dhtm+='</div>';
            dhtm+='</div></div>';
        parent.append(dhtm);
        if(parent.find('.icon-close').length > 0){
            parent.find('.icon-close').click(function(){
                $(this).parents('#overpop').remove();
            });
        }
    }   */
    module.exports = m;
});

