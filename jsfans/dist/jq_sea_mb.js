var shell={hideK:function(){document.getElementById("coverDetele")&&(document.getElementById("previewid").removeChild(document.getElementById("coverDetle")),document.getElementById("uploadID").style.display="inline-block")},checkForm:function(e){var t=new Array,r=!1;e.elements.title&&0==e.elements.title.value&&(t.push("名称不能为空"),r=!0),e.elements["class"]&&0==e.elements["class"].value&&(r=!0,t.push("活动类型需选择")),e.elements.starttimefrom&&0==e.elements.starttimefrom.value&&(r=!0,t.push("活动开始时间不能为空")),e.elements.starttimeto&&0==e.elements.starttimeto.value&&(r=!0,t.push("活动结束时间不能为空")),e.elements.expiration&&0==e.elements.expiration.value&&(r=!0,t.push("活动截止时间不能为空")),e.elements.place&&0==e.elements.place.value&&(r=!0,t.push("活动地址需填写")),e.elements.aid&&0==e.elements.aid.value&&(r=!0,t.push("活动封面需上传")),e.elements["free-event"]&&1==e.elements["free-event"].value&&0==e.elements["package[0][name]"].value&&(r=!0,t.push("收费活动设置最少填写一项"));var n=e.getElementsByClassName("isCod").length;if(n){for(var s=0,a=0;n>a;a++)0==e.getElementsByClassName("isCod")[a].checked&&s++;s==n&&(r=!0,t.push("报名设置最少勾选一项"))}var i=UE.getEditor("editor");return i.ready(function(){""==this.getContent()&&(r=!0,t.push("活动内容不能为空"))}),r&&(message=t.join("\n"),alert(message)),!r},checkNoticeForm:function(e){var t=new Array,r=!1;e.elements.title&&0==e.elements.title.value&&(r=!0,t.push(title_not_null));var n=UE.getEditor("editor");return n.ready(function(){""==this.getContent()&&(r=!0,t.push(editor_not_null))}),r&&(messnotice=t.join("\n"),alert(messnotice)),!r}};!function(e,t){function r(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function n(){return q++}function s(e){return e.match(I)[0]}function a(e){for(e=e.replace(N,"/"),e=e.replace(T,"$1/");e.match(w);)e=e.replace(w,"/");return e}function i(e){var t=e.length-1,r=e.charAt(t);return"#"===r?e.substring(0,t):".js"===e.substring(t-2)||e.indexOf("?")>0||"/"===r?e:e+".js"}function o(e){var t=j.alias;return t&&A(t[e])?t[e]:e}function u(e){var t,r=j.paths;return r&&(t=e.match(U))&&A(r[t[1]])&&(e=r[t[1]]+t[2]),e}function c(e){var t=j.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(O,function(e,r){return A(t[r])?t[r]:e})),e}function l(e){var t=j.map,r=e;if(t)for(var n=0,s=t.length;s>n;n++){var a=t[n];if(r=x(a)?a(e)||e:e.replace(a[0],a[1]),r!==e)break}return r}function f(e,t){var r,n=e.charAt(0);if(S.test(e))r=e;else if("."===n)r=a((t?s(t):j.cwd)+e);else if("/"===n){var i=j.cwd.match(B);r=i?i[0]+e.substring(1):e}else r=j.base+e;return 0===r.indexOf("//")&&(r=location.protocol+r),r}function d(e,t){if(!e)return"";e=o(e),e=u(e),e=c(e),e=i(e);var r=f(e,t);return r=l(r)}function v(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}function h(e,t,r){var n=k.createElement("script");if(r){var s=x(r)?r(e):r;s&&(n.charset=s)}m(n,t,e),n.async=!0,n.src=e,R=n,H?$.insertBefore(n,H):$.appendChild(n),R=null}function m(e,t,r){function n(){e.onload=e.onerror=e.onreadystatechange=null,j.debug||$.removeChild(e),e=null,t()}var s="onload"in e;s?(e.onload=n,e.onerror=function(){D("error",{uri:r,node:e}),n()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&n()}}function p(){if(R)return R;if(V&&"interactive"===V.readyState)return V;for(var e=$.getElementsByTagName("script"),t=e.length-1;t>=0;t--){var r=e[t];if("interactive"===r.readyState)return V=r}}function g(e){var t=[];return e.replace(M,"").replace(K,function(e,r,n){n&&t.push(n)}),t}function y(e,t){this.uri=e,this.dependencies=t||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!e.seajs){var E=e.seajs={version:"2.3.0"},j=E.data={},b=r("Object"),A=r("String"),_=Array.isArray||r("Array"),x=r("Function"),q=0,C=j.events={};E.on=function(e,t){var r=C[e]||(C[e]=[]);return r.push(t),E},E.off=function(e,t){if(!e&&!t)return C=j.events={},E;var r=C[e];if(r)if(t)for(var n=r.length-1;n>=0;n--)r[n]===t&&r.splice(n,1);else delete C[e];return E};var D=E.emit=function(e,t){var r=C[e];if(r){r=r.slice();for(var n=0,s=r.length;s>n;n++)r[n](t)}return E},I=/[^?#]*\//,N=/\/\.\//g,w=/\/[^/]+\/\.\.\//,T=/([^:/])\/+\//g,U=/^([^/:]+)(\/.+)$/,O=/{([^{]+)}/g,S=/^\/\/.|:\//,B=/^.*?\/\/.*?\//,k=document,G=location.href&&0!==location.href.indexOf("about:")?s(location.href):"",L=k.scripts,F=k.getElementById("seajsnode")||L[L.length-1],X=s(v(F)||G);E.resolve=d;var R,V,$=k.head||k.getElementsByTagName("head")[0]||k.documentElement,H=$.getElementsByTagName("base")[0];E.request=h;var P,K=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,M=/\\\\/g,z=E.cache={},J={},Q={},W={},Y=y.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};y.prototype.resolve=function(){for(var e=this,t=e.dependencies,r=[],n=0,s=t.length;s>n;n++)r[n]=y.resolve(t[n],e.uri);return r},y.prototype.load=function(){var e=this;if(!(e.status>=Y.LOADING)){e.status=Y.LOADING;var r=e.resolve();D("load",r);for(var n,s=e._remain=r.length,a=0;s>a;a++)n=y.get(r[a]),n.status<Y.LOADED?n._waitings[e.uri]=(n._waitings[e.uri]||0)+1:e._remain--;if(0===e._remain)return e.onload(),t;var i={};for(a=0;s>a;a++)n=z[r[a]],n.status<Y.FETCHING?n.fetch(i):n.status===Y.SAVED&&n.load();for(var o in i)i.hasOwnProperty(o)&&i[o]()}},y.prototype.onload=function(){var e=this;e.status=Y.LOADED,e.callback&&e.callback();var t,r,n=e._waitings;for(t in n)n.hasOwnProperty(t)&&(r=z[t],r._remain-=n[t],0===r._remain&&r.onload());delete e._waitings,delete e._remain},y.prototype.fetch=function(e){function r(){E.request(i.requestUri,i.onRequest,i.charset)}function n(){delete J[o],Q[o]=!0,P&&(y.save(a,P),P=null);var e,t=W[o];for(delete W[o];e=t.shift();)e.load()}var s=this,a=s.uri;s.status=Y.FETCHING;var i={uri:a};D("fetch",i);var o=i.requestUri||a;return!o||Q[o]?(s.load(),t):J[o]?(W[o].push(s),t):(J[o]=!0,W[o]=[s],D("request",i={uri:a,requestUri:o,onRequest:n,charset:j.charset}),i.requested||(e?e[i.requestUri]=r:r()),t)},y.prototype.exec=function(){function e(t){return y.get(e.resolve(t)).exec()}var r=this;if(r.status>=Y.EXECUTING)return r.exports;r.status=Y.EXECUTING;var s=r.uri;e.resolve=function(e){return y.resolve(e,s)},e.async=function(t,r){return y.use(t,r,s+"_async_"+n()),e};var a=r.factory,i=x(a)?a(e,r.exports={},r):a;return i===t&&(i=r.exports),delete r.factory,r.exports=i,r.status=Y.EXECUTED,D("exec",r),i},y.resolve=function(e,t){var r={id:e,refUri:t};return D("resolve",r),r.uri||E.resolve(r.id,t)},y.define=function(e,r,n){var s=arguments.length;1===s?(n=e,e=t):2===s&&(n=r,_(e)?(r=e,e=t):r=t),!_(r)&&x(n)&&(r=g(""+n));var a={id:e,uri:y.resolve(e),deps:r,factory:n};if(!a.uri&&k.attachEvent){var i=p();i&&(a.uri=i.src)}D("define",a),a.uri?y.save(a.uri,a):P=a},y.save=function(e,t){var r=y.get(e);r.status<Y.SAVED&&(r.id=t.id||e,r.dependencies=t.deps||[],r.factory=t.factory,r.status=Y.SAVED,D("save",r))},y.get=function(e,t){return z[e]||(z[e]=new y(e,t))},y.use=function(t,r,n){var s=y.get(n,_(t)?t:[t]);s.callback=function(){for(var t=[],n=s.resolve(),a=0,i=n.length;i>a;a++)t[a]=z[n[a]].exec();r&&r.apply(e,t),delete s.callback},s.load()},E.use=function(e,t){return y.use(e,t,j.cwd+"_use_"+n()),E},y.define.cmd={},e.define=y.define,E.Module=y,j.fetchedList=Q,j.cid=n,E.require=function(e){var t=y.get(y.resolve(e));return t.status<Y.EXECUTING&&(t.onload(),t.exec()),t.exports},j.base=X,j.dir=X,j.cwd=G,j.charset="utf-8",E.config=function(e){for(var t in e){var r=e[t],n=j[t];if(n&&b(n))for(var s in r)n[s]=r[s];else _(n)?r=n.concat(r):"base"===t&&("/"!==r.slice(-1)&&(r+="/"),r=f(r)),j[t]=r}return D("config",e),E}}}(this),seajs.config({paths:{cdn:"http://cdn.staticfile.org"},alias:{$:"js/jquery/jquery.2.1.1.min.js",jquery:"js/jquery/jquery.2.1.1.min.js","seajs-css":"js/seajs-css/1.0.4/seajs-css.js",ajaxupload:"js/module/ajaxfileupload.js",poshytip:"js/module/tooltip/poshytip",common:"js/module/common/common.js",dateRange:"js/module/dateRange/dateRange.js",highcharts:"js/module/highcharts.js"},charset:"utf-8",debug:!0});