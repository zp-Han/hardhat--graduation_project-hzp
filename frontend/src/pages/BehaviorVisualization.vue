<template>
  <div class="container">
    <h1>行为可视化展示</h1>
    <div v-if="behaviorInfo">
      <div style="margin-bottom: 20px;">
        <canvas id="timeChartCanvas" width="400" height="400"></canvas>
      </div>
      <p>开销：{{ behaviorInfo.expenses}} 元</p>
      <p>时间：{{ behaviorInfo.timestamp }}</p>
    </div>
<<<<<<< HEAD
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { ethers } from "ethers";
import { abi, contractAddress } from "../constants";
import Chart from "chart.js/auto";

async function getBehavior() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const formattedTimestamp = getNowTime();
      const behaviorInfo = await contract.getMyBehavior(formattedTimestamp);
      return behaviorInfo;
    } catch (error) {
      console.error(error);
      return null;
    }
=======
    
  </template>
  
  <script setup>
  // 在这里获取并展示从区块链上获取的学生行为信息
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
>>>>>>> 11a5e52abbae51ae09e845e7a5ba250548766eee
  }
}

function getNowTime() {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedTimestamp = `${year}${month}${day}`;
  return formattedTimestamp;
}

const behaviorInfo = ref(null);

onMounted(async () => {
  behaviorInfo.value = await getBehavior();
  if (behaviorInfo.value) {
    await nextTick();
    const canvas = document.getElementById("timeChartCanvas");
    if (canvas) {
      createChart(behaviorInfo.value);
    } else {
      console.error("Canvas element not found");
    }
  }
});

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
