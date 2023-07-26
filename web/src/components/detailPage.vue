<!--
 * @Date: 2023-02-06 16:37:07
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-10 15:58:18
-->
<template>

  <div class="imgBox" v-for="(item, index) in currentItem.self.urls" :key="index">
    <el-image style="width: 100%;" :src="`http://127.0.0.1:3006/${item}`" fit="contain" />
  </div>

</template>
<script setup>

const currentItem = reactive({self: {}})
onMounted(() => {
     let stringItem  = window.localStorage.getItem('currentItem') || { "_id": "", "urls": [], "name": "", "num": "" }
     currentItem.self = JSON.parse(stringItem)
})


</script>
<style  lang='scss' scoped>


</style>