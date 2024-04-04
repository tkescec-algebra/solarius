import './index.scss';
import { Card } from 'react-bootstrap';
import Layout from '../../../components/public/Layout';
import { Register as RegisterComponent } from '../../../components/public/Register';
import { useEffect, useState } from 'react';
import AuthService from '../../../services/Auth/AuthService';

const Register = (props: any): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [successful, setSuccessful] = useState<boolean>(false);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) props.router.navigate('/user/profile');
    }, []);

    const onChangeUsername = (e: any) => {
        setUsername(e.target.value);
    };

    const onChangeEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    };

    const handleRegister = (e: any) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);
        setSuccessful(false);

        AuthService.register(username, email, password).then(
            (response) => {
                setMessage(response.data.message || 'Uspješno ste se registrirali!');
                setLoading(false);
                setSuccessful(true);
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
                            <RegisterComponent
                                username={username}
                                email={email}
                                password={password}
                                message={message}
                                loading={loading}
                                successful={successful}
                                onChangeUsername={onChangeUsername}
                                onChangeEmail={onChangeEmail}
                                onChangePassword={onChangePassword}
                                handleRegister={handleRegister}
                            />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Layout(Register);
