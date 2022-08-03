import Vue from 'vue'
import VueRouter from 'vue-router'
import accueil from "@/views/03-router-content/01-accueil/Accueil";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'accueil de l\'application',
    component: accueil
  }
]

const router = new VueRouter({
  routes
})

export default router
