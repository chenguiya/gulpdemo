$(function(){
     function fixedWatch(t){
          if(document.activeElement.nodeName=='INPUT'){
               t.css({position:"static",bottom:"auto","margin-top":"-53px"})
          }else{
             t.css({position:"fixed",bottom:"0"});
             if(window.res){
               clearInterval(window.res);
               window.res=null;
             }  
          }
     }
     if(isIOS){
          $(".fixedComment input").focus(function(){
               if(!window.res){
                  fixedWatch($(".fixedComment"));
                  window.res=setInterval(function(){
                    fixedWatch($(".fixedComment"));
                  },500); 
               }
          });    
     }
})