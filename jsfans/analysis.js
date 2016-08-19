define("test/analysis",["jquery","dateRange","common"],function(require, exports, module){
    "user strict";var $ = require("jquery");var t=require("dateRange");var j=require('common');
    var a={};
    a.init=function(){
        var sis=$('#analyTableCont');
        var search_type=$('#search_type').val();
        //下一页点击
        sis.on({
            click:function(){
                var _self=$(this);
                var page=parseInt(_self.prev('.page_num').find('.first').text())+1;
                var maxpage=parseInt(_self.prev('.page_num').find('.last').text());
                a.ajaxsubmit(_self,page,maxpage,search_type,start_date,end_date,'next');
            }
        },'#page_nextbtn');
        //上一页点击
        sis.on({
            click:function(){
                var _self=$(this);
                var page=parseInt(_self.next('.page_num').find('.first').text())-1;
                var maxpage=parseInt(_self.next('.page_num').find('.last').text());
                a.ajaxsubmit(_self,page,maxpage,search_type,start_date,end_date,'prev');
            }
        },'#page_prevbtn');
        //跳转页数
        sis.on({
            click:function(){
                var _self=$(this);
                var prev=_self.parent('.goto_area').prev().find('#page_prevbtn');
                var next=_self.parent('.goto_area').prev().find('#page_nextbtn');
                var input=_self.prev().val();
                var page=parseInt(input);
                var res=/^\d+$/;
                var maxpage=parseInt($(this).parent('.goto_area').prev().find('.page_num .last').text());
                if(input == '' || input > maxpage || !res.test(input)){
                    j.showmsg('请输入正确页码');
                }else{
                    a.ajaxsubmit(_self,page,maxpage,search_type,start_date,end_date,'pagego'); 
                }
            }
        },'#page_gobtn')
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
              // var param = "<?=HOME_URL?>member/exec_searchactive?page="+page+"&search_type="+search_type+"&logmin="+logmin+"&logmax="+logmax;
              start_date=obj.startDate;
              end_date=obj.endDate;
              var _self=$('#analyTableCont #page_nextbtn');
              var page=parseInt(_self.prev('.page_num').find('.first').text());
              var maxpage=parseInt(_self.prev('.page_num').find('.last').text());
              a.ajaxsubmit(_self,page,maxpage,search_type,start_date,end_date); 
            }
        });
     },
     a.ajaxsubmit=function(_self,page,maxpage,search_type,startDate,endDate,type){
        $.ajax({
                type:'POST',
                url:homeUrl+'admin/member/exec_searchactive',
                data:{search_type:search_type,logmin:start_date,logmax:end_date,page:page},
                dataType:'json',
                success:function(data){
                    var html='';
                    if(data.code === 200){
                         var item=eval(data.data.list);
                         for(var i=0; i < data.data.list.length; i++){
                            html+='<tr>';
                            html+='<td>'+item[i].rank+'</td>';    
                            html+='<td><img src="'+item[i].avatar+'" alt="" class="user-head-45"><span>'+item[i].username+'</span></td>';
                            html+='<td>'+item[i].realname+'</td>';
                            html+='<td>'+item[i].join_count+'</td>';
                            html+='<td>'+item[i].miss_count+'</td>';
                            html+='</tr>'
                         }
                         $('#analyTableCont #table-body').html(html);  
                         if(type == 'next'){
                            _self.prev('.page_num').find('.first').text(page);
                            _self.parent('.page_nav_area').find('#page_prevbtn').show();
                            if(maxpage == page){
                                _self.hide();   
                            }
                        }else if(type == 'prev'){
                            _self.next('.page_num').find('.first').text(page);
                            _self.parent('.page_nav_area').find('#page_nextbtn').show();
                            if(page == 1){
                                _self.hide();
                            }
                        }else if(type == 'pagego'){
                            _self.parent('.goto_area').prev('.page_nav_area').find('.first').text(page);
                            var prev=_self.parent('.goto_area').prev().find('#page_prevbtn');
                            var next=_self.parent('.goto_area').prev().find('#page_nextbtn');
                            if(maxpage == page){
                                prev.show();
                                next.hide();
                            }else if(page == 1){
                                next.show();
                                prev.hide();
                            }else{
                                prev.show();
                                next.show();
                            }
                        }else{}
                    }else{
                        $('#analyTableCont #table-body').html("暂无数据");
                    }
                    
                },
                error:function(){
                    j.showmsg('数据有问题','',1000);
                }
              });

     }
    module.exports = a;
    
});

