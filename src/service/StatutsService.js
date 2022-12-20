import axios from "axios";

export class StatutsService {
    client = axios.create({
        baseURL: process.env.VUE_APP_ROOT_API,
    });

    /**
     * Renvoie les statuts des différentes bases de données
     * @return {Promise<AxiosResponse<any>>}
     * response.data : { statut, valeur}
     */
    getStatusApplication(){
        return this.client.get("statusApplication")
    }
}
export default new StatutsService();