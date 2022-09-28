import axios from "axios";

export class QualimarcService {
    client = axios.create({
        baseURL: process.env.VUE_APP_ROOT_API,
    });

  /**
   * fonction permetant de faire passer les regles sur une liste de ppn selon le type d'analyse choisi
   * @param ppnList la liste de ppn ex: ["123456789","987654321"]
   * @param typeAnalyse le type d'analyse choisi ex: "QUICK"
   * @returns {Promise<AxiosResponse<any>>}
   */
    checkPpnWithTypeAnalyse(ppnList, typeAnalyse) {
        return this.client.post('check',{
                ppnList: ppnList,
                typeAnalyse: typeAnalyse
        })
    }

    /**
     * Renvoie la liste des familles de docuemnts
     * @return {Promise<AxiosResponse<any>>}
     * response.data : { id, libelle}
     */
    getFamillesDocuments(){
      return this.client.get("getFamillesDocuments")
    }

    /**
     * Renvoie la liste des types d'analyses
     * @return {Promise<AxiosResponse<any>>}
     * response.data : {id, libelle}
     */
    getTypesAnalyses(){
      return this.client.get("getTypesAnalyses")
    }


}
export default new QualimarcService();