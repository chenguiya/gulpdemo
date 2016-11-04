var isWeiXin = navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
var bd=document.body;
var androidBtn=document.getElementById('andBtn3');
var iosBtn=document.getElementById('iosBtn3');
var androidDownload=function(e){
  if(isWeiXin){
    if(!document.getElementById('wxTip')){
      window.scrollTo(0,0);
      var dom=document.createElement('div');
      dom.className='modal-backdrop';
      dom.id='wxTip';
      dom.innerHTML='<div class="download-img"></div><div class="download-txt"></div>';
      document.body.appendChild(dom);
      androidBtn.classList.add('download-btn');
      dom.addEventListener('touchstart',clearWxTip,false);
    }
    return false;
  }
}
var iosDownload=function(e){
  if(isWeiXin){
    if(!document.getElementById('wxTip')){
      window.scrollTo(0,0);
      var dom=document.createElement('div');
      dom.className='modal-backdrop';
      dom.id='wxTip';
      dom.innerHTML='<div class="download-img"></div><div class="download-txt"></div>';
      document.body.appendChild(dom);
      iosBtn.classList.add('download-btn');
      dom.addEventListener('touchstart',clearWxTipios,false);
    }
    return false;
  }
}
function clearWxTip(){
  var wxTip=document.getElementById('wxTip');
  wxTip.removeEventListener('touchstart',clearWxTip,false);
  document.body.removeChild(wxTip);
  androidBtn.classList.remove('download-btn');
  androidBtn.onclick=androidDownload;
}
function clearWxTipios(){
  var wxTip=document.getElementById('wxTip');
  wxTip.removeEventListener('touchstart',clearWxTipios,false);
  document.body.removeChild(wxTip);
  iosBtn.classList.remove('download-btn');
  iosBtn.onclick=iosDownload;
}
androidBtn.onclick=androidDownload;
iosBtn.onclick=iosDownload;