<!--
 * @Date: 2023-01-29 09:30:29
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 11:55:20
-->
<script setup>

const pictureList = reactive({self: []})

const jumpTo = () => {
  window.open('https://www.google.com')
}

const sortBy = (arr, k) => arr.concat().sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0)) //数组按指定键值排序
const updateList = async () => {
  let  res = await API.getData('getAd')
    if(res.status == 666) {
      if(res.length == 0 ) return pictureList.self.push({index: 0, url: 'https://www.toopic.cn/public/uploads/image/20200404/20200404182849_78999.jpg'})
      pictureList.self = sortBy(res.message, 'index')
    }else{
      ElMessage.error('数据获取失败,请刷新页面或检查数据库')
    }
}
  onMounted(async () =>{
    await updateList()
  })
</script>

<template>
   <div class="wholebox ">
    <el-carousel >
      <el-carousel-item v-for="item in pictureList.self" :key="item">
        <el-image @click="jumpTo" style="width: 100%;height: 100%;" :src="`http://127.0.0.1:3006/${item.url}`" fit="fill" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>

.wholebox{
  width: 100%;
}
  :deep(.el-carousel__container) {
    max-height: 360px ;
}

</style>
