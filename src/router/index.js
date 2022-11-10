import Vue from 'vue'
import VueRouter from 'vue-router'
import accueil from "@/views/03-router-content/Accueil";
import resultat from '@/views/03-router-content/Resultat';
import Accueil from "@/views/03-router-content/Accueil";
import regles from "@/views/03-router-content/Regles";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'accueil de l\'application',
    meta: {title : 'Accueil'},
    component: accueil,
  },
  {
    path: '/resultats',
    name: 'page de résultats',
    meta : { title : 'resultats'},
    component: resultat,
  },
  {
    path: '/regles',
    name: 'page des règles',
    meta : { title : 'regles'},
    component: regles,
  },
  {
    path: '*',
    name: 'Redirection accueil',
    component: accueil,
    meta : { title : 'Accueil'},
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
