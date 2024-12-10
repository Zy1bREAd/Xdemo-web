<template>
    <div>
        <button @click="pullImage">Image Pull...</button>

        <div v-for="(item, index) in receivedData" :key="index">
            <p>{{ item }}</p>
        </div>
        <p>{{ receivedData2 }}</p>

        <div style="margin-top: 50px;">
        <button @click="ExecContainer">Exec Container!</button>
        </div>

        <div>
            <button @click="WSConnect">Connect WebSocket</button>
            <button @click="WSClose">Close WebSocket</button>
            <textarea name="t1" id="t1" cols="30" rows="10"></textarea>

            <button @click="PongTest">Pong Test</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import xdemoReq from '@/apis/axios';
import { ref,reactive } from 'vue';

const receivedData = ref('')
const receivedData2 = ref('')

const ws = ref<WebSocket>()

const pullImage = () => {
    xdemoReq.post("/api/v1/image/pull",{
        "image": "alpine",
        "tag": ""
    },{
        headers:{
            'Authorization': 'Bearer ' + 'asdsada'
        }
    }).then((res)=> {
        console.log(res.data);
        receivedData2.value = res.data
        let partialData = '';
        const xhr = res.request;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 3) {
                partialData += xhr.responseText;
            } else if (xhr.readyState === 4 && xhr.status === 200) {
                receivedData.value = partialData;
                console.log('数据接收完成');
            }
        };
    }).catch((err)=> {
        console.log(err);
        
    })
}


const ExecContainer = () => {
    xdemoReq.post('/api/v1/container/exec?cid=c19d24aab423',{"command":["date"]},{responseType: 'stream'}).then((res)=>{
        setTimeout(() => {
            console.log(res.data,res.headers);
        }, 3000);
        if (res.headers['Content-Type'] == 'application/vnd.docker.raw-stream'){
            console.log("获取流数据");
            console.log(res.headers,res.headers.get?.toString);
        }
        
    }).catch((err)=>{
        console.log(err);
        
    })
}
const WSConnect = () => {
    // 连接ws
    ws.value = new WebSocket('ws://localhost:8088/api/v1/wstest')
    ws.value.onopen = () => {
        console.log("ws connection is OK!");
    }
}

const WSClose = () => {
    ws.value!.onclose = () => {

    }
}

const PongTest = () => {
    console.log("Test OK!");
}
</script>