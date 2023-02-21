import React, {useEffect, useState} from 'react';
import { Slider, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store';

const SliderForQuestions = (props) => {
    const slideNo = props.slideNo;
    const slideIndex = props.slideIndex;
    const dispatch = useDispatch();
    const sliderValue = useSelector(state => state.sliderValues);
    const [assignValue, setAssignValue] = useState(0);

    const changeSliderValue = (event, value) => {
        dispatch(actions.updateSliderValue({slideNo, value, slideIndex}));
    };
    
    useEffect(() => {
            // eslint-disable-next-line no-unused-expressions
            setAssignValue(sliderValue[slideNo][slideIndex] || 5);
        
      }, [dispatch, slideNo, sliderValue, slideIndex]);

    const customValues = [
        {
            value: 1,
            label: 'nope, not me.',
        },
        {
            value: 2,
            label: '',
        },
        {
            value: 3,
            label: '',
        },
        {
            value: 4,
            label: '',
        },
        {
            value: 5,
            label: '',
        },
        {
            value: 6,
            label: '',
        },
        {
            value: 7,
            label: '',
        },
        {
            value: 8,
            label: '',
        },
        {
            value: 9,
            label: '',
        },
        {
            value: 10,
            label: 'yes, I identify with this.',
        },
    ];


    return (
        <Box>
        <Slider sx={{ width: '35%', marginBottom: 4 }}
            step={1}
            min={1}
            valueLabelDisplay='auto'
            max={10}
            marks = {customValues}
            value={assignValue}
            onChange={changeSliderValue}
        />
        </Box>
    );
}

export default SliderForQuestions;