//Stockage des différentes requêtes envoyées au back-end
import { defineStore } from 'pinia'

export const useHistoriqueStore = defineStore('historique', {

// Date: null,
// analyse:
//      {
//         ppnValidsList: [],
//         ppnInvalidsList: [],
//         analyseSelected: '',
//         familleDocumentSet: [],
//         ruleSet: []
//       },
// resultats:
//       [
//          { // premier résultat
//              nbPpnTotal: [],
//              nbPpnInconnus: [],
//              nbPpnErreurs:[],
//              nbPpnOk:[],
//           },
//         { // deuxieme resultat rejoué
//             nbPpnTotal: [],
//             nbPpnInconnus: [],
//             nbPpnErreurs:[],
//             nbPpnOk:[],
//          } //etc...
//     ]

    state: () => {
        return {
            requestHistoriqueList: [],
        }
    },
    getters: {
        getHistorique: (state) => state.requestHistoriqueList,
    },
    actions: {
        createNewHistorique(analyse, resultat) {
            this.requestHistoriqueList.push({
                date: new Date(),
                analyse: analyse,
                resultats: [resultat]
            });
        },
        pushReplayedResultatToLastHistorique(resultat) {
            this.requestHistoriqueList[this.requestHistoriqueList.length-1].resultats.push(resultat);
        }
    }
})
