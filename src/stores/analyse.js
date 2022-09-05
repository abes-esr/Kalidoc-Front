//Stockage des choix d'analyse et des ppn valides et invalides

import { defineStore } from 'pinia'

export const useAnalyseStore = defineStore('analyse', {
  state: () => {
    return {
      ppnValidsList: [],
      ppnInvalidsList: [],
      analyseSelected: '',
      familleDocumentSet: [],
      ruleSet: [],
    }
  },
  getters: {
    getPpnValidsList: (state) => state.ppnValidsList,
    getPpnInvalidsList: (state) => state.ppnInvalidsList,
    getAnalyseSelected: (state) => state.analyseSelected,
    getFamilleDocumentSet: (state) => state.familleDocumentSet,
    getRuleSet: (state) => state.ruleSet,
  },
  actions: {
    setPpnValidsList(ppnList) {
      this.ppnValidsList = ppnList;
    },
    setPpnInvalidsList(ppnList) {
      this.ppnInvalidsList = ppnList;
    },
    setAnalyseSelected(analyseSelected) {
      this.analyseSelected = analyseSelected;
    },
    setFamilleDocumentSet(familleDocumentSet) {
      this.familleDocumentSet = familleDocumentSet;
    },
    setRuleSet(ruleSet) {
      this.ruleSet = ruleSet;
    },
  }
})
