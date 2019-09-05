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
            <el-option label="公司编号" value="公司编号"></el-option>
            <el-option label="公司名称" value="公司名称"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>

      <!-- 新建服务 -->
      <el-col :span="2" :offset="1">
        <el-button type="primary" round @click="createNewService()">新建服务</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户服务信息列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户服务信息列表</div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="service_List"
          :data="serviceListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="number" label="客户编号" align="center"></el-table-column>

          <el-table-column property="name" label="客户名称" align="center"></el-table-column>

          <el-table-column property="digest" label="概要" align="center"></el-table-column>

          <el-table-column property="type" label="服务类型" align="center"></el-table-column>

          <el-table-column property="creator" label="创建人" align="center"></el-table-column>

          <el-table-column property="createTime" label="创建时间" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- “新建服务”弹出框 -->
    <el-dialog ref="create_service_dialog" :visible.sync="createServiceDialogVisible" title="创建服务">
      <el-form :model="createServiceFormData" ref="createServiceFormData" label-width="100px">
        <!-- 表单第一行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人">
              <el-input v-model="createServiceFormData.creator" style="width:100%"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="服务类型">
              <el-select v-model="createServiceFormData.type" style="width:100%">
                <el-option label="咨询" value="咨询"></el-option>
                <el-option label="建议" value="建议"></el-option>
                <el-option label="计划" value="计划"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称">
              <el-input v-model="createServiceFormData.name" style="width:100%"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="状态">
              <el-input
                v-model="createServiceFormData.state"
                style="width:100%"
                :disabled="true"
                placeholder="新创建"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第三行 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="概要">
              <el-input v-model="createServiceFormData.digest" style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="服务请求">
              <el-input v-model="createServiceFormData.request" type="textarea" style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <!-- 提交表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="20">
              <el-button type="primary" @click="submitCreateServiceForm()">创建服务</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
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

      // “新建服务”弹出框显示控制
      createServiceDialogVisible: false,

      // “新建服务”弹出框表单数据
      createServiceFormData: {
        type: "",
        name: "",
        state: "",
        digest: "",
        request: "",
        creator: ""
      },

      // “客户服务信息”列表数据
      serviceListData: [
        {
          number: "134234",
          name: "太阳药业",
          digest: "询问订单价格",
          type: "咨询",
          creator: "小明",
          createTime: "2017-2-23"
        },
        {
          number: "134234",
          name: "太阳药业",
          digest: "询问订单价格",
          type: "咨询",
          creator: "小明",
          createTime: "2017-2-23"
        },
        {
          number: "134234",
          name: "太阳药业",
          digest: "询问订单价格",
          type: "咨询",
          creator: "小明",
          createTime: "2017-2-23"
        },
        {
          number: "134234",
          name: "太阳药业",
          digest: "询问订单价格",
          type: "咨询",
          creator: "小明",
          createTime: "2017-2-23"
        },
        {
          number: "134234",
          name: "太阳药业",
          digest: "询问订单价格",
          type: "咨询",
          creator: "小明",
          createTime: "2017-2-23"
        }
      ]
    };
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    // 新建服务
    createNewService() {
      this.createServiceDialogVisible = true;
    },
    // 提交表单
    submitCreateServiceForm() {
      this.createServiceDialogVisible = false;
    }
  }
};
</script>
