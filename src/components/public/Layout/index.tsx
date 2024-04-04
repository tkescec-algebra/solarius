import React from 'react';
import { ILoader } from '../../../utils/interfaces/ILoader';
import Loader from '../../shared/Loader';
import Navigation from '../Navigation';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Layout = <P extends object>(Component: React.ComponentType<P>) => {
    const LayoutWithRouterProp = (props: any) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        const { isLoad } = props;

        if (!isLoad) {
            return <Loader />;
        }

        return (
            <>
                <Navigation {...(props as P)} />
                <Component {...(props as P)} router={{ location, navigate, params }} />
            </>
        );
    };

    return LayoutWithRouterProp;
};

export default Layout;
