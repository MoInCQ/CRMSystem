<template>
  <div>
    <!-- 顶部导航 -->
    <!-- <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0px 0px 20px 15px">
        <el-breadcrumb-item :to="{ path: '/' }" class="breadcrumb-title">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrumb-subtitle">编辑销售机会</el-breadcrumb-item>

      </el-breadcrumb>
    </el-row>-->

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
            <el-option label="公司名称" value="公司名称"></el-option>
            <el-option label="概要" value="概要"></el-option>
            <el-option label="联系人" value="联系人"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>

      <!-- 创建营销 -->
      <el-col :span="2" :offset="1">
        <el-button type="primary" round @click="creatingMarketingOpportunity()" >创建营销机会</el-button>
      </el-col>
    </el-row>

    <el-row>
      <!-- 营销机会列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="18">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >营销机会列表</div>
            </el-col>

            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-refresh"
                @click="refreshList()"
              >刷新列表</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-delete"
                @click="deleteInBatches()"
              >批量删除</el-button>
            </el-col>

            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-close"
                @click="toggleSelection()"
              >取消选择</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="marketing_opportunity_info_list"
          :data="marketingOpportunityListData"
          highlight-current-row
          stripe
          border
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号"  align="center"></el-table-column>

          <!-- 用于“客户开发计划”页面的主键 -->
          <el-table-column property="number" label="编号" align="center"></el-table-column>

          <el-table-column property="name" label="公司名称" align="center"></el-table-column>

          <el-table-column property="type" label="概要" align="center"></el-table-column>

          <el-table-column property="price" label="联系人" align="center"></el-table-column>

          <el-table-column property="num" label="联系电话" align="center"></el-table-column>

          <el-table-column property="uage" label="创建时间" align="center"></el-table-column>

          <el-table-column label="修改营销机会" align="center">
            <template >
              <el-button @click="editMarketingOpportunity()" icon="el-icon-edit" circle size="small"></el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-card>
    </el-row>

    <!-- “创建/修改营销”弹出框 -->
    <el-dialog ref="create_marketing_opportunity_dialog" :visible.sync="dialogFormVisible">
      <el-form
        :model="creatingMarketingOpportunityForm"
        :rules="rules"
        ref="creatingMarketingOpportunityForm"
        label-width="100px"
      >
        <!-- 客户名称 -->
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="creatingMarketingOpportunityForm.name"></el-input>
        </el-form-item>

        <!-- 机会来源 -->
        <el-form-item label="机会来源" prop="source">
          <el-input v-model="creatingMarketingOpportunityForm.source"></el-input>
        </el-form-item>

        <!-- 成功几率 -->
        <el-form-item label="成功几率" prop="odds" placeholder="请填入0-100的百分值（%）">
          <el-input v-model.number="creatingMarketingOpportunityForm.odds"></el-input>
        </el-form-item>

        <!-- 概要 -->
        <el-form-item label="概要" prop="digest">
          <el-input v-model="creatingMarketingOpportunityForm.digest"></el-input>
        </el-form-item>

        <!-- 联系人 -->
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="creatingMarketingOpportunityForm.contacts"></el-input>
        </el-form-item>

        <!-- 联系人电话 -->
        <el-form-item label="联系人电话" prop="contactsTel">
          <el-input v-model.number="creatingMarketingOpportunityForm.contactsTel"></el-input>
        </el-form-item>

        <!-- 机会描述 -->
        <el-form-item label="机会描述" prop="opportunityStatement">
          <el-input type="textarea" v-model="creatingMarketingOpportunityForm.opportunityStatement"></el-input>
        </el-form-item>

        <!-- 指派给 -->
        <el-form-item label="指派给" prop="designate">
          <el-select
            v-model="creatingMarketingOpportunityForm.designate"
            placeholder="请选择此次营销机会负责人"
            style="width:100%"
          >
            <el-option label="小李" value="小李"></el-option>
            <el-option label="小王" value="小王"></el-option>
            <el-option label="小赵" value="小赵"></el-option>
            <el-option label="小吴" value="小吴"></el-option>
            <el-option label="小孙" value="小孙"></el-option>
          </el-select>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button type="primary" @click="submitForm('creatingMarketingOpportunityForm')">确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="resetForm('creatingMarketingOpportunityForm')">重置表单</el-button>
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
      //表格内容
      marketingOpportunityListData: [
        {
          number:"234432523523",
          name: "深圳迅雷科技有限公司",
          type: "科技/硬件/通讯",
          price: "李先生",
          num: "13122442424",
          uage: "2019-10-1"
        },
        {
          number:"234432523523",
          name: "深圳迅雷科技有限公司",
          type: "科技/硬件/通讯",
          price: "李先生",
          num: "13122442424",
          uage: "2019-10-1"
        },
        {
          number:"234432523523",
          name: "深圳迅雷科技有限公司",
          type: "科技/硬件/通讯",
          price: "李先生",
          num: "13122442424",
          uage: "2019-10-1"
        },
        {
          number:"234432523523",
          name: "深圳迅雷科技有限公司",
          type: "科技/硬件/通讯",
          price: "李先生",
          num: "13122442424",
          uage: "2019-10-1"
        },
        {
          number:"234432523523",
          name: "深圳迅雷科技有限公司",
          type: "科技/硬件/通讯",
          price: "李先生",
          num: "13122442424",
          uage: "2019-10-1"
        },
        {
          number:"234432523523",
          name: "深圳迅雷科技有限公司",
          type: "科技/硬件/通讯",
          price: "李先生",
          num: "13122442424",
          uage: "2019-10-1"
        },
        {
          number:"234432523523",
          name: "深圳迅雷科技有限公司",
          type: "科技/硬件/通讯",
          price: "李先生",
          num: "13122442424",
          uage: "2019-10-1"
        }
      ],
      currentRow: "",

      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },

      // “创建营销”弹出框是否可见
      dialogFormVisible: false,

      // "创建营销"表单（修改字段名时主义将“rules”的字段名一起修改）
      creatingMarketingOpportunityForm: {
        name: "",
        source: "",
        odds: "",
        digest: "",
        contacts: "",
        contactsTel: "",
        opportunityStatement: "",
        designate: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        source: [
          { required: true, message: "请填写机会来源", trigger: "blur" }
        ],
        odds: [
          { required: true, message: "请填写成功几率", trigger: "blur" },
          { type: 'number', message: '几率值必须为数字(%)'}
        ],
        digest: [
          { required: true, message: "请填写概要", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "请填写联系人", trigger: "blur" }
        ],
        contactsTel: [
          { required: true, message: "请填写联系人电话", trigger: "blur" },
          { length:11, type: 'number', message: '联系方式必须为11位数字'}
        ],
        opportunityStatement: [
          { required: true, message: "请填写机会描述", trigger: "blur" }
        ],
        designate: [
          { required: true, message: "请指派此次营销负责人", trigger: "change" }
        ]
      }
    };
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    // 创建销售机会
    creatingMarketingOpportunity() {
        this.dialogFormVisible = true;
        this.$refs.create_marketing_opportunity_dialog.title = "创建营销机会";
    },

    // 表格--------------------------------------------------------
    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 删除收费项目
    deleteInBatches() {},

    // 刷新列表
    refreshList() {
      console.log("refresh");
    },

    // 取消选择
    toggleSelection() {
      this.$refs.marketing_opportunity_info_list.clearSelection();
      console.log("cancel selection");
    },

    // 修改营销机会
    editMarketingOpportunity() {
        console.log(this.currentRow);
        this.dialogFormVisible = true;
        this.$refs.create_marketing_opportunity_dialog.title = "修改营销机会";
    },

    // “创建营销”弹出框-------------------------------------------------
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          this.dialogFormVisible = false;
          this.$refs[formName].resetFields();
        } else {
          // 无效提交
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

