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
            <el-option label="产品" value="产品"></el-option>
            <el-option label="仓库" value="仓库"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 产品基本信息列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >产品库存信息列表</div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="product_List"
          :data="productListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="name" label="名称" align="center"></el-table-column>

          <el-table-column property="warehouse" label="仓库" align="center"></el-table-column>

          <el-table-column property="location" label="货位" align="center"></el-table-column>

          <el-table-column property="amount" label="件数" align="center"></el-table-column>

          <el-table-column property="remark" label="备注" align="center"></el-table-column>
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

      productListData: [
        {
          name: "幸福牌电视机",
          warehouse: "天津-恒远电子库",
          location: "EC-D2",
          amount: 128,
          remark: "代生产"
        },
        {
          name: "幸福牌电视机",
          warehouse: "天津-恒远电子库",
          location: "EC-D2",
          amount: 128,
          remark: "代生产"
        },
        {
          name: "幸福牌电视机",
          warehouse: "天津-恒远电子库",
          location: "EC-D2",
          amount: 128,
          remark: "代生产"
        },
        {
          name: "幸福牌电视机",
          warehouse: "天津-恒远电子库",
          location: "EC-D2",
          amount: 128,
          remark: "代生产"
        },
        {
          name: "幸福牌电视机",
          warehouse: "天津-恒远电子库",
          location: "EC-D2",
          amount: 128,
          remark: "代生产"
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
