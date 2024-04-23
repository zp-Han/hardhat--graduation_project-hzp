<template>
    <v-app class="v-app">
        <v-navigation-drawer app>
            <v-list class=".v-list">
                <v-list-item @click="DSshow" value="profile">删除学生</v-list-item>
            </v-list>
            <v-list class=".v-list">
                <v-list-item @click="CAshow" value="profile">修改管理员</v-list-item>
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


function DSshow() {
    router.push({name:'DS'});
}
function CAshow() {
    router.push({name:'CA'});
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
