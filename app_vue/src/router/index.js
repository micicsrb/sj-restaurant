import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "../views/HelloWorld.vue"
import RegisterView from "../views/RegisterView.vue"
import LoginView from "../views/LoginView.vue"
import JelaView from "../views/JelaView.vue"
import OrderView from "@/views/OrderView.vue"
import OrdersView from "@/views/OrdersView.vue";
import RegisterTest from "@/views/RegisterTest.vue"
import LoginTest from "@/views/LoginTest.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/jela",
    name: "JelaView",
    component: JelaView,
  },
  {
    path: '/orders',
    name: 'OrdersView',
    component: OrdersView
  },
  {
    path: '/order',
    name: 'OrderView',
    component: OrderView
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path:'/login',
    name:"Login",
    component: LoginView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
