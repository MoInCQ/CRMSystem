<template>
  <div>
    <!-- 查询框 -->
    <!-- <el-row style="margin: 0px 0px 30px 0px">
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
    </el-row> -->

    <el-row style="margin-top:15px">
      <!-- 客户流失管理列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >
                客户流失管理列表
              </div>
            </el-col>

            <el-col :span="2" :offset="6">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-refresh"
                @click="refreshList()"
                >刷新列表</el-button
              >
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="customer_Lose_List"
          :data="customerLoseListData"
          highlight-current-row
          stripe
          border
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="id"
            label="客户编号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="manager_name"
            label="客户经理"
            align="center"
          ></el-table-column>

          <el-table-column
            property="last_order_time"
            label="上次下单时间"
            align="center"
          ></el-table-column>

          <el-table-column
            property="lost_time"
            label="确认流失时间"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="100"
            :filters="[
              { text: '暂缓流失', value: '暂缓流失' },
              { text: '已流失', value: '已流失' }
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '暂缓流失' ? 'primary' : 'danger'"
                disable-transitions
                >{{ scope.row.status }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column label="查看/编辑" align="center">
            <template>
              <el-button
                @click="editPostponeCustomerLoseInfo()"
                icon="el-icon-edit"
                circle
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- “暂缓流失”弹出框 -->
    <el-dialog
      ref="postpone_customer_lose_dialog"
      :visible.sync="postponeCustomerLoseDialogVisible"
      title="查看/编辑暂缓措施"
    >
      <!-- “暂缓流失”表单 -->
      <el-form
        :model="postponeCustomerLoseInfoFormData"
        ref="postponeCustomerLoseInfoFormData"
        label-width="100px"
      >
        <el-form-item label="流失状态" prop="status">
          <el-input
            type="textarea"
            :disabled="true"
            v-model="postponeCustomerLoseInfoFormData.status"
          ></el-input>
        </el-form-item>
        <el-form-item label="暂缓措施" prop="measureOrReason">
          <el-input
            type="textarea"
            v-model="postponeCustomerLoseInfoFormData.measureOrReason"
          ></el-input>
        </el-form-item>

        <!-- 提交表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="6" :offset="18">
              <el-button
                style="width:100%"
                type="primary"
                @click="submitPostponeCustomerLoseInfoForm()"
                >提交暂缓措施</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- “确认流失”弹出框 -->
    <el-dialog
      ref="confirm_customer_lose_dialog"
      :visible.sync="confirmCustomerLoseDialogVisible"
      title="查看/编辑流失原因"
    >
      <!-- “确认流失”表单 -->
      <el-form
        :model="confirmCustomerLoseInfoFormData"
        ref="confirmCustomerLoseInfoFormData"
        label-width="100px"
      >
        <el-form-item label="流失状态" prop="status">
          <el-input
            type="textarea"
            :disabled="true"
            v-model="confirmCustomerLoseInfoFormData.status"
          ></el-input>
        </el-form-item>
        <el-form-item label="流失原因" prop="measureOrReason">
          <el-input
            type="textarea"
            v-model="confirmCustomerLoseInfoFormData.measureOrReason"
          ></el-input>
        </el-form-item>

        <!-- 提交表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="6" :offset="18">
              <el-button
                style="width:100%"
                type="danger"
                @click="submitConfirmCustomerLoseInfoForm()"
                >确认流失</el-button
              >
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
  data() {
    return {
      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },

      // 客户流失信息列表
      customerLoseListData: [
        {
          id: "",
          manager_name: "",
          last_order_time: "",
          confirmLoseDate: "",
          status: "",
          postponeLoseInfo: "",
          lost_time: ""
        }
      ],
      currentRow: "",
      measureOrReason: "",

      // “暂缓流失”弹出框显示控制
      postponeCustomerLoseDialogVisible: false,
      // “暂缓流失”弹出框表单
      postponeCustomerLoseInfoFormData: {
        status: "",
        measureOrReason: ""
      },

      // “确认流失”弹出框显示控制
      confirmCustomerLoseDialogVisible: false,
      // “确认流失”弹出框表单
      confirmCustomerLoseInfoFormData: {
        status: "",
        measureOrReason: ""
      }
    };
  },
  mounted: function() {
    //得到所有流失客户
    axios.get(Api.getAndUpdateCustomerLoseUrl).then(res => {
      if (res.data.code == 1) {
        this.customerLoseListData = res.data.data;
      } else {
        this.$message({
          type: "failed",
          message: "拉取失败，请重试！！"
        });
      }
    });
  },

  methods: {
    // 查询框-------------------------------------------------------
    // selectByPrimaryKey(selectKey) {
    //   console.log(selectKey);
    // },

    refreshList() {
      axios.get(Api.getAndUpdateCustomerLoseUrl).then(res => {
        if (res.data.code == 1) {
          this.customerLoseListData = res.data.data;
        } else {
          this.$message({
            type: "failed",
            message: "拉取失败，请重试！！"
          });
        }
      });
    },

    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 表格中的“状态”过滤器
    filterTag(value, row) {
      return row.status === value;
    },

    // 编辑暂缓措施
    editPostponeCustomerLoseInfo() {
      if (this.currentRow.status == "暂缓流失") {
        this.postponeCustomerLoseInfoFormData.status = this.currentRow.status;
        console.log("当前行的状态" + this.currentRow.measure_or_reason);
        this.postponeCustomerLoseInfoFormData.measureOrReason = this.currentRow.measure_or_reason;
        this.postponeCustomerLoseDialogVisible = true;
      } else {
        console.log("当前行的状态" + this.currentRow);
        this.confirmCustomerLoseInfoFormData.status = this.currentRow.status;
        this.confirmCustomerLoseInfoFormData.measureOrReason = this.currentRow.measure_or_reason;

        this.confirmCustomerLoseDialogVisible = true;
      }
    },
    getLostCustomer() {
      //得到所有流失客户
      axios.get(Api.getAndUpdateCustomerLoseUrl).then(res => {
        if (res.data.code == 1) {
          console.log("刷新，重新得到用户");
          this.customerLoseListData = res.data.data;
        } else {
          this.$message({
            type: "failed",
            message: "拉取失败，请重试！！"
          });
        }
      });
    },

    // 提交暂缓措施
    submitPostponeCustomerLoseInfoForm: async function() {
      if (this.postponeCustomerLoseInfoFormData.measureOrReason != null) {
        axios
          .post(
            Api.getAndUpdateCustomerLoseUrl,
            qs.stringify({
              id: this.currentRow.id,
              status: this.postponeCustomerLoseInfoFormData.status,
              measureOrReason: this.postponeCustomerLoseInfoFormData
                .measureOrReason
            })
          )
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "提交成功！！"
              });
              this.postponeCustomerLoseDialogVisible = false;
            } else {
              this.$message({
                type: "failed",
                message: "提交失败，请重试！！"
              });
            }
          });
        this.$options.methods.getLostCustomer();
      }
    },

    // 提交暂缓措施
    async submitConfirmCustomerLoseInfoForm() {
      if (this.confirmCustomerLoseInfoFormData.measureOrReason != null) {
        axios
          .post(
            Api.getAndUpdateCustomerLoseUrl,
            qs.stringify({
              id: this.currentRow.id,
              status: this.confirmCustomerLoseInfoFormData.status,
              measureOrReason: this.confirmCustomerLoseInfoFormData
                .measureOrReason
            })
          )
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "提交成功！！"
              });
              this.confirmCustomerLoseDialogVisible = false;
            } else {
              this.$message({
                type: "failed",
                message: "提交失败，请重试！！"
              });
            }
          });
        this.$options.methods.getLostCustomer();
      }
    }
  }
};
</script>
