<template>
  <div class="indexRight">
    <div class="search">
      <el-input
        placeholder="请输入想去的地方，比如：'广州'"
        suffix-icon="el-icon-search"
        v-model="searchCity"
        ref="inputValue"
      ></el-input>
    </div>
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
    <div class="strategy">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchCity: ""
      // postData: {}
    };
  },
  mounted() {
    this.$axios({
      url: "/posts"
    }).then(res => {
      // this.postData = res.data.data;/
      this.$store.commit("post/changePostData", res.data.data);
    });
  },
  watch:{
    // 监听路由变化。当路由发送改变时，调用sendPostData函数，改变文章列表
    $route(to,from){
      var city=to.query.city
     this.sendPostData(city)
    }
  },
  methods: {
    sendPostData(data) {
      // 根据推荐城市发送文章列表请求
      this.$axios({
        url: "/posts",
        params: {
          city: data
        }
      }).then(res => {
        // 改变本地changePostData的值
        this.$store.commit("post/changePostData", res.data.data);
        this.$store.commit("post/changeSearchCity", data);
        this.searchCity = this.$store.state.post.searchCity;
      });
    },
    // 推荐城市点击触发事件
    handleClick(item) {
      this.sendPostData(item);
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
</style>