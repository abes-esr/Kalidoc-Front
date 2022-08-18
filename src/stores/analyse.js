//Stockage des choix d'analyse et des ppn valides et invalides

import { defineStore } from 'pinia'

export const useAnalyseStore = defineStore('analyse', {
  state: () => {
    return {
      ppnValidsList: [],
      ppnInvalidsList: []
    }
  },
  getters: {
    getValidsPpnList: (state) => state.ppnValidsList,
  },
  actions: {
    setPpnValidsList(ppnList) {
      this.ppnValidsList = ppnList;
    },
    setPpnInvalidsList(ppnList) {
      this.ppnInvalidsList(ppnList);
    }
  }
})
