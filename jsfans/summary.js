define("test/summary",["jquery","highcharts","dateRange"],function(require, exports, module){
    "user strict";var $ = require("jquery");var t=require("dateRange");var h=require("highcharts");var a={};
    a.init=function(){
        //时间设置
        var dateRange = new t.pickerDateRange('date_time', {
            aRecent7Days : 'aRecent7DaysDemo3', 
            isTodayValid : true,
            startDate : start_date,
            endDate : end_date,
            needCompare : true,
            defaultText : ' 至 ',
            inputTrigger : 'input_trigger_time',
            theme : 'ta',
            success : function(obj) {
              // $("#").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
              $.ajax({
                type:'POST',
                url:homeUrl+'index/exec_changedate',
                data:{start_date:obj.startDate,end_date:obj.endDate},
                dataType:'json',
                success:function(data){
                    var msg=[],msg_count=[],mjoincount=[];
                    var dateu=eval(data.data.new_member_list);
                    var joindate=eval(data.data.new_join_list);
                    for(var i=0; i < data.data.new_member_list.length; i++){

                        msg.push(String(dateu[i].date));
                        msg_count.push(dateu[i].count);
                    }
                    for(var j=0; j < data.data.new_join_list.length; j++){
                        mjoincount.push(joindate[j].count);
                    }
                    //console.log(mjoincount.join(','));
                    a.highcharts(msg,msg_count,mjoincount);

                }
              })
            }
        });

    $('#inforContainer').highcharts({
        title: {
            text: null,
            x: -20 //center
        },
        colors:['#f9c262','#67c8f5'],
        xAxis: {
            categories:member_date
            //categories: ['2016-06-30', '2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05','2016-07-06', '2016-07-07', '2016-07-08', '2016-07-09', '2016-07-010', '2016-07-11']
        },
        yAxis: {
            title: {
                text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            align: 'right',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: '会员数',
            data: member_count
        }, {
            name: '联系人',
            data: join_count
        }]
    });
     },
     a.highcharts=function(mem_date,mem_count,join_count){
        $('#inforContainer').highcharts({
        title: {
            text: null,
            x: -20 //center
        },
        colors:['#f9c262','#67c8f5'],
        xAxis: {
            categories:mem_date
            //categories: ['2016-06-30', '2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05','2016-07-06', '2016-07-07', '2016-07-08', '2016-07-09', '2016-07-010', '2016-07-11']
        },
        yAxis: {
            title: {
                text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            align: 'right',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: '会员数',
            data: mem_count
        }, {
            name: '联系人',
            data: join_count
        }]
    });
     }
    module.exports = a;
    
});

