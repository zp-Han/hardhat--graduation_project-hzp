<template>
    <div>
      <h3>删除学生</h3>
      <v-divider class="mb-4"></v-divider>
      <v-text-field v-model="id" label="学生ID"></v-text-field>
      <v-btn @click="deleteStu" color="primary">确认</v-btn>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { abi, contractAddress } from '@/constants';
  import { ethers } from 'ethers';
  
  const id = ref('');
  
  async function deleteStu() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const transactionResponse = await contract.deleteStudent(Number(id.value));
        await transactionResponse.wait();
        alert('学生已经删除');
      } catch (error) {
        console.error("删除学生时出错：", error);
      }
    } else {
      console.error("请安装 MetaMask 并连接到以太坊网络。");
    }
  }
  </script>
  
  <style scoped>
.v-app {
    background-color: antiquewhite;
}

.v-list {
    background-color: bisque;
}
  </style>
  