//Stockage des différents résultats retournés du back-end

import { defineStore } from 'pinia'

export const useResultatStore = defineStore('resultat', {
  state: () => {
    return {
      resultsList: [],
      nbPpnTotal: 0,
      nbPpnInconnus: 0,
      nbPpnErreurs:0,
      nbPpnOk:0,
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
    setNbPpnTotal(ppnTotal) {
      this.nbPpnTotal = ppnTotal;
    },
    setNbPpnInconnus(ppnInconnus) {
      this.nbPpnInconnus = ppnInconnus;
    },
    setNbPpnErreurs(ppnErreurs) {
      this.nbPpnErreurs = ppnErreurs;
    },
    setNbPpnOk(ppnOk) {
      this.nbPpnOk = ppnOk;
    }
  }
})
