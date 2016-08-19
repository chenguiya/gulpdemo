define("test/wallet",["jquery","common","layer","js/module/layer/skin/layer.css"],function(require, exports, module){
    "user strict";
    var $=require("jquery");var layer=require('layer');var j=require('common');
    require('js/module/layer/skin/layer.css');
    var m={};
    m.init=function(){
        $('#wallet_drawcash').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#wallet_charge').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        var over=$('#datatable');
        over.on({
            click:function(){
               var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]); 
            }
        },'.wallet_detail');
        $('#wallet_set_phone').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#wallet_set_password').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#wallet_modify_password').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('#wallet_set_account').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        })
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

