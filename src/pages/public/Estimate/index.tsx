import './index.scss';
import axios from 'axios';
import Layout from '../../../components/public/Layout';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Map from '../../../components/public/Map';
import EstimateForm from '../../../components/public/Map/EstimateForm';
import EstimateResult from '../../../components/public/Map/EstimateResult';
import CalculateLoader from '../../../components/shared/CalculateLoader';
import { API_ENERGY_PRODUCTION_ESTIMATE, API_URL } from '../../../utils/constants/Api';
import { isObjectEmpty, makeid } from '../../../utils';
import AuthService from '../../../services/Auth/AuthService';
import { API_GENERATE_PRECISE_ESTIMATE } from '../../../utils/constants/Api';
import AuthHeader from '../../../services/Auth/AuthHeader';

const Estimate = (): JSX.Element => {
    const defaultPosition = [45.815399, 15.966568];

    const [estimateResults, setEstimateResults] = useState<object>({});
    const [data, setData] = useState<object>({});
    const [areCalculating, setAreCalculating] = useState<boolean>(false);
    const [areSearching, setAreSearching] = useState<boolean>(false);
    const [searchTerm, setSearhTerm] = useState<string>('');
    const [position, setPosition] = useState<Array<number>>(defaultPosition);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) setUser(currentUser);
    }, []);

    useEffect(() => {
        if (!isObjectEmpty(data)) {
            let apiUrl = user ? API_URL + API_GENERATE_PRECISE_ESTIMATE : API_URL + API_ENERGY_PRODUCTION_ESTIMATE;
            console.log(apiUrl);
            axios
                .post(apiUrl, data, { headers: AuthHeader() })
                .then((res) => {
                    setEstimateResults(res.data);
                    setShowResult(true);
                })
                .catch((error) => {})
                .finally(() => {
                    setAreCalculating(false);
                });
        }
    }, [data]);

    const searchInputHandle = (e: any) => {
        e.preventDefault();

        setSearhTerm(e.target.value);
    };

    const searchHandle = (e: any) => {
        e.preventDefault();
        setAreSearching(true);

        axios
            .get(`${location.protocol}//nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`)
            .then((res) => {
                if (res.data[0] != undefined) {
                    setPosition([res.data[0]?.lat, res.data[0]?.lon]);
                    setShowModal(true);
                }
            })
            .finally(() => {
                //setAreSearching(false);
            });
    };

    const handlePosition = (position: Array<number>) => {
        setPosition(position);
        setShowModal(true);
    };

    const estimateFormHandle = (calculateData: object) => {
        setAreCalculating(true);

        setData({
            name: makeid(10),
            ...calculateData,
            geolocation_params: {
                name: searchTerm ?? makeid(10),
                latitude: position[0],
                longitude: position[1],
            },
        });
    };

    const estimateResultHandle = () => {
        setShowResult(false);
    };

    return (
        <>
            {areCalculating && <CalculateLoader message="Računanje može potrajati. Pričekaj trenutak." />}
            <div className="map-container">
                <Map position={position} areSearching={areSearching} onChangePosition={handlePosition} />
                <div className="map-search">
                    <Form onSubmit={searchHandle}>
                        <Row className="align-items-center justify-content-center">
                            <Col xs={8} className="my-1">
                                <Form.Label htmlFor="mapLocation" visuallyHidden>
                                    Lokacija
                                </Form.Label>
                                <Form.Control id="mapLocation" placeholder="npr. Zagreb" onChange={searchInputHandle} />
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button type="submit">Traži...</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                {showModal && <EstimateForm estimateFormHandle={estimateFormHandle} />}
                {showResult && (
                    <EstimateResult
                        estimateResultHandle={estimateResultHandle}
                        estimateResults={estimateResults}
                        user={user}
                    />
                )}
            </div>
        </>
    );
};

export default Layout(Estimate);
