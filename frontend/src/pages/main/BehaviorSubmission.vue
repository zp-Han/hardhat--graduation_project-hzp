<template>
  <v-container>
    <h1 class="text-center">行为提交</h1>
    <v-form @submit.prevent="submitBehavior">
      <!-- 输入行为信息的表单字段 -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="behavior.studyHours"
            label="学习小时数"
            outlined
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="behavior.expenses"
            label="开销"
            outlined
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="behavior.exerciseHours"
            label="运动小时数"
            outlined
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="behavior.sleepHours"
            label="睡眠小时数"
            outlined
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn type="submit" color="primary" class="mt-4">提交</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/constants";

const behavior = ref({
  studyHours: 0,
  expenses: 0,
  exerciseHours: 0,
  sleepHours: 0
});

// 获取当前时间的年月日
function getNowTime() {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedTimestamp = `${year}${month}${day}`;
  return formattedTimestamp;
}

async function submitBehavior() {
  // 计算时间总和
  const totalHours = Number(behavior.value.studyHours) + Number(behavior.value.exerciseHours) + Number(behavior.value.sleepHours);
  
  // 验证时间总和是否超过24小时
  if (totalHours > 24) {
    alert("时间输入不合格");
    return; // 如果超过24小时，停止提交
  }

  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const formattedTimestamp = getNowTime();
    try {
      // 提交行为信息
      const transactionResponse = await contract.submitBehavior(
        formattedTimestamp,  // 将时间戳作为第一个参数传入
        Number(behavior.value.studyHours),
        Number(behavior.value.expenses),
        Number(behavior.value.exerciseHours),
        Number(behavior.value.sleepHours)
      );
      await transactionResponse.wait();
      
      alert("信息已经提交！");
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>
