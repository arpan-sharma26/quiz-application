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
    // const [course, setCourse] = useState(null);
    // const [freeStuff, setFreeStuff] = useState(null);

    // const [menuOpen, setMenuOpen] = useState(false);
    // const [menuFreeOpen, setFreeMenuOpen] = useState(false);

    // const closeMenuHandler = () => {
    //     setCourse(null);
    //     setMenuOpen(false);
    // }

    // const onButtonClick = (event) => {
    //     setCourse(event.currentTarget);
    //     setMenuOpen(true);
    // }

    // const onFreeButtonClick = (event) => {
    //     setFreeStuff(event.currentTarget);
    //     setFreeMenuOpen(true);
    // }

    // const closeFreeMenuHandler = () => {
    //     setFreeStuff(null);
    //     setFreeMenuOpen(false);
    // }

    return (
        <ThemeProvider theme={theme}>
            <Grid justifyContent="center" container={true}>
                <Grid xs={12}>
                    <Box backgroundColor='primary.main'>
                        <Link className='buy-books' href="https://www.erinskyekelly.com/get-the-hell-out-of-debt-book-2021" variant='h6' style={{ color: 'white' }}>ORDER ERIN'S BOOK HERE!</Link>
                    </Box>
                </Grid>
                <Grid xs={6} sx={{mt:4}}>
                    <Link href='https://www.erinskyekelly.com/'><img src={Logo} className='logo' alt="brand-logo" /></Link>
                </Grid>
            </Grid>
            <Grid container={true}>
                <Grid xs={12} sx={{ marginTop: 2 }}>
                    <Typography className='font-heading'>Ready to identify your own personal money block?</Typography>
                    <Typography className='font-heading'>through</Typography>
                    <Typography className='font-quiz'>The Ultimate List of Ice Breaker Questions</Typography>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Header;
