<!-- BehaviorSubmission.vue -->
<template>
    <div class="container">
        <h1>行为提交</h1>
        <div class="input-group">
            <textarea
                v-model="behavior"
                placeholder="请输入行为信息"
            ></textarea>
        </div>
        <button @click="submitBehavior" class="btn">提交</button>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const behavior = ref("")
const router = useRouter()

function submitBehavior() {
    router.push("/Login")
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

.input-group {
    margin-bottom: 15px;
}

textarea {
    width: 100%;
    height: 150px;
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
