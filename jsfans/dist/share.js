define("test/share",["jquery","common","ZeroClipboard"],function(e,t,n){"user strict";var r=e("jquery"),d=e("common"),i=null,o={};o.init=function(){r("#sharedCode").click(function(){var e='<div style="text-align:center; padding-right:20px; padding-top:20px;"><img style="border:1px solid #dde2e4;" src="'+codeImg+'"></div>';d.layerShow({html:e,title:"扫描二维码",width:""})}),i=new ZeroClipboard.Client,i.setHandCursor(!0),i.addEventListener("mouseOver",function(e){var t=document.getElementById("share_addr").textContent;i.setText(t)}),i.addEventListener("complete",function(e,t){alert("复制成功!")}),i.glue("btn_copy","clip_container")},o.shared=function(e,t,n,r){d.shared(e,t,n,r)},n.exports=o});