<template>
  <div class="indexRight">
    <div class="search">
      <el-input placeholder="请输入想去的地方，比如：'广州'" suffix-icon="el-icon-search" v-model="city"></el-input>
    </div>
    <div class="search-recommend">
      推荐：
      <a href>广州</a>
      <a href>上海</a>
      <a href>北京</a>
    </div>
    <div class="strategy">
      <div class="strategy-header">
        <span>推荐攻略</span>
        <el-button type="primary" icon="el-icon-edit">写游记</el-button>
      </div>
      <!-- 文章列表 -->
      <!-- 三张图渲染 -->
      <div class="postList">
        <h4 class="title">
          <a href="#">文章标题</a>
        </h4>
        <p
          class="content"
        >文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</p>
        <div class="postImg">
          <a href="#">
            <img src="http://img3.imgtn.bdimg.com/it/u=2769810647,360229144&fm=26&gp=0.jpg" alt />
          </a>
          <a href="#">
            <img src="http://img3.imgtn.bdimg.com/it/u=2769810647,360229144&fm=26&gp=0.jpg" alt />
          </a>
          <a href="#">
            <img src="http://img3.imgtn.bdimg.com/it/u=2769810647,360229144&fm=26&gp=0.jpg" alt />
          </a>
        </div>
        <div class="postFooter">
          <div class="posterInfo">
            <span class="city">北京市</span>by
            <a href="#">
              <span>地球发动机</span>
            </a>
            <span>12897</span>
          </div>
          <span>74 赞</span>
        </div>
      </div>
      <!-- 1张图渲染 -->
      <div class="postListOne">
        <div class="postImg">
          <a href="#">
            <img src="http://img3.imgtn.bdimg.com/it/u=2769810647,360229144&fm=26&gp=0.jpg" alt />
          </a>
        </div>
        <div>
          <h4 class="title">
            <a href="#">文章标题</a>
          </h4>
          <p
            class="content"
          >文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</p>
          <div class="postFooter">
            <div class="posterInfo">
              <span class="city">北京市</span>by
              <a href="#">
                <span>地球发动机</span>
              </a>
              <span>12897</span>
            </div>
            <span>74 赞</span>
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
      city: "",
      postData:{}
    };
  },
  mounted() {
    this.$axios({
      url: "/posts"
    }).then(res => {
      this.postData=res.data.data
      console.log(this.postData);
      
    });
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
</style>