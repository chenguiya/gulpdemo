function clearWxTip(){var o=document.getElementById("wxTip");o.removeEventListener("touchstart",clearWxTip,!1),document.body.removeChild(o),androidBtn.classList.remove("download-btn"),androidBtn.onclick=androidDownload}function clearWxTipios(){var o=document.getElementById("wxTip");o.removeEventListener("touchstart",clearWxTipios,!1),document.body.removeChild(o),iosBtn.classList.remove("download-btn"),iosBtn.onclick=iosDownload}var isWeiXin=-1!=navigator.userAgent.toLowerCase().indexOf("micromessenger"),bd=document.body,androidBtn=document.getElementById("andBtn3"),iosBtn=document.getElementById("iosBtn3"),androidDownload=function(o){if(isWeiXin){if(!document.getElementById("wxTip")){window.scrollTo(0,0);var d=document.createElement("div");d.className="modal-backdrop",d.id="wxTip",d.innerHTML='<div class="download-img"></div><div class="download-txt"></div>',document.body.appendChild(d),androidBtn.classList.add("download-btn"),d.addEventListener("touchstart",clearWxTip,!1)}return!1}},iosDownload=function(o){if(isWeiXin){if(!document.getElementById("wxTip")){window.scrollTo(0,0);var d=document.createElement("div");d.className="modal-backdrop",d.id="wxTip",d.innerHTML='<div class="download-img"></div><div class="download-txt"></div>',document.body.appendChild(d),iosBtn.classList.add("download-btn"),d.addEventListener("touchstart",clearWxTipios,!1)}return!1}};androidBtn.onclick=androidDownload,iosBtn.onclick=iosDownload;