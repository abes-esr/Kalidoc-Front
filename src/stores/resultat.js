//Stockage des différents résultats retournés du back-end

import { defineStore } from 'pinia'

export const useResultatStore = defineStore('resultat', {
  state: () => {
    return {
      resultsList: [],
    }
  },
  getters: {
    getResultsList: (state) => state.resultsList,
  },
  actions: {
    setResultsListArray(resultsListInArray) {
      this.resultsList = resultsListInArray;
    },
    pushRequestListOneElement(resultsInString) {
      this.resultsList.push(resultsInString)
    }
  }
})
