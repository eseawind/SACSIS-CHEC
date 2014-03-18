/*********************************************
 * 创建人：胡进财
 * 创建日期：2014-1-7
 * 页面功能：拟合 趋势 
 **********************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using System.Data;
using System.Collections;
using Newtonsoft.Json;

namespace SACSIS.Trend
{
    public partial class ComparaAnalysisNew : System.Web.UI.Page
    {
        BLLGet_chart_Data g_bll_chart = new BLLGet_chart_Data();

        protected void Page_Load(object sender, EventArgs e)
        {
            string _param_in = Request["param"];
            if (_param_in != "")
            {
                if (_param_in == "Init")
                {
                    InitPage();
                }
                else if (_param_in == "company")
                {
                    string id = HttpUtility.UrlDecode(Request["id"]);
                    GetElectric(id);
                }
                else if (_param_in == "electric")
                {
                    string id = HttpUtility.UrlDecode(Request["id"]);
                    GetUnit(id);
                }
                else if (_param_in == "unit")
                {
                    string id = HttpUtility.UrlDecode(Request["id"]);
                    GetX(id);
                }
                else if (_param_in == "X")
                {
                    string id = HttpUtility.UrlDecode(Request["id"]);
                    GetY(id);
                }
            }
        }

        #region 获取Y 集合
        private void GetY(string id)
        {
            IList<Hashtable> l_list_Y = new List<Hashtable>();       /*Y轴集合*/

            DataTable l_dt_T_BASE_PARAID_WIND = new DataTable();
            
            l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetYPara(id);
            if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
            {
                l_list_Y = DataTableToList(l_dt_T_BASE_PARAID_WIND);
            }

            object obj = new
            {
                y = l_list_Y
            };
            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        #region 获取X Y 集合
        private void GetX(string id)
        {
            IList<Hashtable> l_list_X = new List<Hashtable>();       /*X轴集合*/
            IList<Hashtable> l_list_Y = new List<Hashtable>();       /*Y轴集合*/


            DataTable l_dt_T_BASE_PARAID_WIND = new DataTable();

            l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetXPara(id, 1);
            l_list_X = DataTableToList(l_dt_T_BASE_PARAID_WIND);
            if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
            {
                l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetYPara(l_dt_T_BASE_PARAID_WIND.Rows[0][0].ToString());
                if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
                {
                    l_list_Y = DataTableToList(l_dt_T_BASE_PARAID_WIND);
                }
            }

            object obj = new
            {
                x = l_list_X,
                y = l_list_Y
            };
            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        #region 获取机组及其集合
        private void GetUnit(string id)
        {
            IList<Hashtable> l_list_unit = new List<Hashtable>();       /*机组集合*/
            IList<Hashtable> l_list_X = new List<Hashtable>();       /*X轴集合*/
            IList<Hashtable> l_list_Y = new List<Hashtable>();           /*Y轴集合*/

            DataSet l_ds_T_BASE_PARAID_WIND = new DataSet();
            DataTable l_dt_T_BASE_PARAID_WIND = new DataTable();
            l_ds_T_BASE_PARAID_WIND = g_bll_chart.Get_Paraid("T_BASE_PARAID_WIND", "T_LEVEL3", id);/*机组集合*/

            if (l_ds_T_BASE_PARAID_WIND != null && l_ds_T_BASE_PARAID_WIND.Tables[0].Rows.Count > 0)
            {
                l_list_unit = DataTableToList(l_ds_T_BASE_PARAID_WIND.Tables[0]);
                l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetXPara(l_ds_T_BASE_PARAID_WIND.Tables[0].Rows[0][0].ToString(), 1);
                l_list_X = DataTableToList(l_dt_T_BASE_PARAID_WIND);
                if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
                {
                    l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetYPara(l_dt_T_BASE_PARAID_WIND.Rows[0][0].ToString());
                    if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
                    {
                        l_list_Y = DataTableToList(l_dt_T_BASE_PARAID_WIND);
                    }
                }
            }
            object obj = new
            {
                unit = l_list_unit,
                x = l_list_X,
                y = l_list_Y
            };
            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion


        #region 获取电厂及其集合
        private void GetElectric(string id)
        {
            IList<Hashtable> l_list_electric = new List<Hashtable>();   /*电厂集合*/
            IList<Hashtable> l_list_unit = new List<Hashtable>();       /*机组集合*/
            IList<Hashtable> l_list_X = new List<Hashtable>();           /*X轴集合*/
            IList<Hashtable> l_list_Y = new List<Hashtable>();           /*Y轴集合*/

            DataSet l_ds_T_BASE_PARAID_WIND = new DataSet();
            DataTable l_dt_T_BASE_PARAID_WIND = new DataTable();

            l_ds_T_BASE_PARAID_WIND = g_bll_chart.Get_Paraid("T_BASE_PARAID_WIND", "T_LEVEL2", id);/*电厂集合*/
            if (l_ds_T_BASE_PARAID_WIND != null && l_ds_T_BASE_PARAID_WIND.Tables[0].Rows.Count > 0)
            {
                l_list_electric = DataTableToList(l_ds_T_BASE_PARAID_WIND.Tables[0]);
                l_ds_T_BASE_PARAID_WIND = g_bll_chart.Get_Paraid("T_BASE_PARAID_WIND", "T_LEVEL3", l_ds_T_BASE_PARAID_WIND.Tables[0].Rows[0][0].ToString());/*机组集合*/
                if (l_ds_T_BASE_PARAID_WIND != null && l_ds_T_BASE_PARAID_WIND.Tables[0].Rows.Count > 0)
                {
                    l_list_unit = DataTableToList(l_ds_T_BASE_PARAID_WIND.Tables[0]);

                    l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetXPara(l_ds_T_BASE_PARAID_WIND.Tables[0].Rows[0][0].ToString(), 1);
                    l_list_X = DataTableToList(l_dt_T_BASE_PARAID_WIND);
                    if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
                    {
                        l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetYPara(l_dt_T_BASE_PARAID_WIND.Rows[0][0].ToString());
                        if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
                        {
                            l_list_Y = DataTableToList(l_dt_T_BASE_PARAID_WIND);
                        }
                    }
                }
            }


            object obj = new
            {
                electric = l_list_electric,
                unit = l_list_unit,
                x = l_list_X,
                y = l_list_Y
            };
            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        #region 初始化页面
        /// <summary>
        /// 初始化页面
        /// </summary>
        private void InitPage()
        {
            IList<Hashtable> l_list_company = new List<Hashtable>();    /*公司集合*/
            IList<Hashtable> l_list_electric = new List<Hashtable>();   /*电厂集合*/
            IList<Hashtable> l_list_unit = new List<Hashtable>();       /*机组集合*/
            IList<Hashtable> l_list_X = new List<Hashtable>();       /*X轴集合*/
            IList<Hashtable> l_list_Y = new List<Hashtable>();           /*Y轴集合*/


            DataSet l_ds_T_BASE_PARAID_WIND = new DataSet();
            DataTable l_dt_T_BASE_PARAID_WIND = new DataTable();

            l_ds_T_BASE_PARAID_WIND = g_bll_chart.Get_Paraid("T_BASE_PARAID_WIND", "T_LEVEL1", "");/*公司集合*/
            if (l_ds_T_BASE_PARAID_WIND != null && l_ds_T_BASE_PARAID_WIND.Tables[0].Rows.Count > 0)
            {
                l_list_company = DataTableToList(l_ds_T_BASE_PARAID_WIND.Tables[0]);
                l_ds_T_BASE_PARAID_WIND = g_bll_chart.Get_Paraid("T_BASE_PARAID_WIND", "T_LEVEL2", l_ds_T_BASE_PARAID_WIND.Tables[0].Rows[0][0].ToString());/*电厂集合*/
                if (l_ds_T_BASE_PARAID_WIND != null && l_ds_T_BASE_PARAID_WIND.Tables[0].Rows.Count > 0)
                {
                    l_list_electric = DataTableToList(l_ds_T_BASE_PARAID_WIND.Tables[0]);
                    l_ds_T_BASE_PARAID_WIND = g_bll_chart.Get_Paraid("T_BASE_PARAID_WIND", "T_LEVEL3", l_ds_T_BASE_PARAID_WIND.Tables[0].Rows[0][0].ToString());/*机组集合*/
                    if (l_ds_T_BASE_PARAID_WIND != null && l_ds_T_BASE_PARAID_WIND.Tables[0].Rows.Count > 0)
                    {
                        l_list_unit = DataTableToList(l_ds_T_BASE_PARAID_WIND.Tables[0]);

                        l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetXPara(l_ds_T_BASE_PARAID_WIND.Tables[0].Rows[0][0].ToString(), 1);
                        l_list_X = DataTableToList(l_dt_T_BASE_PARAID_WIND);
                        if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
                        {
                            l_dt_T_BASE_PARAID_WIND = g_bll_chart.GetYPara(l_dt_T_BASE_PARAID_WIND.Rows[0][0].ToString());
                            if (l_dt_T_BASE_PARAID_WIND != null && l_dt_T_BASE_PARAID_WIND.Rows.Count > 0)
                            {
                                l_list_Y = DataTableToList(l_dt_T_BASE_PARAID_WIND);
                            }
                        }
                    }
                }
            }

            object obj = new
            {
                company = l_list_company,
                electric = l_list_electric,
                unit = l_list_unit,
                x = l_list_X,
                y = l_list_Y
            };
            string result = JsonConvert.SerializeObject(obj);
            Response.Write(result);
            Response.End();
        }
        #endregion

        #region 从DataTable转化为List 胡进财 2013/02/27
        /// <summary>
        /// 从DataTable转化为List
        /// </summary>
        /// <param name="dt">数据集</param>
        /// <returns>List集合</returns>
        public IList<Hashtable> DataTableToList(DataTable dt)
        {
            IList<Hashtable> list = null;
            if (dt != null && dt.Rows.Count > 0)
            {
                list = new List<Hashtable>();
                Hashtable ht = null;
                foreach (DataRow row in dt.Rows)
                {
                    ht = new Hashtable();
                    foreach (DataColumn col in dt.Columns)
                    {
                        if (row[col.ColumnName] != null && !string.IsNullOrEmpty(Convert.ToString(row[col.ColumnName])))
                        {
                            ht.Add(col.ColumnName.ToUpper(), row[col.ColumnName]);
                        }
                        else
                        {
                            ht.Add(col.ColumnName.ToUpper(), "");
                        }
                    }
                    list.Add(ht);
                }
            }
            return list;
        }
        #endregion
    }
}