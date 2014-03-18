using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SACSIS.Model
{
    public partial class Web_1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.txtMonth.Value = DateTime.Now.ToString("yyyy-MM-dd");
        }
    }
}