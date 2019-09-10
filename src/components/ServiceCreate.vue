<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-col :span="18">
        <el-input
          placeholder="请输入内容"
          v-model="selectKey.value"
          style="background-color: #fff;"
        >
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            placeholder="查询类型"
            style="width: 130px; "
          >
            <el-option label="客户编号" value="客户编号"></el-option>
            <el-option label="客户名称" value="客户名称"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="selectByPrimaryKey(selectKey)"
            >查询</el-button
          >
        </el-input>
      </el-col>

      <!-- 新建服务 -->
      <el-col :span="2" :offset="1">
        <el-button type="primary" round @click="createNewService()"
          >新建服务</el-button
        >
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
              >
                客户服务信息列表
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
          ref="service_List"
          :data="serviceListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="ref_cstm_id"
            label="客户编号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="customer_name"
            label="客户名称"
            align="center"
          ></el-table-column>

          <el-table-column
            property="summary"
            label="概要"
            align="center"
          ></el-table-column>

          <el-table-column
            property="type"
            label="服务类型"
            align="center"
          ></el-table-column>

          <el-table-column
            property="creator_name"
            label="创建人"
            align="center"
          ></el-table-column>

          <el-table-column
            property="create_time"
            label="创建时间"
            align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- “新建服务”弹出框 -->
    <el-dialog
      ref="create_service_dialog"
      :visible.sync="createServiceDialogVisible"
      title="创建服务"
    >
      <el-form
        :model="createServiceFormData"
        ref="createServiceFormData"
        label-width="100px"
      >
        <!-- 表单第一行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人">
              <el-input
                v-model="createServiceFormData.creator"
                :disabled="true"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="服务类型">
              <el-select
                v-model="createServiceFormData.type"
                style="width:100%"
              >
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
              <el-select
                v-model="createServiceFormData.name"
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
            <el-form-item label="状态">
              <el-input
                v-model="createServiceFormData.status"
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
              <el-input
                v-model="createServiceFormData.summary"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="服务请求">
              <el-input
                v-model="createServiceFormData.requestNote"
                type="textarea"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 提交表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="20">
              <el-button type="primary" @click="submitCreateServiceForm()"
                >创建服务</el-button
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

      currentRowMangerId: "",

      // “新建服务”弹出框显示控制
      createServiceDialogVisible: false,

      // “新建服务”弹出框表单数据
      createServiceFormData: {
        id: "",
        type: "",
        name: "",
        status: "",
        summary: "",
        requestNote: "",
        creator: ""
      },

      refEpeIds: [
        {
          id: "",
          name: ""
        }
      ],

      // “客户服务信息”列表数据
      serviceListData: [
        {
          ref_cstm_id: "",
          customer_name: "",
          summary: "",
          type: "",
          creator_name: "",
          create_time: ""
        }
      ]
    };
  },
  mounted: function() {
    //获取所有服务
    axios.get(Api.getAllserviceUrl).then(res => {
      if (res.data.code == 1) {
        this.serviceListData = res.data.data;
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
    selectByPrimaryKey(selectKey) {
      if (this.selectKey.type == "客户编号" && this.selectKey.value != null) {
        axios
          .get(Api.getAllserviceUrl, {
            params: {
              id: this.selectKey.value
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.serviceListData = res.data.data;
            } else {
              this.$message({
                type: "failed",
                message: "获取失败，请重试！！"
              });
            }
          });
      } else if (
        this.selectKey.type == "客户名称" &&
        this.selectKey.value != null
      ) {
        axios
          .get(Api.getAllserviceUrl, {
            params: {
              name: this.selectKey.value
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.serviceListData = res.data.data;
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
          message: "请选择查询类型，并输入正确的内容！！"
        });
      }
      console.log(selectKey);
    },

    //得到所有客户
    getRefEpeIds() {
      axios.get(Api.getAllCustomerUrl).then(res => {
        if (res.data.code == 1) {
          this.refEpeIds = res.data.data;
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
      this.currentRowMangerId = currentSelectedID;
    },

    // 新建服务
    createNewService() {
      this.createServiceDialogVisible = true;
    },

    refreshList() {
      //获取所有服务
      axios.get(Api.getAllserviceUrl).then(res => {
        if (res.data.code == 1) {
          this.serviceListData = res.data.data;
        } else {
          this.$message({
            type: "failed",
            message: "拉取失败，请重试！！"
          });
        }
      });
    },
    // 提交表单
    async submitCreateServiceForm() {
      console.log(this.createServiceFormData.name);
      axios
        .post(
          Api.creatingServiceUrl,
          qs.stringify({
            refCstmId: this.createServiceFormData.name,
            type: this.createServiceFormData.type,
            status: "新创建",
            summary: this.createServiceFormData.summary,
            requestNote: this.createServiceFormData.requestNote
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "创建成功！！"
            });
            this.createServiceDialogVisible = false;
          } else {
            this.$message({
              type: "failed",
              message: "创建失败，请重试！！"
            });
          }
        });

      this.$options.methods.refreshList();
    }
  }
};
</script>
