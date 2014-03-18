<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SACSIS.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <style type="text/css">
        body
        {
            height: 100%;
            overflow: auto;
            margin: 0px;
            padding: 0px;
            background-color: #c8c8c8;
        }
        .div_1{ background-image:url(/img/default_bg_3-1.jpg);  height:116px; width:206px;  display:block;background-repeat:no-repeat; background-position:center center; text-align:center;}
	 .div_2{ background-image:url(/img/default_bg_3-2.jpg);  height:116px; width:206px;  display:block;background-repeat:no-repeat; background-position:center center;}
	 .div_3{ background-image:url(/img/default_bg_3-3.jpg);  height:116px; width:206px;  display:block;background-repeat:no-repeat; background-position:center center;}
	 .div_4{ background-image:url(/img/default_bg_3-4.jpg);  height:116px; width:206px;  display:block;background-repeat:no-repeat; background-position:center center;}
	 .div_5{ background-image:url(/img/default_bg_3-5.jpg);  height:116px; width:206px;  display:block;background-repeat:no-repeat; background-position:center center;}
	 .div_7{ background-image:url(/img/default_bg_1.jpg); height:116px;   display:block;background-repeat:repeat-x; background-position:center center;}
	 .div_top_1
	 {
	text-align:center;
	color:#000000;
	font-size:14px;
	font:"ËÎÌå";
	width: 140px;
	height: 17px;
	 }
    </style>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
</head>
<body>
    <form id="form1" runat="server" style="background-color:c8c8c8;">
    <div>
        <table height="100%" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#c8c8c8">
<tr><td colspan="7" style=" background-image:url(img/default_bg_0.jpg); background-repeat:repeat-x; height:15px;"></td></tr>
<tr>
<td style="background-image:url(/img/default_bg_1.jpg); height:116px; width:20%;"></td>
<td class="div_1" align="center" valign="middle"><div class="div_top_1"><asp:Label ID="lbl_TotalCapacity" runat="server" Text="0"></asp:Label>&nbsp;MW</div></td>
<td class="div_2" align="center" valign="middle"><div class="div_top_1"><asp:Label ID="lbl_RealTimeLoad" runat="server" Text="0"></asp:Label>&nbsp;kW</div></td>
<td class="div_3" align="center" valign="middle"><div class="div_top_1"><asp:Label ID="lbl_PowerYear" runat="server" Text="0"></asp:Label>&nbsp;kWh</div></td>
<td class="div_4" align="center" valign="middle"><div class="div_top_1"><asp:Label ID="lbl_PowerMonth" runat="server" Text="0"></asp:Label>&nbsp;MW</div></td>
<td class="div_5" align="center" valign="middle"><div class="div_top_1"><asp:Label ID="lbl_PowerDay" runat="server" Text="0"></asp:Label>&nbsp;MW</div></td>
<td style="background-image:url(img/default_bg_1.jpg); height:116px;width:20%;"></td>
</tr>
<tr>
<td style="background-image:url(img/default_bg_2.jpg);  height:554px;"></td>
                <td colspan="5" style=" background-color:#c8c8c8;background-image:url(img/default_bg_2.jpg); height: 552px;
                    width: 1218px; position: relative; display: block;">
                    <div id="hr" style="position: absolute; top: 170px; left: 805px;" title="»³Èá">
                        <img alt="" src="img/default_hd.png" />
                    </div>

                    
                   
                    
                    <img border="0" src="img/default_bg_6.jpg" style="height: 550px; width: 1218px;" />
                </td>
                <td style="background-image:url(img/default_bg_2.jpg); height:554px;"></td>
</tr>
<tr>
<td style=" background-color:#c8c8c8"></td>
<td colspan="6" style=" background-color:#c8c8c8"></td>
<td style=" background-color:#c8c8c8"></td>
</tr>
</table>
</div>
</form>
</body>
</html>