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
            <el-option label="客户名称" value="客户名称"></el-option>
            <el-option label="客户经理" value="客户经理"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户流失管理列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户流失管理列表</div>
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
          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="number" label="客户编号" align="center"></el-table-column>

          <el-table-column property="manager" label="客户经理" align="center"></el-table-column>

          <el-table-column property="lastOrdDate" label="上次下单时间" align="center"></el-table-column>

          <el-table-column property="confirmLoseDate" label="确认流失时间" align="center"></el-table-column>

          <el-table-column
            prop="tag"
            label="状态"
            width="100"
            :filters="[{ text: '暂缓流失', value: '暂缓流失' }, { text: '确认流失', value: '确认流失' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '暂缓流失' ? 'primary' : 'danger'"
                disable-transitions
              >{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="查看/编辑暂缓措施" align="center">
            <template>
              <el-button
                @click="editPostponeCustomerLoseInfo()"
                icon="el-icon-edit"
                circle
                size="small"
              ></el-button>
            </template>
          </el-table-column>

          <el-table-column label="查看/编辑流失原因" align="center">
            <template>
              <el-button
                @click="editConfirmCustomerLoseInfo()"
                icon="el-icon-close"
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
        <el-form-item label="暂缓措施" prop="measure">
          <el-input type="textarea" v-model="postponeCustomerLoseInfoFormData.measure"></el-input>
        </el-form-item>

        <!-- 提交表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="6" :offset="18">
              <el-button
                style="width:100%"
                type="primary"
                @click="submitPostponeCustomerLoseInfoForm()"
              >提交暂缓措施</el-button>
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
        <el-form-item label="流失原因" prop="reason">
          <el-input type="textarea" v-model="confirmCustomerLoseInfoFormData.reason"></el-input>
        </el-form-item>

        <!-- 提交表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="6" :offset="18">
              <el-button
                style="width:100%"
                type="danger"
                @click="submitConfirmCustomerLoseInfoForm()"
              >确认流失</el-button>
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

      // 客户流失信息列表
      customerLoseListData: [
        {
          number: "1124142",
          manager: "赵经理",
          lastOrdDate: "2018-10-2",
          confirmLoseDate: "/",
          tag: "暂缓流失",
          postponeLoseInfo: "",
          confirmLoseInfo: ""
        },
        {
          number: "1124142",
          manager: "赵经理",
          lastOrdDate: "2018-10-2",
          confirmLoseDate: "/",
          tag: "暂缓流失",
          postponeLoseInfo: "",
          confirmLoseInfo: ""
        },
        {
          number: "1124142",
          manager: "赵经理",
          lastOrdDate: "2018-10-2",
          confirmLoseDate: "/",
          tag: "确认流失",
          postponeLoseInfo: "",
          confirmLoseInfo: ""
        },
        {
          number: "1124142",
          manager: "赵经理",
          lastOrdDate: "2018-10-2",
          confirmLoseDate: "/",
          tag: "暂缓流失",
          postponeLoseInfo: "",
          confirmLoseInfo: ""
        },
        {
          number: "1124142",
          manager: "赵经理",
          lastOrdDate: "2018-10-2",
          confirmLoseDate: "/",
          tag: "确认流失",
          postponeLoseInfo: "",
          confirmLoseInfo: ""
        }
      ],
      currentRow: "",

      // “暂缓流失”弹出框显示控制
      postponeCustomerLoseDialogVisible: false,
      // “暂缓流失”弹出框表单
      postponeCustomerLoseInfoFormData: {
        measure: ""
      },

      // “确认流失”弹出框显示控制
      confirmCustomerLoseDialogVisible: false,
      // “确认流失”弹出框表单
      confirmCustomerLoseInfoFormData: {
        reason: ""
      }
    };
  },

  methods: {
     // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 表格中的“状态”过滤器
    filterTag(value, row) {
      return row.tag === value;
    },

    // 编辑暂缓措施
    editPostponeCustomerLoseInfo() {
      this.postponeCustomerLoseDialogVisible = true;
    },

    // 提交暂缓措施
    submitPostponeCustomerLoseInfoForm() {
      this.postponeCustomerLoseDialogVisible = false;
    },

    // 编辑确认流失原因
    editConfirmCustomerLoseInfo() {
      this.confirmCustomerLoseDialogVisible = true;
    },

    // 提交暂缓措施
    submitConfirmCustomerLoseInfoForm() {
      this.confirmCustomerLoseDialogVisible = false;
    }
  }
};
</script>
