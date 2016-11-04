seajs.config({
	paths: {
		'cdn': 'http://cdn.staticfile.org'
	},
	alias: {
		"$": "js/jquery/jquery-1.10.2.min.js",
		"jquery": "js/jquery/jquery-1.10.2.min.js",
		'seajs-css': 'js/seajs-css/1.0.4/seajs-css.js',
		'ajaxupload':'js/module/ajaxfileupload.js',
		'poshytip':'js/module/tooltip/poshytip',
		'common':'js/module/common/common.js',
		'dateRange':'js/module/dateRange/dateRange.js',
		'layer':'js/module/layer/layer.js',
		'ZeroClipboard':'js/module/copyPlug/ZeroClipboard.js',
		'echart':'js/module/echart/echarts.min.js',
		'emotion':'js/module/emotion/emotion.js',
		'datePicker':'js/module/DatePicker/WdatePicker',
		'kditor':'js/module/kditor/kditor-min',
		'highcharts':'js/module/highcharts.js'
	},
	charset: 'utf-8',
	debug: true
});
