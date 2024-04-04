import { FaWindowClose } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EstimateResult = ({ estimateResultHandle, estimateResults, user }: any): JSX.Element => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Proizvodnja energije fotonaponskog sustava za 2022. godinu',
            },
        },
        scales: {
            y: {
                ticks: {
                    callback(val: any, index: any): string {
                        return `${val} kW/h`;
                    },
                    color: 'black',
                    maxRotation: 20,
                    minRotation: 0,
                },
            },
        },
    };

    const labels = estimateResults.energy_per_day.map((value: any) => {
        return value.date;
    });

    const data = {
        labels,
        datasets: [
            {
                label: '2022',
                data: estimateResults.energy_per_day.map((value: any) => {
                    return Math.round(value.energy);
                }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const handleClickClose = (e: any) => {
        e.preventDefault();

        estimateResultHandle();
    };

    return (
        <div className="map-result">
            <div className="result-header">
                <h4>Rezultati procjene proizvodnje energije fotonaponskog sustava</h4>
                <h3 onClick={handleClickClose} style={{ cursor: 'pointer' }}>
                    <FaWindowClose />
                </h3>
            </div>
            <div className="result-body">
                <Bar options={options} data={data} />
            </div>
            <div className="result-footer">
                {user && <></>}
                {!user && (
                    <>
                        <i>
                            Pošto niste prijavljeni u sustav, procjena je napravljena na temelju najbliže lokacije koju
                            smo pronašli u bazi podataka.
                        </i>
                        <br />
                        Udaljenost tvoje lokacije od procjenjene je: <b>{estimateResults.distance}km</b>
                        <br />
                        Ako želiš točnu procjenu, <a href="/login">prijavi se</a> ili{' '}
                        <a href="/register">kreiraj novi korisnički račun</a>.
                    </>
                )}
            </div>
        </div>
    );
};

export default EstimateResult;
