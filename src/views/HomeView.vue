<template>
  <div class="home">
    
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <ImagePullComponent />
  </div>
  <div>
    <!-- <button @click="jumpToAbout()">asdasda</button> -->
  </div>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
</template>

<script setup lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import ImagePullComponent from '@/components/ImagePullComponent.vue';
import router from '@/router';
function jumpToAbout() {
    console.log("跳转123");
    router.push('/test')
}

Options({
  components: {
    HelloWorld,
  },
})
</script>
