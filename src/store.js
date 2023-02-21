import { configureStore, createSlice } from '@reduxjs/toolkit';

const animationSlice = createSlice({
    name: 'animationSlice',
    initialState: {
        slideNo: 0,
        sliderValues: [
        {
            1: null,
        },
        {
            2: null,
        },
        {
            3: null,
        },
        {
            4: null,
        },
        {
            5: null,
        },
        {
            6: null,
        },
        {
            7: null,
        },
        {
            8: null,
        },
        {
            9: null,
        },
        {
            10: null,
        }
        ],
        sliderIndex: 0,
        moneyBlocks: [
            "The Lack Block",
            "The Spend Block",
            "The Worthiness Block",
            "The Intelligence and Skill Block",
            "The Hard Work Block",
            "The Stress Block",
            "The Procrastination Block",
            "The Money Guilt Block"
        ],
        dialog: true,
        totalValues : [null]
    },
    reducers: {
        increaseCount(state) {
            state.slideNo++;
        },
        decrementCount(state) {
            state.slideNo--;
        },
        updateSliderValue(state, action) {
            state.sliderValues[action.payload.slideNo][action.payload.slideIndex] = (action.payload.value);
        },
        reviewOptions(state, action){
            for(let i=0; i<10; i++){
                if(state.sliderValues[action.payload][i] === undefined || state.sliderValues[action.payload][i] === null){
                    state.sliderValues[action.payload][i] = 5;
                }
            }
        },
        averageCalculations(state){
            state.totalValues = [];
            for(let i=1; i<9; i++){
                let result = 0;
                for (let j = 0; j < 10; j++) {
                    result += state.sliderValues[i][j];
                }
                state.totalValues.push(result);
            }
        }
    }
});

export const actions = animationSlice.actions;

const store = configureStore({
    reducer: animationSlice.reducer,
});

export default store;