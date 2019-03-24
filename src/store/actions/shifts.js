import axios from 'axios';

import * as actionTypes from './actionTypes';

export const saveShift = (data) => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = 'https://humanity-schedule.firebaseio.com/shifts.json';
        axios.post(`${proxy}${address}`, data)
            .then(res => {
                dispatch(getShifts());
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getShifts = () => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = 'https://humanity-schedule.firebaseio.com/shifts.json';
        axios.get(`${proxy}${address}`)
            .then(res => {
                const fetchShifts = [];
                for (let key in res.data) {
                    fetchShifts.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(storeShifts(fetchShifts));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const storeShifts = (shifts) => {
    return {
        type: actionTypes.STORE_SHIFTS,
        shifts: shifts
    }
}

export const editShift = (id, employees) => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = `https://humanity-schedule.firebaseio.com/shifts/${id}/employees.json`;
        axios.put(`${proxy}${address}`, employees)
            .then(res => {
                dispatch(getShifts());
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const deleteShift = (id) => {
    console.log(id);
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = `https://humanity-schedule.firebaseio.com/shifts/${id}.json`;
        axios.delete(`${proxy}${address}`)
            .then(res => {
                dispatch(getShifts());
            })
            .catch(err => {
                console.log(err);
            })
    }
}

