/*
 * @Date: 2023-01-29 08:39:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-01 16:29:28
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import router from './router/index'
import router from './router'

import './css/index.js'
import App from './App.vue'


import xzzfetch from './api/xzzfetch'
window.xzzfetch = xzzfetch
window.api = new xzzfetch()

const wait = async (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
window.xzzwait = wait


createApp(App).use(router).use(createPinia()).mount('#app')
// createApp(App).use(createPinia()).use(router).mount('#app')
