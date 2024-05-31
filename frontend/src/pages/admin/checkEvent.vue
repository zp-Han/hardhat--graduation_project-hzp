<template>
  <v-container>
    <h1>班级行为</h1>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-text-field v-model="className" label="班级名称" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-btn color="primary" @click="searchBehaviors">搜索</v-btn>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item v-for="(behavior, index) in behaviors" :key="index">
        <v-list-item-content>
          <v-list-item-title><strong>学生姓名:</strong> {{ behavior.studentName }}</v-list-item-title>
          <v-list-item-subtitle><strong>时间戳:</strong> {{ behavior.timestamp }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>学习时长:</strong> {{ behavior.studyHours }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>开销:</strong> {{ behavior.expenses }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>运动时长:</strong> {{ behavior.exerciseHours }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>睡眠时长:</strong> {{ behavior.sleepHours }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>总票数:</strong> {{ behavior.allCount }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>赞成票数:</strong> {{ behavior.yesCount }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>反对票数:</strong> {{ behavior.noCount }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>最终确定:</strong> {{ behavior.finalized }}</v-list-item-subtitle>
          <v-list-item-subtitle><strong>行为是否通过:</strong> {{ behavior.behaviorPassed }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { ethers } from 'ethers';
import { abi, contractAddress } from "@/constants";

const behaviors = ref([]);
let provider = null;
let contract = null;
const className = ref('');

const initEth = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);
};

const searchBehaviors = async () => {
  const signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
  try {
    const fetchedBehaviors = await contract.GetBehaviors(className.value);
    behaviors.value = fetchedBehaviors;
  } catch (error) {
    console.error("获取行为时出错:", error);
  }
};

initEth();
</script>

<style scoped>
/* Add your component styles here */
</style>
