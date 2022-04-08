import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import CryptoContext from './CryptoContext';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    <CryptoContext>
        <App />
    </CryptoContext>
);