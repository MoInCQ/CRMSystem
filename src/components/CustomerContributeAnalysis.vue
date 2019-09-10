<template>
  <div>
    <!-- 饼状图 -->
    <el-row>
      <div id="barChart" :style="{ width: '1100px', height: '440px' }"></div>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户贡献分析列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >
                客户贡献分析列表
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="customer_contribute_analysis_list"
          :data="customerContributeAnalysisListData"
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
            property="number"
            label="客户编号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="name"
            label="客户名称"
            align="center"
          ></el-table-column>

          <el-table-column
            property="orderPrice"
            label="订单金额"
            align="center"
          ></el-table-column>
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
      customerContributeAnalysisListData: [
        {
          number: "134233659645gtf64",
          name: "测试客户公司1",
          amount: 1314
        },
        {
          number: "134234944743626f4",
          name: "测试客户公司2",
          orderPrice: 1000
        },
        {
          number: "134234292530136394",
          name: "测试客户公司3",
          orderPrice: 850
        },
        {
          number: "134352820476970234",
          name: "测试客户公司4",
          orderPrice: 666
        },
        {
          number: "134234",
          name: "测试客户公司5",
          orderPrice: 343
        }
      ]
    };
  },

  mounted() {
    this.drawBar();
  },

  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let barChart = this.$echarts.init(document.getElementById("barChart"));
      // 绘制图表
      barChart.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "2017", "2018"],
          source: [
            {
              product: "Matcha Latte",
              "2017": 800,
              "2018": 1314
            },
            { product: "Milk Tea", "2017": 73.4, "2018": 55.1 },
            {
              product: "Cheese Cocoa",
              "2017": 777,
              "2018": 850
            },
            {
              product: "hanger",
              "2017": 500,
              "2018": 666
            },
            {
              product: "Walnut Brownie",
              "2017": 250,
              "2018": 343
            }
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
    }
  }
};
</script>
