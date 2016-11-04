function showmsg(msg, offsetObj, delay) {
      delay = delay || 2000;
      msg = msg || '操作成功';
      var timeid = '';
      if (!offsetObj) {
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      }
      var winWidth = document.body.clientWidth || window.innerWidth;

      if (!$('#toptip').length) {
        $(document.body).prepend('<div id="jsapend" style="position:relative;"><div id="toptip" style="position: absolute; font-size: 15px; color: #fefefe;  font-family: Microsoft YaHei;  text-align: center; border-radius: 5px; line-height: 25px; padding: 10px 30px 10px 30px; min-height: 50px;background: #3d4859;z-index: 999999;">' + msg + '</div></div>');
      } else {
        $('#toptip').fadeOut('fast').html(msg);
      }

      if (!offsetObj) {
        offsetObj = {'top': document.body.scrollTop + winHeight / 2, 'left': winWidth / 2 - $('#toptip').outerWidth(true) / 2};
      } else if (!offsetObj.left) {
        offsetObj.left = winWidth / 2 - $('#toptip').outerWidth(true) / 2;
      } else {
        offsetObj.left = offsetObj.left - $('#toptip').outerWidth(true) / 2;
      }

      $('#toptip').css(offsetObj).stop().fadeIn('normal', function() {
        if (timeid)
          clearTimeout(timeid);
        timeid = setTimeout(function() {
          $('#toptip').fadeOut();
        }, delay);
      });
};