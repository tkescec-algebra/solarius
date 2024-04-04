import AuthService from './AuthService';

const AuthHeader = () => {
    const user = AuthService.getCurrentUser();

    if (user && user.token) {
        return { 'Content-type': 'application/json', Authorization: 'Bearer ' + user.token };
    } else {
        return { 'Content-type': 'application/json' };
    }
};

export default AuthHeader;
