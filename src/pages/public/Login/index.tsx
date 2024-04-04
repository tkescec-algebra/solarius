import './index.scss';
import { Card } from 'react-bootstrap';
import Layout from '../../../components/public/Layout';
import { Login as LoginComponent } from '../../../components/public/Login';
import { useEffect, useState } from 'react';
import AuthService from '../../../services/Auth/AuthService';

const Login = (props: any): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) props.router.navigate('/user/profile');
    }, []);

    const onChangeUsername = (e: any) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e: any) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);

        AuthService.login(username, password).then(
            () => {
                props.router.navigate('/user/profile');
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            },
        );
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    <Card className="card-container">
                        <Card.Body>
                            <img
                                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                alt="profile-img"
                                className="profile-img-card"
                            />
                            <LoginComponent
                                username={username}
                                password={password}
                                message={message}
                                loading={loading}
                                onChangeUsername={onChangeUsername}
                                onChangePassword={onChangePassword}
                                handleLogin={handleLogin}
                            />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Layout(Login);
