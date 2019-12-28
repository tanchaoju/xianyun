<template>
  <div style="margin:100px">
    <div style="margin-top:50px ">
      <span v-for="(item,index) in name" :key="index" class='tab' :class="{bcg:current===index}" @click="aaa(index)">{{item}}</span>
    </div>
    <div style="margin:10px">
        <ul v-if="current===0">
            <li>新闻1</li>
            <li>新闻2</li>
            <li>新闻3</li>
        </ul>
        <ul v-if="current===1">
            <li>体育新闻1</li>
            <li>体育新闻2</li>
            <li>体育新闻3</li>
        </ul>
         <ul v-if="current===2">
            <li>娱乐新闻1</li>
            <li>娱乐新闻2</li>
            <li>娱乐新闻3</li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { name: ["新闻", "体育", "娱乐"],
   current:0 };
  },
  methods:{
aaa(index){
    this.current=index
}
  }
};
</script>
<style lang='less' scoped>
.tab{
    padding: 10px;
}
.bcg{
    background-color: red;
}
</style>