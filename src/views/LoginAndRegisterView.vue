<template>
    <div class="why">
        <nav class="title_tag">
            <div>
                <router-link to="/login">Login</router-link>
                
            </div>
            /
            <div>
                <router-link to="/register">Register</router-link>
            </div>
        </nav>
        <router-view class="main_content"></router-view>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.why {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ecf0f3;
    /* background-color: red; */
}

.title_tag{
    margin: 10px;
    
    display: flex;
    justify-content: flex-start;
}

.title_tag div{
    width: 80px;
    /* border: 1px rgb(37, 160, 231) solid; */
}

/* 登录，注册的主体样式 */
.main_content {
    display: flex;
    justify-content: center;
    align-items: center;
    /* position: relative; */
    width: 600px;
    min-width: 400px;
    /* min-height: 600px; */
    height: 400px;
    padding: 25px;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
}
</style>