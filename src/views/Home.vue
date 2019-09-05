<template>
  <el-container>
    <!-- Header -->
    <el-header style="background-color: #ffffff; margin: 10px 0px 20px 0px; height:70px">
      <el-row>
        <el-col :span="3">
          <el-image :src="logoUrl" style="height:70px"></el-image>
        </el-col>
        <el-col :span="19" style="marginLeft:15px">
          <h2 style="text-align:left; marginTop:24px;">东软客户关系管理系统</h2>
        </el-col>
        <!-- 退出按钮 -->
        <el-col :span="1">
          <el-button icon="el-icon-switch-button" @click="logOut()" circle style="marginTop:20px;"></el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="el-aside" width="16%">
        <!-- 基本信息 -->
        <el-row style="height:70px;">
          <!-- 头像 -->
          <el-col :span="8" :offset="4">
            <div class="portrait">
              <el-avatar :size="60" :src="circleUrl"></el-avatar>
            </div>
          </el-col>

          <!-- 用户名+身份 -->
          <el-col :span="10" :offset="1">
            <el-row style="height:40px">
              <div
                style="font-size:15px; font-weight: bold; text-align:left; color:#000000; margin:10px 0px 0px 3px"
              >蔡徐坤</div>
            </el-row>

            <el-row style="height:30px">
              <div
                style="font-size:12px; text-align:left; color:#303133; margin:0px 0px 0px 3px"
              >超级管理员</div>
            </el-row>
          </el-col>
        </el-row>

        <!-- 导航栏 -->
        <el-menu :default-active="activeIndex" style="marginTop:10px;" router>
          <!-- 控制台 -->
          <el-menu-item index="/Home/Console">
            <i class="el-icon-help"></i>
            <span slot="title">控制中心</span>
          </el-menu-item>

          <!-- 营销管理 -->
          <el-submenu index="marketing_management">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>营销管理</span>
            </template>
            <el-menu-item index="/Home/MarketingOpportunityManagement">营销机会管理</el-menu-item>
            <el-menu-item index="/Home/CustomerDevelopmentPlan">客户开发计划</el-menu-item>
          </el-submenu>

          <!-- 客户管理 -->
          <el-submenu index="customer_management">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>客户管理</span>
            </template>
            <el-menu-item index="/Home/CustomerInfoManagement">客户信息管理</el-menu-item>
            <el-menu-item index="/Home/CustomerLoseManagement">客户流失管理</el-menu-item>
          </el-submenu>

          <!-- 服务管理 -->
          <el-submenu index="service_management">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>服务管理</span>
            </template>
            <el-menu-item index="/Home/ServiceCreate">服务创建</el-menu-item>
            <el-menu-item index="/Home/ServiceManagement">服务管理</el-menu-item>
          </el-submenu>


          <!-- 报表统计 -->
          <el-submenu index="report_form_statistics">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>报表统计</span>
            </template>
            <el-menu-item index="/Home/CustomerServeAnalysis">客户服务分析</el-menu-item>
            <el-menu-item index="/Home/CustomerConstructAnalysis">客户构成分析</el-menu-item>
            <el-menu-item index="/Home/CustomerContributeAnalysis">客户贡献分析</el-menu-item>
            <el-menu-item index="/Home/CustomerLoseAnalysis">客户流失分析</el-menu-item>
          </el-submenu>


          <!-- 基本数据 -->
          <el-submenu index="basic_data">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>基本数据</span>
            </template>
            <el-menu-item index="/Home/DataDictionaryManagement">数据字典管理</el-menu-item>
            <el-menu-item index="/Home/SelectProductInfo">查询产品信息</el-menu-item>
            <el-menu-item index="/Home/SelectProductReserves">查询库存</el-menu-item>
          </el-submenu>


        </el-menu>
      </el-aside>


      <!-- RouterView -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-aside {
display: block;
position: relative;
overflow-y: scroll;

}

</style>


<script>
export default {
  data() {
    return {
      logoUrl: require("../assets/logoPic.jpg"),
      circleUrl: require("../assets/circlePic.jpg"),
      activeIndex: '/Home/Console',
    };
  },

  methods: {
    // 退出登录
    logOut() {
      console.log("logout success");
      this.$router.push("/");
    }
  }
};
</script>
