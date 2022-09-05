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
      nbPpnTotal: 0,
      nbPpnTrouves: 0,
      nbPpnErreurs:0,
      nbPpnOk:0,
    }
  },
  getters: {
    getValidsPpnList: (state) => state.ppnValidsList,
    getInvalidsPpnList: (state) => state.ppnInvalidsList,
    getAnalyseSelected: (state) => state.analyseSelected,
    getFamilleDocumentSet: (state) => state.familleDocumentSet,
    getRuleSet: (state) => state.ruleSet,
    getNbPpnTotal: (state) => state.nbPpnTotal,
    getNbPpnTrouves: (state) => state.nbPpnTrouves,
    getNbPpnErreurs: (state) => state.nbPpnErreurs,
    getNbPpnOk: (state) => state.nbPpnOk
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
    setNbPpnTotal(ppnTotal) {
      this.nbPpnTotal = ppnTotal;
    },
    setNbPpnTrouves(ppnTrouves) {
      this.nbPpnTrouves = ppnTrouves;
    },
    setNbPpnErreurs(ppnErreurs) {
      this.nbPpnErreurs = ppnErreurs;
    },
    setNbPpnOk(ppnOk) {
      this.nbPpnOk = ppnOk;
    }
  }
})
