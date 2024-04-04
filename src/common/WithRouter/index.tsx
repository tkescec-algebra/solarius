import { useLocation, useNavigate, useParams } from 'react-router-dom';

const WithRouter = <P extends object>(Component: React.ComponentType<P>) => {
    const ComponentWithRouterProp = (props: any) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    };

    return ComponentWithRouterProp;
};

export default WithRouter;
