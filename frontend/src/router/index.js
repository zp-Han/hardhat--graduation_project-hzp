import { createRouter, createWebHistory } from "vue-router"; //引入createROouter
import AccountRegistration from "@/pages/AccountRegistration.vue";
import Login from "@/pages/Login.vue";
import BehaviorSubmission from "@/pages/BehaviorSubmission.vue";
import BehaviorVisualization from "@/pages/BehaviorVisualization.vue";
import Main from "@/pages/Main.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/Login",
      component: Login,
    },
    {
      path: "/AccountRegistration",
      component: AccountRegistration,
    },
    {
      path: "/BehaviorSubmission",
      component: BehaviorSubmission,
    },
    {
      path: "/BehaviorVisualization",
      component: BehaviorVisualization,
    },
    {
      path: "/",
      redirect: "/Login",
    },
    {
      path: "/main",
      component: Main,
    },
  ],
});
export default router;
