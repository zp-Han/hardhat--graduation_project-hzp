import { createRouter, createWebHistory } from "vue-router" //引入createROouter
import AccountRegistration from "@/pages/AccountRegistration.vue"
import Login from "@/pages/Login.vue"
import Main from "@/pages/Main.vue"
import BehaviorSubmission from "@/pages/main/BehaviorSubmission.vue"
import BehaviorVisualization from "@/pages/main/BehaviorVisualization.vue"
import PersonInfomation from "@/pages/main/PersonInfomation.vue"
import voteEvent from "@/pages/main/voteEvent.vue"
import admin from "@/pages/Admin.vue"
import deleteStu from "@/pages/admin/deleteStu.vue"
import changeAdmin from "@/pages/admin/changeAdmin.vue"
import checkEvent from "@/pages/admin/checkEvent.vue"
import getStudent from "@/pages/admin/getStudent.vue"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/accountRegistration",
            component: AccountRegistration,
        },
        {
            path: "/main",
            component: Main,
            children: [
                {
                    name: "BS",
                    path: "behaviorSubmission",
                    component: BehaviorSubmission,
                },
                {
                    name: "BV",
                    path: "behaviorVisualization",
                    component: BehaviorVisualization,
                },
                {
                    name: "PI",
                    path: "personInfomation ",
                    component: PersonInfomation,
                },
                {
                    name: "VE",
                    path: "voteEvent",
                    component: voteEvent,
                },
            ],
        },
        {
            path: "/admin",
            component: admin,
            children: [
                {
                    name: "DS",
                    path: "deleteStu",
                    component: deleteStu,
                },
                {
                    name: "CA",
                    path: "changeAdmin",
                    component: changeAdmin,
                },
                {
                    name: "CE",
                    path: "checkEvent",
                    component: checkEvent,
                },
                {
                    name: "GT",
                    path: "getStudent",
                    component: getStudent,
                },
            ],
        },
    ],
})
export default router
