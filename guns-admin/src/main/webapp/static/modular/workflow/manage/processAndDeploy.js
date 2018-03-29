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
        {title: '操作', field: 'statusName', align: 'center', valign: 'middle', sortable: true}];
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

/**
 * 点击添加管理员
 */
MgrUser.openAddMgr = function () {
    var index = layer.open({
        type: 2,
        title: '添加管理员',
        area: ['800px', '560px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/mgr/user_add'
    });
    this.layerIndex = index;
};

/**
 * 点击修改按钮时
 * @param userId 管理员id
 */
MgrUser.openChangeUser = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '编辑管理员',
            area: ['800px', '450px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/mgr/user_edit/' + this.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 点击角色分配
 * @param
 */
MgrUser.roleAssign = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '角色分配',
            area: ['300px', '400px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/mgr/role_assign/' + this.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除用户
 */
MgrUser.delMgrUser = function () {
    if (this.check()) {

        var operation = function(){
            var userId = MgrUser.seItem.id;
            var ajax = new $ax(Feng.ctxPath + "/mgr/delete", function () {
                Feng.success("删除成功!");
                MgrUser.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("userId", userId);
            ajax.start();
        };

        Feng.confirm("是否删除用户" + MgrUser.seItem.account + "?",operation);
    }
};

/**
 * 冻结用户账户
 * @param userId
 */
MgrUser.freezeAccount = function () {
    if (this.check()) {
        var userId = this.seItem.id;
        var ajax = new $ax(Feng.ctxPath + "/mgr/freeze", function (data) {
            Feng.success("冻结成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("冻结失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId", userId);
        ajax.start();
    }
};

/**
 * 解除冻结用户账户
 * @param userId
 */
MgrUser.unfreeze = function () {
    if (this.check()) {
        var userId = this.seItem.id;
        var ajax = new $ax(Feng.ctxPath + "/mgr/unfreeze", function (data) {
            Feng.success("解除冻结成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("解除冻结失败!");
        });
        ajax.set("userId", userId);
        ajax.start();
    }
}

/**
 * 重置密码
 */
MgrUser.resetPwd = function () {
    if (this.check()) {
        var userId = this.seItem.id;
        parent.layer.confirm('是否重置密码为111111？', {
            btn: ['确定', '取消'],
            shade: false //不显示遮罩
        }, function () {
            var ajax = new $ax(Feng.ctxPath + "/mgr/reset", function (data) {
                Feng.success("重置密码成功!");
            }, function (data) {
                Feng.error("重置密码失败!");
            });
            ajax.set("userId", userId);
            ajax.start();
        });
    }
};

MgrUser.resetSearch = function () {
    $("#name").val("");
    $("#beginTime").val("");
    $("#endTime").val("");

    MgrUser.search();
}

MgrUser.search = function () {
    var queryData = {};

    queryData['deptid'] = MgrUser.deptid;
    queryData['name'] = $("#name").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();

    MgrUser.table.refresh({query: queryData});
}

MgrUser.onClickDept = function (e, treeId, treeNode) {
    MgrUser.deptid = treeNode.id;
    MgrUser.search();
};

MgrUser.menuChange = function(){
    console.log("点击了切换菜单...");
    $("#side-menu li",parent.document).each(function (index){
        //console.log("ddd");
        console.log($(this).attr("menu-title"));
        if($(this).attr("menu-title")=='流程管理'){
            $(this).toggleClass("active");
            $(this).find("ul").addClass("in");
        }

    });
};


$(function () {
    var defaultColunms = MgrUser.initColumn();
    var table = new BSTable("managerTable", "/workflow/process-list", defaultColunms);
    table.setPaginationType("server");
    MgrUser.table = table.init();
    //var ztree = new $ZTree("deptTree", "/dept/tree");
    //ztree.bindOnClick(MgrUser.onClickDept);
    //ztree.init();
});
