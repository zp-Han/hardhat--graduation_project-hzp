<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Today's New Proposals</v-card-title>
            <v-card-text>
              <v-list v-if="newProposals.length">
                <v-list-item v-for="(proposal, index) in newProposals" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>Proposal {{ proposal.id }}</v-list-item-title>
                    <v-list-item-subtitle>Created at: {{ proposal.timestamp }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Study Hours: {{ proposal.studyHours }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Expenses: {{ proposal.expenses }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Exercise Hours: {{ proposal.exerciseHours }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Sleep Hours: {{ proposal.sleepHours }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-alert v-else>No new proposals today.</v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ethers } from 'ethers';
  import { abi, contractAddress } from "@/constants";

      const newProposals = ref([]);
  
      const loadNewProposals = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(contractAddress, abi, provider);
  
        // 获取所有提案
        const allProposals = await contract.getProposals();
  
        // 过滤出今日新增的提案
        const today = new Date().toISOString().slice(0, 10);
        const todayProposals = allProposals.filter(proposal => {
          const proposalDate = new Date(proposal.timestamp * 1000).toISOString().slice(0, 10);
          return proposalDate === today;
        });
  
        // 将提案数据格式化并存储在 newProposals 中
        newProposals.value = todayProposals.map((proposal, index) => ({
          id: index + 1,
          timestamp: new Date(proposal.timestamp * 1000).toLocaleString(),
          studyHours: proposal.studyHours,
          expenses: proposal.expenses,
          exerciseHours: proposal.exerciseHours,
          sleepHours: proposal.sleepHours
        }));
      };
  
      onMounted(() => {
        loadNewProposals();
      });
  
  </script>
  
  <style scoped>
  /* Your custom styles here */
  </style>
  