$(function(){function n(n){"INPUT"==document.activeElement.nodeName?n.css({position:"static",bottom:"auto","margin-top":"-53px"}):(n.css({position:"fixed",bottom:"0"}),window.res&&(clearInterval(window.res),window.res=null))}isIOS&&$(".fixedComment input").focus(function(){window.res||(n($(".fixedComment")),window.res=setInterval(function(){n($(".fixedComment"))},500))})});