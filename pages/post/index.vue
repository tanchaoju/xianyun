<template>
  <div class="index">
    <el-row :gutter="20">
      <el-col :span="8">
          <IndexLeft />
      </el-col>
      <el-col :span="16">
        <IndexRight />
      </el-col>
    
    </el-row>
  
   
  </div>
</template>

<script>
import IndexLeft from "@/components/post/indexLeft";
import IndexRight from "@/components/post/indexRight";
export default {
  components: {
    IndexLeft,
    IndexRight
  }
};
</script>

<style lang="less" scoped>
.index{
  // margin: 20px 260px;
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}
</style>