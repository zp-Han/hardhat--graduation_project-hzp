<template>
    <v-container fluid class="fill-height bg" fill-height>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="elevation-12 pa-5" outlined>
                    <h1 class="text-center mb-5">账户注册</h1>
                    <v-form>
                        <v-text-field
                            v-model="studentName"
                            label="学生姓名"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            v-model="studentId"
                            label="学生ID"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            v-model="studentClass"
                            label="学生班级"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            v-model="studentCollege"
                            label="学院"
                            outlined
                            dense
                        ></v-text-field>
                        <v-btn
                            color="primary"
                            class="mr-4 mt-5"
                            @click="registerAccount"
                            block
                        >
                            提交
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue"
import { ethers } from "ethers"
import { abi, contractAddress } from "../constants"
import { useRouter } from "vue-router"

const router = useRouter()

let studentName = ref("")
let studentId = ref("")
let studentClass = ref("")
let studentCollege = ref("")

async function registerAccount() {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed")
        return
    }

    await window.ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
        const transactionResponse = await contract.register(
            Number(studentId.value),
            studentName.value,
            studentClass.value,
            studentCollege.value,
        )
        await transactionResponse.wait()
        alert("信息已经提交！")
        router.push("/login")
    } catch (error) {
        console.error(error)
        alert("提交失败，请检查控制台了解详情。")
    }
}
</script>

<style scoped>
.bg {
    background-image: linear-gradient(
        to right top,
        #d16ba5,
        #c777b9,
        #ba83ca,
        #aa8fd8,
        #9a9ae1
    );
    height: 100vh;
}

.v-card {
    border-radius: 15px;
}

.text-center {
    text-align: center;
}
</style>
