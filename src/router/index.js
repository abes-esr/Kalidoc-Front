import Vue from 'vue'
import VueRouter from 'vue-router'
import Resultat from '@/views/03-router-content/Resultat';
import Accueil from "@/views/03-router-content/Accueil";
import Regles from "@/views/03-router-content/Regles";
import Historique from "@/views/03-router-content/Historique";

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
