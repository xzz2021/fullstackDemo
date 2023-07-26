/*
 * @Date: 2023-01-31 11:11:21
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-07 08:45:14
 */
import { createRouter, createWebHashHistory } from 'vue-router'

import homePage from '../components/homePage.vue'
import detailPage from '../components/detailPage.vue'
import notFound from '../components/notFound.vue'


const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: homePage
  },
  {
    path: '/detail',
    name: 'detail',
    component: detailPage
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: 'notFound',
  //   // redirect: '/home',
  //   component: notFound
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



// router.beforeEach(async (to, from, next) => {

//   if(to.name == 'NotFound') {
//     next({ name: 'home' }) 
//     return
//   }

  
// })



export default router
