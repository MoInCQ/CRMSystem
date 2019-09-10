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
            <el-option label="公司名称" value="company"></el-option>
            <el-option label="概要" value="keyword"></el-option>
            <el-option label="联系人" value="contact"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>

      <!-- 创建营销 -->
      <el-col :span="2" :offset="1">
        <el-button type="primary" round @click="creatingMarketingOpportunity()">创建营销机会</el-button>
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

          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <!-- 用于“客户开发计划”页面的主键 -->
          <el-table-column property="id" label="编号" align="center"></el-table-column>

          <el-table-column property="name" label="公司名称" align="center"></el-table-column>

          <el-table-column property="note" label="概要" align="center"></el-table-column>

          <el-table-column property="contact_name" label="联系人" align="center"></el-table-column>

          <el-table-column property="contact_tel" label="联系电话" align="center"></el-table-column>

          <el-table-column property="create_time" label="创建时间" align="center"></el-table-column>

          <el-table-column label="修改营销机会" align="center">
            <template>
              <el-button
                @click="editMarketingOpportunity()"
                icon="el-icon-edit"
                circle
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- “创建/修改营销”弹出框 -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      :title="daiLogTitle"
      ref="create_marketing_opportunity_dialog"
    >
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
        <el-form-item label="成功几率" prop="probability" placeholder="请填入0-100的百分值（%）">
          <el-input v-model.number="creatingMarketingOpportunityForm.probability"></el-input>
        </el-form-item>

        <!-- 概要 -->
        <el-form-item label="概要" prop="profile">
          <el-input v-model="creatingMarketingOpportunityForm.profile"></el-input>
        </el-form-item>

        <!-- 联系人 -->
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="creatingMarketingOpportunityForm.contactName"></el-input>
        </el-form-item>

        <!-- 联系人电话 -->
        <el-form-item label="联系人电话" prop="contactTel">
          <el-input v-model.number="creatingMarketingOpportunityForm.contactTel"></el-input>
        </el-form-item>

        <!-- 机会描述 -->
        <el-form-item label="机会描述" prop="note">
          <el-input type="textarea" v-model="creatingMarketingOpportunityForm.note"></el-input>
        </el-form-item>

        <el-form-item label="指派日期" prop="appointedTime">
          <el-col>
            <el-date-picker
              type="date"
              v-model="creatingMarketingOpportunityForm.appointedTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <!-- 指派给 -->
        <el-form-item label="指派给" prop="refEpeId">
          <el-select
            v-model="creatingMarketingOpportunityForm.refEpeId"
            placeholder="请选择此次营销机会负责人"
            style="width:100%"
            @change="handleChooseEmployee"
            @visible-change="getRefEpeIds"
          >
            <el-option
              v-for="item in refEpeIds"
              :key="item.index"
              :value="item.id"
              :label="item.name"
            ></el-option>
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
import axios from "axios";
import qs from "qs";
import Api from "../http/api";
axios.defaults.withCredentials = true;
export default {
  inject: ["reload"],
  data() {
    return {
      daiLogTitle: "创建营销机会",
      //表格内容
      marketingOpportunityListData: [
        {
          id: "",
          name: "",
          note: "",
          contact_name: "",
          contact_tel: "",
          create_time: ""
        }
      ],
      currentRow: "",
      //当前员工营销服务对应的ID
      currentRowStaffId: "",

      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },

      // “创建营销”弹出框是否可见
      dialogFormVisible: false,

      selectedMarketOpprtunity: [],

      registrationInfoListData: [],

      // "创建营销"表单（修改字段名时主义将“rules”的字段名一起修改）
      creatingMarketingOpportunityForm: {
        name: "",
        source: "",
        probability: "",
        profile: "",
        contactName: "",
        contactTel: "",
        note: "",
        refEpeId: "",
        appointedTime: ""
      },

      refEpeIds: [
        {
          id: "",
          name: ""
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        source: [
          { required: true, message: "请填写机会来源", trigger: "blur" }
        ],
        probability: [
          { required: true, message: "请填写成功几率", trigger: "blur" },
          { type: "number", message: "几率值必须为数字(%)" }
        ],
        profile: [{ required: true, message: "请填写概要", trigger: "blur" }],
        contactName: [
          { required: true, message: "请填写联系人", trigger: "blur" }
        ],
        contactTel: [
          { required: true, message: "请填写联系人电话", trigger: "blur" },
          { length: 11, type: "number", message: "联系方式必须为11位数字" }
        ],
        note: [{ required: true, message: "请填写机会描述", trigger: "blur" }],
        refEpeId: [
          { required: true, message: "请指派此次营销负责人", trigger: "change" }
        ],
        appointedTime: [
          {
            required: true,
            message: "请合适的指派时间",
            trigger: "change"
          }
        ]
      }
    };
  },

  mounted: function() {
    //显示所有的营销机会
    axios
      .get(Api.getMarketingOpportunityUrl, {
        params: {
          type: "all"
        }
      })
      .then(res => {
        console.log("登录状态码" + res.data.code);
        if (res.data.code == 1) {
          this.marketingOpportunityListData = res.data.data;
        } else {
          this.$message({
            type: "failed",
            message: "登陆失败，请重试！！"
          });
        }
      });
  },

  methods: {
    onRowClick() {},

    // 查询框-------------------------------------------------------
    selectByPrimaryKey() {
      console.log("输入的内容" + this.selectKey.type);
      //选择了概要
      if (this.selectKey.type == "keyword") {
        axios
          .get(Api.getMarketingOpportunityUrl, {
            params: {
              keyword: this.selectKey.value
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.marketingOpportunityListData = res.data.data;
              console.log("概要" + res.data.data[0].name);
            } else {
              this.$message({
                type: "failed",
                message: "查询失败，请重试！！"
              });
            }
          });
        //选择查询公司
      } else if (this.selectKey.type == "company") {
        axios
          .get(Api.getMarketingOpportunityUrl, {
            params: {
              type: "company",
              keyword: this.selectKey.value
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.marketingOpportunityListData = res.data.data;
              console.log("公司" + res.data.data[0].contact_name);
            } else {
              this.$message({
                type: "failed",
                message: "查询失败，请重试！！"
              });
            }
          });
      } else if (this.selectKey.type == "contact") {
        axios
          .get(Api.getMarketingOpportunityUrl, {
            params: {
              type: "contact",
              keyword: this.selectKey.value
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.marketingOpportunityListData = res.data.data;
              console.log(
                "联系人" + this.marketingOpportunityListData[0].contact_name
              );
            } else {
              this.$message({
                type: "failed",
                message: "查询失败，请重试！！"
              });
            }
          });
      } else {
        this.$message({});
      }

      //this.$options.methods.refreshList.bind(this)();
    },

    // 创建销售机会
    creatingMarketingOpportunity() {
      this.creatingMarketingOpportunityForm = {};
      this.dialogFormVisible = true;
      //this.$refs.create_marketing_opportunity_dialog.title = "创建营销机会";
      this.daiLogTitle = "创建营销机会";
    },

    // 表格--------------------------------------------------------
    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
      this.selectedMarketOpprtunity.push(val);
      console.log("handleCurrentChange:" + this.currentRow.name);
    },

    // 删除收费项目
    deleteInBatches() {
      this.selectedMarketOpprtunity = this.$refs.marketing_opportunity_info_list.selection;

      this.selectedMarketOpprtunity.forEach(item => {
        axios
          .post(
            Api.deleteMarketingOpportunityUrl,
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

      this.$options.methods.refreshList.bind(this)();
    },

    // 刷新列表
    refreshList() {
      console.log("refresh！！");
      axios
        .get(Api.getMarketingOpportunityUrl, {
          params: {
            type: "all"
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log("内部的refresh");
            this.marketingOpportunityListData = res.data.data;
          } else {
            this.$message({
              type: "failed",
              message: "拉取失败，请重试！！"
            });
          }
        });
    },

    // 取消选择
    toggleSelection() {
      this.$refs.marketing_opportunity_info_list.clearSelection();
      console.log("cancel selection");
    },

    // 修改营销机会
    editMarketingOpportunity() {
      if (this.currentRow.id == "") {
        this.$message({
          type: "failed",
          message: "请单机选中行后再点击修改按钮"
        });
        return;
      }

      //this.$refs.create_marketing_opportunity_dialog.title = "修改营销机会";
      this.daiLogTitle = "修改营销机会";
      console.log(
        "标题为：" + this.$refs.create_marketing_opportunity_dialog.title
      );

      //拿到当前公司的营销机会
      axios
        .get(Api.getCurrentCompanyOpportunityUrl, {
          params: {
            id: this.currentRow.id
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.dialogFormVisible = true;
            this.creatingMarketingOpportunityForm.name = res.data.data.name;
            this.creatingMarketingOpportunityForm.source = res.data.data.source;
            this.creatingMarketingOpportunityForm.probability =
              res.data.data.probability;
            this.creatingMarketingOpportunityForm.profile =
              res.data.data.profile;
            this.creatingMarketingOpportunityForm.contactName =
              res.data.data.contact_name;
            this.creatingMarketingOpportunityForm.contactTel =
              res.data.data.contact_tel;
            this.creatingMarketingOpportunityForm.note = res.data.data.note;
            this.creatingMarketingOpportunityForm.refEpeId =
              res.data.data.assigned_to;
            (this.currentRowStaffId = res.data.data.assigned_to_id),
              (this.creatingMarketingOpportunityForm.appointedTime =
                res.data.data.appointed_time);
          } else {
            this.$message({
              type: "failed",
              message: "加载失败，请重试！！"
            });
          }
        });
    },

    //下拉选择前拉取指派人
    getRefEpeIds() {
      axios
        .get(Api.getOurContactNameUrl, {
          params: {
            type: "staff"
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.refEpeIds = res.data.data;
            //console.log(res.data.data);
            console.log("所有指派人::" + res.data.data);
            console.log(
              "下拉选择指派人::" +
                this.creatingMarketingOpportunityForm.refEpeId
            );
          } else {
            this.$message({
              type: "failed",
              message: "拉取失败，请重试！！"
            });
          }
        });
    },
    // 处理下拉选中指派人
    handleChooseEmployee(currentSelectedID) {
      this.currentRowStaffId = currentSelectedID;
    },

    // “创建营销”弹出框-------------------------------------------------
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            // this.$refs.create_marketing_opportunity_dialog.title ==
            // "修改营销机会"
            this.daiLogTitle == "修改营销机会"
          ) {
            console.log("则是修改:!!!:" + this.currentRowStaffId);

            // //提交修改后的信息
            axios
              .post(
                Api.updateMarketingOpportunityUrl,
                qs.stringify({
                  id: this.currentRow.id,
                  source: this.creatingMarketingOpportunityForm.source,
                  name: this.creatingMarketingOpportunityForm.name,
                  probability: this.creatingMarketingOpportunityForm
                    .probability,
                  profile: this.creatingMarketingOpportunityForm.profile,
                  note: this.creatingMarketingOpportunityForm.note,
                  refEpeId: this.currentRowStaffId,
                  contactName: this.creatingMarketingOpportunityForm
                    .contactName,
                  contactTel: this.creatingMarketingOpportunityForm.contactTel,
                  appointedTime: this.creatingMarketingOpportunityForm
                    .appointedTime
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: "修改成功！！"
                  });
                  this.dialogFormVisible = false;
                } else {
                  this.$message({
                    type: "failed",
                    message: "修改失败，请重试！！"
                  });
                }
              });
          } else {
            console.log("则是创建");
            axios
              .post(
                Api.creatingMarketingOpportunityUrl,
                qs.stringify({
                  source: this.creatingMarketingOpportunityForm.source,
                  name: this.creatingMarketingOpportunityForm.name,
                  probability: this.creatingMarketingOpportunityForm
                    .probability,
                  profile: this.creatingMarketingOpportunityForm.profile,
                  note: this.creatingMarketingOpportunityForm.note,
                  refEpeId: this.creatingMarketingOpportunityForm.refEpeId,
                  contactName: this.creatingMarketingOpportunityForm
                    .contactName,
                  contactTel: this.creatingMarketingOpportunityForm.contactTel,
                  appointedTime: this.creatingMarketingOpportunityForm
                    .appointedTime
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: "创建成功！！"
                  });
                  this.dialogFormVisible = false;
                } else {
                  this.$message({
                    type: "failed",
                    message: "创建失败，请重试！！"
                  });
                }
              });
          }
          //重新拉取最新的营销机会
          console.log("提交数据成功，下拉刷新！！");
          this.$options.methods.refreshList();
        } else {
          // 无效提交
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.creatingMarketingOpportunityForm = {};
    }
  }
};
</script>

