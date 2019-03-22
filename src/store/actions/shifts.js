import axios from 'axios';

import * as actionTypes from './actionTypes';

export const saveShift = (data) => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = 'https://humanity-schedule.firebaseio.com/shift.json';
        axios.post(`${proxy}${address}`, data)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getShifts = () => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = 'https://humanity-schedule.firebaseio.com/shift.json';
        axios.get(`${proxy}${address}`)
        .then(res => {
            dispatch(saveShifts(res.data));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const saveShifts = (shifts) => {
    return{
        type: actionTypes.SAVE_SHIFTS,
        shifts: shifts
    }
}



