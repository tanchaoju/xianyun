<template>
  <div class="creat container">
    <!-- 左边编辑模块 -->
    <div class="redact">
      <h2>发表新攻略</h2>
      <p class="desc">分享你的个人游记，让更多人看到哦！</p>
      <el-input placeholder="请输入标题" v-model="title"></el-input>
      <!-- 富文本编辑器 -->
      <VueEditor :config="config" ref="vueEditor" />
      <div class="searchCity">
        选择城市
        <el-autocomplete
          class="inline-input"
          v-model="city"
          :fetch-suggestions="querySearch"
          placeholder="请搜索游玩城市"
          @select="handleSelect"
          @blur="handleChange"
        ></el-autocomplete>
      </div>
      <div class="publish">
        <el-button type="primary" @click="handlePublish">发布</el-button>
        <el-button type="warning">存至草稿</el-button>
      </div>
    </div>
    <!--右边草稿箱-->
    <div class="drafts">
      <div>草稿箱</div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  data() {
    return {
      title: "",
      city: "",
      cities: [], // 下拉城市列表
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res);
            insert("http://localhost:1337" + res.data[0].url);
          }
        }
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    // 监听搜索城市的输入时候触发的事件
    // value是输入框的值
    // cb是回调函数, 调用时候展示下拉列表，注意参数必须是数组，数组中元素必须是对象，对象中必须包含value属性
    querySearch(value, callback) {
      // 判断输入的值是否为空
      if (value.trim() === "") {
        callback([]);
        return;
      }
      //  发送搜索城市请求
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // cb是回调函数, 调用时候展示下拉列表，注意参数必须是数组，数组中元素必须是对象，对象中必须包含value属性
        this.cities = res.data.data.map(v => {
          v.value = v.name;
          return v;
        });
        callback(this.cities);
      });
    },
    //   @select选中下拉选项时
    handleSelect(item) {
      this.city = item.value;
    },
    // 失去焦点时
    handleChange() {
      // 失去焦点时默认选择第一个
      if (this.cities.length > 0) {
        this.city = this.cities[0].value;
      }
    },
    // 点击发布
    handlePublish() {
      // 获取富文本内容
      var quill = this.$refs.vueEditor.editor;
      var data = {
        title: this.title,
        content: quill.root.innerHTML, // 获取富文本内容
        city: this.city
      };
      if (this.title.trim() === "") {
        this.$message.error("标题不能为空");
        return;
      } else if (this.city.trim() === "") {
        this.$message.error("游玩城市不能为空");
        return;
      } else {
        // 发布文章
        this.$axios({
          url: "/posts",
          method: "POST",
          headers: {
            // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
            Authorization: "Bearer " + this.$store.state.user.userInfo.token
          },
          data: data
        }).then(res => {
         this.$message.success(res.data.message)
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.creat {
  margin: 0 auto;
  padding: 20px 0;
  width: 1000px;
  display: flex;
  .redact {
    margin-right: 50px;
    width: 750px;
    > h2 {
      font-size: 22px;
      font-weight: 400;
      color: #000;
      margin-bottom: 10px;
    }
    .desc {
      color: #999;
      font-size: 12px;
      margin-bottom: 10px;
    }
    /deep/.el-input__inner {
      margin-bottom: 20px;
    }
    /deep/.ql-editor {
      height: 400px;
    }
  }
  .drafts div {
    width: 200px;
    border: 1px solid #ddd;
    padding: 10px;
  }
  .searchCity {
    margin-top: 20px;
  }
}
</style>