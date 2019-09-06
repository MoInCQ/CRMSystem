<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-form :model="selectKey" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户名称">
              <el-input v-model="selectKey.name" style="width:100%"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="选择年份">
              <el-select v-model="selectKey.year" style="width:100%">
                <el-option label="2009" value="2009"></el-option>
                <el-option label="2010" value="2010"></el-option>
                <el-option label="2011" value="2011"></el-option>
                <el-option label="2012" value="2012"></el-option>
                <el-option label="2013" value="2013"></el-option>
                <el-option label="2014" value="2014"></el-option>
                <el-option label="2015" value="2015"></el-option>
                <el-option label="2016" value="2016"></el-option>
                <el-option label="2017" value="2017"></el-option>
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2019" value="2019"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 提交表单按钮 -->

          <el-col :span="3" :offset="9">
            <el-button round type="primary" @click="selectByPrimaryKey()" style="width: 100%">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <!-- 饼状图 -->
    <el-row>
      <div id="barChart" :style="{width: '1100px', height: '440px'}"></div>
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
              >客户贡献分析列表</div>
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
          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="number" label="客户编号" align="center"></el-table-column>

          <el-table-column property="name" label="客户名称" align="center"></el-table-column>

          <el-table-column property="orderPrice" label="订单金额" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询类型
      selectKey: {
        year: "",
        name: ""
      },

      // “客户服务信息”列表数据
      customerContributeAnalysisListData: [
        {
          number: "134234",
          name: "太阳药业",
          orderPrice: 5222
        },
        {
          number: "134234",
          name: "太阳药业",
          orderPrice: 5222
        },
        {
          number: "134234",
          name: "太阳药业",
          orderPrice: 5222
        },
        {
          number: "134234",
          name: "太阳药业",
          orderPrice: 5222
        },
        {
          number: "134234",
          name: "太阳药业",
          orderPrice: 5222
        }
      ]
    };
  },

  mounted() {
    this.drawBar();
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let barChart = this.$echarts.init(document.getElementById("barChart"));
      // 绘制图表
      barChart.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "2015", "2016", "2017"],
          source: [
            {
              product: "Matcha Latte",
              "2015": 43.3,
              "2016": 85.8,
              "2017": 93.7
            },
            { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
            {
              product: "Cheese Cocoa",
              "2015": 86.4,
              "2016": 65.2,
              "2017": 82.5
            },
            {
              product: "Walnut Brownie",
              "2015": 72.4,
              "2016": 53.9,
              "2017": 39.1
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
