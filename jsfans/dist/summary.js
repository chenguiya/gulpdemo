define("js/summary",["jquery","highcharts"],function(t){"user strict";var e=t("jquery");t("highcharts");e("#inforContainer").highcharts({title:{text:null,x:-20},colors:["#f9c262","#67c8f5"],xAxis:{categories:["2016-06-30","2016-07-01","2016-07-02","2016-07-03","2016-07-04","2016-07-05","2016-07-06","2016-07-07","2016-07-08","2016-07-09","2016-07-010","2016-07-11"]},yAxis:{title:{text:null},plotLines:[{value:0,width:1,color:"#808080"}]},legend:{align:"right",verticalAlign:"bottom",borderWidth:0},series:[{name:"会员数",data:[7,6.9,9.5,14.5,18.2,21.5,25.2,26.5,23.3,18.3,13.9,9.6]},{name:"参与数",data:[-.2,.8,5.7,11.3,17,22,24.8,24.1,20.1,14.1,8.6,2.5]}]})});