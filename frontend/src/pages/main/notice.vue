<template>
    <v-container>
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
  
  // Data
  const notices = ref([]);
  
  // Ethereum functions
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
  
  // Fetch notices when component is mounted
  onMounted(fetchNotices);
  </script>
  
  <style scoped>
  .v-card__title, .v-card__text {
    color: #333;
  }
  </style>
  