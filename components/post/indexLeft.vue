<template>
  <div class="indexleft">
    <div class="themeList">
      <div
        class="type"
        v-for="(item,index) in cities"
        :key="index"
        @mouseenter="handleDsec(index)"
        @mouseleave="current=10"
     
      >
        <span>
          {{item.type}}
          <i class="el-icon-arrow-right right"></i>
        </span>
        <div class="children" v-if="current===index?true:false">
          <ul>
            <li v-for="(item,index) in item.children" :key="index">
              <a href="#">
                <i>{{index+1}}</i>
                <strong>{{item.city}}</strong>
                <span>{{item.desc}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="aside-recommend">
      <h4>推荐城市</h4>
      <div>
        <img src="http://img2.imgtn.bdimg.com/it/u=2402632179,4059605037&fm=26&gp=0.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: "",
      cities: {}, //城市列表
      isShow: false,
      first: []
    };
  },
  mounted() {
    // 获取城市列表
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      this.cities = res.data.data;
      console.log(this.cities);
      this.first.push(this.cities[0].children);
    });
  },
  methods: {
    handleDsec(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scoped>
.themeList {
  position: relative;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  width: 260px;
  .type {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 0 20px;
    font-size: 14px;
    // position: relative;
    z-index: 2;
    &:hover {
      border-right: none;
    }
    > span {
      &:hover {
        color: orange;
      }
      .right {
        margin-left: 140px;
      }
    }
    .children {
      // padding: 0 20px;
      border-top: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
      position: absolute;
      top: -1px;
      right: -337px;
       z-index: 2;
      ul {
        li {
          cursor: pointer;
          height: 40px;
          line-height: 40px;
          &:last-child {
            border-left: 1px solid #ddd;
          }
          i {
            margin-left: 20px;
            font-size: 25px;
            font-weight: 400;
            color: orange;
            font-style: italic;
          }
          strong {
            font-weight: 400 !important;
            padding: 0 5px;
            color: orange;
            font-weight: 300;
            &:hover {
              text-decoration: underline;
            }
          }
          span {
            margin-right: 30px;
            color: #aaa;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    &:nth-child(3){
      .children{
        right: -280px;
      }
    }
  }
  .actvie {
    color: orange;
  }
}
.aside-recommend{
  width: 260px;
    padding-top: 20px;
    h4{
      padding-bottom: 10px;
      font-weight: 400;
      color:#000;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    img{
      width: 260px;
    }
  
}
</style>