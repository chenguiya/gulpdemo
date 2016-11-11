define("test/detailAll",["jquery","common"],function(require, exports, module){
    "user strict";var $=require("jquery");var mon=require("common");
    var a={};
    a.init=function(){
        var detail=$('#detailCHBOX');
        detail.on({
            click:function(){
                var _self=$(this);
                var nexthtml=_self.next().html();
                if(typeof(nexthtml) !=='undefined'){
                   var liHeight=_self.next().find('li').length;
                   var hei=_self.next().height()+110;
                   if(hei > 700){
                     var html='<div style="height:600px; overflow-y:scroll"><ul class="actDetal" style="padding:25px;font-size: 14px;">'+nexthtml+'</ul></div>';
                   }else{
                   var html='<ul class="actDetal" style="padding:25px;font-size: 14px;">'+nexthtml+'</ul>'
                   }
                }else{
                   var hei=130;
                   var html='<ul class="actDetal" style="padding:25px;font-size: 14px;"><li>暂无数据</li></ul>';
                } 
                mon.layerShow({
                       html:html,
                       title:'信息',
                       width:'',
                       height:hei
                }) 
              return false; 
            }
        },'.edit_icon')
    }
    module.exports = a;

});

