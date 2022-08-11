import { defineStore } from 'pinia'

export const useAnalyseStore = defineStore('analyse', {
  state: () => {
    return {
      ppnList: [],
    }
  },
  getters: {
    getPpnList: (state) => state.ppnList,
  },
  actions: {
    setPpnList(ppnList) {
      this.ppnList = ppnList;
    }
  }
})
