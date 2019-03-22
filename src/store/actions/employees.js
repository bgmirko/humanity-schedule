import axios from 'axios';

import * as actionTypes from './actionTypes';

export const addEmployee = (data) => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = 'https://humanity-schedule.firebaseio.com/employees.json';
        axios({
            url: `${proxy}${address}`,
            method: 'post',
            data: data
        })
            .then(result => {
                console.log(result);
                dispatch(getEmployees());
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getEmployees = () => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = 'https://humanity-schedule.firebaseio.com/employees.json';
        axios.get(`${proxy}${address}`)
            .then(response => {
                const fetchEmployees = [];
                for (let key in response.data) {
                    fetchEmployees.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(setEmployees(fetchEmployees))
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const setEmployees = (employees) => {
    return {
        type: actionTypes.SET_EMPLOYEES,
        employees: employees
    }
};

export const deleteEmployee = (id) => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = `https://humanity-schedule.firebaseio.com/employees/${id}.json`;
        axios.delete(`${proxy}${address}`)
        .then(res => {
            dispatch(getEmployees());
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const editEmployee = (id, data) => {
    return dispatch => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const address = `https://humanity-schedule.firebaseio.com/employees/${id}.json`;
        axios.put(`${proxy}${address}`, data)
        .then(res => {
            dispatch(getEmployees());
        })
        .catch(error => {
            console.log(error);
        })
    }
}


