import { createRouter, createWebHistory } from "vue-router" //引入createROouter
import AccountRegistration from "@/pages/AccountRegistration.vue"
import Login from "@/pages/Login.vue"
import BehaviorSubmission from "@/pages/BehaviorSubmission.vue"
import BehaviorVisualization from "@/pages/BehaviorVisualization.vue"
import Main from "@/pages/Main.vue"
import PersonInfomation from "@/pages/PersonInfomation.vue"
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
            ],
        },
    ],
})
export default router
