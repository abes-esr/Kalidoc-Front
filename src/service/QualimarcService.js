import axios from "axios";

export class QualimarcService {
    client = axios.create({
        baseURL: process.env.VUE_APP_ROOT_API,
    });

    launchRequest(ppnList, typeAnalyse) {
        return this.client.post('check',{
                ppnList: ppnList,
                typeAnalyse: typeAnalyse
        })
    }
}
export default new QualimarcService();