import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/public/Home';
import Estimate from './pages/public/Estimate';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Profile from './pages/user/Profile';
import AuthService from './services/Auth/AuthService';
import AuthVerify from './common/AuthVerify';

const App = (): JSX.Element => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [user, setUser] = useState<object | null>(null);
    const loaction = useLocation();

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) setUser(currentUser);
    }, []);

    useEffect(() => {
        setIsLoad(false);

        setTimeout(() => {
            setIsLoad(true);
        }, 1000);
    }, [loaction]);

    const handleLogout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Home isLoad={isLoad} user={user} logout={handleLogout} />} />
                <Route path="/estimate" element={<Estimate isLoad={isLoad} user={user} logout={handleLogout} />} />
                <Route path="/login" element={<Login isLoad={isLoad} user={user} />} />
                <Route path="/register" element={<Register isLoad={isLoad} user={user} />} />
                <Route path="/user/profile" element={<Profile isLoad={isLoad} user={user} logout={handleLogout} />} />
            </Routes>
            <AuthVerify logout={handleLogout} />
        </>
    );
};

export default App;

