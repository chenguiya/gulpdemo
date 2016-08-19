define("test/post",["jquery","ajaxupload"],function(require, exports, module){
    "user strict";var $=require("jquery");var d=require('ajaxupload');
    //活动编辑器
    var ue = UE.getEditor('editor',{
         toolbars: [
           ['bold', 'italic', 'underline', 'forecolor', 'justifyleft','justifycenter','justifyright','justifyjustify','|','fontsize','simpleupload']
         ],
         elementPathEnabled :false,
         wordCount:false
    });
       //活动发布选项增加删除
    if($('#click_addpoll').length){
        $('#click_addpoll').click(function(){
            var ir=$('#itemDIv .itemHc').length;
            //var a=$('#packhidden').html();
            //a=a.replace(/av10\"\>1\<\/p\>/i,'av10">'+(ir+1)+'</p>');
            //a=a.replace(/package\[y\]\[name\]/i, 'package['+ir+'][name]');
            //a=a.replace(/package\[y\]\[price\]/i, 'package['+ir+'][price]');
            //a=a.replace(/package\[y\]\[num\]/i, 'package['+ir+'][num]');
            //a=a.replace('/value=\"\"/i')
            var html='<div class="itemHc cl" id="package_'+ir+'">';
                html+='<p class="av10">'+(ir+1)+'</p>';
                html+='<p class="av40"><input type="text" class="input-text" name="package['+ir+'][name]" placeholder="请填写收费项目名称" value="" /></p>';
                html+='<p class="av25"><input type="text" class="input-text" name="package['+ir+'][price]" placeholder="请填写金额，免费请填0" value="" /></p>';
                html+='<p class="av25"><input type="text" class="input-text" name="package['+ir+'][num]" placeholder="不填则不限制" value="" /></p>';
                html+='</div>';
            $('#click_addpoll').parent().siblings('#itemDIv').append(html);
            ir++;  
        });
    }
    //收费与免费活动切换
    $('.activityTab li').click(function(){
        $('.activityTab li').removeClass('active');
        $(this).addClass('active');
        $('.ulboxMain').css('display','none');
        var ID=$(this).attr('id');
        //设置是否付费
        if(ID == 'payevent') {
            $("#free-event").val('1');
        } else if(ID == 'freeevent') {
            $("#free-event").val('0');
        }
        $('#'+ID+'Center').show();
        return false;
    });
    $(document).on('change', '#fileCover', function() {
        if(typeof FileReader != null && typeof FileReader != undefined && this.files) {
            $.ajaxfileupload({
                url:'/upload/index',
                dataType:'json',
                fileElementId:'fileCover',
                success:function(data){
                    var data=eval(data.data[0]);
                     $('#previewid').html('<input type="hidden" id="aid" name="aid" value="' + data.aid + '" /><div class="coverPop" id="coverDetle"><img src="/upload/attachment/forum/'+data.attachment+'"><a href="javascript:void(0)" class="coverDetele icon-cw" id="coverDetele" onclick="shell.hideK()"></a></div>');
                     $('.btn_upload').hide();
                },
                error: function() {
                    alert('数据有问题');
                }
            });
        }

    });

});

