<template>
  <div class="search-form">
    <!-- 头部tab栏 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 搜索组件 -->
    <el-form ref="form" class="search-form-content" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions: 输入建议时候会触发（监听输入框的输入类似input事件） -->
        <!-- select: 选中下拉框时候触发的事件 -->
        <el-autocomplete
          class="inline-input"
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="handleDepartChange"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          class="inline-input"
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          @blur="handleDestChange"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-col>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.departDate"
            style="width: 100%;"
            @change="handleDate"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" style="width: 100%;" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      tabs: [
        { icon: "iconfont iconshuangxiang", name: "往返" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      // 禁止禁止今天以前的日期及七天以后的日期
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() + 3600 * 24 * 1000 < Date.now() ||
            time.getTime() > Date.now() + 3600 * 24 * 7 * 1000
          );
        }
      },
      // 出发城市的下拉列表数据
      departData: [],
      // 到达城市的下拉列表数据
      destData: [],
      currentTab: 0
    };
  },
  methods: {
    //   切换tab栏
    handleSearchTab() {},

    // 监听出发城市的输入时候触发的事件
    // value是输入框的值
    // cb是回调函数, 调用时候展示下拉列表，注意参数必须是数组，数组中元素必须是对象，对象中必须包含value属性
    queryDepartSearch(value, callback) {
      // 判断value是否为空，为空直接跳出
      if (value.trim() === "") {
        callback([]);
        return;
      }
      // 发送获取实时机票城市请求
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        // 循环给data中每一项添加一个value属性，并且是没有市字的
        this.departData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        callback(this.departData);
      });
    },
    // 当选中下拉项时
    handleDepartSelect(item) {
      // 获取当前选中的城市代码
      this.form.departCode = item.sort;
    },
    // 当失去焦点时默认选中第一个
    handleDepartChange() {
      // 判断有下拉选项
      if (this.departData.length > 0) {
        this.form.departCity = this.departData[0].value;
        this.form.departCode = this.departData[0].sort;
      }
    },
    queryDestSearch(value, callback) {
      // 判断value是否为空，为空直接跳出
      if (value.trim() === "") {
        callback([]);
        return;
      }
      // 发送获取实时机票城市请求
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        // 循环给data中每一项添加一个value属性，并且是没有市字的
        this.destData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        callback(this.destData);
      });
    },
    handleDestSelect(item) {
      // 获取当前选中的城市代码
      this.form.destCode = item.sort;
    },
    handleDestChange() {
      // 判断有下拉选项
      if (this.destData.length > 0) {
        this.form.destCity = this.destData[0].value;
        this.form.destCode = this.destData[0].sort;
      }
    },
    // 选中日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    handleReverse(){
       const { departCity, departCode, destCity, destCode} = this.form
       this.form.departCity=destCity
       this.form.departCode=destCode
       this.form.destCity=departCity
       this.form.destCode=departCode
    },
    // 提交时触发
    onSearch() {
      // 自定义规则
      const rules = {
        departCity: {
          value: this.form.departCity,
          err_message: "出发城市不能为空"
        },
        destCity: {
          value: this.form.destCity,
          err_message: "目标城市不能为空"
        },
        departDate: {
          value: this.form.departDate,
          err_message: "出发日期不能为空"
        }
      };
      let valid = true; //验证的变量
      Object.values(rules).forEach(v => {
        //  判断值是否为空
        if (v.value === "") {
          this.$message.error(v.err_message);
          valid = false;
          return;
        }
        //  如果不通过验证，直接跳出循环
        if (valid === false) return;
        this.$router.push({
          path: "/air/flights",
          // 通过query来传递参数，使用此方法传递的参数会出现在url地址中
          query: this.form
        });      
      });
        this.$store.commit('air/setHistory',this.form)
    }
  }
};
</script>
<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>