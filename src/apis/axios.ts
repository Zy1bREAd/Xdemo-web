import axios from "axios";
import getUserToken from "./apis";
import { ElMessage } from 'element-plus';

const VUE_APP_API_BASIC_URL = "http://127.0.0.1:8088"

const xdemoReq = axios.create({
    baseURL: VUE_APP_API_BASIC_URL,
    timeout: 5000,
})

// 全局判断用户登录flag
let isAuthenticated = false

// 请求拦截器
xdemoReq.interceptors.request.use((config)=> {
    console.log(config.url);
    
    const token = getUserToken('local')
    if (!token){
        console.log("用户直接登出，去到登录页面");
    }
    console.log("登录成功111");
    
    config.headers.Authorization = 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPcmdpbmFsQ2xhaW1zIjp7ImlzcyI6IlhEZW1vX09jZWFuIiwiZXhwIjoxNzMyMDg5OTgxLCJuYmYiOjE3MzIwMDM1ODEsImlhdCI6MTczMjAwMzU4MX0sInVzZXJfaWQiOjEsImFjY291bnQiOiJxcTExODY0MDUyNDhAMTI2LmNvbSIsInN0YXR1cyI6IlBlbmRpbmcifQ.Ndvfkj5R7zslkPjYTkZouVcbsxmwmm7ajtR4JCDxRvY';
    isAuthenticated = true
    return config
},(error) => {
    return Promise.reject(error);
})


// 响应拦截器
interface ResponseHandler {
    [key:number]: (msg?:string|undefined) => void;
} 

const respHandle:ResponseHandler = {
    0: (msg) => {
        ElMessage.closeAll();
        ElMessage.success(msg);
    },
    // 8: (msg:string) => {

    // }
}

const httpErrorHandle:ResponseHandler = {
    403: () => {
        ElMessage.error("请求接口无权限")
        // 重定向到404页面上去
    },
    404: () => {
        ElMessage.error("接口不存在")
        // 重定向到404页面上去
    },
    500: () => {
        ElMessage.error("内部服务器发生错误")
    }
}

xdemoReq.interceptors.response.use((response) => {
    const resp = response.data
    respHandle[resp['code']]?.(resp['msg'])
    return response
},(error) => {
    httpErrorHandle[error['status']]();
    return Promise.reject(error)
})

export default xdemoReq