import axios from 'axios';
import { API_ESTIMATES_FOR_USERS, API_URL, API_DATAPOINTS_FOR_ESTIMATE } from '../../utils/constants/Api';
import AuthHeader from '../Auth/AuthHeader';

class UserService {
    getEstimates() {
        return axios.post(API_URL + API_ESTIMATES_FOR_USERS, {}, { headers: AuthHeader() });
    }

    getEstimate(id: any) {
        return axios.post(API_URL + API_DATAPOINTS_FOR_ESTIMATE, { estimate_id: id }, { headers: AuthHeader() });
    }
}

export default new UserService();
