import axios from 'axios'
//import { accountService } from './service'

const Axios = axios.create({
    baseURL: 'https://ab-backend-7o83.onrender.com/api/v1'
})


/* mise en place de intercepteur du token */

// a decommenter si on utilise le token 
/* Axios.interceptors.request.use(request => {
    
    if(accountService.isLogged())
    {
        request.headers.Authorization = 'Bearer '+accountService.getToken()
    }
    
    return request
})
 */
export default Axios