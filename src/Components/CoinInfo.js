import { CircularProgress, Container } from "@mui/material";
// import { createTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import SelectButton from "./SelectButton";

function CoinInfo({ coin }) {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();

    const chartDays = [
        {
            label: "24 Hours",
            value: 1,
        },
        {
            label: "30 Days",
            value: 30,
        },
        {
            label: "3 Months",
            value: 90,
        },
        {
            label: "1 Year",
            value: 365,
        },
    ];

    const fetchData = async () => {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
        const data = await res.json();
        setHistoricalData(data.prices);
    }

    useEffect(() => {
        fetchData();
    }, [currency, days]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    return (
        <Chartstyle>
            {
                !historicalData ? (
                    <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
                ) : (
                    <>
                        <Line data={{
                            labels: historicalData.map(coin => {
                                let date = new Date(coin[0]);
                                let time = date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`
                                return days === 1 ? time : date.toLocaleDateString();
                            }),
                            datasets: [
                                {
                                    data: historicalData.map(coin => coin[1]),
                                    label: `Price ( Past ${days} Days ) in ${currency}`,
                                    borderColor: '#eebc1d'
                                }
                            ]
                        }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    }
                                }
                            }}
                        />
                        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-around', width: '100%' }}>
                            {
                                chartDays.map(day => (
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => setDays(day.value)}
                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </Chartstyle>
    );
}

const Chartstyle = styled.div`
    width: 100%;
    margin-top: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: 768px){
        width: 65%;
        padding: 40px;
        margin-top: 0;
    }
`;

export default CoinInfo;
