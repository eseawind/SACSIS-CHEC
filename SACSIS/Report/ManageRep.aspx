<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageRep.aspx.cs" Inherits="SACSIS.Report.ManageRep" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../Js/jQueryEasyUI/themes/gray/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../Js/jQueryEasyUI/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="../Js/jQueryEasyUI/css/djxt.css" rel="stylesheet" type="text/css" />
    <script src="../Js/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script src="../Js/jQueryEasyUI/jquery.easyui.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            InitRadio();
            $('#tableList').datagrid({
                title: '***电厂报表',
                iconCls: 'icon-search',
                width: 1020,
                height: 420,
                nowrap: true,
                autoRowHeight: false,
                striped: true,
                align: 'center',
                collapsible: true,
                url: 'ManageRep.aspx',
                sortName: 'ID',
                sortOrder: 'asc',
                remoteSort: false,
                queryParams: { param: 'list' },
                idField: 'ID',
                frozenColumns: [[
	                { field: 'ck', checkbox: true }
				]],
                columns: [[
				    { field: 'ID', title: '报表编号', width: 150, align: 'center' },
                    { field: 'T_DCNAME', title: '报表编码', width: 260, align: 'center' },
                    { field: 'NAME', title: '报表名称', width: 260, align: 'center' },
					{ field: 'optDel', title: '编辑', width: 150, align: 'center',
					    formatter: function (value, rec, index) {
					        var up = '';
					        up = '<a href="javascript:void(0);" mce_href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:icon-search" onclick="editTable(\'' + rec.T_DCNAME + '\',\'' + rec.NAME + '\')" data-options="iconCls:icon-search">编 辑</a>';
					        return up;
					    }
					}
				]],
                pagination: true,
                rownumbers: true,
                toolbar: [{
                    id: 'btnadd',
                    text: '增加报表',
                    iconCls: 'icon-add',
                    handler: function () {
                        $('#dv_table').show();
                        $('#dv_table').dialog({
                            buttons: [{
                                text: '增 加',
                                handler: function () {
                                    add();
                                    showList();
                                }
                            }, {
                                text: '取 消',
                                handler: function () {
                                    $('#dv_table').dialog('close');
                                }
                            }]
                        });
                    }
                }],
                onDblClickRow: function (rowIndex, rowData) {
                    $("#tableList").hide();
                    $("#showList").show();
                    $("#dv_list").hide();

                    $("#tbName").val(rowData.NAME);
                    $("#tbID").val(rowData.T_DCNAME);
                    ListSun(rowData.NAME);
                }
            });
        });

        function showList() {
            var query = { param: 'list' }; //把查询条件拼接成JSON
            $("#tableList").datagrid('options').queryParams = query; //把查询条件赋值给datagrid内部变量
            $("#tableList").datagrid('reload'); //重新加载
        }

        function add() {
            $.post("ManageRep.aspx", { param: 'add', name: escape($("#txtTableName").val()), id: escape($("#txtId").val()) }, function (data) {
                if (data.count == "1") {
                    $.messager.alert('报表添加!', '报表名称添加成功!', 'info');
                    showList();
                }
                else
                    $.messager.alert('报表添加!', '报表名称添加失败!', 'info');
            }, 'json');
        }

        function editTableInfo(id, name) {
            $.post("ManageRep.aspx", { param: 'edittable', nameo: escape(name), ido: escape(id), name: escape($("#txttableName").val()), id: escape($("#txttableID").val()) }, function (data) {
                if (data.count == "1") {
                    $.messager.alert('编辑报表!', '报表编辑成功!', 'info');
                    showList();
                }
                else
                    $.messager.alert('编辑报表!', '报表编辑添加失败!', 'info');
            }, 'json');
        }

        function editTable(id, name) {
            $("#txttableID").val(id);
            $("#txttableName").val(name);
            $("#dv_table_eidt").show();
            $('#dv_table_eidt').dialog({
                buttons: [{
                    text: '编 辑',
                    iconCls: 'icon-save',
                    handler: function () {

                        $.messager.confirm('编辑报表', '你确定要编辑该条数据吗?', function (ok) {
                            if (ok) {
                                editTableInfo(id, name);
                            } else {
                                $.messager.alert('编辑报表', '编辑已取消!', 'info');
                            }
                        });
                    }
                }, {
                    text: '取 消',
                    handler: function () {
                        $('#dv_table_eidt').dialog('close');
                    }
                }]
            });
        }

        function ListSun(table) {
            $("#dv_list").hide();
            $("#tableSunList").show();
            $('#tableSunList').datagrid({
                title: table + '配置',
                iconCls: 'icon-search',
                width: 1020,
                height: 420,
                nowrap: true,
                autoRowHeight: false,
                striped: true,
                align: 'center',
                collapsible: true,
                url: 'ManageRep.aspx',
                sortName: 'ID',
                sortOrder: 'asc',
                remoteSort: false,
                queryParams: { param: 'Init_Sun', name: escape(table) },
                idField: 'ID',
                frozenColumns: [[
	                { field: 'ck', checkbox: true }
				]],
                columns: [[
				    { field: 'ID', title: '编号', width: 50, align: 'center' },
                    { field: 'T_PARAID', title: '原始测点', width: 150, align: 'center' },
                    { field: 'T_DESCRIP', title: '测点描述', width: 100, align: 'center' },
                    { field: 'I_JZ', title: '机组', width: 50, align: 'center' },
                    { field: 'I_SHOWID', title: '显示顺序', width: 50, align: 'center' },
                    { field: 'T_UNIT', title: '单位', width: 50, align: 'center' },
                    { field: 'T_FENDESC', title: '测点描述2', width: 150, align: 'center', hidden: true },
                    { field: 'T_FENDESC2', title: '测点描述2', width: 150, align: 'center', hidden: true },
                    { field: 'T_REMARK', title: '备注1', width: 150, align: 'center', hidden: true },
                    { field: 'T_REMARK2', title: '备注2', width: 150, align: 'center', hidden: true },
                    { field: 'ID_KEY', title: '主键', width: 150, align: 'center', hidden: true },
                    { field: 'optDel', title: '编辑', width: 150, align: 'center',
                        formatter: function (value, rec, index) {
                            var up = '';
                            up = '<a href="javascript:void(0);" mce_href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:icon-search" onclick="edittableInfo(\'' + rec.T_PARAID
                            + '\',\'' + rec.T_DESCRIP + '\',\'' + rec.I_JZ + '\',\'' + rec.I_SHOWID + '\',\'' + rec.T_UNIT + '\',\'' + rec.T_FENDESC + '\',\'' + rec.T_FENDESC2 + '\',\''
                            + rec.T_REMARK + '\',\'' + rec.T_REMARK + '\',\'' + rec.ID_KEY + '\')" data-options="iconCls:icon-search">编 辑</a>';
                            return up;
                        }
                    }
				]],
                pagination: true,
                rownumbers: true,
                toolbar: [{
                    id: 'btnadd',
                    text: '增加属性',
                    iconCls: 'icon-add',
                    handler: function () {
                        $("#dv_sun_table").attr('title', '添加报表属性');
                        $('#dv_sun_table').show();

                        $('#dv_sun_table').dialog({
                            buttons: [{
                                text: '保存',
                                iconCls: 'icon-ok',
                                handler: function () {
                                    addSun();
                                }
                            }, {
                                text: '取 消',
                                handler: function () {
                                    $('#dv_sun_table').dialog('close');
                                }
                            }]
                        });
                    }
                }, {
                    id: 'btnBlack',
                    text: '返回',
                    iconCls: 'icon-back',
                    handler: function () {
                        $("#showList").hide();
                        $("#dv_sun_liste").hide();
                        $("#dv_list").show();
                    }
                }],
                onDblClickRow: function (rowIndex, rowData) {
                }
            });
        }

        function EditTableSunInfo(ID_KEY) {

            var pid = ""; // $('input[name=item][checked]').val();

            var sign = "";
            var inputs = document.getElementsByTagName('input'); //获取所有的input标签对象。
            for (var i = 0; i < inputs.length; i++) {
                var obj = inputs[i];
                if (obj.type == 'radio') {
                    if (obj.checked == true) {
                        sign += obj.value
                    }
                }
            }
            pid = sign;

            $.post("ManageRep.aspx", { param: 'sunedit', name1: escape($("#txtName1_edit").val()), jz: $("#txtJz_edit").val(), order: $("#txtOrder_edit").val(), unit: escape($("#txtUnit_edit").val()),
                name2: escape($("#txtName2_edit").val()), name3: escape($("#txtName3_edit").val()), remark1: escape($("#txtRemark1_edit").val()), remark2: escape($("#txtRemark2_edit").val()), id: pid, key: ID_KEY
            }, function (data) {

                if (data.count == "1") {
                    $.messager.alert('编辑报表!', '报表编辑成功!', 'info');
                    showListSUN();
                }
                else
                    $.messager.alert('编辑报表!', '报表编辑失败!', 'info');

            }, 'json');
        }

        //编辑报表属性
        function edittableInfo(T_PARAID, T_DESCRIP, I_JZ, I_SHOWID, T_UNIT, T_FENDESC, T_FENDESC2, T_REMARK, T_REMARK2, ID_KEY) {
            $("#txtName1_edit").val(T_DESCRIP);
            $("#txtJz_edit").val(I_JZ);
            $("#txtOrder_edit").val(I_SHOWID);
            $("#txtUnit_edit").val(T_UNIT);
            $("#txtName2_edit").val(T_FENDESC);
            $("#txtName3_edit").val(T_FENDESC2);
            $("#txtRemark1_edit").val(T_REMARK);
            $("#txtRemark2_edit").val(T_REMARK2);
            $("#txtKEY").val(ID_KEY);

            EditRadio(T_PARAID);

            $("#dv_sun_table_edit").show();
            $('#dv_sun_table_edit').dialog({
                buttons: [{
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function () {
                        $.messager.confirm('编辑报表', '你确定要编辑该条数据吗?', function (ok) {
                            if (ok) {
                                EditTableSunInfo(ID_KEY);
                            } else {
                                $.messager.alert('编辑报表', '编辑已取消!', 'info');
                            }
                        });
                    }
                }, {
                    text: '取 消',
                    handler: function () {
                        $('#dv_sun_table_edit').dialog('close');
                    }
                }]
            });
        }

        //重新加载报表属性
        function showListSUN() {
            var query = { param: 'Init_Sun' }; //把查询条件拼接成JSON
            $("#tableSunList").datagrid('options').queryParams = query; //把查询条件赋值给datagrid内部变量
            $("#tableSunList").datagrid('reload'); //重新加载
        }

        //初始化单选框
        function InitRadio() {
            $.post("ManageRep.aspx", { param: 'point' }, function (data) {
                var list = data.list;
                if (list != null) {
                    var htmlb = '';
                    //绑定风场数据
                    $("#dv_radio").html('');

                    for (var i = 1; i <= list.length; i++) {
                        //                        if (i % 3 == 0) {
                        htmlb += "<input type='radio' name='item' value='" + list[i - 1].ID + "'>&nbsp;&nbsp;&nbsp;" + list[i - 1].NAME + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>';
                        //                        } else {
                        //                            htmlb += "<input type='radio' name='item' value='" + list[i - 1].ID + "'>&nbsp;&nbsp;&nbsp;" + list[i - 1].NAME + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                        //                        }
                    }
                    $("#dv_radio").html(htmlb);
                }
            }, 'json');
        }

        //初始化单选框
        function EditRadio(id) {
            $.post("ManageRep.aspx", { param: 'pointEdit' }, function (data) {
                var list = data.list;
                if (list != null) {
                    var htmlb = '';
                    //绑定风场数据
                    $("#dv_radio_eidt").html('');

                    for (var i = 1; i <= list.length; i++) {
                        if (list[i - 1].ID == id) {
                            htmlb += "<input type='radio' name='item' value='" + list[i - 1].ID + "' checked>&nbsp;&nbsp;&nbsp;" + list[i - 1].NAME + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>';
                        } else {
                            htmlb += "<input type='radio' name='item' value='" + list[i - 1].ID + "'>&nbsp;&nbsp;&nbsp;" + list[i - 1].NAME + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>';
                        }
                    }
                    $("#dv_radio_eidt").html(htmlb);
                }
            }, 'json');
        }



        //添加报表属性
        function addSun() {
            var pid = ""; // $('input[name=item][checked]').val();

            var sign = "";
            var inputs = document.getElementsByTagName('input'); //获取所有的input标签对象。
            for (var i = 0; i < inputs.length; i++) {
                var obj = inputs[i];
                if (obj.type == 'radio') {
                    if (obj.checked == true) {
                        sign += obj.value
                    }
                }
            }
            pid = sign;

            $.post("ManageRep.aspx", { param: 'addSun', name1: escape($("#txtName1").val()), jz: $("#txtJZ").val(), order: $("#txtOrder").val(), unit: escape($("#txtUnit").val()),
                name2: escape($("#txtName2").val()), name3: escape($("#txtName3").val()), remark1: escape($("#txtRemark1").val()), remark2: escape($("#txtRemark2").val()), id: pid, tid: $("#tbID").val(), tName: escape($("#tbName").val())
            }, function (data) {
                if (data.count == "1")
                    $.messager.alert('报表属性添加!', '报表名称添加成功!', 'info');
                else
                    $.messager.alert('报表属性添加!', '报表名称添加失败!', 'info');
            }, 'json');
        }

    </script>
