var shell={hideK:function(){document.getElementById("coverDetele")&&(document.getElementById("previewid").removeChild(document.getElementById("coverDetle")),document.getElementById("uploadID").style.display="inline-block")},checkForm:function(e){var t=new Array,r=!1,n=/^\d+$/;if(e.elements.title.value&&(0==e.elements.title.value?(t.push("活动名称不能为空"),r=!0):e.elements.title.value.length>20&&(t.push("活动名称不能超过20个字"),r=!0)),e.elements["class"]&&0==e.elements["class"].value&&(r=!0,t.push("活动类型需选择")),e.elements.starttimefrom&&0==e.elements.starttimefrom.value&&(r=!0,t.push("活动开始时间不能为空")),e.elements.starttimeto&&0==e.elements.starttimeto.value&&(r=!0,t.push("活动结束时间不能为空")),e.elements.expiration&&0==e.elements.expiration.value&&(r=!0,t.push("活动截止时间不能为空")),e.elements.place&&0==e.elements.place.value&&(r=!0,t.push("活动地址需填写")),e.elements.aid&&0==e.elements.aid.value&&(r=!0,t.push("活动封面需上传")),e.elements["free-event"]&&1==e.elements["free-event"].value)if(""==e.elements["package[0][name]"].value)r=!0,t.push("收费活动设置最少填写一项");else for(var a=e.getElementsByClassName("itemHc").length,s=0;a>s;s++)if(n.test(e.elements["package["+s+"][price]"].value)){if(0==e.elements["package["+s+"][price]"].value){var i=e.elements["package["+s+"][name]"].value;""!==i&&(r=!0,t.push("这是收费活动哦，【"+i+"】付费套餐不要填写0元嘛！"))}}else{var i=e.elements["package["+s+"][name]"].value;""!==i&&(r=!0,t.push("亲，"+i+"套餐费用必须为整数哦！"))}var o=e.getElementsByClassName("isCod").length;if(o){for(var u=0,s=0;o>s;s++)0==e.getElementsByClassName("isCod")[s].checked&&u++;u==o&&(r=!0,t.push("报名设置最少勾选一项"))}var l=UE.getEditor("editor");return l.ready(function(){""==this.getContent()&&(r=!0,t.push("活动内容不能为空"))}),r&&(message=t.join("\n"),alert(message)),!r},checkNoticeForm:function(e){var t=new Array,r=!1;e.elements.title&&0==e.elements.title.value&&(r=!0,t.push(title_not_null));var n=UE.getEditor("editor");return n.ready(function(){""==this.getContent()&&(r=!0,t.push(editor_not_null))}),r&&(messnotice=t.join("\n"),alert(messnotice)),!r},checklotteryForm:function(e){var t=new Array,r=!1;return e.elements.templateid&&0==e.elements.templateid.value&&(r=!0,t.push("模板选择不能为空，请选择模板")),e.elements.title&&0==e.elements.title.value&&(r=!0,t.push("抽奖活动标题名称不能为空")),e.elements.lottaid&&0==e.elements.lottaid.value&&(r=!0,t.push("活动抽奖不能为空，请选择")),r&&(messlottry=t.join("\n"),alert(messlottry)),!r},checkrecruitForm:function(e){var t=new Array,r=!1,n=/^\d+$/;e.elements.title&&0==e.elements.title.value?(r=!0,t.push("招募标题不能为空！")):e.elements.title.value.length>8&&(r=!0,t.push("招募标题不能多于8个字"));var a=e.getElementsByClassName("malCod").length;if(a){for(var s=0,i=0;a>i;i++)0==e.getElementsByClassName("malCod")[i].checked&&s++;s==a&&(r=!0,t.push("报名设置最好选一项"))}return e.elements["number-dues"]&&""==e.elements["number-dues"].value?(r=!0,t.push("会费金额不能为空，请填写会费数字金额哦！")):n.test(e.elements["number-dues"].value)||(r=!0,t.push("亲，会费金额必须要填写整数哦！")),e.elements["female-dues"]&&""==e.elements["female-dues"].value?(r=!0,t.push("女生金额不能为空，请填写一下金额哦！")):n.test(e.elements["female-dues"].value)||(r=!0,t.push("女生金额必须要填写整数哦！")),e.elements.template&&0==e.elements.template.value&&(r=!0,t.push("模板设置请选择！")),r&&(messrecruit=t.join("\n"),alert(messrecruit)),!r}};!function(e,t){function r(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function n(){return x++}function a(e){return e.match(D)[0]}function s(e){for(e=e.replace(q,"/"),e=e.replace(O,"$1/");e.match(w);)e=e.replace(w,"/");return e}function i(e){var t=e.length-1,r=e.charAt(t);return"#"===r?e.substring(0,t):".js"===e.substring(t-2)||e.indexOf("?")>0||"/"===r?e:e+".js"}function o(e){var t=E.alias;return t&&A(t[e])?t[e]:e}function u(e){var t,r=E.paths;return r&&(t=e.match(T))&&A(r[t[1]])&&(e=r[t[1]]+t[2]),e}function l(e){var t=E.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(B,function(e,r){return A(t[r])?t[r]:e})),e}function c(e){var t=E.map,r=e;if(t)for(var n=0,a=t.length;a>n;n++){var s=t[n];if(r=_(s)?s(e)||e:e.replace(s[0],s[1]),r!==e)break}return r}function f(e,t){var r,n=e.charAt(0);if(I.test(e))r=e;else if("."===n)r=s((t?a(t):E.cwd)+e);else if("/"===n){var i=E.cwd.match(S);r=i?i[0]+e.substring(1):e}else r=E.base+e;return 0===r.indexOf("//")&&(r=location.protocol+r),r}function d(e,t){if(!e)return"";e=o(e),e=u(e),e=l(e),e=i(e);var r=f(e,t);return r=c(r)}function m(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}function v(e,t,r){var n=U.createElement("script");if(r){var a=_(r)?r(e):r;a&&(n.charset=a)}h(n,t,e),n.async=!0,n.src=e,L=n,H?X.insertBefore(n,H):X.appendChild(n),L=null}function h(e,t,r){function n(){e.onload=e.onerror=e.onreadystatechange=null,E.debug||X.removeChild(e),e=null,t()}var a="onload"in e;a?(e.onload=n,e.onerror=function(){N("error",{uri:r,node:e}),n()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&n()}}function p(){if(L)return L;if(P&&"interactive"===P.readyState)return P;for(var e=X.getElementsByTagName("script"),t=e.length-1;t>=0;t--){var r=e[t];if("interactive"===r.readyState)return P=r}}function g(e){var t=[];return e.replace(W,"").replace(K,function(e,r,n){n&&t.push(n)}),t}function y(e,t){this.uri=e,this.dependencies=t||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!e.seajs){var j=e.seajs={version:"2.3.0"},E=j.data={},b=r("Object"),A=r("String"),C=Array.isArray||r("Array"),_=r("Function"),x=0,k=E.events={};j.on=function(e,t){var r=k[e]||(k[e]=[]);return r.push(t),j},j.off=function(e,t){if(!e&&!t)return k=E.events={},j;var r=k[e];if(r)if(t)for(var n=r.length-1;n>=0;n--)r[n]===t&&r.splice(n,1);else delete k[e];return j};var N=j.emit=function(e,t){var r=k[e];if(r){r=r.slice();for(var n=0,a=r.length;a>n;n++)r[n](t)}return j},D=/[^?#]*\//,q=/\/\.\//g,w=/\/[^/]+\/\.\.\//,O=/([^:/])\/+\//g,T=/^([^/:]+)(\/.+)$/,B=/{([^{]+)}/g,I=/^\/\/.|:\//,S=/^.*?\/\/.*?\//,U=document,R=location.href&&0!==location.href.indexOf("about:")?a(location.href):"",G=U.scripts,$=U.getElementById("seajsnode")||G[G.length-1],F=a(m($)||R);j.resolve=d;var L,P,X=U.head||U.getElementsByTagName("head")[0]||U.documentElement,H=X.getElementsByTagName("base")[0];j.request=v;var V,K=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,W=/\\\\/g,M=j.cache={},Z={},Y={},z={},J=y.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};y.prototype.resolve=function(){for(var e=this,t=e.dependencies,r=[],n=0,a=t.length;a>n;n++)r[n]=y.resolve(t[n],e.uri);return r},y.prototype.load=function(){var e=this;if(!(e.status>=J.LOADING)){e.status=J.LOADING;var r=e.resolve();N("load",r);for(var n,a=e._remain=r.length,s=0;a>s;s++)n=y.get(r[s]),n.status<J.LOADED?n._waitings[e.uri]=(n._waitings[e.uri]||0)+1:e._remain--;if(0===e._remain)return e.onload(),t;var i={};for(s=0;a>s;s++)n=M[r[s]],n.status<J.FETCHING?n.fetch(i):n.status===J.SAVED&&n.load();for(var o in i)i.hasOwnProperty(o)&&i[o]()}},y.prototype.onload=function(){var e=this;e.status=J.LOADED,e.callback&&e.callback();var t,r,n=e._waitings;for(t in n)n.hasOwnProperty(t)&&(r=M[t],r._remain-=n[t],0===r._remain&&r.onload());delete e._waitings,delete e._remain},y.prototype.fetch=function(e){function r(){j.request(i.requestUri,i.onRequest,i.charset)}function n(){delete Z[o],Y[o]=!0,V&&(y.save(s,V),V=null);var e,t=z[o];for(delete z[o];e=t.shift();)e.load()}var a=this,s=a.uri;a.status=J.FETCHING;var i={uri:s};N("fetch",i);var o=i.requestUri||s;return!o||Y[o]?(a.load(),t):Z[o]?(z[o].push(a),t):(Z[o]=!0,z[o]=[a],N("request",i={uri:s,requestUri:o,onRequest:n,charset:E.charset}),i.requested||(e?e[i.requestUri]=r:r()),t)},y.prototype.exec=function(){function e(t){return y.get(e.resolve(t)).exec()}var r=this;if(r.status>=J.EXECUTING)return r.exports;r.status=J.EXECUTING;var a=r.uri;e.resolve=function(e){return y.resolve(e,a)},e.async=function(t,r){return y.use(t,r,a+"_async_"+n()),e};var s=r.factory,i=_(s)?s(e,r.exports={},r):s;return i===t&&(i=r.exports),delete r.factory,r.exports=i,r.status=J.EXECUTED,N("exec",r),i},y.resolve=function(e,t){var r={id:e,refUri:t};return N("resolve",r),r.uri||j.resolve(r.id,t)},y.define=function(e,r,n){var a=arguments.length;1===a?(n=e,e=t):2===a&&(n=r,C(e)?(r=e,e=t):r=t),!C(r)&&_(n)&&(r=g(""+n));var s={id:e,uri:y.resolve(e),deps:r,factory:n};if(!s.uri&&U.attachEvent){var i=p();i&&(s.uri=i.src)}N("define",s),s.uri?y.save(s.uri,s):V=s},y.save=function(e,t){var r=y.get(e);r.status<J.SAVED&&(r.id=t.id||e,r.dependencies=t.deps||[],r.factory=t.factory,r.status=J.SAVED,N("save",r))},y.get=function(e,t){return M[e]||(M[e]=new y(e,t))},y.use=function(t,r,n){var a=y.get(n,C(t)?t:[t]);a.callback=function(){for(var t=[],n=a.resolve(),s=0,i=n.length;i>s;s++)t[s]=M[n[s]].exec();r&&r.apply(e,t),delete a.callback},a.load()},j.use=function(e,t){return y.use(e,t,E.cwd+"_use_"+n()),j},y.define.cmd={},e.define=y.define,j.Module=y,E.fetchedList=Y,E.cid=n,j.require=function(e){var t=y.get(y.resolve(e));return t.status<J.EXECUTING&&(t.onload(),t.exec()),t.exports},E.base=F,E.dir=F,E.cwd=R,E.charset="utf-8",j.config=function(e){for(var t in e){var r=e[t],n=E[t];if(n&&b(n))for(var a in r)n[a]=r[a];else C(n)?r=n.concat(r):"base"===t&&("/"!==r.slice(-1)&&(r+="/"),r=f(r)),E[t]=r}return N("config",e),j}}}(this),!function(){function e(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function t(e){return"[object Function]"=={}.toString.call(e)}function r(e,r,a){var s=E.test(e),i=g.createElement(s?"link":"script");if(a){var o=t(a)?a(e):a;o&&(i.charset=o)}n(i,r,s,e),s?(i.rel="stylesheet",i.href=e):(i.async=!0,i.src=e),h=i,j?y.insertBefore(i,j):y.appendChild(i),h=null}function n(e,t,r,n){function s(){e.onload=e.onerror=e.onreadystatechange=null,r||seajs.data.debug||y.removeChild(e),e=null,t()}var i="onload"in e;return!r||!b&&i?void(i?(e.onload=s,e.onerror=function(){seajs.emit("error",{uri:n,node:e}),s()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&s()}):void setTimeout(function(){a(e,t)},1)}function a(e,t){var r,n=e.sheet;if(b)n&&(r=!0);else if(n)try{n.cssRules&&(r=!0)}catch(s){"NS_ERROR_DOM_SECURITY_ERR"===s.name&&(r=!0)}setTimeout(function(){r?t():a(e,t)},20)}function s(e){return e.match(C)[0]}function i(e){for(e=e.replace(_,"/"),e=e.replace(k,"$1/");e.match(x);)e=e.replace(x,"/");return e}function o(e){var t=e.length-1,r=e.charAt(t);return"#"===r?e.substring(0,t):".js"===e.substring(t-2)||e.indexOf("?")>0||".css"===e.substring(t-3)||"/"===r?e:e+".js"}function u(e){var t=A.alias;return t&&p(t[e])?t[e]:e}function l(e){var t,r=A.paths;return r&&(t=e.match(N))&&p(r[t[1]])&&(e=r[t[1]]+t[2]),e}function c(e){var t=A.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(D,function(e,r){return p(t[r])?t[r]:e})),e}function f(e){var r=A.map,n=e;if(r)for(var a=0,s=r.length;s>a;a++){var i=r[a];if(n=t(i)?i(e)||e:e.replace(i[0],i[1]),n!==e)break}return n}function d(e,t){var r,n=e.charAt(0);if(q.test(e))r=e;else if("."===n)r=i((t?s(t):A.cwd)+e);else if("/"===n){var a=A.cwd.match(w);r=a?a[0]+e.substring(1):e}else r=A.base+e;return 0===r.indexOf("//")&&(r=location.protocol+r),r}function m(e,t){if(!e)return"";e=u(e),e=l(e),e=c(e),e=o(e);var r=d(e,t);return r=f(r)}function v(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}var h,p=e("String"),g=document,y=g.head||g.getElementsByTagName("head")[0]||g.documentElement,j=y.getElementsByTagName("base")[0],E=/\.css(?:\?|$)/i,b=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536;seajs.request=r;var A=seajs.data,C=/[^?#]*\//,_=/\/\.\//g,x=/\/[^/]+\/\.\.\//,k=/([^:/])\/+\//g,N=/^([^/:]+)(\/.+)$/,D=/{([^{]+)}/g,q=/^\/\/.|:\//,w=/^.*?\/\/.*?\//,g=document,O=location.href&&0!==location.href.indexOf("about:")?s(location.href):"",T=g.scripts,B=g.getElementById("seajsnode")||T[T.length-1];s(v(B)||O),seajs.resolve=m,define("js/seajs-css/1.0.4/seajs-css",[],{})}(),seajs.config({paths:{cdn:"http://cdn.staticfile.org"},alias:{$:"js/jquery/jquery.2.1.1.min.js",jquery:"js/jquery/jquery.2.1.1.min.js","seajs-css":"js/seajs-css/1.0.4/seajs-css.js",ajaxupload:"js/module/ajaxfileupload.js",poshytip:"js/module/tooltip/poshytip",common:"js/module/common/common.js",dateRange:"js/module/dateRange/dateRange.js",layer:"js/module/layer/layer.js",ZeroClipboard:"js/module/copyPlug/ZeroClipboard.js",echart:"js/module/echart/echarts.min.js",emotion:"js/module/emotion/emotion.js",datePicker:"js/module/DatePicker/WdatePicker",highcharts:"js/module/highcharts.js"},charset:"utf-8",debug:!0});