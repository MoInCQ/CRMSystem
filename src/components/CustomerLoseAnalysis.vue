<template>
  <div>
    <el-row style="margin-top:15px">
      <!-- 客户流失分析列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >
                客户流失分析列表
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="customer_lose_analysis_list"
          :data="customerLoseAnalysisListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="id"
            label="客户编号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="lost_time"
            label="时间"
            align="center"
          ></el-table-column>

          <el-table-column
            property="name"
            label="客户"
            align="center"
          ></el-table-column>

          <el-table-column
            property="manager_name"
            label="客户经理"
            align="center"
          ></el-table-column>

          <el-table-column
            property="measure_or_reason"
            label="流失原因"
            align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
// import qs from "qs";
import Api from "../http/api";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },

      // “客户服务信息”列表数据
      customerLoseAnalysisListData: [
        {
          id: "134234",
          lost_time: "2017",
          name: "太阳药业",
          manager_name: "小明",
          measure_or_reason: "发现更廉价的商品来源"
        }
      ]
    };
  },

  mounted: function() {
    axios.get(Api.getAndUpdateCustomerLoseUrl).then(res => {
      console.log(res.data);
      if (res.data.code == 1) {
        this.customerLoseAnalysisListData = res.data.data;
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].status == "暂缓流失") {
            this.customerLoseAnalysisListData[i].measure_or_reason = "未知";
          }
        }
      }
    });
  },

  methods: {}
};
</script>
