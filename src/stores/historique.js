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
//              ppnTotal: [],
//              ppnInconnus: [],
//              ppnErreurs:[],
//              ppnOk:[],
//           },
//         { // deuxieme resultat rejoué
//             ppnTotal: [],
//             ppnInconnus: [],
//             ppnErreurs:[],
//             ppnOk:[],
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
