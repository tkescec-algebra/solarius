import './index.scss';

const CalculateLoader = ({ message }: any): JSX.Element => {
    return (
        <div className="loader-container">
            <h5>{message}</h5>
            <div className="lds-hourglass"></div>
        </div>
    );
};

export default CalculateLoader;
