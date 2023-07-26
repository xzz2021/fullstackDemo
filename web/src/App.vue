<!--
 * @Date: 2023-01-29 08:39:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-07 08:58:02
-->
<script setup>

// 中文 locale
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
<!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  <!-- ele组件全局中文 -->
  <el-config-provider :locale="zhCn"></el-config-provider>
</template>

<style scoped>

</style>
