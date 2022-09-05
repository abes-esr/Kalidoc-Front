//Stockage des différentes requêtes envoyées au back-end

import { defineStore } from 'pinia'

export const useRequeteStore = defineStore('requete', {
  state: () => {
    return {
      requestList: [],
    }
  },
  getters: {
    getRequestList: (state) => state.ppnList,
  },
  actions: {
    setRequestListArray(requestListInArray) {
      this.requestList = requestListInArray;
    },
    pushRequestListOneElement(requestInString) {
      this.requestList.push(requestInString)
    }
  }
})
