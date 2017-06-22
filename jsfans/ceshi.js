;(function (window, $, undefined) {
    $.fn.createTab = function (opt) {
        var def = {
            activeEvt: 'mouseover',
            activeCls: 'active'
        }
        $.extend(def, opt);
        var childNavList=$(this).children();
        var childContentList=$(this).next().children();
        $(childContentList[0]).show();
        childNavList.each(function(index,ele){
          $(ele).click(function(){
            childContentList.hide();
            $(childContentList[index]).show();
            childNavList.removeClass(def.activeCls);
            $(this).addClass(def.activeCls);
            return false;
          })
        })
    }

})(window, jQuery);