import * as actionTypes from '../actions/actionTypes';
import { setEmployees } from '../actions';

const initialState = {
    employees: []
}

const saveEmployees = ( state, action ) => {
    return {
        ...state,
        employees: action.employees
    }
};

const reducer = ( state = initialState, action) => {
    switch( action.type ){
        case actionTypes.SET_EMPLOYEES: return saveEmployees(state, action);
        default: return state;
    }
}

export default reducer;