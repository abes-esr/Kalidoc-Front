import Vue from 'vue'
import VueRouter from 'vue-router'
import Resultat from '@/views/Resultat.vue';
import Accueil from "@/views/Accueil.vue";
import Regles from "@/views/Regles.vue";
import Historique from "@/views/Historique.vue";
import DonneesPersonnelles from "@/views/DonneesPersonnelles.vue";

Vue.use(VueRouter)
Vue.use(require('vue-shortkey'))

const routes = [
  {
    path: '/',
    name: 'accueil de l\'application',
    meta: {title : 'Accueil'},
    component: Accueil,
  },
  {
    path: '/resultats',
    name: 'page de résultats',
    meta : { title : 'resultats'},
    component: Resultat,
  },
  {
    path: '/regles',
    name: 'page des règles',
    meta : { title : 'regles'},
    component: Regles,
  },
  {
    path: '/historiques',
    name: 'page des historiques',
    meta : { title : 'historiques'},
    component: Historique,
  },
  {
    path: '*',
    name: 'Redirection accueil',
    component: Accueil,
    meta : { title : 'Accueil'},
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
