//Stockage des différentes requêtes envoyées au back-end

import { defineStore } from 'pinia'

export const useRequeteStore = defineStore('historique', {
    /*
     * Date: null,
     * analyse:
     *      {
     *         ppnValidsList: [],
     *         ppnInvalidsList: [],
     *         analyseSelected: '',
     *         familleDocumentSet: [],
     *         ruleSet: []
     *      },
     * resultats:
     *      [
     *          { // premier résultat
     *             nbPpnTotal: [],
     *             nbPpnInconnus: [],
     *             nbPpnErreurs:[],
     *             nbPpnOk:[],
     *          },
     *         { // deuxieme resultat rejoué
     *             nbPpnTotal: [],
     *             nbPpnInconnus: [],
     *             nbPpnErreurs:[],
     *             nbPpnOk:[],
     *          } //etc...
     *     ]
     */
    state: () => {
        return {
            requestHistoriqueList: [],
        }
    },
    getters: {
        getHistorique: (state) => state.ppnList,
    },
    actions: {
        setHistorique(requestListInArray) {
            this.requestHistoriqueList = requestListInArray;
        },
        pushHistoriqueElement(requestInString) {
            this.requestHistoriqueList.push(requestInString)
        }
    }
})
