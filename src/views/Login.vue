<template>
  <div>
    <el-row style="height:50px"></el-row>
    <el-container>
      <el-main>
            <el-row >
              <el-col :span="22" :offset="1" >
                <el-card >
                  <el-row>

                    <el-col :span="18">
                      <el-image :src="imageUrl" style="height:500px" :fit="cover"></el-image>
                    </el-col>

                    <el-col :span="5" :offset="1">

                          <el-form
                              :model="LoginForm"
                              ref="LoginForm"
                              :rules="rule"
                              label-width="0"
                              style="align:'center'"
                            >
                              
                              <h3 style="font-weight:bolder; font-size:larger; marginTop: 80px; margin-bottom: 30px">登录</h3>

                              <el-form-item prop="id">
                                <el-input type="text" v-model="LoginForm.id" placeholder="请输入电话号码或者电子邮箱"></el-input>
                              </el-form-item>

                              <el-form-item prop="pwd">
                                <el-input type="password" v-model="LoginForm.pwd" placeholder="请输入密码"></el-input>
                              </el-form-item>

                              <el-form-item>
                                <el-button
                                  type="danger"
                                  class="submitBtn"
                                  align="center"
                                  round
                                  @click.native.prevent="submit('LoginForm')"
                                >登录</el-button>

                                <el-divider></el-divider>
                                <p>
                                  还没有账号，马上去
                                  <span class="to" @click="toregin">注册</span>
                                </p>
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


export default {
  // ....
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.LoginForm.checkPass !== "") {
          this.$refs.LoginForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      activeName: "first",
      LoginForm: {
        id: "",
        pwd: ""
      },
      rule: {
        id: [
          {
            required: true,
            max: 14,
            min: 2,
            message: "用户名是必须的，长度为2-14位",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "密码是必须的！",
            trigger: "blur",
            validator: validatePass
          }
        ]
      },

      imageUrl: require( '../assets/loginPic.jpg'),
    };
  },
  methods: {
    // 提交表单
    submit(formName) {
      
      this.$router.push("/Home");
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     axios
      //       .post(
      //         "http://172.20.10.9:8080/hims/auth/login",
      //         qs.stringify(
      //           { id: this.LoginForm.id, pwd: this.LoginForm.pwd },
      //           {
      //             headers: {
      //               "Content-Type": "application/x-www-form-urlencoded"
      //             }
      //           }
      //         )
      //       )
      //       .then(res => {
      //         console.log(res.data.status);
      //         if (res.data.status == 200) {
      //           this.$router.push("/Home");
      //         } 
      //       });
      //   } else {
      //     console.log(res.data.status);
      //     console.log(res.data.msg);
      //           this.$notify.error({
      //             title: res.data.msg,
      //             //message: 'res.data.msg'
      //           });
      //           return false;
              
      //     console.log("submit err");
      //     return false;
      //   }
      // });
    },
    reset() {
      this.$refs.LoginForm.resetFields();
    },
    toregin() {
      this.$router.push("/Register");
    },
    doTest() {
      console.log("test beign");
      //let data = {id:'ad',pwd:'admin'};
      axios
        .post(
          "http://192.168.0.7:8080/hims/login",
          qs.stringify(
            { id: "admin", pwd: "admin" },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
        )
        .then(res => {
          console.log("res=>", res);
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
  width: 65%;
}
.to {
  color: #67c23a;
  cursor: pointer;
}
</style>
