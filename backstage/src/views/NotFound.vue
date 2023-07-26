<!--
 * @Date: 2023-01-31 12:02:06
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 11:27:48
-->
<template>

  <!-- <div>{{route.meta.data.randomId}}</div> -->
  <component :is="tabs[currentTab]"></component>
</template>
<script setup>
import one from "./404/one.vue";
import two from "./404/two.vue";
import three from "./404/three.vue";

import { useRoute } from 'vue-router'

// const router = useRouter()
    const route = useRoute()
    // console.log('route: ', route.query);


watch(()=> route.meta.randomId, async (newV, oldV)=>{
  // console.log('newV: ', newV);
  // console.log('oldV: ', oldV);
  let val = newV || Math.round(Math.random()*3)
  if(newV == undefined ) return // 进入正常路由时,路由守卫不会传参,所以要做判断
  randomPage(newV)
})

const tabs = { one, two, three };


const currentTab = ref("one");

const randomPage = (id= 0) => {
  // console.log('====ZHIXINGLE=====')
    const temp = ["one", "two", "three"];
    currentTab.value = temp[id];
  console.log('currentTab.value: ', currentTab.value);
}



onMounted(() => {
  // setInterval(() => {
  //   randomPage(Math.floor(Math.random() * 2))
    
  // }, 3000);
});






</script>
<style  lang='scss' scoped>

</style>