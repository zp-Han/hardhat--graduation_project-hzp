<template>
    <div>
      <h3>修改管理员</h3>
      <v-divider class="mb-4"></v-divider>
      <v-text-field v-model="newAddress" label="新管理员地址"></v-text-field>
      <v-btn @click="changeAdmin" color="primary">确认</v-btn>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { abi,contractAddress } from '@/constants';
import { ethers } from 'ethers';

let newAddress = ref()

async function changeAdmin(){
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try{
            const  transactionResponse =  await contract.changeChairman(newAddress)
            await transactionResponse.wait()
            alert("修改成功")
        }
        catch(error)
        {
            console.log(error)
        }

    
    }
}
</script>
<style></style>