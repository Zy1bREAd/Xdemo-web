<template>
    <div>
        <div class="register_main">
            <h1 class="title_register">XDemo</h1>
            <el-form
                ref="ruleFormRef"
                style="max-width: 600px"
                :model="ruleForm"
                :rules="rules"
                label-width="auto"
                class="register-ruleForm"
                size="default"
                status-icon
            >
                <el-form-item  prop="username">
                    <el-input v-model="ruleForm.username" style="width: 350px" placeholder="请输入用户名" :prefix-icon="User" :hide-required-asterisk="requiredFiled"/>
                </el-form-item>
                <el-form-item  prop="email">
                    <el-input v-model="ruleForm.email" style="width: 350px" placeholder="请输入邮箱" :prefix-icon="Message" hide-required-asterisk />
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input v-model="ruleForm.password" style="width: 350px" placeholder="请输入密码" :prefix-icon="Lock" show-password hide-required-asterisk />
                </el-form-item>
                <el-form-item  prop="confirmPassword">
                    <el-input v-model="ruleForm.confirmPassword" style="width: 350px" placeholder="再次输入密码" :prefix-icon="Lock" show-password hide-required-asterisk />
                </el-form-item>
                <el-form-item>
                    <div style="position: absolute;right: 0;">
                        <el-link type="primary" @click="gotoLogin">已有账号？前往登录</el-link>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="width: 100%;margin-top: 10px;">
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            注册
                        </el-button>
                    </div>
                </el-form-item>
   
            </el-form>
            <!-- <el-button type="primary" @click="registerHandle">注册</el-button> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import xdemoReq from '@/apis/axios';
import router from '@/router';
import { User,Lock,Message } from '@element-plus/icons-vue'
import { FormInstance, FormRules,ElMessageBox,ElMessage } from 'element-plus';
import type { Action } from 'element-plus'

import { reactive, ref } from 'vue'

const requiredFiled = ref(true)

// 定义注册对象
interface RuleForm {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
})

// 自定义校验规则
const CheckConfirmPassword = (rule: any, value: any, callback: any) => {
    if (value != ruleForm.password){
        callback(new Error('两次输入的密码不一致'))
    }else{
        callback()
    }
}

const CheckInputPassword = (rule: any, value: any, callback: any) =>{
    const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![0-9a-z]+$)(?![0-9A-Z]+$)(?![a-zA-Z]+$)[0-9A-Za-z].{8,}$/
    if (!reg.test(value)){
        // 后面再加强密码合法性规则（比如密码不能为空）
        // const reg = /\S+/
        // if (!reg.test(value)){
        //     return callback(new Error("不允许出现空格字符"))
        // }
        return callback(new Error('密码至少包含一个小写字母，大写字母和数字'))
    }else{
        for (let char of value){
            var charCode = char.charCodeAt(0)
            if (charCode >= 19968 && charCode <= 40869) {
                return callback(new Error('密码不能包含中文'));
            }
        }
    }
    callback()
}

const CheckInputEmail = (rule: any, value: any, callback: any) =>{
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
    if (!reg.test(value)){
        return callback(new Error("邮箱格式不正确"))
    }
    callback()
}

const isAccountRepeat = (rule: any, value: any, callback: any) =>{
    console.log(value);
    
    xdemoReq.post('/api/v1/public/validate',{
        "account": ruleForm.email,
    }).then((res) => {
        if (res.data['code'] == 0){
            callback()
        }else if (res.data['code'] == 8){
            return callback(new Error(res.data['msg']))
        }
    })

}

// 校验规则
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '用户名长度应该在2至12', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { validator: CheckInputEmail,trigger: 'blur'},
    { validator: isAccountRepeat,trigger: 'blur'},
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 24, message: '密码长度应该在6至24', trigger: 'blur' },
    { validator: CheckInputPassword ,trigger: 'blur'},
  ],
  confirmPassword: [
    { required: true, message: '二次确认密码不能为空', trigger: 'blur' },
    { validator: CheckConfirmPassword,trigger: 'blur'},
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 请求注册接口
      registerHandle()
    } else {
    //   console.log('error submit!', fields)
      return
    }
  })
}

const registerHandle = () => {
    xdemoReq.post('/api/v1/public/register',{
        "username": ruleForm.username,
        "email": ruleForm.email,
        "password": ruleForm.password,
        "confirm_password": ruleForm.confirmPassword,
    }).then((res) => {
        console.log(res.data);
        if (res.data['code'] == 0){
            ElMessageBox.alert('注册成功', '消息', {
                confirmButtonText: '确认',
                callback: (action: Action) => {
                    ElMessage({
                        type: 'success',
                        message: '3秒后自动跳转登录页面',
                    })
                    setTimeout(() => {
                        router.push('/login')
                    }, 2500);
                   
                },
            })
        }else if (res.data['code'] == 1201){
            const errMsg = res.data['data']['errList'][0]
            ElMessage.error(errMsg)
            // setFormError(errMsg)
        }
    }).catch((err) => {
        console.log(err);
        ElMessage.error(err)
    })
}

// const setFormError = (msg:string) => {
//     validateField(
//         'email',(message:string) =>{
//             return message === msg
//         }
//     )
// }

const gotoLogin = () =>{
    router.push('/login')
}

</script>

<style>
.title_register{
    margin-bottom: 30px;
}
/* .option1{
    text-align: right;
    display: inline-block;
} */
</style>