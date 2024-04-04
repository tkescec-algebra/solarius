import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BsQuestionCircleFill } from 'react-icons/bs';

const EstimateForm = ({ estimateFormHandle }: any): JSX.Element => {
    const [pvTechnology, setPvTechnology] = useState<string>('CS');
    const [pvArea, setPvArea] = useState<number>(1);
    const [pvLoss, setPvLoss] = useState<number>(14);
    const [pvMountingPosition, setPvMountingPosition] = useState<string>('freeStanding');
    const [pvSlope, setPvSlope] = useState<number>(0);
    const [pvAzimuth, setPvAzimuth] = useState<number>(180);

    const pvTechnologyInputHandle = (e: any) => {
        e.preventDefault();

        setPvTechnology(e.target.value);
    };
    const pvAreaInputHandle = (e: any) => {
        e.preventDefault();

        setPvArea(e.target.value);
    };
    const pvLossInputHandle = (e: any) => {
        e.preventDefault();

        setPvLoss(e.target.value);
    };
    const pvMountingPositionInputHandle = (e: any) => {
        e.preventDefault();

        setPvMountingPosition(e.target.value);
    };
    const pvSlopeInputHandle = (e: any) => {
        e.preventDefault();

        setPvSlope(e.target.value);
    };
    const pvAzimuthInputHandle = (e: any) => {
        e.preventDefault();

        setPvAzimuth(e.target.value);
    };

    const handleSubmitForm = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let data: any = {};

        for (const entry of formData) {
            data[entry[0]] = entry[1];
        }

        let calculateData = {
            panel_params: {
                azimuth: Number(data.pvAzimuth),
                elevation: Number(90 - data.pvSlope),
                area: Number(data.pvArea),
                efficiency: calculateEfficiency(data),
            },
        };

        estimateFormHandle(calculateData);
    };

    const calculateEfficiency = (data: any) => {
        const pvTechnologyEfficiency: any = {
            CS: 0.17,
            CIS: 0.08,
            CDTE: 0.07,
            N: 0.1,
        };
        const pvMountingPosition: any = {
            freeStanding: 0,
            roof: 0.02,
        };

        return (
            1 * pvTechnologyEfficiency[data.pvTechnology] * (1 - data.pvLoss / 100) -
            pvMountingPosition[data.pvMountingPosition]
        );
    };

    return (
        <div className="map-form">
            <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                    <Popover id="popover-basic">
                        <Popover.Header as="h3">Izvedba FN sustava spojenih na mrežu</Popover.Header>
                        <Popover.Body>
                            Ovaj alat omogućuje procjenu prosječne mjesečne i godišnje proizvodnje energije
                            fotonaponskog sustava spojenog na električnu mrežu, bez skladištenja energije u baterije.
                            Izračun uzima u obzir sunčevo zračenje, temperaturu, brzinu vjetra i vrstu FN modula.
                            Korisnik može odabrati kako će se moduli montirati, bilo na samostojeći stalak za montažu
                            ili integrirani u površinu zgrade.
                        </Popover.Body>
                    </Popover>
                }
            >
                <h5>
                    IZVEDBA MREŽNO SPOJENE FN <BsQuestionCircleFill />
                    <hr />
                </h5>
            </OverlayTrigger>
            <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="pvTechnology">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id="popover-basic">
                                <Popover.Body>
                                    Učinkovitost PV modula ovisi o temperaturi i sunčevom zračenju, te varira između
                                    različitih vrsta PV modula.
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Form.Label>
                            PV tehnologija*: <BsQuestionCircleFill />
                        </Form.Label>
                    </OverlayTrigger>

                    <Form.Select name="pvTechnology" required onChange={pvTechnologyInputHandle}>
                        <option value="CS">Kristalni silicij</option>
                        <option value="CIS">Moduli tankog filma izrađeni od CIS ili CIGS</option>
                        <option value="CDTE">Moduli tankog filma izrađeni od kadmijevog telurida (CdTe)</option>
                        <option value="N">Nepoznata</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="pvArea">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id="popover-basic">
                                <Popover.Body>Ovo je površina ukupno instaliranih modula.</Popover.Body>
                            </Popover>
                        }
                    >
                        <Form.Label>
                            Površina [m<sup>2</sup>]*: <BsQuestionCircleFill />
                        </Form.Label>
                    </OverlayTrigger>

                    <Form.Control
                        type="number"
                        placeholder="1"
                        value={pvArea}
                        min={1}
                        name="pvArea"
                        onChange={pvAreaInputHandle}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pvLoss">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id="popover-basic">
                                <Popover.Body>
                                    Procijenjeni gubici u sustavu su svi gubici u sustavu, koji uzrokuju da je snaga
                                    stvarno isporučena u elektroenergetsku mrežu niža od snage koju proizvode PV moduli.
                                    Postoji nekoliko uzroka za ovaj gubitak, kao što su gubici u kabelima, pretvaračima
                                    snage, prljavština (ponekad snijeg) na modulima i tako dalje. Tijekom godina moduli
                                    također gube dio svoje snage, tako da će prosječna godišnja proizvodnja tijekom
                                    životnog vijeka sustava biti nekoliko posto niža od proizvodnje u prvim godinama.{' '}
                                    <br />
                                    <br />
                                    Dali smo zadanu vrijednost od 14% za ukupne gubitke. Ako znate da će vaša vrijednost
                                    biti drugačija (možda zbog stvarno visokoučinkovitog pretvarača), možete malo
                                    smanjiti ovu vrijednost.
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Form.Label>
                            Gubitak sustava [%]*: <BsQuestionCircleFill />
                        </Form.Label>
                    </OverlayTrigger>

                    <Form.Control
                        type="number"
                        placeholder="14"
                        value={pvLoss}
                        min={0}
                        max={100}
                        name="pvLoss"
                        onChange={pvLossInputHandle}
                        required
                    />
                </Form.Group>

                <h6 className="mb-3 mt-4">Mogućnosti fiksne montaže</h6>

                <Form.Group className="mb-3" controlId="pvMountingPosition">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id="popover-basic">
                                <Popover.Body>
                                    Za fiksne sustave (bez praćenja), način na koji su moduli montirani imat će utjecaj
                                    na temperaturu modula, što zauzvrat utječe na učinkovitost. Eksperimenti su pokazali
                                    da ako se ograniči kretanje zraka iza modula, moduli mogu postati znatno topliji (do
                                    15°C pri 1000W/m2 sunčeve svjetlosti).
                                    <br /> <br />
                                    U aplikaciji postoje dvije mogućnosti: samostojeći, što znači da su moduli montirani
                                    na stalak sa zrakom koji slobodno struji iza modula; i dodani krov / integrirani u
                                    zgradu, što znači da su moduli potpuno ugrađeni u strukturu zida ili krova zgrade, s
                                    malim ili nikakvim kretanjem zraka iza modula.
                                    <br /> <br />
                                    Neke vrste montaže su između ove dvije krajnosti, na primjer ako su moduli montirani
                                    na krov sa zakrivljenim krovnim crijepom, dopuštajući zraku da se kreće iza modula.
                                    U takvim će slučajevima izvedba biti negdje između rezultata dvaju ovdje mogućih
                                    izračuna. Za takve slučajeve, radi konzervativnosti, može se koristiti opcija
                                    dodanog krova / integrirane zgrade.
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Form.Label>
                            Montažni položaj*: <BsQuestionCircleFill />
                        </Form.Label>
                    </OverlayTrigger>

                    <Form.Select name="pvMountingPosition" onChange={pvMountingPositionInputHandle}>
                        <option value="freeStanding">Samostojeći</option>
                        <option value="roof">Montirnano na krov kuće/zgrade</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="pvSlope">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id="popover-basic">
                                <Popover.Body>
                                    <img
                                        src={require('../../../../assets/img/slope.gif')}
                                        height="150"
                                        className="d-block mx-auto"
                                        alt="Solarius"
                                    />
                                    Ovo je kut fotonaponskih modula u odnosu na vodoravnu ravninu, za fiksnu montažu
                                    (bez praćenja). <br /> <br />
                                    Za neke primjene nagib i kut orijentacije već će biti poznati, na primjer ako se PV
                                    moduli ugrađuju u postojeći krov. Međutim, ako imate mogućnost odabira nagiba i/ili
                                    azimuta (orijentacije), ova aplikacija također može za vas izračunati optimalne
                                    vrijednosti za nagib i orijentaciju (pod pretpostavkom fiksnih kutova za cijelu
                                    godinu).
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Form.Label>
                            Nagib [&deg;]*: <BsQuestionCircleFill />
                        </Form.Label>
                    </OverlayTrigger>

                    <Form.Control
                        type="number"
                        placeholder="0"
                        value={pvSlope}
                        min={0}
                        max={90}
                        name="pvSlope"
                        onChange={pvSlopeInputHandle}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pvAzimuth">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id="popover-basic">
                                <Popover.Body>
                                    <img
                                        src={require('../../../../assets/img/azimuth.gif')}
                                        height="150"
                                        className="d-block mx-auto"
                                        alt="Solarius"
                                    />
                                    Azimut ili orijentacija je kut fotonaponskih modula u odnosu na smjer prema jugu.
                                    <br /> <b>0° - sjever</b>
                                    <br /> <b>90° - zapad</b>
                                    <br /> <b>180° - jug</b>
                                    <br /> <b>270° - istok</b>
                                    <br /> <br />
                                    Za neke primjene kutovi nagiba i azimuta bit će već poznati, na primjer ako se PV
                                    moduli ugrađuju u postojeći krov. Međutim, ako imate mogućnost biranja nagiba i/ili
                                    orijentacije, ova aplikacija također može za vas izračunati optimalne vrijednosti
                                    nagiba i orijentacije (pod pretpostavkom fiksnih kutova za cijelu godinu).
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Form.Label>
                            Azimut [&deg;]*: <BsQuestionCircleFill />
                        </Form.Label>
                    </OverlayTrigger>

                    <Form.Control
                        type="number"
                        placeholder="180"
                        value={pvAzimuth}
                        min={0}
                        max={360}
                        name="pvAzimuth"
                        onChange={pvAzimuthInputHandle}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Procjeni isplativost
                </Button>
            </Form>
        </div>
    );
};

export default EstimateForm;
