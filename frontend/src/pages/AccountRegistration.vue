<template>
  <div class="container">
    <h1>账户注册</h1>
    <div>
      <input type="text" v-model="studentName" placeholder="请输入学生姓名">
      <input type="text" v-model="studentId" placeholder="请输入学生id">
      <input type="text" v-model="studentGender" placeholder="请输入性别">
      <input type="text" v-model="studentAge" placeholder="请输入年龄">
      <input type="text" v-model="studentCollege" placeholder="请输入学院">
      <input type="text" v-model="studentClass" placeholder="请输入学生班级">
    </div>
    <button @click="registerAccount" class="btn">提交</button>
    <button @click="getStudentInfo" class="btn">提取信息</button>
  </div>
  <h4>{{ info }}</h4>
</template>

<script setup>
// import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ethers } from 'ethers'
import {abi,contractAddress} from '../constants'


// const router = useRouter()
let studentName = ref('')
let studentId = ref('')
let studentGender = ref('')
let studentAge = ref('')
let studentCollege = ref('')
let studentClass = ref('')
let info = ref()

// async function registerAccount(){
//   let signer = null;
//   let provider;
//   if (window.ethereum == null) {
//   console.log("MetaMask not installed; using read-only defaults")
//   provider = ethers.getDefaultProvider()
// } else {
//   provider = new ethers.BrowserProvider(window.ethereum)
//   signer = await provider.getSigner();
//     const contract = new ethers.Contract(contractAddress,abi,signer)
//     try{
//       const transactionResponse = await contract.register(
//       studentName.value,
//       studentId.value,
//       studentGender.value,
//       studentClass.value,
//       studentCollege.value)
//       await listenForTransaction(transactionResponse,provider)
//       console.log('Done')
//       alert('信息已经提交！')
//   }catch(error){
//       console.log(error);
//     }
//   }
//   block.value = await provider.getBlockNumber();
// };
// function listenForTransaction(transactionResponse,provider){
//   return new Promise((resolve,reject)=>{
//     provider.once(transactionResponse.hash,(transactionRecipt)=>{
//     console.log(transactionRecipt)
//   })
//   resolve()
//   })
// }
// function usegetInformation(){
//   const provider = new ethers.BrowserProvider(window.ethereum)
//   const information = ethers.getTransation(contractAddress)
//   console.log(information)
// }
async function registerAccount() {
  let signer = null;
  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum); // Request user's permission to connect
    signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.register(
        studentId.value,
        studentName.value,
        studentClass.value,
        studentCollege.value
      );
      await listenForTransaction(transactionResponse, provider);
      console.log('Done');
      alert('信息已经提交！');
    } catch (error) {
      console.log(error);
    }
  }
}

function listenForTransaction(transactionResponse, provider) {
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(transactionReceipt);
      resolve();
    });
  });
}
async function getStudentInfo() {
  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, abi, provider);
    try {
      info.value = await contract.getStudentInfo(studentId.value);
      console.log('Student Info:', studentInfo);
      // Display or process the student information as needed
    } catch (error) {
      console.log(error);
    }
  }
}


</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input {
  margin-bottom: 15px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
