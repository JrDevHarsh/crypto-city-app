import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";

function CoinsTable() {

  const { currency, symbol } = CryptoState();
  const history = useNavigate();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
      const realData = await data.json();
      setCoins(realData);
      setLoading(false);
    } catch (err) {
      console.log(err)
    }
  }

  const handleSearch = () => {
    return coins.filter(coin => (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ))
  }

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <div>
      <Container>
        <TextField
          id="outlined-search"
          style={{ width: '100%' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
          label="Search for crypto"
          type="search"
        />
        <TableContainer>
          {
            loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
            ) : (
              <>
                <Table>
                  <TableHead style={{ backgroundColor: '#eebc1d' }}>
                    <TableRow>
                      {
                        [
                          'Coin',
                          'Price',
                          '24h Change',
                          'Market Cap'
                        ].map(head => (
                          <TableCell
                            style={{
                              color: '#000',
                              fontWeight: '700',
                              fontFamily: 'Montserrat'
                            }}
                            key={head}
                            align="center"
                          >
                            {head}
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          key={row.id}
                          onClick={
                            () => history('/coins/' + row.id)
                          }
                        >
                          <TableCell component="th" scope="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={row?.image} alt={row.name} height="50" />
                            <span style={{ textTransform: 'uppercase', fontSize: '22' }}>{row.symbol}</span>
                            <span style={{ color: 'darkgray' }}>{row.name}</span>
                          </TableCell>
                          <TableCell align="right">
                            {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                              fontWeight: 500
                            }}
                          >
                            {profit && '+'}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right" >
                            {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </>
            )
          }
        </TableContainer>
        <Pagination
          style={{ padding: 20, width: '100%', display: 'flex', justifyContent: 'center' }}
          count={parseInt(handleSearch()?.length / 10)}
          onChange={
            (_, value) => {
              setPage(value);
              window.scroll(0, 0);
            }
          }
        />
      </Container>
    </div>
  );
}

export default CoinsTable;
