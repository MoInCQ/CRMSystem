<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-col :span="18">
        <el-input placeholder="请输入内容" v-model="selectKey.value" style="background-color: #fff;">
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            placeholder="查询类型"
            style="width: 130px; "
          >
            <el-option label="客户名称" value="客户名称"></el-option>
            <el-option label="客户经理" value="客户经理"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户流失分析列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户流失分析列表</div>
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
          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="number" label="客户编号" align="center"></el-table-column>

          <el-table-column property="year" label="年份" align="center"></el-table-column>

          <el-table-column property="name" label="客户" align="center"></el-table-column>

          <el-table-column property="manager" label="客户经理" align="center"></el-table-column>

          <el-table-column property="reason" label="流失原因" align="center"></el-table-column>
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
        type: "",
        value: ""
      },

      // “客户服务信息”列表数据
      customerLoseAnalysisListData: [
        {
          number: "134234",
          year: "2017",
          name: "太阳药业",
          manager: "小明",
          reason: "发现更廉价的商品来源"
        },
        {
          number: "134234",
          year: "2017",
          name: "太阳药业",
          manager: "小明",
          reason: "发现更廉价的商品来源"
        },
        {
          number: "134234",
          year: "2017",
          name: "太阳药业",
          manager: "小明",
          reason: "发现更廉价的商品来源"
        },
        {
          number: "134234",
          year: "2017",
          name: "太阳药业",
          manager: "小明",
          reason: "发现更廉价的商品来源"
        },
        {
          number: "134234",
          year: "2017",
          name: "太阳药业",
          manager: "小明",
          reason: "发现更廉价的商品来源"
        }
      ]
    };
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    }
  }
};
</script>
