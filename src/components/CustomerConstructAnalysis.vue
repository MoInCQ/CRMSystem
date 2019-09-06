<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-form :model="selectKey" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="选择客户等级">
              <el-select v-model="selectKey.rank" style="width:100%">
                <el-option label="战略合作伙伴" value="战略合作伙伴"></el-option>
                <el-option label="合作伙伴" value="合作伙伴"></el-option>
                <el-option label="大客户" value="大客户"></el-option>
                <el-option label="重点开发客户" value="重点开发客户"></el-option>
                <el-option label="普通客户" value="普通客户"></el-option>
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
      <!-- 客户构成分析列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户构成分析列表</div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="customer_construct_analysis_list"
          :data="customerConstructAnalysisListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="number" label="编号" align="center"></el-table-column>

          <el-table-column property="rank" label="等级" align="center"></el-table-column>

          <el-table-column property="amount" label="客户数量" align="center"></el-table-column>
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
        rank: ""
      },

      // “客户服务信息”列表数据
      customerConstructAnalysisListData: [
        {
          number: "1",
          rank: "战略合作伙伴",
          amount: "532"
        },
        {
          number: "2",
          rank: "合作伙伴",
          amount: "241"
        },
        {
          number: "3",
          rank: "大客户",
          amount: "124"
        },
        {
          number: "4",
          rank: "重点开发客户",
          amount: "423"
        },
        {
          number: "5",
          rank: "普通客户",
          amount: "252"
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
           tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
      });
    }
  }
};
</script>
