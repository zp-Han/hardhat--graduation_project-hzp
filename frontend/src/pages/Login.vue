<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-col cols="12" sm="8" md="6" lg="4" xl="3">
                        <v-card class="login-card mx-auto" outlined>
                            <v-card-title class="text-h5 text-center"
                                >登录</v-card-title
                            >
                            <v-card-text>
                                <v-btn
                                    class="login-btn"
                                    depressed
                                    @click="login()"
                                    block
                                    >{{ loginMsg }}</v-btn
                                >
                                <v-btn
                                    class="register-btn"
                                    text
                                    @click="register()"
                                    block
                                    >注册</v-btn
                                >
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { ethers } from "ethers"
import { abi, contractAddress } from "@/constants" // 导入合约地址和ABI
const userAddress = ref(''); // 存储当前钱包地址
const adminAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // 管理员地址
let isAdmin = ref(false); // 是否是管理员
const router = useRouter()
const loginMsg = ref("通过 MetaMask 登录")

async function login() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAddress.value = accounts[0]; // 获取用户账户地址
            console.log(userAddress.value)
            isAdmin.value = userAddress.value.toLowerCase() === adminAddress.toLowerCase();
            if(isAdmin.value){
                router.push('/admin')
            }
            else{
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(contractAddress, abi, signer)
                let registered = await contract.isRegistered()
                console.log(contract.isRegistered())
                if (!registered) {
                    loginMsg.value = "未注册"
                } else {
                    loginMsg.value = "已注册"
                    router.push("/main")
                }
            }
        } 
        catch (error) {
            console.error(error)
            alert("发生错误，请查看控制台")
        }
    } else {
        alert("请安装 MetaMask!")
    }
}


function register() {
    router.push("/accountRegistration")
}
</script>

<style scoped>
.v-application {
    background-image: url("../pic1.png"); /* 替换为你的图片路径 */
    background-size: cover; /* 图片铺满整个容器 */
    background-position: center; /* 图片居中显示 */
}
.login-card {
    background: rgba(250, 250, 250, 0.7); /* 卡片背景透明度 */
    border-radius: 10px;
    max-width: 500px; /* 调整卡片最大宽度 */
    height: auto; /* 根据内容自动调整高度 */
}
.login-btn {
    color: white;
    background-color: #1976d2; /* 调整为你喜欢的颜色 */
    margin-bottom: 16px; /* 按钮间距 */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px; /* 或者其他你想要的高度 */
}
.register-btn {
    color: #1976d2; /* 调整为你喜欢的颜色 */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px; /* 或者其他你想要的高度 */
}
.v-application--wrap {
    min-height: 0 !important;
}
.v-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
