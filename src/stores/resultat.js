//Stockage des différents résultats retournés du back-end
import { defineStore } from 'pinia'

export const useResultatStore = defineStore('resultat', {
  state: () => {
    return {
      resultsList: [],
      recapitulatif: [],
    }
  },
  getters: {
    getResultsList: (state) => state.resultsList,
    getRecapitulatif: (state) => state.recapitulatif,
    getLastRecapitulatif: (state) => state.recapitulatif[state.recapitulatif.length-1],
  },
  actions: {
    setResultsListArray(resultsListInArray) {
      this.resultsList = resultsListInArray;
    },
    pushRecapitulatif(nbPpnTotal, nbPpnInconnus, nbPpnErreurs, nbPpnOk) {
      this.recapitulatif.push({
        nbPpnTotal: nbPpnTotal,
        nbPpnInconnus: nbPpnInconnus,
        nbPpnErreurs: nbPpnErreurs,
        nbPpnOk: nbPpnOk
      })
    },
  }
})
