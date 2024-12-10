<template>
    <div>
        <div class="login_main">
            <h1 class="title_login">XDemo</h1>
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
                <el-form-item  prop="account">
                    <el-input v-model="ruleForm.account" style="width: 350px" placeholder="请输入账号" :prefix-icon="User" />
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input v-model="ruleForm.password" style="width: 350px" placeholder="请输入密码" :prefix-icon="Lock" show-password />
                </el-form-item>
                <!-- <div style="display: flex;justify-content: space-between;width: 100%;">
                    <div> -->
                <el-form-item prop="validateCode">
                    <el-input v-model="ruleForm.validateCode" style="width: 170px" placeholder="验证码" maxlength="4"/>
                    <img :src="captchaImage" alt="Captcha Image" @click="refreshCaptchaImage()">
                </el-form-item>
                    <!-- </div> -->
                    
                <!-- </div> -->
                <el-form-item>
                    <div class="option1">
                        <div style="display: flex;justify-content: flex-end;">
                            <el-link type="primary" >忘记密码？</el-link>
                        </div>
                        
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="option2">
                        <el-checkbox v-model="protocolCheckd" label="已同意用户协议" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="width: 100%;margin-top: 10px;">
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            登录
                        </el-button>
                    </div>
                </el-form-item>
   
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import xdemoReq from '@/apis/axios';
import router from '@/router';
import { User,Lock } from '@element-plus/icons-vue'
import { FormInstance, FormRules,ElMessage } from 'element-plus';
import { reactive, ref,onMounted, computed } from 'vue'

let captchaImage = ref("")
let protocolCheckd = ref(false)
let randKey = ref("")

// 定义登录对象
interface RuleForm {
    account: string,
    password: string,
    validateCode: string,
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    account: "",
    password: "",
    validateCode: "",
})

// 登录校验规则
const rules = reactive<FormRules>({
    account: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (!protocolCheckd.value) {
            // 注意还需要确认勾选你同意用户协议才能登录
            ElMessage.warning("需要勾选同意用户协议")
            return 
        }
        if (valid) {
            // 请求登录接口
            LoginHandle()
        } else {
            return
        }
    })
}

const LoginHandle = () => {
    xdemoReq.post('/api/v1/public/login',{
        "account": ruleForm.account,
        "password": ruleForm.password,
        "validate_code": ruleForm.validateCode,
        "rk": randKey.value
    }).then((res) => {
        console.log(res.data,res.data['msg'],randKey);
        if (res.data['code'] == 0){
            // localStorage.setItem('token',res.data['data'][''])
            // 登录成功之后需要请求接口
            localStorage.setItem('token',res.data['token'])

            router.push('/home')
        }else if (res.data['code'] == 8){
            // 重新发起请求
            ruleFormRef.value?.resetFields(['validateCode'])
            loadCaptchaImage()
        }else {
            ElMessage.error(res.data['msg'])
            // 登录信息错误后，清除登录信息
            ruleFormRef.value?.resetFields()
            loadCaptchaImage();
        }

    }).catch((err) => {
        ElMessage.error(err)
        
    })
}
onMounted(()=> {
    loadCaptchaImage();
})

const loadCaptchaImage = () => {
    xdemoReq.get('/api/v1/public/getCaptcha',{
        // responseType: 'blob',        如果将验证码图像写入http响应中，必须设置responseType为blob才能显示验证码图片
    }).then((res)=> {
        // const blob = new Blob([res.data['data']['writer']],{type: 'image/png'});
        // captchaImage.value = URL.createObjectURL(blob)
        captchaImage.value = `data:image/png;base64,${res.data['data']['captcha_base64']}`
        randKey.value = res.data['data']['rk']
    }).catch((err) => {
        ElMessage.error(err)
    })
}

const refreshCaptchaImage = () => {
    ruleFormRef.value?.resetFields(['validateCode'])
    loadCaptchaImage()
}

</script>

<style>
.title_login{
    margin-bottom: 30px;
}

.rowtext {
    font-weight: bold;
    margin-right: 10px;
}
.account,.password{
    margin: 15px;
}

.option2 {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
    flex-direction: column;
}


</style>