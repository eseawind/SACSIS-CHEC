using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using System.Data;

namespace BLL
{
    public class ReportBLL
    {
        ReportDAL dal = new ReportDAL();
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
            return dal.GetReportTable(table, startIndex, endIndex);
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
            return dal.GetReportTableList(table, startIndex, endIndex);
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
            return dal.GetReportTableList(table, where, startIndex, endIndex);
        }

        /// <summary>
        /// 获取数据表记录条数
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public DataTable GetReportCountList(string table, string where)
        {
            return dal.GetReportCountList(table, where);
        }

        /// <summary>
        /// 获取数据表记录条数
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public DataTable GetReportCountList(string table)
        {
            return dal.GetReportCountList(table);
        }

        /// <summary>
        /// 获取数据表记录条数
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public int GetReportCount(string table)
        {
            return dal.GetReportCount(table);
        }

        #endregion

        /// <summary>
        /// 添加报表名称
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool AddTable(string name, string id)
        {
            return dal.AddTable(name, id);
        }

        /// <summary>
        /// 获取原始测点
        /// </summary>
        /// <returns></returns>
        public DataTable GetPoints()
        {
            return dal.GetPoints();
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
            return dal.AddSunInfo(name1, name2, name3, jz, order, unit, remark1, remark2, id, tid, tName);
        }

        /// <summary>
        /// 编辑报表名称
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool EditTable(string id, string name, string ido, string nameo)
        {
            return dal.EditTable(id, name, ido, nameo);
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
            return dal.EditsunTableInfo(name1, name2, name3, jz, order, unit, remark1, remark2, id, key);
        }
    }
}
