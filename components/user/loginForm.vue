<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <!-- prop：定义验证规则，注意一般需要将这个prop属性的值和你需要校验的属性名称以及校验规则名称完全一致 -->
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" v-model="form.password" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
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
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      //   验证表单
      this.$refs.form.validate(valid => {
        //   验证失败则跳出函数
        if (!valid) return;
        // 发送登录请求
        // console.log(this.$store.dispatch("user/login", this.form))
        // this.$store.dispatch("user/login", this.form)返回的是一个promise
        this.$store.dispatch("user/login", this.form).then(res => {
          this.$message.success("恭喜登陆成功");
          //跳转回上一个页面
          this.$router.back();
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
