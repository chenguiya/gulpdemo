define(function(require, exports, module){
 var $=require("jquery");
 $.fn.packetset=function(settings){
  var defaults={
    jsons:null,
    endText:'已经结束',
    shortURL:null,
    sendResultsURL:null
  };
  var config=$.extend(defaults,settings);
  var isweiXin=navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
  var superContainer =$(this);
  alert('为');
  };
});