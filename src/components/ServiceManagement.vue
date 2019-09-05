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
                <el-input v-model="ServiceInfoFormData.number" :disabled="true" style="width:100%"></el-input>
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
                <el-input v-model="ServiceInfoFormData.name" style="width:100%" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="状态">
                <el-input
                  v-model="ServiceInfoFormData.state"
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
                <el-input v-model="ServiceInfoFormData.digest" style="width:100%" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第四行 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="服务请求">
                <el-input
                  v-model="ServiceInfoFormData.request"
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
                <el-input v-model="ServiceInfoFormData.creator" style="width:100%" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-date-picker
                  type="date"
                  v-model="ServiceInfoFormData.createTime"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 服务归档按钮 -->
          <el-form-item>
            <el-row>
              <el-col :span="4" :offset="20">
                <el-button
                  round
                  type="success"
                  @click="submitServiceInfoForm()"
                  style="width: 100%"
                >服务归档</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <!-- 服务分配 -->
      <el-collapse-item title="服务分配" name="2">
        <el-form :model="ServiceInfoFormData" label-width="100px">
          <!-- 表单第一行 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="分配给">
                <el-select v-model="ServiceInfoFormData.allocationPerson" style="width:100%">
                  <el-option label="小赵" value="小赵"></el-option>
                  <el-option label="小王" value="小王"></el-option>
                  <el-option label="小李" value="小李"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="分配时间">
                <el-date-picker
                  type="date"
                  v-model="ServiceInfoFormData.allocationTime"
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
                <el-input v-model="ServiceInfoFormData.dispose" type="textarea" style="width:100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第二行 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="处理人">
                <el-select v-model="ServiceInfoFormData.disposePerson" style="width:100%">
                  <el-option label="小赵" value="小赵"></el-option>
                  <el-option label="小王" value="小王"></el-option>
                  <el-option label="小李" value="小李"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="处理时间">
                <el-date-picker
                  type="date"
                  v-model="ServiceInfoFormData.disposeTime"
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
                <el-input v-model="ServiceInfoFormData.disposeResult" style="width:100%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="满意度">
                <el-rate v-model="ServiceInfoFormData.satisfaction"></el-rate>
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

      // “服务信息”表单数据
      ServiceInfoFormData: {
        number: "",
        type: "",
        name: "",
        state: "",
        digest: "",
        request: "",
        creator: "",
        createTime: "",

        allocationPerson: "",
        allocationTime: "",

        dispose: "",
        disposePerson: "",
        disposeTime: "",

        disposeResult: "",
        satisfaction: ""
      }
    };
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    // 折叠面板展开情况变化监听
    handleChange(val) {
      console.log(val);
    },

    // 服务归档
    submitServiceInfoForm() {},

    // 分配服务
    submitServiceAllocationForm() {},

    // 处理服务
    submitServiceDisposeForm() {},

    // 反馈服务
    submitServiceFeedbackForm() {}
  }
};
</script>