</head>
<body>
    <div id="dv_list">
        <table id="tableList">
        </table>
    </div>
    <div id="dv_table" style="padding: 5px; width: 320px; height: 140px; display: none;">
        <table class="admintable" width="100%">
            <tr>
                <th class="adminth" colspan="2">
                    增加报表
                </th>
            </tr>
            <tr>
                <td class="admincls0" align="center">
                    报表编码
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="txtId" />
                </td>
            </tr>
            <tr>
                <td class="admincls0" align="center">
                    报表名称
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="txtTableName" />
                </td>
            </tr>
        </table>
    </div>
    <div id="dv_table_eidt" style="padding: 5px; width: 320px; height: 140px; display: none;">
        <table class="admintable" width="100%">
            <tr>
                <th class="adminth" colspan="2">
                    增加报表
                </th>
            </tr>
            <tr>
                <td class="admincls0" align="center">
                    报表编码
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="txttableID" />
                </td>
            </tr>
            <tr>
                <td class="admincls0" align="center">
                    报表名称
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="txttableName" />
                </td>
            </tr>
        </table>
    </div>
    <div id="dv_sun_liste">
        <table id="tableSunList" style="display: none;">
        </table>
    </div>
    <div id="dv_sun_table" style="display: none; width: 600px; overflow-y: auto; height: 400px;">
        <table id="tba_up" class="admintable">
            <tr>
                <th class="adminth" colspan="4">
                    增加报表属性
                </th>
            </tr>
            <tr>
                <td class="admincls0" align="center">
                    一级描述
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtName1" />
                </td>
                <td class="admincls0" align="center">
                    机组
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtJZ" />
                </td>
            </tr>
            <tr>
                <td class="admincls1" align="center">
                    显示顺序
                </td>
                <td class="admincls1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtOrder" />
                </td>
                <td class="admincls1" align="center">
                    单位
                </td>
                <td class="admincls1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtUnit" />
                </td>
            </tr>
            <tr>
                <td class="admincls0" align="center">
                    二级描述
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtName2" />
                </td>
                <td class="admincls0" align="center">
                    三级描述
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtName3" />
                </td>
            </tr>
            <tr>
                <td class="admincls1" align="center">
                    一级标注
                </td>
                <td class="admincls1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtRemark1" />
                </td>
                <td class="admincls1" align="center">
                    二级标注
                </td>
                <td class="admincls1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtRemark2" />
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    测点选择
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <div id="dv_radio" style="margin: 10px; width: 500px;">
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="dv_sun_table_edit" style="display: none; width: 600px; overflow-y: auto;
        height: 400px;">
        <table id="Table1" class="admintable">
            <tr>
                <th class="adminth" colspan="4">
                    编辑报表属性
                </th>
            </tr>
            <tr>
                <td class="admincls0" align="center">
                    一级描述
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtName1_edit" />
                </td>
                <td class="admincls0" align="center">
                    机组
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtJz_edit" />
                </td>
            </tr>
            <tr>
                <td class="admincls1" align="center">
                    显示顺序
                </td>
                <td class="admincls1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtOrder_edit" />
                </td>
                <td class="admincls1" align="center">
                    单位
                </td>
                <td class="admincls1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtUnit_edit" />
                </td>
            </tr>
            <tr>
                <td class="admincls0" align="center">
                    二级描述
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtName2_edit" />
                </td>
                <td class="admincls0" align="center">
                    三级描述
                </td>
                <td class="admincls0">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtName3_edit" />
                </td>
            </tr>
            <tr>
                <td class="admincls1" align="center">
                    一级标注
                </td>
                <td class="admincls1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtRemark1_edit" />
                </td>
                <td class="admincls1" align="center">
                    二级标注
                </td>
                <td class="admincls1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="txtRemark2_edit" />
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    测点选择
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <div id="dv_radio_eidt" style="margin: 10px; width: 500px;">
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <input type="text" id="tbName" style="display: none;" />
    <input type="text" id="tbID" style="display: none;" />
    <input type="text" id="txtKEY" style="display: none;" />
</body>
</html>
