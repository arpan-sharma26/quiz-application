import React from 'react';
import { Link,  Typography, Box, TextField, FormHelperText, FormControl, Button, Dialog, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Header.css';
import Logo from '../Images/ESK_logo.png';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

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

    const stateNo = useSelector(state => state.slideNo);
    const [email, setEmail] = useState("");
    const [sentEmail, setSentEmail] = useState(false);
    const firstname = useSelector(state => state.firstName);
    const [userBookViewModal, setUserBookViewModal] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const enterEmail = (event) => {
        setEmail(event.target.value);
    }

    const sendQuiz = (event) => {
        event.preventDefault();
        setSendingEmail(true);
        // http://ec2-15-223-72-54.ca-central-1.compute.amazonaws.com:5000/
        // http://localhost:5000/
        axios.post(`http://ec2-15-223-72-54.ca-central-1.compute.amazonaws.com:5000/`, {
            email,
            firstname
        }).then(function (response) {
            setSentEmail(true);
            setSendingEmail(false);
        }).catch(function (error) {
            console.log(error);
        });
    };

    if(sentEmail){
        setTimeout(()=>{
            setSentEmail(false);
            setUserBookViewModal(true);
        }, 2000)
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid justifyContent="center" container={true}>
                <Grid xs={12}>
                    <Box backgroundColor='primary.main'>
                        <Link className='buy-books' target="_blank" href="https://amzn.to/3JRdtWT" variant='h6' style={{ color: 'white' }}>ORDER ERIN'S BOOK HERE!</Link>
                    </Box>
                </Grid>
                <Grid xs={6} sx={{mt:4}}>
                    <Link target="_blank" href='https://www.erinskyekelly.com/'><img src={Logo} className='logo' alt="brand-logo" /></Link>
                </Grid>
            </Grid>

            {stateNo < 9 && <Typography className='font-quiz'>{stateNo === 9 ? `In a relationship?` : `What is your primary Money Block?`}</Typography>}

            {stateNo === 9 &&
                <Grid md={12} justifyContent="center">
                    <form onSubmit={sendQuiz}>
                        <FormControl>
                            <br />
                            <Grid container={true} justifyContent="center">
                                <Grid xs={12} sx={{ marginTop: 2 }}>
                                    <Typography className='font-quiz'>{stateNo === 9 ? `In a relationship?` : `What is your Money Block?`}</Typography>
                                    <br />
                                    <br />
                                    <Grid alignItems="center" container={true}>
                                        <Grid md={6} xs={6}><Typography variant="h6" sx={{ fontFamily: "'Montserrat', sans-serif !important;", fontWeight: "bold", marginBottom: "5%" }}>Send this quiz to your partner</Typography></Grid>
                                        <Grid md={6} xs={6}>
                                            <TextField sx={{ width: "95%" }} required type='email' placeholder='Enter partner’s email' onChange={enterEmail} />
                                            <FormHelperText id="my-helper-text">We’ll never share their email address.</FormHelperText>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Button className='noChange' size="large" type='submit' variant='contained'>SHARE QUIZ</Button>
                        </FormControl>
                    </form>
                </Grid>
            }


            {/* last dialog box, for the user to view the book  */}
            <Dialog fullWidth={true} maxWidth={"sm"} open={userBookViewModal} onClose={()=>{setUserBookViewModal(false)}}>
                <DialogTitle align="left"> To heal your Money Blocks, <Link style={{color:'blue'}} onClick={()=> {setUserBookViewModal(false)}} target="_blank" href="https://amzn.to/3JRdtWT">pre-order your copy of Naked Money Meetings</Link> today</DialogTitle>
                <DialogContent align="right">

                    {/* <Button variant="contained">
                        Learn more
                    </Button> */}

                </DialogContent>
            </Dialog>

            {sentEmail===true &&
                <Dialog fullWidth={true} maxWidth={"xs"} open={sentEmail}>
                    <DialogTitle align="center"> We have sent the quiz to your partner!</DialogTitle>
                </Dialog>
            }

            <Dialog fullWidth={true} maxWidth={"xs"} open={sendingEmail} >
                <DialogTitle align='center'>Sending e-mail to your partner</DialogTitle>
                <DialogContent>
                    <CircularProgress sx={{ marginLeft: "45%", color: "#FBCA1F" }} />
                </DialogContent>
            </Dialog>


        </ThemeProvider>
    );
}

export default Header;