<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
          <!-- 分页 -->
          <!-- size-change: 切换条数时候触发事件
          current-change: 切换你页数时候触发的事件-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
export default {
  data() {
    return {
      flightsData: {
        info: {},
        options: {},
        flights:[]
      },
      // 缓存的变量，当该变量一旦被赋值之后不会被修改
      cacheFlightsData: {
        info: {},
        options: {},
        flights:[]
      },
      pageSize: 5,
      pageIndex: 1,
      total: 0
      //   dataList: [] // 存放每页数据
    };
  },
  components: {
    FlightsFilters,
    FlightsListHead,
    FlightsItem
  },
  computed: {
    // 利用计算属性监听dataList的值（由pageIndex与pageSize的变化带来的变化 ）的变化，来重新加载dataList
    dataList() {
      // 请求如果还没完成，返回空数组
      if (!this.flightsData.flights) return [];
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  mounted() {
    // 获取航班列表数据
    this.$axios({
      url: "/airs",
      // this.$route.query获取url所带参数
      params: this.$route.query
    }).then(res => {
      // 赋值给总数据，但是该变量中的flights在过滤时候会被修改
      this.flightsData = res.data;
      // 这个是缓存的变量，一旦赋值之后不能被改
      this.cacheFlightsData = { ...res.data };
      this.total = this.flightsData.total;
      //   第一页数据（默认显示）
      //   this.dataList = this.flightsData.flights.slice(0, 5);
    });
  },
  methods: {
    //   切换条数时候触发事件
    handleSizeChange(val) {
      this.pageSize = val;
      //   改变每页显示的条数时，重新获取每一页的数据
      //   this.dataList = this.flightsData.flights.slice(
      //     (this.pageIndex - 1) * this.pageSize,
      //     this.pageIndex * this.pageSize
      //   );
    },
    //  切换页数时候触发事件
    handleCurrentChange(val) {
      this.pageIndex = val;
      //   改变页码时，重新获取该页码页的数据
      //   this.dataList = this.flightsData.flights.slice(
      //     (this.pageIndex - 1) * this.pageSize,
      //     this.pageIndex * this.pageSize
      //   );
    },
    // 给过滤的组件修改this.flightsData.flights
    setDataList(arr) {
      // arr 就是过滤后的符合条件的数据
      this.flightsData.flights = arr;
    //   修改总条数
      this.total=arr.length
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>