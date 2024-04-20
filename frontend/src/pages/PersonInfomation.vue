<template>
    <h3>{{ stu.sId }}</h3>
    <h3>{{ stu.Name }}</h3>
    <h3>{{ stu.ClassName }}</h3>
</template>

<script setup>
import { ethers } from "ethers"
import { abi, contractAddress } from "../constants"
import { ref, onMounted } from "vue"

const stu = ref({
    sId: '',
    Name: '',
    ClassName: '',
})

onMounted(getinfo)

async function getinfo() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const info = await contract.getMyBasicInfo()
            stu.value.sId = info[0]
            stu.value.Name = info[1]
            stu.value.ClassName = info[2]
        } catch (error) {
            console.log(error)
            alert("信息获取失败！")
        }
    }
}
</script>

<style></style>
