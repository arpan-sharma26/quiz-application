import React, { useState } from 'react';
import { Button, FormControl, TextField, Typography, FormHelperText } from '@mui/material';
import { actions } from '../store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserInfo = (props) => {
    const userEmail = useSelector(state => state.email);
    const firstname = useSelector(state => state.firstName);
    const dispatch = useDispatch();
    const [rotate, setRotate] = useState(false);
    const finalResult = useSelector(state => state.finalResult);

    const startQuizHandler = async (event) => {
        event.preventDefault();
        setRotate(!rotate);
        // dispatch(actions.increaseCount());   
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        const name = value.firstname;
        dispatch(actions.updateName(name));
        // props.ifUserCompleted(true);
        // dispatch(actions.decrementCount());
        props.openDialog(true);
        props.userInfo(false);
        window.setTimeout(() => {
            props.ifRevealBlockOpen(true);
            props.openDialog(false);
        }, 5000);
        
        console.log(finalResult)
        const url = `http://localhost:5000/savedata`;

        axios.post(url, { data: { email: userEmail, result: finalResult } }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        });

        axios.post(`http://localhost:5000/`, {
            userEmail,
            firstname: name,
            data: finalResult,
            result: true
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const enterEmail = (event) => {
        dispatch(actions.storeEmail(event.target.value));
    }

    return (<form onSubmit={startQuizHandler}>
        <FormControl sx={{ width: '100%', justifyContent:'center' }}>
            <Typography sx={{ marginBottom: 1, color: 'gray'}} >First Name</Typography>
            <TextField required id='first-name' name="firstname" placeholder='Enter first name' />
            <br />
            <Typography sx={{ marginBottom: 1, color: 'gray'}} >Last Name</Typography>
            <TextField required id='last-name' name="lasttname" placeholder='Enter last name' />
            <br />
            <Typography sx={{ marginBottom: 1, color: 'gray' }} >Email</Typography>
            <TextField required name="email" type='email' placeholder='Enter email' onChange={enterEmail} />
            <FormHelperText id="my-helper-text">We'll never share your email, but we will send you your results.</FormHelperText>
            <br />
            <Button size="large" type='submit' variant='contained'>Submit</Button>
            <br />
        </FormControl>
    </form>);
}

export default UserInfo;