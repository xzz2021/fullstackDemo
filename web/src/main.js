/*
 * @Date: 2023-01-29 08:39:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 11:56:06
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue' 

const xzzVue = createApp(App)


import { getData } from './api/getData'


window.API = { getData  }

import './css/index.js'

xzzVue.use(createPinia()).use(router).mount('#app')
// createApp(App).use(createPinia()).use(router).mount('#app')
