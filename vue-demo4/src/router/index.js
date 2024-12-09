import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import layout from '@/views/layout'
import search from '@/views/search'
import searchlist from '@/views/search/list'
import prodetail from '@/views/prodetail'
import pay from '@/views/pay'
import myorder from '@/views/myorder'


//const home =()=> import('@/views/home') 路由懒加载
import home from '@/views/layout/home'
import category from '@/views/layout/category'
import cart from '@/views/layout/cart'
import user from '@/views/layout/user'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:'/login',component:login},
    {path:'/',
    component:layout,
    redirect:'/home',
    children:[
      {path:'/home',component:home},
      {path:'/category',component:category},
      {path:'/cart',component:cart},
      {path:'/user',component:user},
    ]
  },
    {path:'/search',component:search},
    {path:'/searchlist',component:searchlist},
    {path:'/prodetail/:id',component:prodetail},
    {path:'/pay',component:pay},
    {path:'/myorder',component:myorder},
   ]
})

//全局前置导航守卫
// to 到哪里去 完整的路由信息对象（路由，参数）
// from  从哪里来 完整的路由信息对象（路由，参数）
// next():是否放行
const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
 
  if (!authUrl.includes(to.path)) {
    next()
    return
  }


 const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
  // console.log(token)
})

export default router
