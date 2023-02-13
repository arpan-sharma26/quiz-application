import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Button, FormControl, TextField, ThemeProvider, Typography, createTheme, Card, CardActionArea, CardMedia, CardContent, CardActions, FormHelperText } from '@mui/material';
import erinImage from '../Images/erinImage.jpg';
import resource from '../Images/resource.png';
import './User-Details.css';
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import Questions from './Questions';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFEC01'
        },
        secondary: {
            main: '#FFEC01'
        }
    }
});

const UserDetails = () => {
    const dispatch = useDispatch();
    const slideNo = useSelector(state => state.slideNo);
    const [rotate, setRotate] = useState(false);

    const moneyBlocks = [
        "The Lack Block",
        "The Spend Block",
        "The Worthiness Block",
        "The Intelligence and Skill Block",
        "The Hard Work Block",
        "The Stress Block",
        "The Procrastination Block",
        "The Money Guilt Block"
    ]

    const statements = {
        1: [
            `I fear I will run out of money; I still spend all of it`,
            `I am used to having very little money and have been described as “cheap”`,
            `I compare myself to others irrespective of who has more financial resources`,
            `I am often afraid of change and feel financially helpless`,
            `I often wonder how other people seem to have so much because I just don’t get it`
        ],
        2: [`I can’t control my spending easily`,
            `Money doesn’t stay in my bank account for very long`,
            `I often feel the urge to cash out my investments to pay off debt or buy things`,
            `I make good money, but I am still living paycheck to paycheck`,
            `I spend money to look as though I have money or status`
        ],
        3: [`I’m not good enough to be wealthy`,
            `I treat other people better than I treat myself`,
            `People like me never succeed financially`,
            `I struggle to say no`,
            `I haven’t done enough to deserve financial freedom`
        ],
        4: [`I’m not smart enough to be wealthy`,
            `I often think that when I hit my financial goals my life will be easier`,
            `I secretly feel resentful of wealthy people`,
            `I would be embarrassed if other people knew my financial situation`,
            `I fear looking foolish around people`
        ],
        5: [`To make money I must work really hard`,
            `If it comes easy it’s not worth it`,
            `When I need more money, I must work more hours`,
            `I judge people who appear to be rich and lazy`,
            `I feel constantly distracted by work, even when I’m not working`
        ],
        6: [`Money is stressful`,
            `Dealing with finances overwhelms me`,
            `I can lose sleep over my finances`,
            `Thinking about money takes up a huge part of the real estate in my brain`,
            `I find it hard to dream about things if I don’t have the money`
        ],
        7: [`I am afraid of financial success`,
            `I am afraid of financial failure`,
            `I delay taking action on things that would bring me more income`,
            `I avoid hard or important conversations about money`,
            `I can feel paralyzed by indecision`
        ],
        8: [`I feel guilty when I have money and other people are struggling`,
            `It feels greedy or unfair if I have money while other people are hurting financially`,
            `I didn’t earn money the way I had anticipated, so I feel bad having it`,
            `I can worry about things that aren’t in my control`,
            `I often find that I’m trying to “pour from an empty cup,” or give what I don’t have`
        ],
    }

    const startQuizHandler = () => {
        setRotate(!rotate);
        dispatch(actions.increaseCount());
    }

    if(slideNo === 0){
        dispatch(actions.resetValues());
    }

    return (
        <ThemeProvider theme={theme}>
            {(slideNo < 1 || slideNo > 8) && <motion.div initial={{ opacity: 1 }} animate={{ opacity: (slideNo !== 0 && rotate === true) ? 0 : 1, x: (slideNo !== 0 && rotate === true) ? -300 : 0 }}>
                <Grid sx={{ marginTop: 4 }} container='true'>
                    <Grid xs={12} md={4}>
                        <img width={'100%'} height={'100%'} src={erinImage} alt='erin'></img>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <form onSubmit={startQuizHandler}>
                            <FormControl sx={{ m: 10, width: '60%' }}>
                                <Typography sx={{ marginBottom: 1, color: 'gray' }} align='left'>First Name</Typography>
                                <TextField required id='first-name' placeholder='Enter first name' />
                                <br />
                                <Typography sx={{ marginBottom: 1, color: 'gray' }} align='left'>Last Name</Typography>
                                <TextField required id='last-name' placeholder='Enter last name' />
                                <br />
                                <Typography sx={{ marginBottom: 1, color: 'gray' }} align='left'>E-mail</Typography>
                                <TextField required id='e-mail' type='email' placeholder='Enter e-mail' />
                                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                                <br />
                                <br />
                                <Button size="large" type='submit' variant='contained'>START QUIZ</Button>
                                <br />
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <Card sx={{ m: 12, maxWidth: '70%' }}>
                            <CardActionArea>
                                <CardMedia component='img' height={'100%'} image={resource} />
                                <CardContent>
                                    <Typography sx={{ fontSize: 22 }}>Get financially organized.</Typography>
                                </CardContent>
                                <CardActions>
                                    <Box sx={{ width: '100%' }}>
                                        <Button href='https://www.erinskyekelly.com/learn' size="large" style={{ marginBottom: 20 }} variant='contained' >Start Here!</Button>
                                    </Box>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </motion.div>}
            {(slideNo >= 1 && slideNo < 9) && <motion.div initial={{ opacity: 0 }} exit={{ opacity: 1 }} animate={{ opacity: (slideNo <= 0 && rotate === true) ? 0 : 1, x: (slideNo < 1 && rotate === true) ? -300 : 0 }}>
                <Grid sx={{ marginTop: 4 }} container='true'>
                    <Grid xs={12} md={8}>
                        <Questions blocks={moneyBlocks} slideNo={slideNo} statements={statements} />
                    </Grid>
                    <Grid xs={12} md={4}>
                        <Card sx={{ m: 12, maxWidth: '70%' }}>
                            <CardActionArea>
                                <CardMedia component='img' height={'100%'} image={resource} />
                                <CardContent>
                                    <Typography sx={{ fontSize: 22 }}>Get financially organized.</Typography>
                                </CardContent>
                                <CardActions>
                                    <Box sx={{ width: '100%' }}>
                                        <Button href='https://www.erinskyekelly.com/learn' size="large" style={{ marginBottom: 20 }} variant='contained' >Start Here!</Button>
                                    </Box>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </motion.div>}
            {slideNo}
        </ThemeProvider>
    );
}

export default UserDetails;
