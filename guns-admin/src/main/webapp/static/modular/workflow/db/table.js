
$(function () {
    var openTableFlag = $("#openTable").val();
    if(openTableFlag){
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            laypage.render({
                elem: 'test1',
                count: $("#totalCount").val(),//获取隐藏表单域的总条数
                limit:10,
                limits:[10, 20, 30, 40, 50],
                //hash:'pageIndex',
                //curr:location.hash.replace('#!pageIndex=', ''),
                curr:$("#pageIndex").val(),
                jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数
                    //首次不执行
                    if(!first){
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        var tableName = $("#tableName").val();
                        $("#layui-layer-iframe"+index,window.parent.document).attr("src","/management/database?tableName="+tableName+"&p="+obj.curr+"&ps="+obj.limit);
                    }
                }
            });
        });
    }
});



function openTable(tableName){
    layer.open({
        type: 2,
        content: '/management/database?tableName='+tableName+"&p=1&ps=10",
        area: ['90%', '90%'],
        success:function(layero, index){
            console.log(layero, index);
        }
    });
}
