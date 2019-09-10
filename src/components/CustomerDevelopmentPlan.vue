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
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="marketingOpportunityInfo.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="机会来源" prop="source">
              <el-input v-model="marketingOpportunityInfo.source" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="概要" prop="note">
              <el-input v-model="marketingOpportunityInfo.note" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系人" prop="contact_name">
              <el-input v-model="marketingOpportunityInfo.contact_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="联系电话" prop="contact_tel">
              <el-input v-model="marketingOpportunityInfo.contact_tel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="创建人" prop="creator">
              <el-input v-model="marketingOpportunityInfo.creator" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="指派给" prop="assigned_to">
              <el-input v-model="marketingOpportunityInfo.assigned_to" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第三行 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="机会描述" prop="profile">
              <el-input type="textarea" v-model="marketingOpportunityInfo.profile" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="创建时间" prop="create_time">
              <el-input v-model="marketingOpportunityInfo.create_time" :disabled="true"></el-input>
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

          <el-table-column property="id" label="编号" align="center"></el-table-column>

          <el-table-column property="date" label="日期" align="center"></el-table-column>

          <el-table-column property="content" label="计划项" align="center"></el-table-column>

          <el-table-column property="status" label="执行情况" align="center"></el-table-column>

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
        <el-form-item label="计划项" prop="content">
          <el-input v-model="addPlanFormData.content"></el-input>
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
        <el-form-item label="执行情况" prop="status">
          <el-input v-model="editPlanFormData.status"></el-input>
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
import axios from "axios";
import qs from "qs";
import Api from "../http/api";
import { async } from "q";
axios.defaults.withCredentials = true;
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
        note: "",
        contact_name: "",
        contact_tel: "",
        creator: "",
        assigned_to: "",
        profile: "",
        create_time: ""
      },

      selectedPlanOpprtunity: [],

      //表格内容
      customerDevelopmentPlanListData: [
        {
          id: "21321414",
          date: "2019-10-18",
          content: "与客户面谈1",
          status: "双方交换意见并达成合作"
        }
      ],
      currentRow: "",
      probability: "",
      currentRowStaffId: "",
      appointedTime: "",

      // 对话框可见性
      addPlanDialogVisible: false,
      editPlanDialogVisible: false,

      //对话框表单数据及限制条件
      addPlanFormData: {
        date: "",
        content: ""
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
        content: [
          { required: true, message: "请填写计划项内容", trigger: "blur" }
        ]
      },

      editPlanFormData: {
        status: ""
      }
    };
  },
  methods: {
    getPlans: async function(selectKey) {
      axios
        .get(Api.getPlansUrl, {
          params: {
            id: selectKey
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.customerDevelopmentPlanListData = res.data.data;
          } else {
            this.$message({
              type: "failed",
              message: "编号填写错误！！"
            });
          }
        });
    },

    // 表单----------------------------------------------------------
    // 提交表单点击事件
    async completeDevelopment() {
      //修改此次营销机会的状态
      axios
        .post(
          Api.updateMarketingOpportunityUrl,
          qs.stringify({
            id: this.selectKey.value,
            source: this.marketingOpportunityInfo.source,
            name: this.marketingOpportunityInfo.name,
            profile: this.marketingOpportunityInfo.profile,
            note: this.marketingOpportunityInfo.note,
            contactName: this.marketingOpportunityInfo.contact_name,
            contactTel: this.marketingOpportunityInfo.contact_tel,
            probability: this.probability,
            refEpeId: this.currentRowStaffId,
            appointedTime: this.appointedTime,
            status: "已完成"
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "修改成功！！"
            });
          } else {
            this.$message({
              type: "failed",
              message: "修改失败，请重试！！"
            });
          }
        });
    },

    // 表格---------------------------------------------------------
    // 添加计划
    addPlan() {
      this.addPlanFormData = {};
      this.addPlanDialogVisible = true;
    },

    // 编辑计划完成情况
    editPlan() {
      this.editPlanDialogVisible = true;
      console.log(this.currentRow);
      this.editPlanFormData.status = this.currentRow.status;
    },

    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 批量删除计划
    deleteInBatches() {
      this.selectedPlanOpprtunity = this.$refs.customer_development_plan_info_list.selection;

      this.selectedPlanOpprtunity.forEach(item => {
        axios
          .post(
            Api.deletePlanOpportunityUrl,
            qs.stringify(
              {
                id: item.id
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }
            )
          )
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "删除成功！！"
              });
            } else {
              this.$message({
                type: "failed",
                message: "删除失败，请重试！！"
              });
            }
          });
      });
    },

    // // 刷新列表
    // refreshList() {
    //   axios
    //     .get(Api.getMarketingOpportunityUrl, {
    //       params: {
    //         type: "all"
    //       }
    //     })
    //     .then(res => {
    //       if (res.data.code == 1) {
    //         console.log("内部的refresh");
    //         this.marketingOpportunityListData = res.data.data;
    //       } else {
    //         this.$message({
    //           type: "failed",
    //           message: "拉取失败，请重试！！"
    //         });
    //       }
    //     });
    // },

    // 刷新列表
    refreshList: async function() {
      axios
        .get(Api.getPlansUrl, {
          params: {
            id: this.selectKey.value
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log("刷新内部！");
            this.customerDevelopmentPlanListData = res.data.data;
          } else {
            this.$message({
              type: "failed",
              message: "编号填写错误！！"
            });
          }
        });
    },

    // 查询框-------------------------------------------------------
    selectByPrimaryKey: async function() {
      axios
        .get(Api.getCurrentCompanyOpportunityUrl, {
          params: {
            id: this.selectKey.value
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.marketingOpportunityInfo = res.data.data;
            this.currentRowStaffId = res.data.data.assigned_to_id;
            this.probability = res.data.data.probability;
            this.appointedTime = res.data.data.appointed_time;
          } else {
            this.$message({
              type: "failed",
              message: "加载失败，请重试！！"
            });
          }
        });
      //查看当前营销机会是否含有计划项
      // this.$options.methods.getPlans(this.selectKey.value).bind(this)();

      // this.$options.methods.refreshList().bind(this)();

      // this.$options.methods.getPlans(this.selectKey.value);
      // this.$options.methods.refreshList();
      // 均定义在此方法之前
      this.getPlans(this.selectKey.value);
      this.refreshList();
    },

    // 取消选择
    toggleSelection() {
      this.$refs.customer_development_plan_info_list.clearSelection();
      console.log("cancel selection");
    },

    // "添加计划"对话框----------------------------------------------------
    async submitAddPlanForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          if (this.selectKey.value == "") {
            this.$message({
              type: "failed",
              message: "请输入营销编号！！"
            });
          } else {
            axios
              .post(
                Api.createPlansUrl,
                qs.stringify({
                  chanceId: this.selectKey.value,
                  date: this.addPlanFormData.date,
                  content: this.addPlanFormData.content
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: "添加成功！！"
                  });
                  this.addPlanDialogVisible = false;
                } else {
                  this.$message({
                    type: "failed",
                    message: "添加失败，请重试！！"
                  });
                }
              });
            this.$options.methods.refreshList();
          }
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
      this.addPlanFormData = {};
    },

    //  "编辑计划执行情况"对话框----------------------------------------------
    async submitEditPlanForm(formName) {
      axios
        .post(
          Api.updatePlanUrl,
          qs.stringify(
            {
              id: this.currentRow.id,
              status: this.editPlanFormData.status
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "添加成功！！"
            });
            this.editPlanDialogVisible = false;
          } else {
            this.$message({
              type: "failed",
              message: "添加失败，请重试！！"
            });
          }
        });
      this.$options.methods.refreshList();
    },
    resetEditPlanForm(formName) {
      this.$refs[formName].resetFields();
      this.editPlanFormData = {};
    }
  }
};
</script>
