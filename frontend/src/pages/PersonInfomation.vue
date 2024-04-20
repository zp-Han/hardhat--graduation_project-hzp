<template>
<<<<<<< HEAD
    <v-container>
      <v-card>
        <v-card-title class="headline">
          学生信息
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span>学生编号: {{ stu.sId }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span>姓名: {{ stu.Name }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span>班级: {{ stu.ClassName }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span>学院: {{ stu.Faculty }}</span>
            </v-col>
          </v-row>
          <v-row></v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ethers } from "ethers"
  import { abi, contractAddress } from "../constants"
  import { ref, onMounted } from "vue"
  
  const stu = ref({
      sId: '',
      Name: '',
      ClassName: '',
      Faculty: '',
  })
  
  onMounted(getinfo)
  
  async function getinfo() {
      if (typeof window.ethereum !== "undefined") {
          await window.ethereum.request({ method: "eth_requestAccounts" })
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi, signer)
  
          try {
              const info = await contract.getMyBasicInfo()
              stu.value.sId = info[0]
              stu.value.Name = info[1]
              stu.value.ClassName = info[2]
              stu.value.Faculty = info[3]
          } catch (error) {
              console.log(error)
              alert("信息获取失败！")
          }
      }
  }
  </script>
  
  <style>
  .container {
    margin-top: 50px;
  }
  
  .card {
    max-width: 500px;
    margin: auto;
  }
  
  .headline {
    font-size: 24px;
    text-align: center;
  }
  </style>
  
=======
    <h3>{{ stu.sId }}</h3>
    <h3>{{ stu.Name }}</h3>
    <h3>{{ stu.ClassName }}</h3>
</template>

<script setup>
import { ethers } from "ethers"
import { abi, contractAddress } from "../constants"
import { ref, onMounted } from "vue"

const stu = ref({
    sId: '',
    Name: '',
    ClassName: '',
})

onMounted(getinfo)

async function getinfo() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const info = await contract.getMyBasicInfo()
            stu.value.sId = info[0]
            stu.value.Name = info[1]
            stu.value.ClassName = info[2]
        } catch (error) {
            console.log(error)
            alert("信息获取失败！")
        }
    }
}
</script>

<style></style>
>>>>>>> 11a5e52abbae51ae09e845e7a5ba250548766eee
