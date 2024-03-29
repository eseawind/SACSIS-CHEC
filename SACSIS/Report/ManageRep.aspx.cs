﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using System.Data;
using System.Collections;
using Newtonsoft.Json;

namespace SACSIS.Report
{
    public partial class ManageRep : System.Web.UI.Page
    {
        string tableName = "T_BASE_HOURREPORT";
        int count = 0, page = 0, rows = 0;
        ReportBLL bll = new ReportBLL();

        private static string tb = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            string param = Request["param"];
            if (param != null)
            {
                if (param == "list")
                {
                    InitLoad();
                }
                else if (param == "add")
                {
                    string name = HttpUtility.UrlDecode(Request["name"]);
                    string id = HttpUtility.UrlDecode(Request["id"]);
                    AddTableName(name, id);
                }
                else if (param == "Init_Sun")
                {
                    if (HttpUtility.UrlDecode(Request["name"]) != null && HttpUtility.UrlDecode(Request["name"]) != "")
                        tb = HttpUtility.UrlDecode(Request["name"]);
                    InitSunLoad(tb);
                }
                else if (param == "point")
                {
                    InitPoints();
                }
                else if (param == "addSun")
                {
                    string name1 = HttpUtility.UrlDecode(Request["name1"]);
                    string name2 = HttpUtility.UrlDecode(Request["name2"]);
                    string name3 = HttpUtility.UrlDecode(Request["name3"]);
                    string jz = Request["jz"];
                    string order = Request["order"];
                    string unit = HttpUtility.UrlDecode(Request["unit"]);
                    string remark1 = HttpUtility.UrlDecode(Request["remark1"]);
                    string remark2 = HttpUtility.UrlDecode(Request["remark2"]);
                    string id = Request["id"];
                    string tid = Request["tid"];
                    string tName = HttpUtility.UrlDecode(Request["tName"]);

                    AddSunInfo(name1, name2, name3, jz, order, unit, remark1, remark2, id, tid, tName);
                }
                else if (param == "edittable")
                {
                    string id = HttpUtility.UrlDecode(Request["id"]);
                    string name = HttpUtility.UrlDecode(Request["name"]);
                    string ido = HttpUtility.UrlDecode(Request["ido"]);
                    string nameo = HttpUtility.UrlDecode(Request["nameo"]);
                    EditTable(id, name, ido, nameo);
                }
                else if (param == "pointEdit")
                {
                    InitPoints();
                }
                else if (param == "sunedit")
                {
                    string name1 = HttpUtility.UrlDecode(Request["name1"]);
                    string name2 = HttpUtility.UrlDecode(Request["name2"]);
                    string name3 = HttpUtility.UrlDecode(Request["name3"]);
                    string jz = Request["jz"];
                    string order = Request["order"];
                    string unit = HttpUtility.UrlDecode(Request["unit"]);
                    string remark1 = HttpUtility.UrlDecode(Request["remark1"]);
                    string remark2 = HttpUtility.UrlDecode(Request["remark2"]);
                    string id = Request["id"];
                    string key = Request["key"];
                    EditSunTable(name1, name2, name3, jz, order, unit, remark1, remark2, id, key);
                }
            }
        }

        #region 编辑报表
        private void EditSunTable(string name1, string name2, string name3, string jz, string order, string unit, string remark1, string remark2, string id, string key)
        {
            bool judge = bll.EditsunTableInfo(name1, name2, name3, jz, order, unit, remark1, remark2, id, key);
            if (judge)
                count = 1;
            object obj = new
            {
                count = count
            };

            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        #region 编辑报表
        private void EditTable(string id, string name, string ido, string nameo)
        {
            bool judge = bll.EditTable(id, name, ido, nameo);
            if (judge)
                count = 1;
            object obj = new
            {
                count = count
            };

            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        #region 添加报表属性
        private void AddSunInfo(string name1, string name2, string name3, string jz, string order, string unit, string remark1, string remark2, string id, string tid, string tName)
        {
            bool judge = bll.AddSunInfo(name1, name2, name3, jz, order, unit, remark1, remark2, id, tid, tName);

            if (judge)
                count = 1;
            object obj = new
            {
                count = count
            };

            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        public void InitSunLoad(string table)
        {
            int page = Convert.ToInt32(Request["page"].ToString());
            int rows = Convert.ToInt32(Request["rows"].ToString());

            DataTable dt = bll.GetReportTableList(tableName, "T_REPORTDESC='" + table + "'", (page - 1) * rows + 1, page * rows);
            count = bll.GetReportCountList(tableName, "T_REPORTDESC='" + table + "'").Rows.Count;
            IList<Hashtable> list = new List<Hashtable>();
            int index = 0;
            foreach (DataRow item in dt.Rows)
            {
                Hashtable ht = new Hashtable();
                index++;
                ht.Add("ID", index);
                ht.Add("ID_KEY", item["ID_KEY"].ToString());
                ht.Add("T_PARAID", item["T_PARAID"].ToString());
                ht.Add("T_DESCRIP", item["T_DESCRIP"].ToString());
                ht.Add("I_JZ", item["I_JZ"].ToString());
                ht.Add("I_SHOWID", item["I_SHOWID"].ToString());
                ht.Add("T_UNIT", item["T_UNIT"].ToString());
                ht.Add("T_FENDESC", item["T_FENDESC"].ToString());
                ht.Add("T_FENDESC2", item["T_FENDESC2"].ToString());
                ht.Add("T_REMARK", item["T_REMARK"].ToString());
                ht.Add("T_REMARK2", item["T_REMARK2"].ToString());
                ht.Add("ROWID", item["ROWID"].ToString());

                list.Add(ht);
            }
            object obj = new
            {
                total = count,
                rows = list
            };

            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }

        #region 初始化报表信息
        public void InitLoad()
        {
            int page = Convert.ToInt32(Request["page"].ToString());
            int rows = Convert.ToInt32(Request["rows"].ToString());
            DataTable dt = bll.GetReportTableList(tableName, (page - 1) * rows + 1, page * rows);
            count = bll.GetReportCountList(tableName).Rows.Count;
            IList<Hashtable> list = new List<Hashtable>();
            int index = 0;
            foreach (DataRow item in dt.Rows)
            {
                Hashtable ht = new Hashtable();
                index++;
                ht.Add("ID", index);
                ht.Add("T_DCNAME", item["T_DCNAME"].ToString());
                ht.Add("NAME", item["T_REPORTDESC"].ToString());

                list.Add(ht);
            }
            object obj = new
            {
                total = count,
                rows = list
            };

            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        #region  添加报表名称
        private void AddTableName(string name, string id)
        {
            bool judge = bll.AddTable(name, id);
            if (judge)
                count = 1;
            object obj = new
            {
                count = count
            };

            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        #region 初始化报表名称
        /// <summary>
        /// 加载测点集合
        /// </summary>
        public void InitPoints()
        {
            DataTable dt = new DataTable();
            IList<Hashtable> list = new List<Hashtable>();
            dt = bll.GetPoints();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Hashtable ht = new Hashtable();
                    ht.Add("ID", dt.Rows[i]["PARAID"]);
                    ht.Add("NAME", dt.Rows[i]["PARADESC"]);
                    list.Add(ht);
                }
            }

            object obj = new
            {
                list = list
            };
            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();

        }
        #endregion
    }
}