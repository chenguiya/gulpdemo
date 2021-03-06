define(function(require, exports, module){
 var $=require("jquery");
jQuery.extend({
	createuploadiframe: function(id, url) {
		var iframeid = 'uploadiframe' + id;
		var iframe = '<iframe id="' + iframeid + '" name="' + iframeid + '"';
		if(window.ActiveXObject) {
			if(typeof url == 'boolean') {
				iframe += ' src="' + 'javascript:false' + '"';
			} else if(typeof url == 'string') {
				iframe += ' src="' + url + '"';
			}
		}
		iframe += ' />';
		jQuery(iframe).css({'position':'absolute', 'top':'-1200px', 'left':'-1200px'}).appendTo(document.body);
		return jQuery('#' + iframeid).get(0);
    },
	createuploadform: function(id, fileobjid, data) {
		var formid = 'uploadform' + id;
		var fileid = 'uploadfile' + id;
		var form = jQuery('<form method="post" name="' + formid + '" id="' + formid + '" enctype="multipart/form-data"></form>');
		if(data) {
			for(var i in data) {
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}
		}
		var oldobj = jQuery('#' + fileobjid);
		var newobj = jQuery(oldobj).clone();
		jQuery(oldobj).attr('id', fileid).before(newobj).appendTo(form);
		jQuery(form).css({'position':'absolute', 'top':'-1200px', 'left':'-1200px'}).appendTo(document.body);
		return form;
	},
	handleerror: function(s, xhr, status, e) {
		if(s.error) {
			s.error.call(s.context || s, xhr, status, e);
		}
		if(s.global) {
			(s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xhr, s, e]);
		}
	},
	ajaxfileupload: function(s) {
		s = jQuery.extend({}, jQuery.ajaxSettings, s);
		var id = new Date().getTime();
		var form = this.createuploadform(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));
		var io = this.createuploadiframe(id, s.secureuri);
		var iframeid = 'uploadiframe' + id;
		var formid = 'uploadform' + id;

		if(s.global && ! jQuery.active++) {
			jQuery.event.trigger("ajaxStart");
		}
		var requestDone = false;
        var xml = {};
        if(s.global) {
			jQuery.event.trigger("ajaxSend", [xml, s]);
		}
		var uploadcallback = function(istimeout) {
			function uploadhttpdata(r, type) {
		        var data = !type;
		        data = type == 'xml' || data ? r.responseXML : r.responseText;
		        if(type == 'script') {
			       jQuery.globalEval(data);
		         }
		        if(type == "json") {
			         eval("data = " + data);
		        }
		        if(type == "html") {
			        jQuery("<div>").html(data);
		        }
		        return data;
		    }
		    function handerror(s, xml, status, e) {
		if(s.error) {
			//亲，图片文件大小过大哦！请压缩在上传！
		    alert('\u4eb2\uff0c\u56fe\u7247\u6587\u4ef6\u5927\u5c0f\u8fc7\u5927\u54e6\uff01\u8bf7\u538b\u7f29\u5728\u4e0a\u4f20\uff01');
			//s.error.call(s.context || s, xml, status, e);
		}
		if(s.global) {
			(s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xml, s, e]);
		}
	}
			var io = document.getElementById(iframeid);
			try {
				if(io.contentWindow) {
					xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
					xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
				} else if(io.contentDocument) {
					xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
					xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}
			} catch(e) {
				handerror(s, xml, null, e);
			}
			if(xml||istimeout == 'timeout') {
				requestdone = true;
				var status;
				try {
					status = istimeout != 'timeout' ? 'success' : 'error';
					if(status != 'error') {
						var data =uploadhttpdata(xml, s.dataType);
						if(s.success) {
							s.success( data, status );
						}
						if(s.global) {
							jQuery.event.trigger("ajaxSuccess", [xml, s]);
						}
					} else {
                        handerror(s, xml, status);
					}
				} catch(e) {
					status = 'error';
					handerror(s, xml, status, e);
				}
				if(s.global) {
					jQuery.event.trigger("ajaxComplete", [xml, s]);
				}

				if(s.global && ! --jQuery.active) {
					jQuery.event.trigger("ajaxStop");
				}

				if (s.complete) {
					s.complete(xml, status);
				}

				jQuery(io).off();
				setTimeout(function() {
					try {
						jQuery(io).remove();
						jQuery(form).remove();
					} catch(e) {
						if(s.error) {
							s.error.call(s.context || s, xml, status, e);
						}
						if(s.global) {
							(s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xhr, s, e]);
						}
						//this.handleerror(s, xml, null, e);
					}
				}, 100);

				xml = null;
			}
		};
		if(s.timeout > 0) {
			setTimeout(function() {
				if(!requestdone) {
					uploadcallback('timeout');
				}
			}, s.timeout);
		}
		try {
			var form = jQuery('#' + formid);
			jQuery(form).attr('action', s.url).attr('method', 'post').attr('target', iframeid);
			if(form.encoding) {
				jQuery(form).attr('encoding', 'multipart/form-data');
			} else {
				jQuery(form).attr('enctype', 'multipart/form-data');
			}
			jQuery(form).submit();
		} catch(e) {
			handerror(s, xml, null, e);
		}

		jQuery('#' + iframeid).load(uploadcallback);
		return {abort: function () {}};
    }
	
});
});
