import { configureStore, createSlice } from '@reduxjs/toolkit';

const animationSlice = createSlice({
    name: 'animationSlice',
    initialState: {
        slideNo: 0,
        sliderValues: []
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
        }
    }
});

export const actions = animationSlice.actions;
const store = configureStore({
    reducer: animationSlice.reducer,
});

export default store;