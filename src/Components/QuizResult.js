import { FormControl, InputLabel, Select, MenuItem, Grid, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { actions } from '../store';
import { useSelector, useDispatch } from 'react-redux';

const QuizResult = () => {

    const dispatch = useDispatch();
    
    let disableDropdown = false;

    const moneyBlocks = useSelector(state => state.moneyBlocks);
    const [ifDialogOpen, setIfDialogOpen] = useState(true);
    const totalValues = useSelector(state => state.totalValues);

    useEffect(() => {
        dispatch(actions.averageCalculations());
    }, [dispatch]);

    const highestValue = totalValues.reduce((a, b) => { return Math.max(a, b) });

    let numberOfInstances = 0;
    let filteredMoneyBlocks = [];

    let [dropdownValue, setDropdownValue] = useState("0");
    let [spouseDropdownValue, setSpouseDropdownValue] = useState("");
    let [selfDescription, setSelfDescription] = useState("");
    let [spouseDescription, setSpouseDescription] = useState("");


    let blocksDescription = [{
        "The Procrastination Block": [
            `I am afraid of both success and failure.`,
            `I delay taking action on things that bring me more income.`,
            `This blocks the flow of wealth because we are losing out on time, which is one of the most powerful factors that allows money to compound.`,
        ],

        "The Lack Block": [
            `I never have enough.`,
            `This mentality blocks the flow of wealth to your life because you struggle with receiving.`,
        ],

        "The Spend Block": [
            `I can’t control my spending, or the minute I receive money I repel it and give it away.`,
            `This mentality blocks the flow of wealth to your life because you are consistently taking action that opposes financial accumulation.`,
        ],

        "The Worthiness Block": [
            `I’m not good enough to be wealthy.`,
            `This mentality blocks the flow of wealth because life doesn’t give us what we need; it gives us what we believe we deserve.`,
            `And if we don’t believe that we are deserving, then we won’t plant the seeds of success in our life today so that we can reap the harvest later.`,
        ],

        "The Intelligence and Skill Block": [
            `I’m not smart enough to be wealthy.`,
            `This mentality blocks the flow of wealth because you often live in the land of “When I [get a job/get a bonus/win the lottery], then I…,” meaning that, for you, money always exists only in the future.`,
        ],

        "The Hard Work Block": [
            `In order to make money, I have to work really hard.`,
            `If it comes easily, it’s not worth it.`,
            `This blocks the flow of wealth because we are trading time for money, and unless we learn how to leverage that time, we will spend our one precious life exhausted and overworked.`,
        ],

        "The Stress Block": [
            `Money is stressful.`,
            `Finances are stressful.`,
            `This blocks the flow of wealth to our lives because we believe that money circumstances are outside of our control, and we are now at the mercy of what happens to us.`,
        ],

        "The Money Guilt Block": [
            `I feel guilty when I have money and other people are struggling.`,
            `It feels greedy or unfair if I have money while other people are hurting financially.`,
            `This blocks the flow of wealth because we believe that there is a finite amount of abundance.`
        ]
    }]

    for (let i = 0; i < totalValues.length; i++) {
        if (highestValue === totalValues[i]) {
            numberOfInstances++;
            filteredMoneyBlocks.push(moneyBlocks[i]);
        }
    }

    if (numberOfInstances === 1) {
        disableDropdown = true;
    }

    const handleChange = (event) => {
        setDropdownValue(event.target.value);
        setSelfDescription(filteredMoneyBlocks[event.target.value]);
    }

    const handleSpouseChange = (event) => {
        setSpouseDropdownValue(event.target.value);
        setSpouseDescription(moneyBlocks[event.target.value]);
    }

    return (
        <Box sx={{ m: 20 }}>
            <Dialog fullWidth={true} maxWidth={"sm"} open={ifDialogOpen} onClose={() => setIfDialogOpen(false)}>
                <DialogTitle>Your Money Block: </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {filteredMoneyBlocks[dropdownValue]}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => { setIfDialogOpen(false) }}>Proceed</Button>
                </DialogActions>
            </Dialog>
            <Grid justifyContent="center" spacing={2} container={true}>
                <Grid item md={5}>
                    <FormControl fullWidth>
                        <InputLabel variant='standard'>
                            Your Money Block
                        </InputLabel>
                        <Select onChange={handleChange} disabled={disableDropdown} value={dropdownValue}>
                            {filteredMoneyBlocks.map((value, index) => {
                                let indexString = index.toString();
                                let valueString = value;
                                return <MenuItem key={index} name={valueString} value={indexString}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <Box>
                        {blocksDescription.map(element => {
                            if (selfDescription === "")
                                selfDescription = filteredMoneyBlocks[0]
                            let dataArray = element[selfDescription];
                            let dataToRender = dataArray.map((data, index) => {
                                if (index === 0)
                                    return <h4 key={index} align='left'>{data}</h4>
                                else
                                    return <p key={index} align='left' variant='h7'>{data} <br /></p>
                            });
                            return dataToRender;
                        })
                        }
                    </Box>
                </Grid>
                <Grid item md={5}>
                    <FormControl fullWidth>
                        <InputLabel variant='standard'>
                            Partner's Money Block
                        </InputLabel>
                        <Select onChange={handleSpouseChange} value={spouseDropdownValue}>
                            {moneyBlocks.map((value, index) => {
                                let indexString = index.toString();
                                return <MenuItem key={index} value={indexString}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <Box>
                        {blocksDescription.map(element => {
                            let dataArray = element[spouseDescription];
                            if(dataArray === undefined)
                                return "";
                            let dataToRender = dataArray.map((data, index) => {
                                if (index === 0)
                                    return <h4 key={index} align='left'>{data}</h4>
                                else
                                    return <p key={index} align='left' variant='h7'>{data} <br /></p>
                            });
                            return dataToRender;
                        })
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default QuizResult;
