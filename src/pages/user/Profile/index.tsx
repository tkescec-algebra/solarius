import './index.scss';
import { useEffect, useState } from 'react';
import Layout from '../../../components/public/Layout';
import AuthService from '../../../services/Auth/AuthService';
import UserService from '../../../services/User/UserService';
import { Table } from 'react-bootstrap';
import EstimateResult from '../../../components/public/Map/EstimateResult';
import CalculateLoader from '../../../components/shared/CalculateLoader';

const Profile = (props: any): JSX.Element => {
    const [user, setUser] = useState<any>(null);
    const [data, setData] = useState<Array<any>>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [estimateResults, setEstimateResults] = useState<object>({});
    const [areCalculating, setAreCalculating] = useState<boolean>(false);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            props.router.navigate('/login');
        } else {
            setUser(currentUser);
            UserService.getEstimates().then(
                (response) => {
                    setData(response.data.energy_production_estimates);
                },
                (error) => {},
            );
        }
    }, []);

    const showEstimateResultHandle = (e: any) => {
        setAreCalculating(true);

        const estimateId = e.target.dataset.estimateId;
        console.log(estimateId);
        UserService.getEstimate(estimateId)
            .then(
                (response) => {
                    setEstimateResults(response.data);
                    setShowResult(true);
                },
                (error) => {},
            )
            .catch((error) => {})
            .finally(() => {
                setAreCalculating(false);
            });
    };

    const hideEstimateResultHandle = () => {
        setShowResult(false);
        setEstimateResults({});
    };

    return (
        <>
            {areCalculating && <CalculateLoader message="Dohvaćanje podataka. Pričekaj trenutak." />}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center py-3">Dobrodošao {user?.username}!</h1>
                        <h3>Tvoje procjene:</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {data.length == 0 && <h2>Trenutno nemaš podataka o procjenama</h2>}
                        {data.length > 0 && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Lokacija</th>
                                        <th>
                                            Površina m<sup>2</sup>
                                        </th>
                                        <th>Orijentacija &deg;</th>
                                        <th>Nagib &deg;</th>
                                        <th>Učinkovitost</th>
                                        <th style={{ width: '1%' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((estimate) => (
                                        <tr key={estimate.id}>
                                            <td>{estimate.id}</td>
                                            <td>{estimate.geolocation_name}</td>
                                            <td>{estimate.area}</td>
                                            <td>{estimate.azimuth}</td>
                                            <td>{estimate.elevation}</td>
                                            <td>{estimate.efficiency}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    data-estimate-id={estimate.id}
                                                    onClick={showEstimateResultHandle}
                                                >
                                                    Prikaži
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </div>
            </div>

            {showResult && (
                <EstimateResult
                    estimateResultHandle={hideEstimateResultHandle}
                    estimateResults={estimateResults}
                    user={user}
                />
            )}
        </>
    );
};

export default Layout(Profile);
