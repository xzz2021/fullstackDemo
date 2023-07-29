/*
 * @Date: 2023-01-31 11:11:21
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-10 15:53:18
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
// import adList from '../views/adList.vue'
// import mmList from '../views/mmList.vue'


const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/ad',
    name: 'adList',
    component: () => import(/* webpackChunkName: "about" */ '../views/adList.vue')
  },
  {
    path: '/mm',
    name: 'mmList',
    component: () => import(/* webpackChunkName: "about" */ '../views/mmList.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: NotFound,
    // component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



router.beforeEach(async (to, from, next) => {

  if(to.name == 'NotFound') {
    console.log('to: ininini');
    to.meta.randomId = Math.round(Math.random()*3)
    // return
  }
  
  let isAuthenticated = false
  // let check = JSON.parse(window.localStorage.getItem('accessToken'))
  // console.log('check: ', check)
  // if(check != null) 
      // let nn= new xzzfetch()
      let res1 = await api.getUserinfo()  //  --------
      // console.log('res1: ', res1);
      // if(res1.status == 404) alert('后端接口无法连接,请检查服务器!')
      // if(res1?.username != '' && res1?.username != undefined) isAuthenticated = true
      if(res1?.username) isAuthenticated = true  //----
      // if (to.name == 'login' && res1?.status == 404) {
      //   alert('后端接口无法连接,请检查服务器')
      //   next() 
      //   return
      // }
      // if (to.name == 'login' && res1?.status == 404) {
      //   alert('后端接口无法连接,请检查服务器')
      //   next() 
      //   return
      // }
  if (to.name == 'login' && isAuthenticated) {
    next({ name: 'home' }) 
    return
  }

  if (to.name !== 'login' && !isAuthenticated) {
    res1?.username != '' && alert(res1.message)
    next({ name: 'login' })
  }else {next()
  } 


  // if(to.matched[0].components.default.__name == 'NotFound') next({ params: { randomId: Math.floor(Math.random() * 3) }})
  
})



export default router
