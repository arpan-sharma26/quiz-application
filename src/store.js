import { configureStore, createSlice } from '@reduxjs/toolkit';

const animationSlice = createSlice({
    name: 'animationSlice',
    initialState: {
        slideNo: 0,
        sliderValues: [],
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
        dialog: true
    },
    reducers: {
        increaseCount(state) {
            state.slideNo++;
        },
        decrementCount(state) {
            state.slideNo--;
        },
        updateSliderValue(state, action) {
            state.sliderValues[action.payload.slideNo] = (action.payload.value);
        },
        resetValues(state){
            state.sliderValues = [];
        },
        dialogTrigger(state){
            state.dialog = false
        }
    }
});

export const actions = animationSlice.actions;

const store = configureStore({
    reducer: animationSlice.reducer,
});

export default store;