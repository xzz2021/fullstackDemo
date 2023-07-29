<!--
 * @Date: 2023-01-31 11:18:32
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-01 11:15:22
-->
<template>
    
    <div class="homepage">
        <h1>首页</h1>
        <div>
            <el-button @click="router.push({name: 'adList'})">去顶部</el-button>
            <el-button @click="router.push({name: 'mmList'})">去列表</el-button>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
// import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    // const route = useRoute()

</script>
<style  lang='scss' scoped>

.homepage{
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: #9591f68f;
    padding: 10px;
    h1{
        text-align: center;
    }
    div{
        margin: 0 auto;
    }
}

</style>