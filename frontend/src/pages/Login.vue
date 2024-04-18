<template> 
<h1>登录页面</h1>
<br>
<button @click="connect()">{{ msg }}</button>
<button @click="register()">注册</button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
const router = useRouter()
let msg = ref('Connect')
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        msg.value = "Connected!"
        // setTimeout(()=>{
        //     router.push('/BehaviorSubmission')
        // },1000)
        // window.location.href = "./accountBinding.html"
    } else {
        // msg.value = "please install metamask!"
        msg.value = 'please install metamask!';
    }
}
function register(){
    if(msg.value!=="Connected"){
        router.push('/AccountRegistration')
    }  
}
</script>
<style scoped>
h1{
    text-align: center;
}
button{
    margin:  5px;
}
</style>