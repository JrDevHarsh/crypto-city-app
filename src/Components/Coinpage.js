import { LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "./CoinInfo";

function Coinpage() {

    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
            const data = await response.json();
            setCoin(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />;

    return (
        <Containerstyle>
            <Sidebarstyle>
                <img src={coin?.image.large} alt={coin.name} style={{ height: '200px' }} />
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    fontFamily="Montserrat"
                    style={{ textAlign: "center" }}
                >
                    {coin.name}
                </Typography>
                <div
                    style={
                        {
                            width: '100%',
                            padding: '25px',
                            textAlign: 'justify',
                            lineHeight: '1.5'
                        }
                    }
                    dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] }}
                ></div>
                <div>
                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5'>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5'>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5'>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5'>
                            {symbol}
                            {numberWithCommas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5'>
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5'>
                            {symbol}
                            {numberWithCommas(
                                coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)
                            )}M
                        </Typography>
                    </span>
                </div>
            </Sidebarstyle>
            <CoinInfo coin={coin} />
        </Containerstyle>
    );
}

const Containerstyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 2rem;
    @media (min-width: 768px){
        flex-direction: row;
    }
`;

const Sidebarstyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    @media (min-width: 768px){
        width: 30%;
        border-right: 2px solid gray;
    }
`;

export default Coinpage;
