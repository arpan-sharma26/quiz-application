import React from 'react';
import { Link,  Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Header.css';
import Logo from '../Images/ESK_logo.png';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const theme = createTheme({
    palette: {
        primary: {
            main: '#05BDC9'
        },
        secondary: {
            main: '#FFE824'
        }
    }
});

const Header = () => {

    return (
        <ThemeProvider theme={theme}>
            <Grid justifyContent="center" container={true}>
                <Grid xs={12}>
                    <Box backgroundColor='primary.main'>
                        <Link className='buy-books' href="https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1" variant='h6' style={{ color: 'white' }}>ORDER ERIN'S BOOK HERE!</Link>
                    </Box>
                </Grid>
                <Grid xs={6} sx={{mt:4}}>
                    <Link href='https://www.erinskyekelly.com/'><img src={Logo} className='logo' alt="brand-logo" /></Link>
                </Grid>
            </Grid>
            <Grid container={true}>
                <Grid xs={12} sx={{ marginTop: 2 }}>
                    {/* <Typography className='font-heading'>What is your Money Block?</Typography>
                    <Typography className='font-heading'>through</Typography> */}
                    <Typography className='font-quiz'>What is your Money Block?</Typography>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Header;
