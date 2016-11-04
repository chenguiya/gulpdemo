define("test/share",["common","ZeroClipboard"],function(require, exports, module){
    "user strict";
    var s=require('common');
    var clip = null;  
    var m={};
    m.init=function(){
    	//二维码点击弹窗
    	$('#sharedCode').click(function(){
            var html='<div style="text-align:center; padding-right:20px; padding-top:20px;"><img style="border:1px solid #dde2e4;" src="'+codeImg+'"></div>';
    		s.layerShow({
    			html:html,
    			title:'扫描二维码',
    			width:''
    		})
    	}) ;
    	//复制功能
    	clip = new ZeroClipboard.Client();
    	clip.setHandCursor(true);
    	clip.addEventListener('mouseOver', function (client){
            var u=document.getElementById('share_addr').textContent;
    		clip.setText(u);
    	});
    	clip.addEventListener('complete', function (client, text) {
    		alert("复制成功!");
    	});
    	clip.glue('btn_copy', 'clip_container');
    },
    m.shared=function(bdText,bdDesc,bdUrl,bdPic){
         window._bd_share_config = {
        common : {
            bdText : bdText,    
            bdDesc : '',    
            bdUrl : bdUrl,   
            bdPic : bdPic
        },
        share : [{
            "tag":"pictureShare",
            "bdSize" : 32
        }]
    }
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
      //s.shared(bdText,bdDesc,bdUrl,bdPic);
    }
   module.exports = m;
});

