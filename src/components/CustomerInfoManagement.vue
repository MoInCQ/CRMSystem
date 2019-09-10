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
            <el-option label="客户名称" value="客户名称"></el-option>
            <el-option label="客户编号" value="客户编号"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="selectByPrimaryKey(selectKey)"
            >查询</el-button
          >
        </el-input>
      </el-col>

      <!-- 新建客户 -->
      <el-col :span="2" :offset="1">
        <el-button type="primary" round @click="createNewCustomer()"
          >新建客户</el-button
        >
      </el-col>
    </el-row>

    <!-- 折叠面板 -->
    <el-row>
      <el-collapse
        v-model="collapseActiveName"
        accordion
        @change="getDiffrentInfo"
      >
        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
        <!-- 客户基本信息管理 -->
        <el-collapse-item title="客户基本信息管理" name="1">
          <el-card shadow="hover">
            <!-- 卡片头部 -->
            <div slot="header" class="clearfix">
              <el-row style="height:40px">
                <el-col :span="22">
                  <div
                    style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                  >
                    客户基本信息
                  </div>
                </el-col>

                <el-col :span="2">
                  <el-button
                    style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                    type="text"
                    icon="el-icon-edit"
                    @click="editCustomerInfo()"
                    >修改客户基本信息</el-button
                  >
                </el-col>
              </el-row>
            </div>

            <!-- 客户基本信息表单 -->
            <el-row>
              <el-form
                ref="customerInfoData"
                :model="customerInfoData"
                label-width="100px"
              >
                <!-- 表单第一行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="客户编号">
                      <el-input
                        v-model="customerInfoData.id"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="16">
                    <el-form-item label="客户名称" prop="name">
                      <el-input
                        v-model="customerInfoData.name"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 表单第二行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="地区">
                      <el-input
                        v-model="customerInfoData.region"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="客户经理">
                      <el-input
                        v-model="customerInfoData.manager_name"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="客户等级">
                      <el-select
                        v-model="customerInfoData.level"
                        style="width:100%"
                        :disabled="true"
                      >
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 表单第三行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="客户满意度">
                      <el-rate
                        v-model="customerInfoData.satisfaction"
                        disabled
                      ></el-rate>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="客户信用度">
                      <el-rate
                        v-model="customerInfoData.credit"
                        disabled
                      ></el-rate>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-divider />

                <!-- 表单第四行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="地址">
                      <el-input
                        v-model="customerInfoData.address"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="邮编">
                      <el-input
                        v-model="customerInfoData.zip_code"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="电话">
                      <el-input
                        v-model="customerInfoData.phone"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 表单第五行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="传真">
                      <el-input
                        v-model="customerInfoData.fax"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="16">
                    <el-form-item label="网址">
                      <el-input
                        v-model="customerInfoData.website"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-divider />

                <!-- 表单第六行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="营业执照编号">
                      <el-input
                        v-model="customerInfoData.license"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="法人">
                      <el-input
                        v-model="customerInfoData.juridical_person"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="注册资金">
                      <el-input
                        v-model="customerInfoData.registered_capital"
                        :disabled="true"
                        placeholder="（万元）"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 表单第七行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="年营业额">
                      <el-input
                        v-model="customerInfoData.revenue"
                        :disabled="true"
                        placeholder="（万元）"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="地税登记号">
                      <el-input
                        v-model="customerInfoData.land_tax_no"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="国税登记号">
                      <el-input
                        v-model="customerInfoData.state_tax_no"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 表单第六行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="开户银行">
                      <el-input
                        v-model="customerInfoData.bank_name"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="16">
                    <el-form-item label="银行账号">
                      <el-input
                        v-model="customerInfoData.bank_account"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
          </el-card>
        </el-collapse-item>

        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
        <!-- 联系人管理 -->
        <el-collapse-item title="联系人管理" name="2">
          <el-row style="margin-top:15px">
            <!-- 该公司联系人信息列表 -->
            <el-card shadow="hover">
              <!-- 卡片头部 -->
              <div slot="header" class="clearfix">
                <el-row style="height:40px">
                  <el-col :span="16">
                    <div
                      style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                    >
                      该公司联系人信息列表
                    </div>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-plus"
                      @click="addContacts()"
                      >添加联系人</el-button
                    >
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-refresh"
                      @click="refreshContactsList()"
                      >刷新列表</el-button
                    >
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-delete"
                      @click="deleteContactsInBatches()"
                      >批量删除</el-button
                    >
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-close"
                      @click="toggleContactsSelection()"
                      >取消选择</el-button
                    >
                  </el-col>
                </el-row>
              </div>

              <!-- 列表 -->
              <el-table
                ref="contacts_List"
                id="contacts_List"
                :data="contactsListData"
                highlight-current-row
                stripe
                border
                @current-change="handleCurrentContactsChange"
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
                  property="id"
                  label="编号"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="name"
                  label="姓名"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="sex"
                  label="性别"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="position"
                  label="职位"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="office_phone"
                  label="办公电话"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="tel"
                  label="手机号"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="note"
                  label="备注"
                  align="center"
                ></el-table-column>

                <el-table-column label="修改" align="center">
                  <template>
                    <el-button
                      @click="editContactsInfo()"
                      icon="el-icon-edit"
                      circle
                      size="small"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
        </el-collapse-item>

        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
        <!-- 历史订单管理 -->
        <el-collapse-item title="历史订单管理" name="3">
          <el-row style="margin-top:15px">
            <!-- 该公司历史订单列表 -->
            <el-card shadow="hover">
              <!-- 卡片头部 -->
              <div slot="header" class="clearfix">
                <el-row style="height:40px">
                  <el-col :span="16">
                    <div
                      style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                    >
                      该公司历史订单列表
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- 列表 -->
              <el-table
                ref="history_order_List"
                :data="historyOrderListData"
                highlight-current-row
                stripe
                border
                @current-change="handleCurrentHistoryOrderChange"
                style="width: 100%"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="id"
                  label="订单编号"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="date"
                  label="日期"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="address"
                  label="送货地址"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="status"
                  label="状态"
                  align="center"
                ></el-table-column>

                <el-table-column label="查看详情" align="center">
                  <template>
                    <el-button
                      @click="viewHistoryOrderDetails()"
                      icon="el-icon-document"
                      circle
                      size="small"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
        </el-collapse-item>

        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
        <!-- 交往信息管理 -->
        <el-collapse-item title="交往信息管理" name="4">
          <el-row style="margin-top:15px">
            <!-- 该公司联系人信息列表 -->
            <el-card shadow="hover">
              <!-- 卡片头部 -->
              <div slot="header" class="clearfix">
                <el-row style="height:40px">
                  <el-col :span="16">
                    <div
                      style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                    >
                      与该公司交往信息列表
                    </div>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-plus"
                      @click="addIntercourse()"
                      >添加交往记录</el-button
                    >
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-refresh"
                      @click="refreshIntercourseList()"
                      >刷新列表</el-button
                    >
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-delete"
                      @click="deleteIntercourseInBatches()"
                      >批量删除</el-button
                    >
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-close"
                      @click="toggleIntercourseSelection()"
                      >取消选择</el-button
                    >
                  </el-col>
                </el-row>
              </div>

              <!-- 列表 -->
              <el-table
                ref="Intercourse_List"
                :data="intercourseListData"
                highlight-current-row
                stripe
                border
                @current-change="handleCurrentIntercourseChange"
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
                  property="trd_id"
                  label="编号"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="trd_last_modified_time"
                  label="时间"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="address"
                  label="地点"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="summary"
                  label="概要"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="detail"
                  label="详细信息"
                  align="center"
                ></el-table-column>

                <el-table-column
                  property="note"
                  label="备注"
                  align="center"
                ></el-table-column>

                <el-table-column label="修改" align="center">
                  <template>
                    <el-button
                      @click="editIntercourseInfo()"
                      icon="el-icon-edit"
                      circle
                      size="small"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-row>

    <!-- "新建/修改客户"弹出框 -->
    <el-dialog
      ref="create_new_customer_dialog"
      :visible.sync="createNewCustomerDialogVisible"
    >
      <el-form
        ref="customerInfoData"
        :model="customerInfoData"
        :rules="customerRules"
        label-width="100px"
      >
        <!-- 表单第一行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户编号">
              <el-input
                v-model="customerInfoData.id"
                :disabled="true"
                placeholder="自动分配"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="customerInfoData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="地区" prop="region">
              <el-input v-model="customerInfoData.region"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户经理" prop="manager_name">
              <el-select
                v-model="customerInfoData.manager_name"
                placeholder="请选择此次营销机会负责人"
                style="width:100%"
                @change="handleChooseManager"
                @visible-change="getManager"
              >
                <el-option
                  v-for="item in managers"
                  :key="item.index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户等级" prop="level">
              <el-select v-model="customerInfoData.level" style="width:100%">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第三行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户满意度" prop="satisfaction">
              <el-rate v-model="customerInfoData.satisfaction"></el-rate>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户信用度" prop="credit">
              <el-rate v-model="customerInfoData.credit"></el-rate>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider />

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="地址" prop="address">
              <el-input v-model="customerInfoData.address"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="邮编" prop="zip_code">
              <el-input v-model="customerInfoData.zip_code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="customerInfoData.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第五行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="customerInfoData.fax"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="网址" prop="website">
              <el-input v-model="customerInfoData.website"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider />

        <!-- 表单第六行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="营业执照编号" prop="license">
              <el-input v-model="customerInfoData.license"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="法人" prop="juridical_person">
              <el-input v-model="customerInfoData.juridical_person"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="注册资金" prop="registered_capital">
              <el-input
                v-model="customerInfoData.registered_capital"
                placeholder="（万元）"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第七行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="年营业额" prop="revenue">
              <el-input
                v-model="customerInfoData.revenue"
                placeholder="（万元）"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="地税登记号" prop="land_tax_no">
              <el-input v-model="customerInfoData.land_tax_no"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="国税登记号" prop="state_tax_no">
              <el-input v-model="customerInfoData.state_tax_no"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第六行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户银行" prop="bank_name">
              <el-input v-model="customerInfoData.bank_name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="银行账号" prop="bank_account">
              <el-input v-model="customerInfoData.bank_account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 提交表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="20">
              <el-button
                type="primary"
                @click="submitCreateNewCustomerForm('customerInfoData')"
                >确定提交</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- “添加/修改联系人”弹出框 -->
    <el-dialog
      ref="create_contacts_dialog"
      :visible.sync="createContactsDialogVisible"
    >
      <el-form
        :model="createContactsFormData"
        :rules="contactsRules"
        ref="createContactsFormData"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="createContactsFormData.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="createContactsFormData.sex" style="width:100%">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职位" prop="position">
          <el-input v-model="createContactsFormData.position"></el-input>
        </el-form-item>

        <el-form-item label="办公电话" prop="officePhone">
          <el-input v-model="createContactsFormData.officePhone"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="tel">
          <el-input v-model="createContactsFormData.tel"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input v-model="createContactsFormData.note"></el-input>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button
                type="primary"
                @click="submitCreateContactsForm('createContactsFormData')"
                >确定提交</el-button
              >
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button
                @click="resetreateContactsForm('createContactsFormData')"
                >重置表单</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- “历史订单详情”弹出框 -->
    <el-dialog
      ref="history_order_details_dialog"
      :visible.sync="historyOrderDialogVisible"
      title="历史订单详情"
    >
      <!-- “历史订单详情”表单 -->
      <el-form
        :model="historyOrderDetailsFormData"
        ref="historyOrderDetailsFormData"
        label-width="100px"
      >
        <el-form-item label="订单编号" prop="id">
          <el-input
            v-model="historyOrderDetailsFormData.id"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="日期" prop="date">
          <el-input
            v-model="historyOrderDetailsFormData.date"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-input
            v-model="historyOrderDetailsFormData.status"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="总金额（元）" prop="total">
          <el-input
            v-model="historyOrderDetailsFormData.total"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="送货地址" prop="address">
          <el-input
            v-model="historyOrderDetailsFormData.address"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-divider />

      <!-- “历史订单详情”中商品信息表格 -->
      <el-table
        ref="history_order_commodity_List"
        :data="historyOrderCommodityListData"
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
          property="name"
          label="商品名称"
          align="center"
        ></el-table-column>

        <el-table-column
          property="num"
          label="数量"
          align="center"
        ></el-table-column>

        <el-table-column
          property="unit"
          label="单位"
          align="center"
        ></el-table-column>

        <el-table-column
          property="price"
          label="单价（元）"
          align="center"
        ></el-table-column>

        <el-table-column
          property="totalPrice"
          label="金额（元）"
          align="center"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <!-- “添加/修改交易信息记录”弹出框 -->
    <el-dialog
      ref="create_intercourse_dialog"
      :visible.sync="createIntercourseDialogVisible"
    >
      <el-form
        :model="createIntercourseFormData"
        ref="createIntercourseFormData"
        :rules="intercourseRules"
        label-width="100px"
      >
        <el-form-item label="时间" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="createIntercourseFormData.date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="地点" prop="address">
          <el-input v-model="createIntercourseFormData.address"></el-input>
        </el-form-item>

        <el-form-item label="概要" prop="summary">
          <el-input v-model="createIntercourseFormData.summary"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input v-model="createIntercourseFormData.note"></el-input>
        </el-form-item>

        <el-form-item label="详情" prop="detail">
          <el-input v-model="createIntercourseFormData.detail"></el-input>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button
                type="primary"
                @click="
                  submitCreateIntercourseForm('createIntercourseFormData')
                "
                >确定提交</el-button
              >
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button
                @click="resetreateIntercourseForm('createIntercourseFormData')"
                >重置表单</el-button
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

      // “新建客户/修改客户信息”弹出框显示控制
      createNewCustomerDialogVisible: false,

      // 折叠面板活跃项
      collapseActiveName: "1",

      // 客户基本信息相关----------------------------------------------------------------
      // 客户基本信息表单
      customerInfoData: {
        id: "",
        name: "",
        region: "",
        manager_name: "",
        level: "",
        satisfaction: null,
        credit: null,

        address: "",
        zip_code: "",
        phone: "",
        fax: "",
        website: "",

        license: "",
        juridical_person: "",
        registered_capital: "",
        revenue: "",
        land_tax_no: "",
        state_tax_no: "",
        bank_name: "",
        bank_account: ""
      },

      customerRules: {
        name: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
        region: [{ required: true, message: "请填写地区", trigger: "blur" }],
        manager_name: [
          { required: true, message: "请选择客户经理", trigger: "change" }
        ],
        level: [
          { required: true, message: "请选择客户等级", trigger: "change" }
        ],
        satisfaction: [
          { required: true, message: "请选择满意度", trigger: "change" }
        ],
        credit: [
          { required: true, message: "请选择信用度", trigger: "change" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        zip_code: [{ required: true, message: "请填写邮编", trigger: "blur" }],
        phone: [{ required: true, message: "请填写电话", trigger: "blur" }],
        license: [
          { required: true, message: "请填写营业执照", trigger: "blur" }
        ],
        juridical_person: [
          { required: true, message: "请填写法人", trigger: "blur" }
        ],
        registered_capital: [
          { required: true, message: "请填写注册资金", trigger: "blur" }
        ],
        revenue: [{ required: true, message: "请填写年收入", trigger: "blur" }],
        bank_name: [
          { required: true, message: "请填写开户银行", trigger: "blur" }
        ],
        bank_account: [
          { required: true, message: "请填写账号", trigger: "blur" }
        ]
      },

      managers: [
        {
          id: "",
          name: ""
        }
      ],

      // 联系人管理相关-----------------------------------------------------------
      // “添加/修改联系人”弹出框控制
      createContactsDialogVisible: false,

      selectedContacts: [],

      selectedInterCource: [],

      // 联系人表单信息
      createContactsFormData: {
        name: "",
        sex: "",
        position: "",
        officePhone: "",
        tel: "",
        note: ""
      },

      contactsRules: {
        name: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        position: [{ required: true, message: "请输入职称", trigger: "blur" }],
        officePhone: [
          { required: true, message: "请输入办公电话", trigger: "blur" }
        ]
      },

      // “联系人”表格信息
      contactsListData: [
        {
          id: "",
          name: "",
          sex: "",
          position: "",
          office_phone: "",
          tel: "",
          note: ""
        }
      ],
      currentRowOfContacts: "",

      // 历史订单管理相关---------------------------------------------------------------
      historyOrderListData: [
        {
          id: "",
          date: "",
          address: "",
          status: ""
        }
      ],
      currentRowOfHistoryOrder: "",

      // “历史订单详情”弹出框显示控制
      historyOrderDialogVisible: false,

      // “历史订单详情”弹出框内的表单
      historyOrderDetailsFormData: {
        id: "",
        date: "",
        status: "",
        total: "",
        address: ""
      },

      // “历史订单详情”弹出框内的商品信息表格
      historyOrderCommodityListData: [
        {
          name: "",
          num: 0,
          unit: "",
          price: 0,
          totalPrice: 0
        }
      ],

      // 交往信息管理相关----------------------------------------------------------------
      intercourseListData: [
        {
          trd_id: "",
          trd_last_modified_time: "",
          address: "",
          summary: "",
          detail: "",
          note: ""
        }
      ],
      currentRowOfIntercourse: "",
      currentSelectedManagerID: "",
      //要查询的客户ID
      inputCustomerID: "",

      // “添加/修改交往信息”弹出框显示控制
      createIntercourseDialogVisible: false,

      // “添加/修改交往信息”弹出框内的表单
      createIntercourseFormData: {
        date: "",
        address: "",
        summary: "",
        note: "",
        detail: ""
      },

      intercourseRules: {
        date: [{ required: true, message: "请选择时间", trigger: "change" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        summary: [{ required: true, message: "请输入概要", trigger: "blur" }]
      }
    };
  },

  methods: {
    //下拉得到数据
    getManager() {
      axios
        .get(Api.getOurContactNameUrl, {
          params: {
            type: "manager"
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.managers = res.data.data;
          } else {
            this.$message({
              type: "failed",
              message: "拉取失败，请重试！！"
            });
          }
        });
    },
    handleChooseManager(currentSelectedID) {
      this.currentSelectedManagerID = currentSelectedID;
    },

    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      this.isFirstGetCustomerInfo = false;
      axios
        .get(Api.getCompanyInfoUrl, {
          params: {
            key: this.selectKey.value
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.customerInfoData = res.data.data;
            this.customerInfoData.satisfaction =
              this.customerInfoData.satisfaction / 20;
            this.customerInfoData.credit = this.customerInfoData.credit / 20;
            this.currentSelectedManagerID = res.data.data.manager_id;
            this.inputCustomerID = res.data.data.id;
          } else {
            this.$message({
              type: "failed",
              message: "加载失败，请重试！！"
            });
          }
        });

      //获取联系人信息
      //this.$$options.methods.getContactsInfo(this.selectKey.value);
    },

    getDiffrentInfo(activeNames) {
      if (activeNames == "1") {
        //加载客户信息
        if (this.inputCustomerID != null) {
          axios
            .get(Api.getCompanyInfoUrl, {
              params: {
                key: this.inputCustomerID
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                this.customerInfoData = res.data.data;
              } else {
                this.$message({
                  type: "failed",
                  message: "加载失败，请重试！！"
                });
              }
            });
        }
      } else if (activeNames == "2") {
        //加载联系人信息
        if (this.inputCustomerID != null) {
          axios
            .get(Api.getContactsUrl, {
              params: {
                id: this.inputCustomerID
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                this.contactsListData = res.data.data;
              } else {
                this.$message({
                  type: "failed",
                  message: "加载失败，请重试！！"
                });
              }
            });
        }
      } else if (activeNames == "3") {
        //加载历史订单信息
        console.log(activeNames);
        if (this.inputCustomerID != null) {
          axios
            .get(Api.getHistoryUrl, {
              params: {
                id: this.inputCustomerID
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                this.historyOrderListData = res.data.data;
              } else {
                this.$message({
                  type: "failed",
                  message: "加载失败，请重试！！"
                });
              }
            });
        }
      } else if (activeNames == "4") {
        //加载交往信息
        if (this.inputCustomerID != null) {
          axios
            .get(Api.getIntercourseInfoUrl, {
              params: {
                id: this.inputCustomerID
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                this.intercourseListData = res.data.data;
              } else {
                this.$message({
                  type: "failed",
                  message: "加载失败，请重试！！"
                });
              }
            });
        }
      }
    },

    // “新建客户”点击事件
    createNewCustomer() {
      this.customerInfoData = {};
      this.$refs.create_new_customer_dialog.title = "新建客户";
      this.createNewCustomerDialogVisible = true;
    },

    //  "新建/修改客户"对话框----------------------------------------------
    submitCreateNewCustomerForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$refs.create_new_customer_dialog.title == "新建客户") {
            /**
             * 创建新客户
             */
            console.log("新建客户");
            axios
              .post(
                Api.createCustomerUrl,
                qs.stringify({
                  name: this.customerInfoData.name,
                  region: this.customerInfoData.region,
                  refEpeId: this.customerInfoData.manager_name,
                  level: this.customerInfoData.level,
                  satisfaction: this.customerInfoData.satisfaction * 20,
                  credit: this.customerInfoData.credit * 20,
                  address: this.customerInfoData.address,
                  zipCode: this.customerInfoData.zip_code,
                  phone: this.customerInfoData.phone,
                  fax: this.customerInfoData.fax,
                  website: this.customerInfoData.website,
                  license: this.customerInfoData.license,
                  juridicalPerson: this.customerInfoData.juridical_person,
                  registeredCapital: this.customerInfoData.registered_capital,
                  revenue: this.customerInfoData.revenue,
                  landTaxNo: this.customerInfoData.land_tax_no,
                  stateTaxNo: this.customerInfoData.state_tax_no,
                  bankName: this.customerInfoData.bank_name,
                  bankAccount: this.customerInfoData.bank_account
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.inputCustomerID = res.data.data.id;
                  this.customerInfoData.id = res.data.data.id;
                  this.$message({
                    type: "success",
                    message: "添加成功！！"
                  });
                  this.createNewCustomerDialogVisible = false;
                  //this.$options.methods.refreshList();
                } else {
                  this.$message({
                    type: "failed",
                    message: "添加失败，请重试！！"
                  });
                }
              });
          } else {
            /**
             * 编辑客户
             */
            axios
              .post(
                Api.updateCustomerUrl,
                qs.stringify({
                  id: this.customerInfoData.id,
                  name: this.customerInfoData.name,
                  region: this.customerInfoData.region,
                  refEpeId: this.currentSelectedManagerID,
                  level: this.customerInfoData.level,
                  satisfaction: this.customerInfoData.satisfaction * 20,
                  credit: this.customerInfoData.credit * 20,
                  address: this.customerInfoData.address,
                  zipCode: this.customerInfoData.zip_code,
                  phone: this.customerInfoData.phone,
                  fax: this.customerInfoData.fax,
                  website: this.customerInfoData.website,
                  license: this.customerInfoData.license,
                  juridicalPerson: this.customerInfoData.juridical_person,
                  registeredCapital: this.customerInfoData.registered_capital,
                  revenue: this.customerInfoData.revenue,
                  landTaxNo: this.customerInfoData.land_tax_no,
                  stateTaxNo: this.customerInfoData.state_tax_no,
                  bankName: this.customerInfoData.bank_name,
                  bankAccount: this.customerInfoData.bank_account
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: "修改成功！！"
                  });
                  this.createNewCustomerDialogVisible = false;
                  //this.$options.methods.refreshList();
                } else {
                  this.$message({
                    type: "failed",
                    message: "修改失败，请重试！！"
                  });
                }
              });
          }
        }
      });
    },

    // 客户基本信息管理------------------------------------------------------------------------------------
    editCustomerInfo() {
      this.$refs.create_new_customer_dialog.title = "修改客户基本信息";
      this.createNewCustomerDialogVisible = true;
    },

    // "联系人"表格---------------------------------------------------------------------------------------
    // 添加联系人
    addContacts() {
      this.createContactsFormData = {};
      this.$refs.create_contacts_dialog.title = "创建联系人";
      this.createContactsDialogVisible = true;
    },

    // 修改联系人信息
    editContactsInfo() {
      this.$refs.create_contacts_dialog.title = "修改联系人信息";
      this.createContactsFormData = this.currentRowOfContacts;
      this.createContactsFormData.officePhone = this.currentRowOfContacts.office_phone;
      //console.log("联系人id"+this.currentRowOfContacts.id);
      this.createContactsDialogVisible = true;
    },

    // 表格联系人控制当前选中行
    handleCurrentContactsChange(val) {
      this.currentRowOfContacts = val;
    },
    // 表格历史订单控制当前选中行
    handleCurrentHistoryOrderChange(val) {
      this.currentRowOfHistoryOrder = val;
    },
    // 表格交往记录控制当前选中行
    handleCurrentIntercourseChange(val) {
      this.currentRowOfIntercourse = val;
    },

    // 批量删除联系人
    deleteContactsInBatches() {
      this.selectedContacts = this.$refs.contacts_List.selection;

      this.selectedContacts.forEach(item => {
        axios
          .post(
            Api.deleteContactUrl,
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

    // 刷新联系人列表
    refreshContactsList() {
      console.log("refresh" + this.inputCustomerID);
      if (this.inputCustomerID != null) {
        axios
          .get(Api.getContactsUrl, {
            params: {
              id: this.inputCustomerID
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.contactsListData = res.data.data;
            } else {
              this.$message({
                type: "failed",
                message: "加载失败，请重试！！"
              });
            }
          });
      }
    },

    // 取消选择联系人
    toggleContactsSelection() {
      this.$refs.contacts_List.clearSelection();
      console.log("cancel selection");
    },

    // “新建/修改联系人”对话框---------------------------------------------------
    async submitCreateContactsForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$refs.create_contacts_dialog.title == "创建联系人") {
            axios
              .post(
                Api.createContactUrl,
                qs.stringify({
                  refCstmId: this.inputCustomerID,
                  name: this.createContactsFormData.name,
                  sex: this.createContactsFormData.sex,
                  position: this.createContactsFormData.position,
                  officePhone: this.createContactsFormData.officePhone,
                  tel: this.createContactsFormData.tel,
                  note: this.createContactsFormData.note
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: "添加成功！！"
                  });
                  this.createContactsDialogVisible = false;
                } else {
                  this.$message({
                    type: "failed",
                    message: "添加失败，请重试！！"
                  });
                }
              });
          } else {
            axios
              .post(
                Api.updateContactUrl,
                qs.stringify({
                  id: this.currentRowOfContacts.id,
                  refCstmId: this.inputCustomerID,
                  name: this.createContactsFormData.name,
                  sex: this.createContactsFormData.sex,
                  position: this.createContactsFormData.position,
                  officePhone: this.createContactsFormData.officePhone,
                  tel: this.createContactsFormData.tel,
                  note: this.createContactsFormData.note
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: "修改成功！！"
                  });
                  this.createContactsDialogVisible = false;
                } else {
                  this.$message({
                    type: "failed",
                    message: "修改失败，请重试！！"
                  });
                }
              });
          }
        }
      }),
        this.$refs[formName].resetFields();
      this.$options.methods.refreshContactsList();
    },
    resetreateContactsForm(formName) {
      //this.$refs[formName].resetFields();
      this.createContactsFormData = {};
    },

    // 历史订单管理---------------------------------------------------------------------------------------------
    viewHistoryOrderDetails() {
      console.log(this.currentRowOfHistoryOrder);
      //得到列表
      axios
        .get(Api.getHistoryDetailUrl, {
          params: {
            id: this.currentRowOfHistoryOrder.id
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.historyOrderDialogVisible = true;
            this.historyOrderDetailsFormData = res.data.data;
            this.historyOrderCommodityListData = res.data.data.products;
            for (
              var i = 0;
              i < this.historyOrderCommodityListData.length;
              i++
            ) {
              this.historyOrderCommodityListData[i].totalPrice =
                res.data.data.products[i].num * res.data.data.products[i].price;
            }
          } else {
            this.$message({
              type: "failed",
              message: "拉取失败，请重试！！"
            });
          }
        });
    },

    // 交往信息管理-------------------------------------------------------------------------
    // 添加交往信息
    addIntercourse() {
      this.createIntercourseFormData = {};
      this.$refs.create_intercourse_dialog.title = "创建交往信息记录";

      this.createIntercourseDialogVisible = true;
    },

    // 修改交往信息
    editIntercourseInfo() {
      //console.log(this.currentRowOfIntercourse.trd_id);
      this.$refs.create_intercourse_dialog.title = "修改交往信息记录";
      this.createIntercourseFormData = this.currentRowOfIntercourse;
      this.createIntercourseDialogVisible = true;
    },

    // 批量删除交往信息记录
    deleteIntercourseInBatches() {
      this.selectedInterCource = this.$refs.Intercourse_List.selection;

      this.selectedInterCource.forEach(item => {
        axios
          .post(
            Api.deleteInterCourseUrl,
            qs.stringify(
              {
                id: item.trd_id
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

    // 刷新交往信息记录列表
    refreshIntercourseList() {
      if (this.inputCustomerID != null) {
        axios
          .get(Api.getIntercourseInfoUrl, {
            params: {
              id: this.inputCustomerID
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              this.intercourseListData = res.data.data;
            } else {
              this.$message({
                type: "failed",
                message: "加载失败，请重试！！"
              });
            }
          });
      }
    },

    // 取消选择交往信息记录
    toggleIntercourseSelection() {
      this.$refs.Intercourse_List.clearSelection();
      console.log("cancel selection");
    },

    // “新建/修改交完信息”对话框---------------------------------------------------
    async submitCreateIntercourseForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.$refs.create_intercourse_dialog.title == "创建交往信息记录"
          ) {
            console.log("创建交往记录");
            axios
              .post(
                Api.createIntercourseDetailsUrl,
                qs.stringify({
                  refCstmId: this.inputCustomerID,
                  summary: this.createIntercourseFormData.summary,
                  address: this.createIntercourseFormData.address,
                  date: this.createIntercourseFormData.date,
                  detail: this.createIntercourseFormData.detail,
                  note: this.createIntercourseFormData.note
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: "添加成功！！"
                  });
                  this.createIntercourseDialogVisible = false;
                } else {
                  this.$message({
                    type: "failed",
                    message: "添加失败，请重试！！"
                  });
                }
              });
            this.$options.methods.refreshIntercourseList();
          } else {
            console.log("编辑交往记录" + this.currentRowOfIntercourse.trd_id);

            axios
              .post(
                Api.updateIntercourseDetailsUrl,
                qs.stringify({
                  id: this.currentRowOfIntercourse.trd_id,
                  refCstmId: this.inputCustomerID,
                  summary: this.createIntercourseFormData.summary,
                  address: this.createIntercourseFormData.address,
                  date: this.createIntercourseFormData.date,
                  detail: this.createIntercourseFormData.detail,
                  note: this.createIntercourseFormData.note
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: "修改成功！！"
                  });
                  this.createIntercourseDialogVisible = false;
                } else {
                  this.$message({
                    type: "failed",
                    message: "修改失败，请重试！！"
                  });
                }
              });
          }
        }
      }),
        this.$options.methods.refreshIntercourseList();
      this.$refs[formName].resetFields();
    },
    resetreateIntercourseForm(formName) {
      this.intercourseListData = {};
      //this.$refs[formName].resetFields();
    }
  }
};
</script>
