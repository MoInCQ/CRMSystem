<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-form :model="selectKey" label-width="100px">
        <el-row>
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

          <el-col :span="3" :offset="15">
            <el-button round type="primary" @click="selectByPrimaryKey()" style="width: 100%">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

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
      // 查询类型
      selectKey: {
        year: ""
      },

      // “客户服务信息”列表数据
      customerServeAnalysisListData: [
        {
          number: "1",
          item: "建议",
          amount: 24
        },
        {
          number: "2",
          item: "咨询",
          amount: 24
        },
        {
          number: "3",
          item: "投诉",
          amount: 24
        }
      ]
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let lineChart = this.$echarts.init(document.getElementById("lineChart"));
      // 绘制图表
      lineChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
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
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    }
  }
};
</script>
