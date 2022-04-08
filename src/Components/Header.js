import { Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

function Header() {

    const { currency, setCurrency } = CryptoState();
    const history = useNavigate();

    return (
        <Container maxWidth="lg"
            style={
                {
                    padding: '2rem 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }
            }
        >
            <Typography variant="h3" onClick={() => history('/')} style={{ cursor: 'pointer' }}>
                Crypto City
            </Typography>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={e => setCurrency(e.target.value)}
                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}

export default Header;