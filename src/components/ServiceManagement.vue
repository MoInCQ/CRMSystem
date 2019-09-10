<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-col :span="18">
        <el-input placeholder="请输入内容" v-model="selectKey.value" style="background-color: #fff;">
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            placeholder="服务编号"
            style="width: 130px; "
            disabled
          ></el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 折叠面板 -->
    <el-collapse v-model="activeNames" @change="handleChange">
      <!-- 服务基本信息 -->
      <el-collapse-item title="服务基本信息" name="1">
        <el-form :model="ServiceInfoFormData" label-width="100px">
          <!-- 表单第一行 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户编号">
                <el-input
                  v-model="ServiceInfoFormData.ref_cstm_id"
                  :disabled="true"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="服务类型">
                <el-select v-model="ServiceInfoFormData.type" style="width:100%" :disabled="true">
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
                <el-input
                  v-model="ServiceInfoFormData.customer_name"
                  style="width:100%"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="状态">
                <el-input
                  v-model="ServiceInfoFormData.status"
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
                <el-input v-model="ServiceInfoFormData.summary" style="width:100%" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第四行 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="服务请求">
                <el-input
                  v-model="ServiceInfoFormData.request_note"
                  type="textarea"
                  style="width:100%"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第四行 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建人">
                <el-input
                  v-model="ServiceInfoFormData.creator_name"
                  style="width:100%"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-date-picker
                  type="date"
                  v-model="ServiceInfoFormData.create_time"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>

      <!-- 服务分配 -->
      <el-collapse-item title="服务分配" name="2">
        <el-form :model="ServiceInfoFormData" label-width="100px">
          <!-- 表单第一行 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="分配给">
                <el-select
                  v-model="ServiceInfoFormData.distribute_to_epe_name"
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
            </el-col>

            <el-col :span="12">
              <el-form-item label="分配时间">
                <el-date-picker
                  type="date"
                  v-model="ServiceInfoFormData.distribute_time"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 提交表单按钮 -->
          <el-form-item>
            <el-row>
              <el-col :span="4" :offset="20">
                <el-button
                  round
                  type="primary"
                  @click="submitServiceAllocationForm()"
                  style="width: 100%"
                >分配服务</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <!-- 服务处理 -->
      <el-collapse-item title="服务处理" name="3">
        <el-form :model="ServiceInfoFormData" label-width="100px">
          <!-- 表单第一行 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="服务处理">
                <el-input
                  v-model="ServiceInfoFormData.handle_note"
                  type="textarea"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第二行 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="处理人">
                <el-select
                  v-model="ServiceInfoFormData.handle_by_epe_name"
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
            </el-col>

            <el-col :span="12">
              <el-form-item label="处理时间">
                <el-date-picker
                  type="date"
                  v-model="ServiceInfoFormData.handle_time"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 提交表单按钮 -->
          <el-form-item>
            <el-row>
              <el-col :span="4" :offset="20">
                <el-button
                  round
                  type="primary"
                  @click="submitServiceDisposeForm()"
                  style="width: 100%"
                >处理服务</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <!-- 服务反馈 -->
      <el-collapse-item title="服务反馈" name="4">
        <el-form :model="ServiceInfoFormData" label-width="100px">
          <!-- 表单第一行 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="处理结果">
                <el-input v-model="ServiceInfoFormData.handle_result" style="width:100%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="满意度">
                <el-rate v-model="ServiceInfoFormData.handle_satisfaction"></el-rate>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 提交表单按钮 -->
          <el-form-item>
            <el-row>
              <el-col :span="4" :offset="20">
                <el-button
                  round
                  type="primary"
                  @click="submitServiceFeedbackForm()"
                  style="width: 100%"
                >反馈服务</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
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

      // 折叠面板默认打开项
      activeNames: ["1"],

      refEpeIds: [
        {
          id: "",
          name: ""
        }
      ],

      currentRowStaffId: "",

      serviceID: "",

      // “服务信息”表单数据
      ServiceInfoFormData: {
        ref_cstm_id: "",
        type: "",
        customer_name: "",
        status: "",
        summary: "",
        request_note: "",
        creator_name: "",
        create_time: "",

        distribute_to_epe_name: "",
        distribute_time: "",

        handle_note: "",
        handle_by_epe_name: "",
        handle_time: "",

        handle_result: "",
        handle_satisfaction: null
      }
    };
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey() {
      if (this.selectKey.value != null) {
        axios
          .get(Api.getOneserviceUrl, {
            params: {
              id: this.selectKey.value
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.ServiceInfoFormData = res.data.data;
              this.ServiceInfoFormData.handle_satisfaction =
                res.data.data.handle_satisfaction / 20;
              this.serviceID = res.data.data.id;
            } else {
              this.$message({
                type: "failed",
                message: "获取失败，请重试！！"
              });
            }
          });
      } else {
        this.$message({
          type: "failed",
          message: "请输入内容！！"
        });
      }
    },

    //得到所有客户
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
            // console.log("选择得到的职员"+this.ServiceInfoFormData.handle_by_ref_epe_id.label)
          } else {
            this.$message({
              type: "failed",
              message: "拉取失败，请重试！！"
            });
          }
        });
    },

    //每次点开折叠面板就去请求一次最新数据
    getMostNewData() {
      if (this.serviceID != null) {
        axios
          .get(Api.getOneserviceUrl, {
            params: {
              id: this.serviceID
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.ServiceInfoFormData = res.data.data;
              this.serviceID = res.data.data.id;
            } else {
              this.$message({
                type: "failed",
                message: "获取失败，请重试！！"
              });
            }
          });
      }
    },

    // 处理下拉选中指派人
    handleChooseEmployee(currentSelectedID) {
      this.currentRowStaffId = currentSelectedID;
    },

    // 折叠面板展开情况变化监听
    handleChange() {
      this.$options.methods.getMostNewData();
    },

    // 分配服务
    submitServiceAllocationForm() {
      // console.log("id"+this.serviceID,this.ServiceInfoFormData.ref_cstm_id,
      // this.ServiceInfoFormData.type,this.ServiceInfoFormData.distribute_time,
      // this.currentRowStaffId,
      // )
      axios
        .post(
          Api.updateServiceUrl,
          qs.stringify({
            id: this.serviceID,
            refCstmId: this.ServiceInfoFormData.ref_cstm_id,
            type: this.ServiceInfoFormData.type,
            status: "已分配",
            summary: this.ServiceInfoFormData.summary,
            requestNote: this.ServiceInfoFormData.request_note,

            distributeTime: this.ServiceInfoFormData.distribute_time,
            distributeToRefEpeId: this.ServiceInfoFormData
              .distribute_to_epe_name
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "分配成功！！"
            });
            this.createServiceDialogVisible = false;
          } else {
            this.$message({
              type: "failed",
              message: "分配失败，请重试！！"
            });
          }
        });
    },

    // 处理服务
    submitServiceDisposeForm() {
      // console.log("id"+this.serviceID,this.ServiceInfoFormData.ref_cstm_id,
      // this.ServiceInfoFormData.type,this.ServiceInfoFormData.handle_note,
      // this.currentRowStaffId,
      // )
      axios
        .post(
          Api.updateServiceUrl,
          qs.stringify({
            id: this.serviceID,
            refCstmId: this.ServiceInfoFormData.ref_cstm_id,
            type: this.ServiceInfoFormData.type,
            status: "已处理",
            summary: this.ServiceInfoFormData.summary,
            requestNote: this.ServiceInfoFormData.request_note,

            handleNote: this.ServiceInfoFormData.handle_note,
            handleTime: this.ServiceInfoFormData.handle_time,
            handleByRefEpeId: this.ServiceInfoFormData.handle_by_epe_name
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "处理成功！！"
            });
            this.createServiceDialogVisible = false;
          } else {
            this.$message({
              type: "failed",
              message: "处理失败，请重试！！"
            });
          }
        });
    },

    // 反馈服务
    submitServiceFeedbackForm() {
      // console.log("id"+this.serviceID,this.ServiceInfoFormData.ref_cstm_id,
      // this.ServiceInfoFormData.type,this.ServiceInfoFormData.handle_result,
      // (this.ServiceInfoFormData.handle_satisfaction)*20
      // )
      axios
        .post(
          Api.updateServiceUrl,
          qs.stringify({
            id: this.serviceID,
            refCstmId: this.ServiceInfoFormData.ref_cstm_id,
            type: this.ServiceInfoFormData.type,
            status: "已反馈",
            summary: this.ServiceInfoFormData.summary,
            requestNote: this.ServiceInfoFormData.request_note,

            handleResult: this.ServiceInfoFormData.handle_result,
            handleSatisfaction:
              this.ServiceInfoFormData.handle_satisfaction * 20
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "反馈成功！！"
            });
            this.createServiceDialogVisible = false;
          } else {
            this.$message({
              type: "failed",
              message: "反馈失败，请重试！！"
            });
          }
        });
    }
  }
};
</script>
