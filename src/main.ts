import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Element Plus UI Import
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')


// 想axiosInstance变成全局变量来引用，但是有点问题，使用Import的方式。
// import xdemoReq from '@/apis/axios'
// app.config.globalProperties.$xdemoReq = xdemoReq
// app.provide("axiosInstance",xdemoReq)



