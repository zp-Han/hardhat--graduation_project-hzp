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
                  <v-list-item-title class="text-name">Name: {{ studentInfo.name }}</v-list-item-title>
                  <v-list-item-subtitle class="text-subtitle">Class: {{ studentInfo.className }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle">Faculty: {{ studentInfo.faculty }}</v-list-item-subtitle>
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
const studentInfo = ref(null);
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
    studentInfo.value = {
      name: student.name,
      className: student.className,
      faculty: student.faculty
    };
    error.value = '';
  } catch (e) {
    studentInfo.value = null;
    error.value = 'Error retrieving student info';
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
