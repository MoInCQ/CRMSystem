<template>
  <div>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="9">
        <!-- 左上六个小卡片 -->
        <el-row>
          <!-- 第一列 -->
          <el-col :span="11">
            <el-row class="row-margin">
              <!-- 总客户量 -->
              <el-card class="little-card-style" shadow="hover">
                <el-row>
                  <el-col :span="10">
                    <el-avatar :size="size" :src="totalCustomerAmountPicUrl"></el-avatar>
                  </el-col>
                  <el-col :span="14">
                    <div class="card-content-text-title">254</div>
                    <div class="card-content-text">总客户量</div>
                  </el-col>
                </el-row>
              </el-card>
            </el-row>

            <!-- 客户流失量 -->
            <el-row class="row-margin">
              <el-card class="little-card-style" shadow="hover">
                <el-row>
                  <el-col :span="10">
                    <el-avatar :size="size" :src="loseCoustomerAmountPicUrl"></el-avatar>
                  </el-col>

                  <el-col :span="14">
                    <div class="card-content-text-title">254</div>
                    <div class="card-content-text">客户流失量</div>
                  </el-col>
                </el-row>
              </el-card>
            </el-row>

            <!-- 新订单 -->
            <el-row class="row-margin">
              <el-card class="little-card-style" shadow="hover">
                <el-row>
                  <el-col :span="10">
                    <el-avatar :size="size" :src="newOrderAmountPicUrl"></el-avatar>
                  </el-col>

                  <el-col :span="14">
                    <div class="card-content-text-title">254</div>
                    <div class="card-content-text">新订单</div>
                  </el-col>
                </el-row>
              </el-card>
            </el-row>
          </el-col>

          <!-- 第二列 -->
          <el-col :span="11" :offset="2">
            <!-- 客户开发量 -->
            <el-row class="row-margin">
              <el-card class="little-card-style" shadow="hover">
                <el-row>
                  <el-col :span="10">
                    <el-avatar :size="size" :src="developCustomerAmountPicUrl"></el-avatar>
                  </el-col>

                  <el-col :span="14">
                    <div class="card-content-text-title">254</div>
                    <div class="card-content-text">客户开发量</div>
                  </el-col>
                </el-row>
              </el-card>
            </el-row>

            <!-- 服务反馈量 -->
            <el-row class="row-margin">
              <el-card class="little-card-style" shadow="hover">
                <el-row>
                  <el-col :span="10">
                    <el-avatar :size="size" :src="feedbackAmountPicUrl"></el-avatar>
                  </el-col>

                  <el-col :span="14">
                    <div class="card-content-text-title">254</div>
                    <div class="card-content-text">服务反馈量</div>
                  </el-col>
                </el-row>
              </el-card>
            </el-row>

            <!-- 商品总数 -->
            <el-row class="row-margin">
              <el-card class="little-card-style" shadow="hover">
                <el-row>
                  <el-col :span="10">
                    <el-avatar :size="size" :src="commodityAmountPicUrl"></el-avatar>
                  </el-col>

                  <el-col :span="14">
                    <div class="card-content-text-title">254</div>
                    <div class="card-content-text">商品总数</div>
                  </el-col>
                </el-row>
              </el-card>
            </el-row>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <!-- 本周销售统计折线图 -->
        <el-row>
          <div id="lineChart" :style="{width: '450px', height: '300px'}"></div>
        </el-row>
      </el-col>

      <!--右侧-->
      <el-col :span="14" :offset="1">
        <el-row>
          <!-- 交易金额前十名的客户列表 -->
          <el-card shadow="hover">
            <!-- 卡片头部 -->
            <div slot="header" class="clearfix">
              <el-row style="height:40px">
                <el-col :span="16">
                  <div
                    style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                  >本周交易金额前十的客户</div>
                </el-col>
              </el-row>
            </div>

            <!-- 列表 -->
            <el-table
              ref="top_sale_customer_list"
              :data="topSaleCustomerListData"
              highlight-current-row
              height="215px"
              stripe
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" align="center"></el-table-column>

              <el-table-column property="number" label="客户编号" align="center"></el-table-column>

              <el-table-column property="name" label="客户名称" align="center"></el-table-column>

              <el-table-column property="sale" label="交易金额(万元)" align="center"></el-table-column>
            </el-table>
          </el-card>
        </el-row>

        <!-- 本周畅销前十商品柱状图 -->
        <el-row style="margin: 50px 0px 0px 0px">
          <div id="barChart" :style="{width: '700px', height: '300px'}"></div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.card-style {
  height: 90px;
  width: 100%;
}

.verticalLine {
  height: 700px;
}

.card-content-text-title {
  font-size: larger;
  font-style: italic;
  font-weight: bolder;
}

.card-content-text {
  font-size: small;
  font-style: normal;
  font-weight: normal;
  color: gray;
}

.row-margin {
  margin-bottom: 25px;
}
</style>

<script>
export default {
  data() {
    return {
      totalCustomerAmountPicUrl: require("../assets/totalCustomerAmountPic.png"),
      loseCoustomerAmountPicUrl: require("../assets/loseCoustomerAmountPic.png"),
      newOrderAmountPicUrl: require("../assets/newOrderAmountPic.png"),
      developCustomerAmountPicUrl: require("../assets/developCustomerAmountPic.png"),
      feedbackAmountPicUrl: require("../assets/feedbackAmountPic.png"),
      commodityAmountPicUrl: require("../assets/commodityAmountPic.png"),

      // 表格数据
      topSaleCustomerListData: [
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        },
        {
          number: "34234",
          name: "汉东省京州市大风厂",
          sale: 888.88
        }
      ]
    };
  },
  mounted() {
    this.drawBar();
    this.drawLine();
  },
  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let barChart = this.$echarts.init(document.getElementById("barChart"));
      // 绘制图表
      barChart.setOption({
        title: {
          text: "本周畅销前十商品统计（万件）"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "大衣", "羽绒服", "运动鞋", "工装裤"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20, 42, 21, 32, 24]
          }
        ]
      });
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let lineChart = this.$echarts.init(document.getElementById("lineChart"));
      // 绘制图表
      lineChart.setOption({
        title: {
          text: "本周销售情况统计（单/日）"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    }
  }
};
</script>