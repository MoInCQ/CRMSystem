<template>
  <div>
    <!-- 查询框 -->
    

    <!-- 折线图 -->
    <el-row>
      <div id="lineChart" :style="{width: '1100px', height: '440px'}"></div>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户服务分析列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户服务分析列表</div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="customer_serve_analysis_list"
          :data="customerServeAnalysisListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="number" label="客户编号" align="center"></el-table-column>

          <el-table-column property="item" label="条目" align="center"></el-table-column>

          <el-table-column property="amount" label="服务数量" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
     

      // “客户服务信息”列表数据
      customerServeAnalysisListData: [
        {
          number: "1",
          item: "建议",
          amount: 70
        },
        {
          number: "2",
          item: "咨询",
          amount: 280
        },
        {
          number: "3",
          item: "投诉",
          amount: 6
        }
      ]
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let lineChart = this.$echarts.init(document.getElementById("lineChart"));
      // 绘制图表
      lineChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["建议", "咨询", "投诉", ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "建议",
            type: "line",
            stack: "总量",
            data: [5, 10, 15, 30, 6, 4, 20]
          },
          {
            name: "咨询",
            type: "line",
            stack: "总量",
            data: [30, 30, 20, 55, 45, 20, 60]
          },
          {
            name: "投诉",
            type: "line",
            stack: "总量",
            data: [1, 0, 1, 1, 0, 2, 1]
          }
        ]
      });
    }
  }
};
</script>
