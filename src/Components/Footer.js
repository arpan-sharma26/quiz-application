import React from 'react';
import "./Footer.css";
import { Box, Link, ThemeProvider, Typography, createTheme } from '@mui/material';
import Logo1 from '../Images/logo1.png';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import 'font-awesome/css/font-awesome.min.css';

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

const Footer = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid backgroundColor='primary.main' container='true'>
                <Grid xs={12} md={3}>
                    <Box sx={{ width: '70%', ml: 7, mt:4, mb:3 }} >
                        <Link href='https://www.erinskyekelly.com/'><img src={Logo1} className='logo' alt="brand-logo" /></Link>
                    </Box>
                </Grid>
                <Grid sx={{ mt: 5 }} xs={12} md={6}>
                    <Typography>
                        <Link style={{ color: 'white' }} href="https://www.erinskyekelly.com/about">ABOUT</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ color: 'white' }} href="https://www.erinskyekelly.com/get-the-hell-out-of-debt-book-2021">GET THE HELL OUT OF DEBT</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ color: 'white' }} href="https://www.erinskyekelly.com/learn">LEARN</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ color: 'white' }} href="https://www.erinskyekelly.com/contactus">CONTACT</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ color: 'white' }} href="https://www.erinskyekelly.com/coaching-and-consulting">ONE-ON-ONE</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ color: 'white' }} href="https://erinkellymortgages.ca/">MORTGAGES</Link>
                    </Typography>
                </Grid>
                <Grid xs={12} md={3} sx={{mt:5, mb:3}}>
                        <a href="https://twitter.com/erinskyekelly">
                            <i className="fab fa-facebook colorChange"></i>
                        </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://twitter.com/erinskyekelly">
                            <i className="fab fa-twitter colorChange"></i>
                        </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://www.instagram.com/getthehelloutofdebt/">
                            <i className="fab fa-instagram colorChange"></i>
                        </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://www.tiktok.com/@erinskyekelly">
                            <i className="fab fa-tiktok colorChange"></i>
                        </a>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Footer;
