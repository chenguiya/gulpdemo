define(function(require, exports, module){
 var $=require("jquery");
   var Dat={
   	   isEmpty: function(str) {  //框为空
          return $.trim(str) == '' || str == undefined
       },
       isMobile:function(str){  //检测电话号码
         return $.trim(str) !== '' && /^1[3|4|5|7|8][0-9]\d{8}$/.test($.trim(str));
       }
   };
   return Dat;
});

