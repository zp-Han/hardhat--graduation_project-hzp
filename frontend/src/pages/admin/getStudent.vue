<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <div class="text-title">注册学生总数</div>
            <br>
            <div class="text-display-3">{{ count }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>通过ID查看学生</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="getStudent">
              <v-text-field v-model="studentId" label="学生ID" outlined></v-text-field>
              <v-btn type="submit" color="primary">查看</v-btn>
            </v-form>
            <v-divider></v-divider>
            <v-list v-if="studentInfo">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle">姓名：{{ studentInfo.name }}</v-list-item-title>
                  <v-list-item-subtitle class="text-subtitle">班级：{{ studentInfo.className }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">学院：{{ studentInfo.faculty }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list v-if="studentInfo && studentInfo.behavior">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle class="text-subtitle">最新行为信息：</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">时间戳：{{ studentInfo.behavior.timestamp }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">学习小时数：{{ studentInfo.behavior.studyHours }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">花费：{{ studentInfo.behavior.expenses }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">锻炼小时数：{{ studentInfo.behavior.exerciseHours }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">睡眠小时数：{{ studentInfo.behavior.sleepHours }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">全部计数：{{ studentInfo.behavior.allCount }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">行为通过：{{ studentInfo.behavior.behaviorPassed }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">是否完成：{{ studentInfo.behavior.finalized }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">反对票：{{ studentInfo.behavior.noCount }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">赞成票：{{ studentInfo.behavior.yesCount }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-alert v-else-if="error" type="error">{{ error }}</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { ethers } from 'ethers';
import { abi, contractAddress } from "@/constants";

const studentId = ref('');
const studentInfo = ref();
const error = ref('');

let provider = null;
let signer = null;
let contract = null;
const count = ref(0);

const initEth = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
  getCount();
};

const getCount = async () => {
  try { 
    count.value = await contract.getAllStuCount();
  } catch (error) {
    console.log(error)
  }
};

const getStudent = async () => {
  try {
    const student = await contract.getStudentInfoById(studentId.value);
    console.log(student)
    const behaviorArray = student[3];
    studentInfo.value = {
      name: student[0],
      className: student[1],
      faculty: student[2],
      behavior: {
        timestamp: behaviorArray[1],
        studyHours: behaviorArray[2],
        expenses: behaviorArray[3],
        exerciseHours: behaviorArray[4],
        sleepHours: behaviorArray[5],
        allCount: behaviorArray[0],
        behaviorPassed: behaviorArray[10],
        finalized: behaviorArray[9],
        noCount: behaviorArray[8],
        yesCount: behaviorArray[7]
      }
    };
    error.value = '';
  } catch (e) {
    studentInfo.value = null;
    error.value = '获取学生信息时出错';
    console.error(e);
  }
};

initEth();
</script>

<style scoped>
.text-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.text-display-3 {
  font-size: 3rem;
  font-weight: bold;
}

.text-name {
  font-size: 1.25rem;
  font-weight: bold;
}

.text-subtitle {
  font-size: 1rem;
}
</style>
