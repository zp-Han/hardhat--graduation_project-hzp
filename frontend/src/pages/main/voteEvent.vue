<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card v-for="(behavior, index) in behaviors" :key="index" class="behavior-card">
          <v-card-title>今日同学行为 {{ index+1 }}</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-subtitle>提交行为同学: {{ behavior.studentName }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>学习时间: {{ behavior.studyHours }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>消费金额: {{ behavior.expenses }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>运动时间: {{ behavior.exerciseHours }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>睡觉时间: {{ behavior.sleepHours }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>状态: {{ behavior.finalized ? '已结束' : '进行中' }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item v-if="behavior.finalized">
                <v-list-item-subtitle>
                  结果: {{ behavior.behaviorPassed ? '通过' : '失败' }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>赞成票数: {{ behavior.yesCount }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>反对票数: {{ behavior.noCount }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions v-if="!behavior.finalized">
            <v-btn @click="vote(true, index)" color="success">投赞成票</v-btn>
            <v-btn @click="vote(false, index)" color="error">投反对票</v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <span>投票已结束</span>
          </v-card-actions>
        </v-card>
        <v-spacer></v-spacer> <!-- 添加间隔 -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { ethers } from 'ethers';
import { abi, contractAddress } from "@/constants";

const behaviors = ref([]);

let provider = null;
let signer = null;
let contract = null;
let stuClassName = ref()

const initEth = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
  const info = await contract.getStudentInfo()
  stuClassName.value = info[2];
};

const getBehaviors = async () => {
  behaviors.value = await contract.getBehaviors();
  console.log(contract.getBehaviors())
};

const vote = async (yesVote, index) => {
  await contract.vote(yesVote, behaviors.value[index].studentName, stuClassName.value);
  alert("投票成功")
};


initEth().then(() => {
  getBehaviors();
});
</script>

<style scoped>
.behavior-card {
  margin-bottom: 20px; /* 添加间隔 */
}
</style>
