<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title class="headline">发布公告</v-card-title>
      <v-form v-model="validPublish" @submit.prevent="publishNotice">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="notice"
              label="公告信息"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-end">
            <v-btn type="submit" :disabled="!validPublish">发布</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <v-divider class="my-4"></v-divider>

    <v-card>
      <v-card-title class="headline">当前公告</v-card-title>
      <v-card-text v-if="notices.length > 0">
        <v-list>
          <v-list-item v-for="(notice, index) in notices" :key="index">
            <v-list-item-title>{{ notice.info }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatDate(notice.timestamp) }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text v-else>
        暂无公告
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ethers } from 'ethers';
import { abi, contractAddress } from '@/constants';

const notice = ref('');
const validPublish = ref(false);
const notices = ref([]);

async function publishNotice() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
    const transactionResponse = await contract.setNotice(timestamp, notice.value);
    await transactionResponse.wait();
    validPublish.value = false; 
    fetchNotices();
  }
}

async function fetchNotices() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const fetchedNotices = await contract.getnotice();
    notices.value = fetchedNotices;
  }
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

onMounted(fetchNotices);
</script>

<style scoped>
.v-card__title, .v-card__text {
  color: #333;
}

.v-btn {
  color: #fff;
  background-color: #1976D2;
}

.v-btn:hover {
  background-color: #1565C0;
}
</style>
