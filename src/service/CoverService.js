import axios from "axios";

export class CoverService {
    client = axios.create({
        //racine de l'url pour récupérer la couverture sur GB
        baseURL: "https://www.googleapis.com/books/v1/",
    });

    /**
     * Fonction permettant de récupérer une promise d'appel au ws GoogleBooks sur OCN
     * @param ocn
     * @return {Promise<AxiosResponse<any>>}
     */
    getCoverByOcn(ocn) {
        return this.client.get('volumes?q=oclc:' + ocn);
    }

    /**
     * Fonction permettant de récupérer une promise d'appel au ws GoogleBooks sur ISBN
     * @param isbn
     * @return {Promise<AxiosResponse<any>>}
     */
    getCoverByIsbn(isbn) {
        return this.client.get('volumes?q=isbn:' + isbn);
    }
}
export default new CoverService();