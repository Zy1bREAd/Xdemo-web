<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="300px">
                    <AsideLayout></AsideLayout>
                </el-aside>

            <el-container>
                <el-header>
                    <HeaderLayout></HeaderLayout>
                </el-header>
                <el-main>
                    <!-- Main Content -->
                    <div class="my_content">
                        <router-view></router-view>
                    </div>
                    
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import HeaderLayout from './HeaderLayout.vue';
import AsideLayout from './AsideLayout.vue';
</script>

<style scoped>
.el-main {
    height: calc(100vh - 80px);
    background-color: rgb(240, 238, 238);
}

.el-header {
    font-size: 14px;
    /* color: rgb(167, 167, 167); */
    border-bottom: 1px solid gray;
    /* background-color: rgb(44, 44, 44); */
    /* box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9; */

}

.el-aside {
    /* border: 1px solid red; */
    background-color: gray;
}


</style>