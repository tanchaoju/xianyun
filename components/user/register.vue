<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-row>
        <el-col :span="16">
          <el-input placeholder="验证码" v-model="form.captcha"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="info" class="form-button" @click="setCaptcha">发送验证码</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input  :type="!eyestatu?'password':'text'" placeholder="密码" v-model="form.password">
        <template slot="append">
          <i class="el-icon-view" @click="getView"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPass">
      <el-input 
      :type="!eyestatu?'password':'text'"
      v-model="form.checkPass" 
      placeholder="确认密码">
        <template slot="append">
          <i class="el-icon-view"  @click="getViewAgain"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-button class="submit" type="primary" @click="handleRegisterSubmit">注册</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateCaptcha = (rule, value, callback) => {
      if (this.form.username === "") {
        callback(new Error("请输入用户名"));
      } else if (this.form.username && this.form.captcha === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      eyestatu: false,
      // 表单数据
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPass: ""
      },

      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            validator: validateCaptcha,
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入名字",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "请输入6~16位字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass,
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "请输入6~16位字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //   获取验证码
    setCaptcha() {
      // 判断手机号是否正确
      if (/^1[3456789]\d{9}$/.test(this.form.username)) {
        // 发送手机验证码请求
        this.$axios({
          method: "POST",
          url: "/captchas",
          data: { tel: this.form.username }
        }).then(res => {
          this.$message.success("获取成功");
          this.form.captcha = res.data.code;
        });
      } else {
        this.$message.error("用户名不符合");
      }
    },
    getView() {
      this.eyestatu = !this.eyestatu;
    },
    getViewAgain(){
      this.eyestatu = !this.eyestatu;
    },
    // 注册
    handleRegisterSubmit() {
      // validate对整个表单进行验证
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.$message.error("请将表格填写完整");
          return;
        }
        //  发起注册请求
        // 使用 ... 的语法来将剩余的项目赋值给一个指定的变量
        let { checkPass, ...registerData } = this.form;
        // this.$axios({
        //   method: "POST",
        //   url: "/accounts/register",
        //   data: registerData
        // }).then(res => {
        //   console.log(res);
        //   if(res.status===200){
        //     this.$message.success("注册成功");
        //     this.$router.replace("/");
        //   }
        // });
        this.$store.dispatch("user/register", registerData).then(res => {
          this.$message.success("注册成功");
          this.$router.replace("/");
        });
      });
    }
  }
};
</script>


<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}
.el-button--info {
  color: #000;
  background-color: #eee;
  border-color: #dcdfe6;
}
.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>