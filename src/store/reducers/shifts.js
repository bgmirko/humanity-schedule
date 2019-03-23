import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shifts: []
}

const saveShifts = ( state, action ) => {
    return {
        ...state,
        shifts: action.shifts
    }
};

const reducer = ( state = initialState, action) => {
    switch( action.type ){
        case actionTypes.STORE_SHIFTS: return saveShifts(state, action);
        default: return state;
    }
}

export default reducer;