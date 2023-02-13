import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import SliderForQuestions from './SliderForQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store';
import './Questions.css';

const Questions = (props) => {
    const dispatch = useDispatch();
    const slideNo = props.slideNo;
    const statement = props.statements[slideNo];
    const sliderValue = useSelector(state => state.sliderValues);

    const buttonStyle = {
        color: 'white'
    };

    const backButtonHandler = () => {
        dispatch(actions.decrementCount());
        
    };

    const nextButtonHandler = () => {
        dispatch(actions.increaseCount());
        
    };

    return (
        <>
            <Typography className='text-font' sx={{ m: 8 }} align='left' variant='h3'>{`${slideNo}.`} {props.blocks[slideNo-1]}</Typography>
            {statement.map(element => {
                return (
                    <Typography variant='h6' align='left' sx={{ marginLeft: 15, marginBottom: 2 }} className='ques'>{element}</Typography>
                )
            })}
            <SliderForQuestions slideNo={slideNo} value={sliderValue}/>
            <br/>
            <br/>
            <Grid container='true'>
                <Grid xs={6}>
                    <Button onClick={backButtonHandler} size='large' variant='contained' sx={buttonStyle}>Back</Button>
                </Grid>
                <Grid xs={6}>
                    <Button size='large' variant='outlined' onClick={nextButtonHandler}>Next Question</Button>
                </Grid>
            </Grid>

        </>
    );
}

export default Questions;
