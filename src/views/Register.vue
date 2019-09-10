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
                  <el-image
                    :src="imageUrl"
                    style="height:500px"
                    :fit="imgFit"
                  ></el-image>
                </el-col>

                <el-col :span="5" style="margin-left:20px">
                  <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="80px"
                  >
                    <h3
                      style="font-weight:bolder; font-size:larger; marginTop: 80px; margin-bottom: 30px"
                    >
                      注册
                    </h3>

                    <el-form-item label="电子邮件" prop="email">
                      <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>

                    <el-form-item label="用户名" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pwd">
                      <el-input
                        type="password"
                        v-model="ruleForm.pwd"
                        auto-complete="off"
                      ></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input
                        type="password"
                        v-model="ruleForm.checkPass"
                        auto-complete="off"
                      ></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button
                        type="primary"
                        class="submitBtn"
                        @click="submitForm('ruleForm')"
                        >注册</el-button
                      >
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <el-footer style="marginTop:30px">
        <el-divider content-position="center"
          >Copyright @ 东软客户关系管理系统</el-divider
        >
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

import axios from "axios";
import qs from "qs";
import Api from "../http/api";
axios.defaults.withCredentials = true;

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
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      imgFit: "cover",
      activeName: "second",
      ruleForm: {
        email: "",
        name: "",
        pwd: "",
        type: ""
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

  methods: {
    /**
     * 注册用户
     */
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          axios
            .post(
              Api.registerUrl,
              qs.stringify({
                name: this.ruleForm.name,
                email: this.ruleForm.email,
                pwd: this.ruleForm.pwd,
                type: "ADMIN"
              })
            )
            .then(res => {
              console.log(res.data.code);
              if (res.data.code == 1) {
                //弹出消息 提示已经注册成功
                this.$message({
                  type: "success",
                  message: "注册成功"
                });
                this.$router.push("/");
              } else {
                //弹出消息 提示已经注册失败
                this.$message({
                  type: "error",
                  message: "已被注册，请重新注册！"
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
