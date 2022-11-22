//Stockage des différents résultats retournés du back-end

import { defineStore } from 'pinia'

export const useResultatStore = defineStore('resultat', {
  state: () => {
    return {
      resultsList: [],
      nbPpnTotal: [],
      nbPpnInconnus: [],
      nbPpnErreurs:[],
      nbPpnOk:[],
    }
  },
  getters: {
    getResultsList: (state) => state.resultsList,
    getNbPpnTotal: (state) => state.nbPpnTotal,
    getNbPpnInconnus: (state) => state.nbPpnInconnus,
    getNbPpnErreurs: (state) => state.nbPpnErreurs,
    getNbPpnOk: (state) => state.nbPpnOk
  },
  actions: {
    setResultsListArray(resultsListInArray) {
      this.resultsList = resultsListInArray;
    },
    pushRequestListOneElement(resultsInString) {
      this.resultsList.push(resultsInString)
    },
    pushNbPpnTotal(ppnTotal) {
      this.nbPpnTotal.push(ppnTotal);
    },
    pushNbPpnInconnus(ppnInconnus) {
      this.nbPpnInconnus.push(ppnInconnus);
    },
    pushNbPpnErreurs(ppnErreurs) {
      this.nbPpnErreurs.push(ppnErreurs);
    },
    pushNbPpnOk(ppnOk) {
      this.nbPpnOk.push(ppnOk);
    },
    resetResultatStore() {
      this.resultsList = [];
      this.nbPpnTotal = [];
      this.nbPpnInconnus = [];
      this.nbPpnErreurs = [];
      this.nbPpnOk = [];
    }
  }
})
