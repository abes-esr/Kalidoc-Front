import axios from "axios";

export class QualimarcService {
    client = axios.create({
        baseURL: process.env.VUE_APP_ROOT_API,
    });

  /**
   * fonction permetant de faire passer les regles sur une liste de ppn selon le type d'analyse choisi
   * @param ppnList la liste de ppn ex: ["123456789","987654321"]
   * @param typeAnalyse le type d'analyse choisi ex: "QUICK"
   * @param famillesDocuments la/les familles de doc choisi
   * @param ruleSet les jeux de regles choisi
   * @returns {Promise<AxiosResponse<any>>}
   */
    checkPpnWithTypeAnalyse(ppnList, typeAnalyse, famillesDocuments, ruleSet) {
        let data = {
            ppnList: ppnList,
            typeAnalyse: typeAnalyse,
        }
        if(ruleSet.length > 0){
            data.ruleSet = ruleSet
        }
        if(famillesDocuments.length > 0){
            data.famillesDocuments = famillesDocuments
        }
        return this.client.post('check',data)
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
     * Renvoie la liste des jeux de regles
     * @return {Promise<AxiosResponse<any>>}
     * response.data : {id, libelle}
     */
    getRuleSetList(){
      return this.client.get("getRuleSets")
    }

    /**
     * Renvoie la liste des règles
     * @return {Promise<AxiosResponse<any>>}
     * response.data : {id, zoneUnm1, zoneUnm2, typeDoc, message, priority}
     */
    getRules() {
        return this.client.get("rules")
    }

    /**
     * Renvoie le status de la tache (0 à 100%)
     */
    getStatus() {
        return this.client.get("getStatus")
    }
}
export default new QualimarcService();