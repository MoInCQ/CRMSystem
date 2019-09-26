<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-col :span="18">
        <el-input
          placeholder="请输入内容"
          v-model="search"
          style="background-color: #fff;"
        >
          <el-select
            slot="prepend"
            :value="selectValue"
            placeholder="类别"
            style="width: 130px;"
            disabled
          ></el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="selectByPrimaryKey(selectKey)"
            >查询</el-button
          >
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 数据字典列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >
                数据字典列表
              </div>
            </el-col>

            <!-- <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-plus"
                @click="addDictionary()"
              >创建条目</el-button>
            </el-col>-->

            <!-- <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-delete"
                @click="deleteDictionaryInBatches()"
              >批量删除</el-button>
            </el-col>-->

            <!-- <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-close"
                @click="toggleDictionarySelection()"
              >取消选择</el-button>
            </el-col>-->
          </el-row>
        </div>

        <el-table
          ref="dictionary_List"
          :data="tables"
          highlight-current-row
          stripe
          border
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="55"
          ></el-table-column>

          <el-table-column
            type="index"
            label="序号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="number"
            label="编号"
            align="center"
          ></el-table-column>

          <el-table-column
            property="type"
            label="类别"
            align="center"
          ></el-table-column>

          <el-table-column
            property="title"
            label="条目"
            align="center"
          ></el-table-column>

          <el-table-column
            property="value"
            label="值"
            align="center"
          ></el-table-column>

          <el-table-column
            property="isEditable"
            label="是否可编辑"
            align="center"
          ></el-table-column>

          <el-table-column label="编辑" align="center">
            <template>
              <el-button
                @click="editDictionaryInfo()"
                icon="el-icon-edit"
                circle
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- “添加/修改联系人”弹出框 -->
    <el-dialog ref="create_item_dialog" :visible.sync="createItemDialogVisible">
      <el-form
        :model="createItemFormData"
        ref="createItemFormData"
        label-width="100px"
      >
        <el-form-item label="类别" prop="type">
          <el-input v-model="createItemFormData.type"></el-input>
        </el-form-item>

        <el-form-item label="条目" prop="title">
          <el-input v-model="createItemFormData.title"></el-input>
        </el-form-item>

        <el-form-item label="值" prop="value">
          <el-input v-model="createItemFormData.value"></el-input>
        </el-form-item>

        <el-form-item label="是否可编辑" prop="isEditable">
          <el-select v-model="createItemFormData.isEditable" style="width:100%">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="20">
              <el-button type="primary" @click="submitCreateItemForm()"
                >提交</el-button
              >
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
      selectValue: "",
      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },

      // “数据字典”表格数据
      dictionaryListData: [
        {
          number: "4234ar234sf23224",
          type: "大型企业",
          title: "普通客户",
          value: "5",
          isEditable: "是"
        },
        {
          number: "12784234234224dfd",
          type: "上市公司",
          title: "合作伙伴",
          value: "10",
          isEditable: "是"
        },
        {
          number: "90876234242324234t",
          type: "私企",
          title: "高级客户",
          value: "8",
          isEditable: "是"
        },
        {
          number: "654943828203047596",
          type: "央视企业",
          title: "大客户",
          value: "20",
          isEditable: "是"
        },
        {
          number: "243649303646484930",
          type: "企业客户等级",
          title: "普通客户",
          value: "40",
          isEditable: "是"
        }
      ],
      currentRowOfDictionary: "",
      currrentIndex: 0,
      Num: "",
      search: "",

      // “创建/修改数据字典条目”弹出框显示控制
      createItemDialogVisible: false,
      // “创建/修改数据字典条目”弹出框表单
      createItemFormData: {
        type: "",
        title: "",
        value: "",
        isEditable: ""
      }
    };
  },

  computed: {
    // 模糊搜索
    tables() {
      const search = this.search;
      if (search) {
        return this.dictionaryListData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.dictionaryListData;
    }
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    MathRand() {
      for (var i = 0; i < 18; i++) {
        this.Num += Math.floor(Math.random() * 10);
      }
    },

    // 表格相关-----------------------------------------------------
    // 添加字典
    addDictionary() {
      this.createItemFormData = {};
      this.$refs.create_item_dialog.title = "创建字典条目";
      this.createItemDialogVisible = true;
    },

    // 修改联系人信息
    editDictionaryInfo() {
      this.$refs.create_item_dialog.title = "修改字典条目";
      this.createItemDialogVisible = true;
      this.createItemFormData = this.currentRowOfDictionary;
    },

    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRowOfDictionary = val;

      this.dictionaryListData.map((c, i) => {
        if (c.number == val.number) {
          this.currrentIndex = i;
        }
      });
    },

    // 批量删除联系人
    deleteDictionaryInBatches() {},

    // 取消选择联系人
    toggleDictionarySelection() {
      this.$refs.dictionary_List.clearSelection();
      console.log("cancel selection");
    },

    // 提交弹出框表单
    submitCreateItemForm() {
      //var Num="";
      console.log(this.$refs.create_item_dialog.title == "修改字典条目");
      if (this.$refs.create_item_dialog.title == "修改字典条目") {
        this.dictionaryListData[this.currrentIndex] = this.createItemFormData;
      } else {
        //得到编号
        for (var i = 0; i < 18; i++) {
          this.Num += Math.floor(Math.random() * 10);
        }

        this.dictionaryListData[0].number = this.Num;
        this.dictionaryListData[0] = this.createItemFormData;
      }
      this.createItemDialogVisible = false;
    }
  }
};
</script>
