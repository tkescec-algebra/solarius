import { useEffect, useState } from 'react';
import { parseJwt } from '../utils';
import AuthService from '../services/Auth/AuthService';
import WithRouter from './WithRouter';

const AuthVerify = (props: any) => {
    let location = props.router.location;

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            const decodedJwt = parseJwt(user.token);

            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logout();
            }
        }
    }, [location]);

    return <div></div>;
};

export default WithRouter(AuthVerify);
