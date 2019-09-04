
<template>
  <div>
    <el-row style="height:50px"></el-row>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-card>
              <el-row>
                <el-col :span="18">
                  <el-image :src="imageUrl" style="height:500px" :fit="cover"></el-image>
                </el-col>

                <el-col :span="5" style="margin-left:20px">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                    <h3
                      style="font-weight:bolder; font-size:larger; marginTop: 80px; margin-bottom: 30px"
                    >注册</h3>

                    <el-form-item label="名称" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pass">
                      <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" class="submitBtn" @click="submitForm(ruleForm)">注册</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <el-footer style="marginTop:30px">
        <el-divider content-position="center">Copyright @ 东软客户关系管理系统</el-divider>
      </el-footer>
    </el-container>
  </div>
</template>



<script>
//import { constants } from "crypto";

// function getuuid() {
//   var uid = [];
//   var hexDigits = "0123456789abcdefghijklmnopqrst";
//   for (var i = 0; i < 32; i++) {
//     uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//   }
//   uid[6] = "4";
//   uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
//   var uuid = uid.join("");
//   return uuid;
// }

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      activeName: "second",
      ruleForm: {
        name: "",
        pass: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 14 个字符", trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      imageUrl: require("../assets/loginPic.jpg")
    };
  },

  mounted: function() {
    this.getUsers();
  },

  //获取用户数据
  getUsers() {
    this.loading = true;
    api._get().then(
      res => {
        this.users = res.datas;
        this.total_rows = res.datas.total_rows;
        this.loading = false;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  },

  methods: {
    /**
     * 注册用户
     */
    submitForm(form) {
      console.log(form);
      this.$router.push("/");
      this.$message({
        showClose: true,
        message: "注册成功",
        type: "success"
      });
      api._post(form);
      //this.$router.push("/login");
      // this.$refs.formName.validate(valid => {
      //   console.log(formName);
      //   if (valid) {
      //     this.$message({
      //       type: "success",
      //       message: "注册成功"
      //     });
      //     //register._post(formName);
      //     this.$router.push("/login");
      //     // this.activeName: 'first',
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style scoped>
.login-form {
  margin: 20px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #b4bccc;
  padding: 30px 30px 0 30px;
  border-radius: 25px;
}
.submitBtn {
  width: 100%;
  margin-top: 30px;
}
.to {
  color: #67c23a;
  cursor: pointer;
}
</style>
