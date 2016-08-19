define("test/rights",["jquery","common","layer","js/module/layer/skin/layer.css"],function(require, exports, module){
    "user strict";
    var $=require("jquery");var layer=require('layer');var j=require('common');
    require('js/module/layer/skin/layer.css');
    var m={};
    m.init=function(){
        $('#level_add').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        $('.level_setrights').click(function(){
            var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
        });
        var rights=$('#tab-member-rights');
        rights.on({
            click:function(){
                var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]);
            }
        },'.admin_add_member');
        var over=$('#tab-member-overview');
        over.on({
            click:function(){
               var arr=$(this).attr('data-click').split(",");
            m.layer_show(arr[0],arr[1],arr[2],arr[3]); 
            }
        },'.remark_name')
    },
    m.center=function(){
        $('.text-primary').click(function(){
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

