<template>
    <v-app class="v-app">
        <v-navigation-drawer app>
            <v-list class=".v-list">
                <v-list-item @click="PIshow" value="profile">个人信息</v-list-item>
                <v-list-item @click="BSshow" value="submit">提交行为信息</v-list-item>
                <v-list-item @click="BVshow" value="view">查看行为信息</v-list-item>
                <v-list-item @click="VEshow" value="view">验证</v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container>
                <RouterView></RouterView>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { RouterView, useRouter} from "vue-router";
const router = useRouter();


function BSshow() {
    router.push({name:'BS'});
}

function BVshow() {
    router.push({name:'BV'});
}

function PIshow() {
    router.push({name:'PI'});
}

function VEshow() {
    router.push({name:'VE'});
}

</script>

<style scoped>
.v-app {
    background-color: antiquewhite;
}

.v-list {
    background-color: bisque;
}
</style>
