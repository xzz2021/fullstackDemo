<!--
 * @Date: 2023-01-29 08:39:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 11:39:35
-->
<script setup>
// 中文 locale
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

let isLogin = ref(false)
const checkLogin =  async() => {
    let res = await api.getUserinfo()
    isLogin.value = res?.username ? true : false
}


const logout = async () => {
  // console.log('===tuichu======')
  window.localStorage.removeItem('accessToken')
  xzzwait(600)
  location.reload()
}
onMounted(async() => {
  await checkLogin()
})
</script>

<template>
<el-button v-if="isLogin" style="float: right;" type="danger"   @click="logout">退出登录</el-button>

  <!-- <router-link to="/"></router-link> -->
    <!-- <router-link to="/adList"></router-link> -->

  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>

  <!-- ele组件全局中文 -->
  <el-config-provider :locale="zhCn"></el-config-provider>

      
</template>

<style scoped>

</style>
