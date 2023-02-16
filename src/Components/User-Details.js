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
import QuizResult from './QuizResult';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FBCA1F'
        },
        secondary: {
            main: '#FBCA1F'
        }
    }
});

const UserDetails = () => {
    const dispatch = useDispatch();
    const slideNo = useSelector(state => state.slideNo);
    const [rotate, setRotate] = useState(false);

    const moneyBlocks = useSelector(state => state.moneyBlocks);

    const statements = {
        1: [
            `I am scared that I am going to run out of money`,
            `I don’t like to be around people who are “bigger thinkers” than I am`,
            `I tend to feel resentful of other people’s success`,
            `I tend to focus on what is not working financially`,
            `I am often afraid of change`,
            `I often wonder how other people seem to have so much because I just don’t get it`,
            `I often feel that “positive thinking” is a waste of time and not for me`,
            `It is easy for me to focus on what I don’t have`,
            `I am used to having very little money`,
            `When I do have more money than I’m used to having, I usually feel stressed about it`
        ],
        2: [
            `I can’t control my spending easily`,
            `Money doesn’t stay in my bank account for very long`,
            `I often feel the urge to cash out my investments to pay off debt or buy things`,
            `I spend money to look as though I have money or status`,
            `Even if I go into a store to purchase one thing, I will leave with more`,
            `I can look through my bank statements and still be unsure of what I spent money on`, 
            `I spend money to meet an emotional need`,
            `When money comes into my life, I instantly think of things to spend it on`, 
            `I have a hard time saying no to myself`,
            `I will spend recklessly but then underestimate what I’ve done, and I’m surprised when I add it up`
        ],
        3: [
            `I’m not good enough to be wealthy`, 
            `I treat other people better than I treat myself`, 
            `People like me never succeed financially`, 
            `I put a lot of pressure on myself to do things perfectly`, 
            `I struggle to ask for help`, 
            `I struggle to keep promises I’ve made to myself`, 
            `There are people in my life who often criticize me`, 
            `I buy from discount shops and rarely treat myself to luxury items`, 
            `I often have feelings of inferiority`, 
            `I can be a people pleaser`,
            `I often look for external validation` 
        ],
        4: [
            `I’m not smart enough to be wealthy`,
            `I fear looking foolish around people`, 
            `I secretly feel resentful of wealthy people`, 
            `I would be embarrassed if other people knew my financial situation`, 
            `I avoid situations where money or finances will be discussed`, 
            `I’m often looking in the rear-view-mirror at my life and wishing I’d started learning earlier`, 
            `I start reading money books, but I rarely finish them`, 
            `It would be easier if someone just took over my finances for me or told me what to do`, 
            `I won’t ask questions of wealthy people because I don’t want to look dumb`, 
            `I have exaggerated my financial circumstances before, so that I look smarter to people` 
        ],
        5: [
            `To make money I must work really hard`, 
            `If it comes easy it’s not worth it`, 
            `When I need more money, I must work more hours`, 
            `I feel constantly distracted by work, even when I’m not working`, 
            `I am scared to slow down in case money dries up`, 
            `I may be using work to avoid other areas of my life (including finances)`, 
            `If money comes into my life easily, I assume there must be a catch`, 
            `I will often overcomplicate things`, 
            `It feels like I have worked hard all my life and I don’t have much to show for it`, 
            `When I work more hours to make more money it seems like my expenses go up too` 
        ],
        6: [
            `Money is stressful`, 
            `Dealing with finances overwhelms me`, 
            `I can lose sleep over my finances`, 
            `I find it hard to dream about things if I don’t have the money`, 
            `I constantly think about money or the lack thereof`, 
            `I am unclear on how I will retire`, 
            `I feel financially disorganized`, 
            `I have created financial chaos by missing payments, hitting overdraft, or making little mistakes that have bigger consequences`, 
            `I avoid conversations about finances because they stress me out`, 
            `I often feel caught between the feeling of losing control and the need to take control` 
        ],
        7: [
            `I delay taking action on things that would bring me more income`, 
            `I avoid hard or important conversations about money`, 
            `I can feel paralyzed by indecision`, 
            `I am continually saying, “I’ll do it tomorrow”`, 
            `I will often file my taxes or hand in forms just under a deadline or late`, 
            `I often find excuses for not dealing with my finances`, 
            `I will needlessly delay doing things even if they are important to me`, 
            `I can sometimes overcommit or overbook myself and set myself up to fail`, 
            `I often feel as though I am in “financial crisis”`, 
            `I underestimate how long things will take` 
        ],
        8: [
            `I feel guilty when I have money and other people are struggling`, 
            `I didn’t earn money the way I had anticipated, so I feel bad having it`, 
            `I can worry about things that aren’t in my control`, 
            `I often find that I’m trying to “pour from an empty cup,” or give what I don’t have`, 
            `I often spend time thinking about what life would be like if my circumstances were different`, 
            `I will make decisions today based on things that happened in my childhood, sometimes unconsciously`, 
            `I am comfortable feeling negative about money`, 
            `I will give money to other people, charities, or causes before I spend on myself`, 
            `I can feel upset that other people don’t care as much about the world as I do`, 
            `I am uncomfortable when people I know talk about their possessions` 
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
            {(slideNo < 1) && <motion.div initial={{ opacity: 1 }} animate={{ opacity: (slideNo !== 0 && rotate === true) ? 0 : 1, x: (slideNo !== 0 && rotate === true) ? -300 : 0 }}>
                <Grid sx={{ marginTop: 4 }} container={true}>
                    <Grid item xs={12} md={4}>
                        <img width={'100%'} height={'100%'} src={erinImage} alt='erin'></img>
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
            {(slideNo >= 1 && slideNo <= 8) && <motion.div initial={{ opacity: 0 }} exit={{ opacity: 1 }} animate={{ opacity: (slideNo <= 0 && rotate === true) ? 0 : 1, x: (slideNo < 1 && rotate === true) ? -300 : 0 }}>
                <Grid item sx={{ marginTop: 4 }} container={true}>
                    <Grid item xs={12} md={8}>
                        <Questions blocks={moneyBlocks} slideNo={slideNo} statements={statements} />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
            {(slideNo === 9 ) && <motion.div initial={{ opacity: 0 }} exit={{ opacity: 1 }} animate={{ opacity: (slideNo <= 0 && rotate === true) ? 0 : 1, x: (slideNo < 1 && rotate === true) ? -300 : 0 }}>
                <Grid container={true}>
                    <Grid item xs={12} md={8}>
                        <QuizResult />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
        </ThemeProvider>
    );
}

export default UserDetails;
