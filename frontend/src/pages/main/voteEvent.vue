<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Proposals</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(proposal, index) in proposals" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>Proposal {{ index }}</v-list-item-title>
                    <v-list-item-subtitle>Study Hours: {{ proposal.studyHours }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Expenses: {{ proposal.expenses }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Exercise Hours: {{ proposal.exerciseHours }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Sleep Hours: {{ proposal.sleepHours }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="votingEndTime && !proposalPassed">
                      Voting Ends: {{ new Date(votingEndTime * 1000).toLocaleString() }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="proposalPassed">
                      Result: {{ proposalPassed ? 'Passed' : 'Failed' }}
                    </v-list-item-subtitle>
                    <v-btn v-if="!votingEndTime && !proposalPassed" @click="vote(true, index)" color="success">Vote Yes</v-btn>
                    <v-btn v-if="!votingEndTime && !proposalPassed" @click="vote(false, index)" color="error">Vote No</v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
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
  
  const studyHours = ref('');
  const expenses = ref('');
  const exerciseHours = ref('');
  const sleepHours = ref('');
  const proposals = ref([]);
  const votingEndTime = ref(0);
  const proposalPassed = ref(false);
  let provider = null;
  let signer = null;
  let contract = null;
  
  const initEth = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
  };
  
  const loadProposals = async () => {
  const proposalsCount = await contract.proposalsCount(); // 调用智能合约中的 proposalsCount 函数获取提案数量
  const proposalsArray = [];
  for (let i = 0; i < proposalsCount; i++) {
    const proposal = await contract.proposals(i); // 调用智能合约中的 proposals 函数来获取每个提案的详细信息
    proposalsArray.push(proposal);
  }
  proposals.value = proposalsArray;
};

  
  const loadVotingEndTime = async () => {
    votingEndTime.value = await contract.votingEndTime();
  };
  
  const loadProposalPassed = async () => {
    proposalPassed.value = await contract.proposalPassed();
  };
  
  const submitBehavior = async () => {
    await contract.submitBehavior(studyHours.value, expenses.value, exerciseHours.value, sleepHours.value);
  };
  
  const vote = async (yesVote, index) => {
    await contract.vote(yesVote, index);
  };
  
  onMounted(() => {
    initEth().then(() => {
      loadProposals();
      loadVotingEndTime();
      loadProposalPassed();
    });
  });
  </script>
  
  <style scoped>
  /* Your custom styles here */
  </style>
  