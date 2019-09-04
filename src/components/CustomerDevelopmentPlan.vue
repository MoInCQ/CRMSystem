<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-col :span="18">
        <el-input placeholder="请输入内容" v-model="selectKey.value" style="background-color: #fff;">
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            placeholder="营销编号"
            style="width: 130px; "
            disabled
          ></el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 所查询之营销机会信息 -->
    <el-row>
      <!-- 表单 -->
      <el-form ref="marketingOpportunityInfo" :model="marketingOpportunityInfo" label-width="80px">
        <!-- 表单第一行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称">
              <el-input v-model="marketingOpportunityInfo.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="机会来源">
              <el-input v-model="marketingOpportunityInfo.source" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="概要">
              <el-input v-model="marketingOpportunityInfo.digest" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系人">
              <el-input v-model="marketingOpportunityInfo.contacts" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="marketingOpportunityInfo.contactsTel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="创建人">
              <el-input v-model="marketingOpportunityInfo.creator" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="指派给">
              <el-input v-model="marketingOpportunityInfo.designate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第三行 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="机会描述">
              <el-input
                type="textarea"
                v-model="marketingOpportunityInfo.opportunityStatement"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="创建时间">
              <el-input v-model="marketingOpportunityInfo.createDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" :offset="12">
            <el-button
              style="float: right"
              type="primary"
              round
              @click="completeDevelopment()"
            >完成此次营销 / 开发成功</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户开发计划及执行情况列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户开发计划及执行情况</div>
            </el-col>

            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-plus"
                @click="addPlan()"
              >添加计划</el-button>
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
          ref="customer_development_plan_info_list"
          :data="customerDevelopmentPlanListData"
          highlight-current-row
          stripe
          border
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="number" label="编号" align="center"></el-table-column>

          <el-table-column property="date" label="日期" align="center"></el-table-column>

          <el-table-column property="plan" label="计划项" align="center"></el-table-column>

          <el-table-column property="situation" label="执行情况" align="center"></el-table-column>

          <el-table-column label="编辑" align="center">
            <template>
              <el-button @click="editPlan()" icon="el-icon-edit" circle size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- “添加计划”对话框 -->
    <el-dialog :visible.sync="addPlanDialogVisible" title="添加计划项">
      <el-form
        :model="addPlanFormData"
        :rules="addPlanFormRules"
        ref="addPlanFormData"
        label-width="100px"
      >
        <!-- 日期 -->
        <el-form-item label="日期" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择计划执行日期"
            v-model="addPlanFormData.date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>

        <!-- 计划项 -->
        <el-form-item label="计划项" prop="plan">
          <el-input v-model="addPlanFormData.plan"></el-input>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button type="primary" @click="submitAddPlanForm('addPlanFormData')">确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="resetAddPlanForm('addPlanFormData')">重置表单</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- “编辑计划执行情况”对话框 -->
    <el-dialog :visible.sync="editPlanDialogVisible" title="编辑计划执行情况">
      <el-form :model="editPlanFormData" ref="editPlanFormData" label-width="100px">
        <!-- 计划执行情况 -->
        <el-form-item label="执行情况" prop="situation">
          <el-input v-model="editPlanFormData.situation"></el-input>
        </el-form-item>
        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button type="primary" @click="submitEditPlanForm('editPlanFormData')">确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="resetEditPlanForm('editPlanFormData')">重置表单</el-button>
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

      //表单变量
      marketingOpportunityInfo: {
        name: "",
        source: "",
        digest: "",
        contacts: "",
        contactsTel: "",
        creator: "",
        designate: "",
        opportunityStatement: "",
        createDate: ""
      },

      //表格内容
      customerDevelopmentPlanListData: [
        {
          number: "21321414",
          date: "2019-10-18",
          plan: "与客户面谈1",
          situation: "双方交换意见并达成合作"
        },
        {
          number: "21321414",
          date: "2019-10-18",
          plan: "与客户面谈2",
          situation: "双方交换意见并达成合作"
        },
        {
          number: "21321414",
          date: "2019-10-18",
          plan: "与客户面谈3",
          situation: "双方交换意见并达成合作"
        },
        {
          number: "21321414",
          date: "2019-10-18",
          plan: "与客户面谈",
          situation: "双方交换意见并达成合作"
        },
        {
          number: "21321414",
          date: "2019-10-18",
          plan: "与客户面谈",
          situation: "双方交换意见并达成合作"
        },
        {
          number: "21321414",
          date: "2019-10-18",
          plan: "与客户面谈",
          situation: "双方交换意见并达成合作"
        }
      ],
      currentRow: "",

      // 对话框可见性
      addPlanDialogVisible: false,
      editPlanDialogVisible: false,

      //对话框表单数据及限制条件
      addPlanFormData: {
        date: "",
        plan: ""
      },
      addPlanFormRules: {
        date: [
          {
            type: "date",
            required: true,
            message: "请选择此次计划项的执行日期",
            trigger: "change"
          }
        ],
        plan: [{ required: true, message: "请填写计划项内容", trigger: "blur" }]
      },

      editPlanFormData: {
        situation: ""
      }
    };
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    // 表单----------------------------------------------------------
    // 提交表单点击事件
    completeDevelopment() {
      //修改此次营销机会的状态
    },

    // 表格---------------------------------------------------------
    // 添加计划
    addPlan() {
      this.addPlanDialogVisible = true;
    },

    // 编辑计划完成情况
    editPlan() {
      this.editPlanDialogVisible = true;
      console.log(this.currentRow);
    },

    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 批量删除计划
    deleteInBatches() {},

    // 刷新列表
    refreshList() {
      console.log("refresh");
    },

    // 取消选择
    toggleSelection() {
      this.$refs.customer_development_plan_info_list.clearSelection();
      console.log("cancel selection");
    },

    // "添加计划"对话框----------------------------------------------------
    submitAddPlanForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          console.log(this.addPlanFormData.date);
          this.addPlanDialogVisible = false;
          this.$refs[formName].resetFields();
        } else {
          // 无效提交
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetAddPlanForm(formName) {
      this.$refs[formName].resetFields();
    },

    //  "编辑计划执行情况"对话框----------------------------------------------
    submitEditPlanForm(formName) {
      this.editPlanDialogVisible = false;
      this.$refs[formName].resetFields();
    },
    resetEditPlanForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>
