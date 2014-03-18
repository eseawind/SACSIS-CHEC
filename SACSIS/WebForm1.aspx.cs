using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SAC.DBOperations;
using System.Data;

namespace SACSIS
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DBLink dl = new DBLink();
            string errMsg="";
            string[] cName = new string[]{"ID_KEY","T_CLASSID","T_CLASSNAME"};
            DataTable dt = dl.GetS2Enotes("T_SYS_CLASS",cName,"ID_KEY",1,2);

        }
    }
}