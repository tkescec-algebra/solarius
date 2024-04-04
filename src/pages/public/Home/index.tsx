import Layout from '../../../components/public/Layout';

const Home = (): JSX.Element => {
    return (
        <>
            <div id="about" className="container">
                <div className="jumbotron text-center">
                    <h1>Fotonaponske elektrane</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h4>
                            Fotonaponske elektrane su postale sve popularniji izvor obnovljive energije zbog svoje
                            visoke isplativosti i pozitivnih utjecaja na okoliš. Ugradnja fotonaponskih elektrana donosi
                            brojne koristi, kako pojedincima i poduzećima, tako i društvu u cjelini.
                        </h4>
                        <br />
                        <p className="text-center">
                            <img
                                src={require('../../../assets/img/solar.jpg')}
                                className="img-fluid img-600"
                                alt="Solarius"
                            />
                        </p>
                        <br />
                        <h4>
                            Jedna od ključnih prednosti fotonaponskih elektrana je njihova dugoročna isplativost. Iako
                            može biti potreban početni kapital za instalaciju, solarni paneli imaju dug vijek trajanja i
                            minimalne operativne troškove. Nakon što se instalacija isplati, elektrana može generirati
                            besplatnu električnu energiju godinama, smanjujući ili čak eliminirajući račune za
                            električnu energiju. To može biti izuzetno korisno za kućanstva i poduzeća koja žele
                            smanjiti svoje troškove energije i postići dugoročnu financijsku stabilnost.
                        </h4>
                        <br />
                        <p className="text-center">
                            <img
                                src={require('../../../assets/img/graph.jpg')}
                                className="img-fluid img-600"
                                alt="Solarius"
                            />
                        </p>
                        <br />
                        <h4>
                            Još jedna važna korist fotonaponskih elektrana je njihov pozitivan utjecaj na okoliš.
                            Korištenjem sunčeve energije za proizvodnju električne energije, fotonaponske elektrane ne
                            emitiraju štetne plinove ili stvaraju otpadne materijale. Ovo je važno za smanjenje emisija
                            stakleničkih plinova i borbu protiv klimatskih promjena. Osim toga, fotonaponske elektrane
                            mogu smanjiti ovisnost o fosilnim gorivima, pridonoseći održivom razvoju i stvaranju
                            energetske neovisnosti.
                        </h4>
                        <br />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout(Home);
