﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="hourreport.aspx.cs" Inherits="SACSIS.Report.hourreport" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Js/My97DatePicker/skin/WdatePicker.css" rel="stylesheet" type="text/css" />
    <script src="../Js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <%--   <input type="text" id="txtData" style="text-align: center;" runat="server" readonly="readonly"
            onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd'})" class="Wdate" />
        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="查询" />--%>
        <%--        <rsweb:reportviewer id="ReportViewer1" runat="server" font-names="Verdana" font-size="8pt"
            interactivedeviceinfos="(集合)" processingmode="Remote" waitmessagefont-names="Verdana"
            waitmessagefont-size="14pt" height="600px" width="100%">
           
        </rsweb:reportviewer>--%>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt"
            InteractiveDeviceInfos="(集合)" ProcessingMode="Remote" WaitMessageFont-Names="Verdana"
            WaitMessageFont-Size="14pt" Height="600px" Width="100%">
        </rsweb:ReportViewer>
    </div>
    </form>
</body>
</html>
