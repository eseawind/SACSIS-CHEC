using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using SAC.DBOperations;
using SAC.Helper;

namespace DAL
{
    public class RLDAL
    {
        private string sql = "", errMsg = "";
        private DataTable dt = new DataTable();
        private DBLink dl = new DBLink();

        /// <summary>
        /// 获取总装机容量
        /// </summary>
        /// <returns></returns>
        public string GetConfigRL()
        {
            return IniHelper.ReadIniData("RelationDBbase", "RL", null);
        }
    }
}
