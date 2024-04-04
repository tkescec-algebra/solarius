import axios from 'axios';
import { API_LOGIN, API_REGISTER, API_URL } from '../../utils/constants/Api';

class AuthService {
    async login(username: string, password: string) {
        const response = await axios.post(API_URL + API_LOGIN, {
            email: username,
            password: password,
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username: string, email: string, password: string) {
        return axios.post(API_URL + API_REGISTER, {
            full_name: username,
            email: email,
            password: password,
        });
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

export default new AuthService();
