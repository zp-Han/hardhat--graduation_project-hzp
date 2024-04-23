<template>
  <div class="container">
    <h1 align="center">行为可视化展示</h1></hr>
    <h2>输入查询时间</h2>
    <v-text-field v-model="time" label="example:20200101"></v-text-field>
    <v-btn @click="getBehavior" color="primary">确认</v-btn>
    <br>
    <div v-if="behaviorInfo">
      <div style="margin-bottom: 20px;">
        <canvas id="timeChartCanvas" width="400" height="400"></canvas>
      </div>
      <p>开销：{{ behaviorInfo.expenses}} 元</p>
      <p>时间：{{ behaviorInfo.timestamp }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/constants";
import Chart from "chart.js/auto";

let time = ref("");
let behaviorInfo = ref(null);

async function getBehavior() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      behaviorInfo.value = await contract.getMyBehavior(time.value);
      if (behaviorInfo.value) {
        await nextTick(); // Wait for Vue to render
        const canvas = document.getElementById("timeChartCanvas");
        if (canvas) {
          createChart(behaviorInfo.value);
        } else {
          console.error("Canvas element not found");
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

function createChart(behaviorInfo) {
  const canvas = document.getElementById("timeChartCanvas");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get 2D context");
    return;
  }

  const data = {
    labels: ["睡眠时间", "锻炼时间", "学习时间"],
    datasets: [{
      label: "时间占比",
      data: [
        parseFloat(behaviorInfo.sleepHours.toString()),
        parseFloat(behaviorInfo.exerciseHours.toString()),
        parseFloat(behaviorInfo.studyHours.toString())
      ],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  new Chart(ctx, {
    type: "pie",
    data: data,
    options: options,
  });
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
