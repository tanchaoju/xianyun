<template>
  <div class="indexRight">
    <!-- 搜索框 -->
    <div class="search">
      <el-input
        placeholder="请输入想去的地方，比如：'广州'"
        suffix-icon="el-icon-search"
        v-model="searchCity"
        ref="inputValue"
      ></el-input>
    </div>
    <!-- 搜索推荐 -->
    <div class="search-recommend">
      推荐：
      <a
        v-for="(item,index) in ['广州','上海','北京']"
        :key="index"
        @click="handleClick(item)"
      >{{item}}</a>
      <!-- <a href="#" @click="handleClick(value)">广州</a> -->
      <!-- <a href="#" @click="handleClick(value)">上海</a>
      <a href="#" @click="handleClick(value)">北京</a>-->
    </div>
    <!-- 文章列表部分 -->
    <div class="strategy">
      <!-- 头部 -->
      <div class="strategy-header">
        <span>推荐攻略</span>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="$router.push({path:'/post/create'})"
        >写游记</el-button>
      </div>
      <!-- 文章列表 -->
      <div v-for="(item,index) in $store.state.post.postData" :key="index">
        <!-- 三张图渲染 -->
        <div class="postList" v-if="item.images.length>=3">
          <h4 class="title">
            <a href="#">{{item.title}}</a>
          </h4>
          <p class="content">{{item.summary}}</p>
          <div class="postImg">
            <a href="#">
              <img :src="item.images[0]" alt />
            </a>
            <a href="#">
              <img :src="item.images[1]" alt />
            </a>
            <a href="#">
              <img :src="item.images[2]" alt />
            </a>
          </div>
          <div class="postFooter">
            <div class="posterInfo">
              <span class="city">
                <i class="el-icon-location-outline"></i>
                {{item.cityName}}
              </span>by
              <a href="/user/personal">
                <span>
                  <img
                    :src="$axios.defaults.baseURL+item.account.defaultAvatar"
                    alt
                    class="touXiang"
                  />
                  {{item.account.nickname}}
                </span>
              </a>
              <span>
                <i class="el-icon-view"></i>
                {{item.watch}}
              </span>
            </div>
            <span>{{item.like||0}} 赞</span>
          </div>
        </div>
        <!-- 1张图渲染 -->
        <div class="postListOne" v-else-if="item.images.length<3">
          <div class="postImg">
            <a href="#">
              <img :src="item.images[0]" alt />
            </a>
          </div>
          <div>
            <h4 class="title">
              <a href="#">{{item.title}}</a>
            </h4>
            <p class="content">{{item.summary}}</p>
            <div class="postFooter">
              <div class="posterInfo">
                <span class="city">
                  <i class="el-icon-location-outline"></i>
                  {{item.cityName}}
                </span>by
                <a href="#">
                  <span>
                    <img
                      :src="$axios.defaults.baseURL+item.account.defaultAvatar"
                      alt
                      class="touXiang"
                    />
                    {{item.account.nickname}}
                  </span>
                </a>
                <span>
                  <i class="el-icon-view"></i>
                  {{item.watch}}
                </span>
              </div>
              <span>{{item.like||0}} 赞</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 7, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
     
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchCity: "",
      currentPage: 1, //默认选中第1页
      pageSize:3, //每页显示条数
      total: 0, //文章总数量
      start:0,
      // limit:10000
      // postData: {}
    };
  },
  mounted() {
    // 获取文章列表数据
    var data=this.$route.query.city
    this.sendPostData(data);
  },
  watch: {
    // 监听路由变化。当路由发送改变时，调用sendPostData函数，改变文章列表
    $route(to, from) {
      var city = to.query.city;
      this.sendPostData(city);
    }
  },
  methods: {
    // 封装函数根据城市获取文章列表
    sendPostData(data) {
      // 根据推荐城市发送文章列表请求
      this.$axios({
        url: "/posts",
        params: {
          city: data,
          _start:this.start,
          _limit:this.pageSize,
          // _sort:3
        }
      }).then(res => {
        // 改变本地changePostData的值
        console.log(res);
        
        this.$store.commit("post/changePostData", res.data.data);
        this.$store.commit("post/changeSearchCity", data);
        this.searchCity = this.$store.state.post.searchCity;
        this.total=res.data.total
      });
    },
    // 推荐城市点击触发事件
    handleClick(item) {
      this.sendPostData(item);
    },
    // 切换每页显示文章数量
    handleSizeChange(val) {
      this.pageSize=val
      // 获取搜索城市
      var data=this.$store.state.post.searchCity
      this.sendPostData(data);
    },
    // 切换页数
    handleCurrentChange(val) {
      this.start=(val-1)*this.pageSize
       // 获取搜索城市
      var data=this.$store.state.post.searchCity
      this.sendPostData(data);
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.indexRight {
  width: 700px;
  .search {
    /deep/.el-input__inner {
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      border: 3px solid orange;
    }
    /deep/.el-input__icon {
      width: 50px;
      font-size: 25px;
      color: orange;
      font-weight: 600;
    }
  }
  .search-recommend {
    padding: 10px 0;
    color: #666;
    font-size: 12px;
    a {
      margin-left: 10px;
      &:hover {
        color: orange;
        text-decoration: underline;
      }
    }
  }
  .strategy {
    .strategy-header {
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid #ddd;
      height: 50px;
      span {
        font-size: 18px;
        color: orange;
        border-bottom: 2px solid orange;
      }
    }
  }
}
.postList {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  .title {
    margin-bottom: 15px;
    a {
      font-weight: normal;
      font-size: 18px;
      color: #000;
      &:hover {
        color: orange;
      }
    }
  }
  .postImg {
    padding-bottom: 15px;
    display: flex;
    justify-content: space-around;
  }
}
.postListOne {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  .postImg {
    margin-right: 5px;
  }
  .content {
    height: 63px;
  }
}
.title {
  margin-bottom: 15px;
  a {
    font-weight: normal;
    font-size: 18px;
    color: #000;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      color: orange;
    }
  }
}
.content {
  line-height: 21px;
  margin-bottom: 15px;
  color: #666;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.postFooter {
  display: flex;
  justify-content: space-between;
  .posterInfo {
    font-size: 12px;
    color: #999;
    .city {
      padding-right: 10px;
    }
    a {
      color: orange;
      padding: 0 5px;
    }
  }
  > span {
    color: orange;
  }
}
img {
  width: 220px;
  height: 150px;
}
.touXiang {
  width: 16px;
  height: 16px;
}
.pagination {
  margin-top: 10px;
}
</style>