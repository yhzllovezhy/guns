/**
 * 系统管理--用户管理的单例对象
 */
var MgrUser = {
    id: "managerTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    deptid:0
};

/**
 * 初始化表格的列
 */
MgrUser.initColumn = function () {


    var columns = [
        {field: 'selectItem', radio: true},
        {title: 'ProcessDefinitionId', field: 'processId', visible: false, align: 'center', valign: 'middle'},
        {title: 'DeploymentId', field: 'processDeploymentId', align: 'center', valign: 'middle', sortable: true},
        {title: '名称', field: 'processName', align: 'center', valign: 'middle', sortable: true},
        {title: 'KEY', field: 'processKey', align: 'center', valign: 'middle', sortable: true},
        {title: '版本号', field: 'processVersion', align: 'center', valign: 'middle', sortable: true},
        {title: 'XML', field: 'processResourceName', align: 'center', valign: 'middle', sortable: true,
            formatter:function (value,row,index) {
                return "<a target=\"_blank\" href='/workflow/resource/read?processDefinitionId="+row.processId+"&resourceType=xml'>"+value+"</a>";
            }
        },
        {title: '图片', field: 'processDiagramResourceName', align: 'center', valign: 'middle', sortable: true,
            formatter:function (value,row,index) {
                return "<a target=\"_blank\" href='/workflow/resource/read?processDefinitionId="+row.processId+"&resourceType=image'>"+row.processDiagramResourceName+"</a>";
            }
        },
        {title: '部署时间', field: 'deploymentTime', align: 'center', valign: 'middle', sortable: true},
        {title: '是否挂起', field: 'processSuspended', align: 'center', valign: 'middle', sortable: true},
        {title: '操作', field: 'statusName', align: 'center', valign: 'middle', sortable: true,
            formatter:function (value,row,index) {
                return "<button type='button' class='btn btn-danger btn-xs button-margin' onclick='MgrUser.delProcess("+row.processDeploymentId+")'>删除</button>" +
                    "<button type='button' class='btn btn-primary btn-xs button-margin' id='"+row.processId+"' onclick='MgrUser.convertToModel(id)' >转换为Model</button>";
            }
        }];
    return columns;
};

/**
 * 检查是否选中
 */
MgrUser.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        MgrUser.seItem = selected[0];
        return true;
    }
};


MgrUser.deployAll = function(){
    $.post("/workflow/redeploy/all",function(result){
        alert(result.code);
    });
}


MgrUser.delProcess = function(deploymentId){
    $.post("/workflow/process/delete",{deploymentId:deploymentId},
        function(result){
            if(result.code==200){
                Feng.info("删除成功!");
                MgrUser.table.refresh();
            }
        }).error(function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.responseJSON.code==500){
                Feng.info("删除失败!");
            }
    });

}

MgrUser.deployOnceProcess = function () {
    alert("dddd");
}


MgrUser.convertToModel = function(processId){
    //alert(processId);
    parent.layer.confirm('转换Model成功,打开Model列表？', {
        btn: ['马上去', '不需要'],
        shade: false //不显示遮罩
    }, function () {
        //跳转到model列表页面
       alert("ddddddd");
    });
}




$(function () {
    var defaultColunms = MgrUser.initColumn();
    var table = new BSTable("managerTable", "/workflow/process-list", defaultColunms);
    table.setPaginationType("server");
    MgrUser.table = table.init();
    //var ztree = new $ZTree("deptTree", "/dept/tree");
    //ztree.bindOnClick(MgrUser.onClickDept);
    //ztree.init();
});
