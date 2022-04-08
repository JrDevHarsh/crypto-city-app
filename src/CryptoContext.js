import React, { createContext, useState, useContext, useEffect } from "react";

const Crypto = createContext();

function CryptoContext({ children }) {

    const [currency, setCurrency] = useState('USD');
    const [symbol, setSymbol] = useState('₹');

    useEffect(() => {
        if (currency === 'USD') setSymbol('$');
        if (currency === 'INR') setSymbol('₹');
    }, [currency]);

    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency }}>
            {children}
        </Crypto.Provider>
    );
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}
