import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SliderForQuestions from './SliderForQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store';
import './Questions.css';

const Questions = (props) => {
    const dispatch = useDispatch();
    const slideNo = props.slideNo;
    const statement = props.statements[slideNo];
    const sliderValue = useSelector(state => state.sliderValues);

    const [color, setColor] = useState("");

    let ifBackButtonDisabled = false;

    if(slideNo === 1){
        ifBackButtonDisabled = true;
    }

    const backButtonHandler = () => {
        dispatch(actions.decrementCount());
    };

    const nextButtonHandler = (slideNo) => {
        dispatch(actions.increaseCount());
        dispatch(actions.reviewOptions(slideNo));
    };

    useEffect(()=>{
        if (slideNo === 1 || slideNo === 3 || slideNo === 5 || slideNo === 7 || slideNo === 5)
            setColor("#05BDC9");
        else if (slideNo === 2 || slideNo === 6 || slideNo === 4 || slideNo === 8)
            setColor("#D54B6C");
    }, [slideNo])


    return (
        <>
        {/* {props.blocks[slideNo-1]} */}
            <Typography className='text-font' sx={{ m: 8 }} align='left' variant='h3'>{`Money Block ${slideNo}`}</Typography>
            {statement.map((element, index) => {
                return (
                    [
                        <Typography key={index} variant='h6' align='left' sx={{ marginLeft: 15, marginBottom: 2 }} style={{color: color}}>{element}</Typography>,
                        <SliderForQuestions key={index+=1} slideIndex={index} slideNo={slideNo} value={sliderValue}/>
                    ]
                )
            })}
            <br/>
            <br/>
            <Grid item sx={{mb: 10}} container={true}>
                <Grid item xs={6}>
                    <Button disabled={ifBackButtonDisabled} onClick={backButtonHandler} size='large' variant='contained'>Back</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button size='large' variant='contained' onClick={()=> nextButtonHandler(slideNo)}>{slideNo<8 ? `Next` : `Reveal your money block`}</Button>
                </Grid>
            </Grid>
            <Typography className='text-font' sx={{ m: 8 }} align='center' variant='h5'>{`${slideNo} of 8`}</Typography>
        </>
    );
}

export default Questions;
