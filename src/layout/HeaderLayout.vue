<template>
    <div>
        <el-row>
            <el-col :span="10" class="left-title"><div class="grid-content ep-bg-purple" />
                <h1>{{ title }}</h1>
                <!-- <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
                </el-breadcrumb> -->
            </el-col>
            <el-col :span="14" class="right-info"><div class="grid-content ep-bg-purple" />
                <div style="width: 20%;">
                    <el-row>
                        <el-col :span="12"><div class="grid-content ep-bg-purple" />？</el-col>
                        <el-col :span="12"><div class="grid-content ep-bg-purple-light" />消息</el-col>
                    </el-row>
                </div>
                <span style="padding-right: 10px;padding-left: 20px;">{{ username }}</span>
                <el-popover
                    :width="300"
                    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 15px;"
                    >
                    <template #reference>
                        
                        <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
                    </template>
                    <template #default>
                        <div
                        class="demo-rich-conent"
                        style="display: flex; gap: 16px; flex-direction: column"
                        >
                            <div>
                                <p
                                class="demo-rich-content__name"
                                style="margin: 0; font-weight: 500;font-weight: bold;font-size: large;"
                                >
                                {{ username }}
                                </p>
                                <div style="font-size: 12px; color: var(--el-color-info);display: flex;flex-direction: row;">
                                    <p
                                    class="demo-rich-content__mention"
                                    style="margin: 0;padding-right: 6px; "
                                    >
                                    账号ID: {{user_id}}
                                    </p>
                                    <el-button :icon="CopyDocument" size="small" style="width: 14px; height: 14px;" circle text />
                                </div>

                            </div>
                            <div style="display: flex;flex-direction: column;align-items: start;">
                                <p class="demo-rich-content__desc" style="margin: 0">
                                    后期填充一些描述？？
                                </p>
                            </div>
                            <div style="display: flex;flex-direction: column;align-items: start;">
                                <el-button style="width: 100%; height: 30px;" text >账号信息</el-button>
                                <el-button  style="width: 100%; height: 30px;" text >设置</el-button>
                                <el-button  style="width: 100%; height: 30px;font-weight: bold;" text >退出登录</el-button>
                            </div>
                            
                        </div>
                    </template>
                    </el-popover>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight,CopyDocument } from '@element-plus/icons-vue'

import { ref } from 'vue';
let title  = ref("主页")
let username = ref("XXXXXXXX")
let user_id = ref("100023363626")
</script>

<style scoped>
/* element UI Plus Sytle */
.el-button + .el-button {
  margin-left: 0;
}


.left-title{
    display: flex;
    justify-content: start;
    /* padding-left: 20px; */
    align-items: center;
}

.right-info {
    display: flex;
    justify-content: end;
    align-items: center;
}

.user_info{
    display: flex;
    align-items: center;
    border: 1px solid red;
}

</style>