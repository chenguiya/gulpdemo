define("test/detailAll",["jquery","common"],function(t,e,l){"user strict";var i=t("jquery"),n=t("common"),a={};a.init=function(){var t=i("#detailCHBOX");t.on({click:function(){var t=i(this),e=t.next().html();if("undefined"!=typeof e){var l=(t.next().find("li").length,t.next().height()+110);if(l>700)var a='<div style="height:600px; overflow-y:scroll"><ul class="actDetal" style="padding:25px;font-size: 14px;">'+e+"</ul></div>";else var a='<ul class="actDetal" style="padding:25px;font-size: 14px;">'+e+"</ul>"}else var l=130,a='<ul class="actDetal" style="padding:25px;font-size: 14px;"><li>暂无数据</li></ul>';return n.layerShow({html:a,title:"信息",width:"",height:l}),!1}},".edit_icon")},l.exports=a});