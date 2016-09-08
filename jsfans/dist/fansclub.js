define("js/fansclub", ["jquery", "common", "layer", "js/module/layer/skin/layer.css"], 
function(t, a, l) {
    "user strict";
    var i = t("jquery"),
    c = t("layer");
    t("common");
    t("js/module/layer/skin/layer.css");
    var n = {};
    n.init = function() {
        i("#fansclub_edit_logo").click(function() {
            var t = i(this).attr("data-click").split(",");
            n.layer_show(t[0], t[1], t[2], t[3])
        }),
        i("#fansclub_edit_name").click(function() {
            var t = i(this).attr("data-click").split(",");
            n.layer_show(t[0], t[1], t[2], t[3])
        }),
        i("#fansclub_edit_template").click(function() {
            var t = i(this).attr("data-click").split(",");
            n.layer_show(t[0], t[1], t[2], t[3])
        }),
        i("#fansclub_edit_introduce").click(function() {
            var t = i(this).attr("data-click").split(",");
            n.layer_show(t[0], t[1], t[2], t[3])
        }),
        i("#fansclub_edit_wxname").click(function() {
            var t = i(this).attr("data-click").split(",");
            n.layer_show(t[0], t[1], t[2], t[3])
        }),
        i("#fansclub_edit_qrcode").click(function() {
            var t = i(this).attr("data-click").split(",");
            n.layer_show(t[0], t[1], t[2], t[3])
        })
    },
    n.layer_show = function(t, a, l, n) { (null == t || "" == t) && (t = !1),
        (null == a || "" == a) && (a = "404.html"),
        (null == l || "" == l) && (l = 800),
        (null == n || "" == n) && (n = i(window).height() - 50),
        c.open({
            type: 2,
            area: [l + "px", n + "px"],
            fix: !1,
            maxmin: !0,
            scrollbar: !1,
            shade: .4,
            title: t,
            content: a
        })
    },
    l.exports = n
});