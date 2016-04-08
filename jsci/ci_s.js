if($('.fast_postwap').length){
        if(isIOS){
           window.res = null;
           function fixedWatch(el) {
              if(document.activeElement.nodeName == 'INPUT'){
                el.css({'position':'static','bottom':'auto','margin-top':'-53px'});
              } else {
                el.css({'position':'fixed','bottom':'0'});
                if(window.res ) { clearInterval(window.res ); window.res  = null; }
              }
           }
           $('.fast_postwap input').focus(function () {
              if(!window.res) {
                  fixedWatch($('.fast_postwap'));
                  window.res = setInterval(function () {
                    fixedWatch($('.fast_postwap'));
                  }, 500);
              }
          });
       }
   }