define("js/ci_betgues",["jquery","echart"],function(a){
    "user strict";var $=a("jquery");var e=a("echart");
    var minHeightY=document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    if($('#singIndexMod').length){
      $('#singIndexMod').height(minHeightY);
      var myChart = echarts.init(document.getElementById('main')); 
      var option = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable : false,
        color:[
           '#fcae6e',
           '#84d6c7'
        ],
        series : [
          {
            name:'访问来源',
            type:'pie',
            radius : ['28%', '58%'],
            center: ['48%', '50%'],
            data:[
                {
                    value:dataJson.zhuValue,
                    name:'主胜',
                    itemStyle : {
                        normal : {
                            labelLine : {
                                length : 5
                            }
                        }
                    }
                },
                {
                    value:dataJson.keValue, 
                    name:'客胜',
                    itemStyle : {
                        normal : {
                            labelLine : {
                                length : 7
                            }
                        }
                    }
                }
            ]
          }
        ]
    };
    // 为echarts对象加载数据 
    myChart.setOption(option); 
    }
    
    
});

