var shell={hideK:function(){document.getElementById("coverDetele")&&(document.getElementById("previewid").removeChild(document.getElementById("coverDetle")),document.getElementById("uploadID").style.display="inline-block")}};!function(e,t){function r(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function n(){return x++}function a(e){return e.match(T)[0]}function i(e){for(e=e.replace(w,"/"),e=e.replace(O,"$1/");e.match(N);)e=e.replace(N,"/");return e}function s(e){var t=e.length-1,r=e.charAt(t);return"#"===r?e.substring(0,t):".js"===e.substring(t-2)||e.indexOf("?")>0||"/"===r?e:e+".js"}function o(e){var t=j.alias;return t&&q(t[e])?t[e]:e}function u(e){var t,r=j.paths;return r&&(t=e.match(C))&&q(r[t[1]])&&(e=r[t[1]]+t[2]),e}function c(e){var t=j.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(S,function(e,r){return q(t[r])?t[r]:e})),e}function l(e){var t=j.map,r=e;if(t)for(var n=0,a=t.length;a>n;n++){var i=t[n];if(r=D(i)?i(e)||e:e.replace(i[0],i[1]),r!==e)break}return r}function f(e,t){var r,n=e.charAt(0);if(U.test(e))r=e;else if("."===n)r=i((t?a(t):j.cwd)+e);else if("/"===n){var s=j.cwd.match(G);r=s?s[0]+e.substring(1):e}else r=j.base+e;return 0===r.indexOf("//")&&(r=location.protocol+r),r}function d(e,t){if(!e)return"";e=o(e),e=u(e),e=c(e),e=s(e);var r=f(e,t);return r=l(r)}function v(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}function h(e,t,r){var n=B.createElement("script");if(r){var a=D(r)?r(e):r;a&&(n.charset=a)}g(n,t,e),n.async=!0,n.src=e,V=n,P?H.insertBefore(n,P):H.appendChild(n),V=null}function g(e,t,r){function n(){e.onload=e.onerror=e.onreadystatechange=null,j.debug||H.removeChild(e),e=null,t()}var a="onload"in e;a?(e.onload=n,e.onerror=function(){_("error",{uri:r,node:e}),n()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&n()}}function p(){if(V)return V;if($&&"interactive"===$.readyState)return $;for(var e=H.getElementsByTagName("script"),t=e.length-1;t>=0;t--){var r=e[t];if("interactive"===r.readyState)return $=r}}function m(e){var t=[];return e.replace(M,"").replace(K,function(e,r,n){n&&t.push(n)}),t}function y(e,t){this.uri=e,this.dependencies=t||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!e.seajs){var E=e.seajs={version:"2.3.0"},j=E.data={},b=r("Object"),q=r("String"),A=Array.isArray||r("Array"),D=r("Function"),x=0,I=j.events={};E.on=function(e,t){var r=I[e]||(I[e]=[]);return r.push(t),E},E.off=function(e,t){if(!e&&!t)return I=j.events={},E;var r=I[e];if(r)if(t)for(var n=r.length-1;n>=0;n--)r[n]===t&&r.splice(n,1);else delete I[e];return E};var _=E.emit=function(e,t){var r=I[e];if(r){r=r.slice();for(var n=0,a=r.length;a>n;n++)r[n](t)}return E},T=/[^?#]*\//,w=/\/\.\//g,N=/\/[^/]+\/\.\.\//,O=/([^:/])\/+\//g,C=/^([^/:]+)(\/.+)$/,S=/{([^{]+)}/g,U=/^\/\/.|:\//,G=/^.*?\/\/.*?\//,B=document,L=location.href&&0!==location.href.indexOf("about:")?a(location.href):"",k=B.scripts,X=B.getElementById("seajsnode")||k[k.length-1],F=a(v(X)||L);E.resolve=d;var V,$,H=B.head||B.getElementsByTagName("head")[0]||B.documentElement,P=H.getElementsByTagName("base")[0];E.request=h;var R,K=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,M=/\\\\/g,z=E.cache={},J={},Q={},W={},Y=y.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};y.prototype.resolve=function(){for(var e=this,t=e.dependencies,r=[],n=0,a=t.length;a>n;n++)r[n]=y.resolve(t[n],e.uri);return r},y.prototype.load=function(){var e=this;if(!(e.status>=Y.LOADING)){e.status=Y.LOADING;var r=e.resolve();_("load",r);for(var n,a=e._remain=r.length,i=0;a>i;i++)n=y.get(r[i]),n.status<Y.LOADED?n._waitings[e.uri]=(n._waitings[e.uri]||0)+1:e._remain--;if(0===e._remain)return e.onload(),t;var s={};for(i=0;a>i;i++)n=z[r[i]],n.status<Y.FETCHING?n.fetch(s):n.status===Y.SAVED&&n.load();for(var o in s)s.hasOwnProperty(o)&&s[o]()}},y.prototype.onload=function(){var e=this;e.status=Y.LOADED,e.callback&&e.callback();var t,r,n=e._waitings;for(t in n)n.hasOwnProperty(t)&&(r=z[t],r._remain-=n[t],0===r._remain&&r.onload());delete e._waitings,delete e._remain},y.prototype.fetch=function(e){function r(){E.request(s.requestUri,s.onRequest,s.charset)}function n(){delete J[o],Q[o]=!0,R&&(y.save(i,R),R=null);var e,t=W[o];for(delete W[o];e=t.shift();)e.load()}var a=this,i=a.uri;a.status=Y.FETCHING;var s={uri:i};_("fetch",s);var o=s.requestUri||i;return!o||Q[o]?(a.load(),t):J[o]?(W[o].push(a),t):(J[o]=!0,W[o]=[a],_("request",s={uri:i,requestUri:o,onRequest:n,charset:j.charset}),s.requested||(e?e[s.requestUri]=r:r()),t)},y.prototype.exec=function(){function e(t){return y.get(e.resolve(t)).exec()}var r=this;if(r.status>=Y.EXECUTING)return r.exports;r.status=Y.EXECUTING;var a=r.uri;e.resolve=function(e){return y.resolve(e,a)},e.async=function(t,r){return y.use(t,r,a+"_async_"+n()),e};var i=r.factory,s=D(i)?i(e,r.exports={},r):i;return s===t&&(s=r.exports),delete r.factory,r.exports=s,r.status=Y.EXECUTED,_("exec",r),s},y.resolve=function(e,t){var r={id:e,refUri:t};return _("resolve",r),r.uri||E.resolve(r.id,t)},y.define=function(e,r,n){var a=arguments.length;1===a?(n=e,e=t):2===a&&(n=r,A(e)?(r=e,e=t):r=t),!A(r)&&D(n)&&(r=m(""+n));var i={id:e,uri:y.resolve(e),deps:r,factory:n};if(!i.uri&&B.attachEvent){var s=p();s&&(i.uri=s.src)}_("define",i),i.uri?y.save(i.uri,i):R=i},y.save=function(e,t){var r=y.get(e);r.status<Y.SAVED&&(r.id=t.id||e,r.dependencies=t.deps||[],r.factory=t.factory,r.status=Y.SAVED,_("save",r))},y.get=function(e,t){return z[e]||(z[e]=new y(e,t))},y.use=function(t,r,n){var a=y.get(n,A(t)?t:[t]);a.callback=function(){for(var t=[],n=a.resolve(),i=0,s=n.length;s>i;i++)t[i]=z[n[i]].exec();r&&r.apply(e,t),delete a.callback},a.load()},E.use=function(e,t){return y.use(e,t,j.cwd+"_use_"+n()),E},y.define.cmd={},e.define=y.define,E.Module=y,j.fetchedList=Q,j.cid=n,E.require=function(e){var t=y.get(y.resolve(e));return t.status<Y.EXECUTING&&(t.onload(),t.exec()),t.exports},j.base=F,j.dir=F,j.cwd=L,j.charset="utf-8",E.config=function(e){for(var t in e){var r=e[t],n=j[t];if(n&&b(n))for(var a in r)n[a]=r[a];else A(n)?r=n.concat(r):"base"===t&&("/"!==r.slice(-1)&&(r+="/"),r=f(r)),j[t]=r}return _("config",e),E}}}(this),seajs.config({paths:{cdn:"http://cdn.staticfile.org"},alias:{$:"js/jquery/jquery.2.1.1.min.js",jquery:"js/jquery/jquery.2.1.1.min.js","seajs-css":"js/seajs-css/1.0.4/seajs-css.js",ajaxupload:"js/module/ajaxfileupload.js",highcharts:"js/module/highcharts.js"},charset:"utf-8",debug:!0});