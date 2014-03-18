using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SAC.DBOperations;
using System.Data;

namespace DAL
{
    public class ReportDAL
    {
        DBLink dl = new DBLink();

        private string sql = "";
        private string errMsg = "";
        private int count = 0;
        private bool judge = false;
        private DataTable dt = null;

        #region 数据分页
        /// <summary>
        /// 初始化分页数据
        /// </summary>
        /// <param name="table">数据表</param>
        /// <param name="startIndex">开始索引</param>
        /// <param name="endIndex">结束索引</param>
        /// <returns></returns>
        public DataTable GetReportTable(string table, int startIndex, int endIndex)
        {
            string errMsg = "";
            DataTable dt = null;
            sql = "select * from (select a.*,rownumber() over() as rowid from (select * from Administrator." + table + ") a) tmp where tmp.rowid >=" + startIndex + " and tmp.rowid <= " + endIndex;
            dt = dl.RunDataTable(sql, out errMsg);
            return dt;
        }

        /// <summary>
        /// 初始化分页数据
        /// </summary>
        /// <param name="table">数据表</param>
        /// <param name="startIndex">开始索引</param>
        /// <param name="endIndex">结束索引</param>
        /// <returns></returns>
        public DataTable GetReportTableList(string table, int startIndex, int endIndex)
        {
            string errMsg = "";

            sql = "select * from (select a.*,rownumber() over() as rowid from (select distinct T_DCNAME,T_REPORTDESC from Administrator." + table + ") a) tmp where tmp.rowid >=" + startIndex + " and tmp.rowid <= " + endIndex;
            dt = dl.RunDataTable(sql, out errMsg);
            return dt;
        }

        /// <summary>
        /// 初始化分页数据
        /// </summary>
        /// <param name="table">数据表</param>
        /// <param name="startIndex">开始索引</param>
        /// <param name="endIndex">结束索引</param>
        /// <returns></returns>
        public DataTable GetReportTableList(string table, string where, int startIndex, int endIndex)
        {
            string errMsg = "";

            sql = "select * from (select a.*,rownumber() over() as rowid from (select * from Administrator." + table + " where " + where + ") a) tmp where tmp.rowid >=" + startIndex + " and tmp.rowid <= " + endIndex;
            dt = dl.RunDataTable(sql, out errMsg);
            return dt;
        }

        /// <summary>
        /// 获取数据表记录条数
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public DataTable GetReportCountList(string table)
        {
            sql = "select distinct T_REPORTDESC from " + table;
            dt = dl.RunDataTable(sql, out errMsg);
            return dt;
        }

        /// <summary>
        /// 获取数据表记录条数
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public DataTable GetReportCountList(string table, string where)
        {
            sql = "select * from " + table + " where " + where;
            dt = dl.RunDataTable(sql, out errMsg);
            return dt;
        }

        /// <summary>
        /// 获取数据表记录条数
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public int GetReportCount(string table)
        {
            count = dl.GetCount(table);
            return count;
        }
        #endregion

        /// <summary>
        /// 添加报表名称
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool AddTable(string name, string id)
        {
            sql = "insert into T_BASE_HOURREPORT(T_REPORTDESC,T_DCNAME) values('" + name + "','" + id + "')";
            judge = dl.RunNonQuery(sql, out errMsg);
            return judge;
        }

        /// <summary>
        /// 获取原始测点
        /// </summary>
        /// <returns></returns>
        public DataTable GetPoints()
        {
            sql = "select distinct PARAID,PARADESC from STATPARA";
            dt = dl.RunDataTable(sql, out errMsg);
            return dt;
        }

        /// <summary>
        /// 添加报表属性
        /// </summary>
        /// <param name="name1"></param>
        /// <param name="name2"></param>
        /// <param name="name3"></param>
        /// <param name="jz"></param>
        /// <param name="order"></param>
        /// <param name="unit"></param>
        /// <param name="remark1"></param>
        /// <param name="remark2"></param>
        /// <param name="id"></param>
        /// <param name="tid"></param>
        /// <param name="tName"></param>
        /// <returns></returns>
        public bool AddSunInfo(string name1, string name2, string name3, string jz, string order, string unit, string remark1, string remark2, string id, string tid, string tName)
        {
            sql = "insert into T_BASE_HOURREPORT(T_PARAID,T_DESCRIP,I_JZ,I_SHOWID,T_UNIT,T_DCNAME,T_REPORTDESC,T_FENDESC,T_FENDESC2,T_REMARK,T_REMARK2) values(";
            sql += "'" + id + "','" + name1 + "'," + jz + "," + order + ",'" + unit + "','" + tid + "','" + tName + "','" + name2 + "','" + name3 + "','" + remark1 + "','" + remark2 + "'";
            sql += ")";
            judge = dl.RunNonQuery(sql, out errMsg);
            return judge;
        }

        /// <summary>
        /// 编辑报表名称
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool EditTable(string id, string name, string ido, string nameo)
        {
            sql = "update T_BASE_HOURREPORT set T_DCNAME='" + id + "',T_REPORTDESC='" + name + "' where T_DCNAME='" + ido + "' and T_REPORTDESC='" + nameo + "'";
            judge = dl.RunNonQuery(sql, out errMsg);
            return judge;
        }

        /// <summary>
        /// 编辑报表属性 
        /// </summary>
        /// <param name="name1"></param>
        /// <param name="name2"></param>
        /// <param name="name3"></param>
        /// <param name="jz"></param>
        /// <param name="order"></param>
        /// <param name="unit"></param>
        /// <param name="remark1"></param>
        /// <param name="remark2"></param>
        /// <param name="id"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public bool EditsunTableInfo(string name1, string name2, string name3, string jz, string order, string unit, string remark1, string remark2, string id, string key)
        {
            sql = "update T_BASE_HOURREPORT set T_PARAID='" + id + "',T_DESCRIP='" + name1 + "',I_JZ=" + jz + ",I_SHOWID=" + order + ",T_UNIT='" + unit + "',";
            sql += "T_FENDESC='" + name2 + "',T_FENDESC2='" + name3 + "',T_REMARK='" + remark1 + "',T_REMARK2='" + remark2 + "'";
            sql += " where ID_KEY =" + key;
            judge = dl.RunNonQuery(sql, out errMsg);
            return judge;
        }

    }
}
