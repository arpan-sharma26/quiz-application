import React, { useState } from 'react';
import { Link, Menu, MenuItem, Button, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Header.css';
import Logo from '../Images/ESK_logo.png';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const theme = createTheme({
    palette: {
        primary: {
            main: '#05BDC9'
        },
        secondary:{
            main: '#FFE824'
        }
    }
});

const Header = () => {
    const [course, setCourse] = useState(null);
    const [freeStuff, setFreeStuff] = useState(null);
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuFreeOpen, setFreeMenuOpen] = useState(false);

    const closeMenuHandler = () => {
        setCourse(null);
        setMenuOpen(false);
    }

    const onButtonClick = (event) => {
        setCourse(event.currentTarget);
        setMenuOpen(true);
    }

    const onFreeButtonClick = (event) => {
        setFreeStuff(event.currentTarget);
        setFreeMenuOpen(true);
    }

    const closeFreeMenuHandler = () => {
        setFreeStuff(null);
        setFreeMenuOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container='true'>
                <Grid xs={12}>
                    <Box backgroundColor='primary.main'>
                        <Link className='buy-books' href="https://www.erinskyekelly.com/get-the-hell-out-of-debt-book-2021" variant='h6' style={{ color: 'white' }}>ORDER ERIN'S BOOK HERE!</Link>
                    </Box>
                </Grid>
            </Grid>
            <Grid sx={{ marginTop: '60px' }} container='true'>
                <Grid xs={12} md={4}>
                    <Button className='makePointer' sx={{ m: 6, maxWidth: 270}} size='large' variant="contained" color='secondary' onClick={onButtonClick}>PRODUCTS AND COURSES</Button>
                    <Menu sx={{ maxWidth: 300 }} anchorEl={course} open={menuOpen} onClose={closeMenuHandler}>
                        <MenuItem onClick={closeMenuHandler}><Link style={{ width: '100%' }} className='removeDecoration' href='https://www.erinskyekelly.com/get-the-hell-out-of-debt-course' value={'fullCourse-getTheHellOutOfDebt'}>Get the Hell Out of Debt - FULL <br/> COURSE</Link></MenuItem>
                        <MenuItem onClick={closeMenuHandler}><Link style={{ width: '100%' }} className='removeDecoration' href='https://www.erinskyekelly.com/get-the-hell-out-of-debt-book-2021' value={'onlyBook-getTheHellOutOfDebt'}>Get the Hell Out of Debt - <br/> THE BOOK</Link></MenuItem>
                        <MenuItem onClick={closeMenuHandler}><Link style={{ width: '100%' }} className='removeDecoration' href='https://www.erinskyekelly.com/how-to-teach-your-kids-about-money-course' value={'fullCourse-teachKidsAboutMoney'}>How to Teach Your Kids About <br/> Money - FULL COURSE</Link></MenuItem>
                    </Menu>
                </Grid>
                <Grid xs={12} md={4}>
                    <Link href='https://www.erinskyekelly.com/'><img src={Logo} className='logo' alt="brand-logo" /></Link>
                </Grid>
                <Grid xs={12} md={4}>
                    <Button aria-haspopup="true" className='makePointer' size='large' sx={{ m: 6, maxWidth: 250}} variant="contained" color='secondary' onClick={onFreeButtonClick}>FREE STUFF</Button>
                    <Menu sx={{ maxWidth: 300 }} anchorEl={freeStuff} open={menuFreeOpen} onClose={closeFreeMenuHandler}>
                        <MenuItem onClick={closeFreeMenuHandler}><Link style={{ width: '100%' }} className='removeDecoration' href='https://www.erinskyekelly.com/learn' value={'fullCourse-getTheHellOutOfDebt'}>FREE RESOURCES</Link></MenuItem>
                        <MenuItem onClick={closeFreeMenuHandler}><Link style={{ width: '100%' }} className='removeDecoration' href='https://www.erinskyekelly.com/podcast' value={'onlyBook-getTheHellOutOfDebt'}>PODCAST</Link></MenuItem>
                    </Menu>
                </Grid>
            </Grid>

            <Grid container='true'>
                <Grid xs={12} sx={{marginTop: 5}}>
                    <Typography className='font-heading'>Ready to identify your own personal money block?</Typography>
                    <Typography className='font-heading'>through</Typography>
                    <Typography className='font-quiz'>The Ultimate List of Ice Breaker Questions</Typography>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Header;
