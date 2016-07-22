define("js/mejs/post",["jquery","ajaxupload"],function(a){
    "user strict";var $=a("jquery");var d=a('ajaxupload');
    var ir=1;
    //活动发布选项增加删除
    if($('#click_addpoll').length){
        $('#click_addpoll').click(function(){
            var a=$('#package_0').html();
            a=a.replace(/av10\"\>1\<\/p\>/i,'av10">'+(ir+1)+'');
            a=a.replace(/package\[0\]\[name\]/i, 'package['+ir+'][name]');
            a=a.replace(/package\[0\]\[price\]/i, 'package['+ir+'][price]');
            a=a.replace(/package\[0\]\[num\]/i, 'package['+ir+'][num]');
            var html='<div class="itemHc cl" id="package_'+ir+'">'+a+'</div>';
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
                     $('#previewid').html('<div class="coverPop" id="coverDetle"><img src="/upload/attachment/forum/'+data.attachment+'"><a href="javascript:void(0)" class="coverDetele icon-cw" id="coverDetele" onclick="shell.hideK()"></a></div>');
                     $('.btn_upload').hide();
                },
                error: function() {
                    alert('数据有问题');
                }
            });
        }

    });

        
    
   
});

