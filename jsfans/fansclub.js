define("test/fansclub",["common","layer","js/module/layer/skin/layer.css"],function(require, exports, module){
    "user strict";
    var layer=require('layer');
    var j=require('common');
    require('js/module/layer/skin/layer.css');
    var m={};
    m.init=function(){
        $('#fansclub_edit_logo').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#fansclub_edit_name').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#fansclub_edit_template').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#fansclub_edit_introduce').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#fansclub_edit_wxname').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#fansclub_edit_qrcode').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        //头像加载不成功触发
        /*$('img.img_noerror').on('error',function(){
           var img=event.srcElement; 
           img.src=homeUrl+'/static/images/no_logo.png'; 
           img.onerror=null; //控制不要一直跳动 
        });*/
    },
    m.layer_show=function(title,url,w,h){
        if (title == null || title == '') {
            title=false;
        };
        if (url == null || url == '') {
            url="404.html";
        };
        if (w == null || w == '') {
            w=800;
        };
        if (h == null || h == '') {
            h=($(window).height() - 50);
        };
        layer.open({
            type: 2,
            area: [w+'px', h +'px'],
            fix: false, //不固定
            maxmin: true,
            scrollbar:false,
            shade:0.4,
            title: title,
            content: url
        });
    }
    
        
    
   module.exports = m;
});

