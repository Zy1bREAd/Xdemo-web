import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginAndRegisterView from '@/views/LoginAndRegisterView.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'
import AppLayout from '@/layout/AppLayout.vue'
import isAuthenticated from '@/apis/axios'


const authRoutes = [
  {
    path: '/',
    name: 'LoginAndRegister',
    component: LoginAndRegisterView,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
      },
      {
        path: '/register',
        name: 'Register',
        component: RegisterComponent,
      }
    ]
  },
]

const routes: Array<RouteRecordRaw> = [
  // 定义路由组
  ...authRoutes,
  {
    path: '/',
    name: 'home',
    component: AppLayout,
    redirect: '/home',
    children: [
      {
        path:'/home',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/test',
        name: "test",
        component: () => import('../views/TestView.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AppLayout,
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫配置
router.beforeEach((to,from)=> {
  if (!isAuthenticated && to.name !== 'register' && to.name !== 'login'){
    // 不是注册或者登录页面都需要进行验证是否登录
    return {name:'Login'}
  }
  console.log("已登录");
  
})

export default router
