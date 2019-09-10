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
            <el-option label="名称" value="名称"></el-option>
            <el-option label="型号" value="型号"></el-option>
            <el-option label="批次" value="批次"></el-option>
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
              >产品基本信息列表</div>
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

          <el-table-column property="id" label="编号" align="center"></el-table-column>

          <el-table-column property="name" label="名称" align="center"></el-table-column>

          <el-table-column property="model" label="型号" align="center"></el-table-column>

          <el-table-column property="batch" label="等级/批次" align="center"></el-table-column>

          <el-table-column property="unit" label="单位" align="center"></el-table-column>

          <el-table-column property="price" label="单价（元）" align="center"></el-table-column>

          <el-table-column property="note" label="备注" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>

import axios from "axios";
import qs from "qs";
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

      productListData: [
        {
          id: "",
          name: "",
          model: "",
          batch: "",
          unit: "",
          price: null,
          note: ""
        },
       
      ]
    };
  },

  mounted:function(){
    axios
      .get(Api.getProductsUrl)
      .then(res => {
        if (res.data.code == 1) {
          this.productListData = res.data.data;
        } else {
          this.$message({
            type: "failed",
            message: "获取失败，请重试！！"
          });
        }
      });
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      if(this.selectKey.type=="名称"&&this.selectKey.value!=null){
        axios
      .get(Api.getProductsUrl,{
        params:{
          name:this.selectKey.value
        }
      })
      .then(res => {
        if (res.data.code == 1) {
          this.productListData = res.data.data;
        } else {
          this.$message({
            type: "failed",
            message: "获取失败，请重试！！"
          });
        }
      });
      }else if(this.selectKey.type=="型号"&&this.selectKey.value!=null){
        axios
      .get(Api.getProductsUrl,{
        params:{
          model:this.selectKey.value
        }
      })
      .then(res => {
        if (res.data.code == 1) {
          this.productListData = res.data.data;
        } else {
          this.$message({
            type: "failed",
            message: "获取失败，请重试！！"
          });
        }
      });
      }else if(this.selectKey.type=="批次"&&this.selectKey.value!=null){
        axios
      .get(Api.getProductsUrl,{
        params:{
          batch:this.selectKey.value
        }
      })
      .then(res => {
        if (res.data.code == 1) {
          this.productListData = res.data.data;
        } else {
          this.$message({
            type: "failed",
            message: "获取失败，请重试！！"
          });
        }
      });
      }else{
        this.$message({
            type: "failed",
            message: "请选择查询类型并且输入内容！！"
          });
      }
    }
  }
};
</script>
