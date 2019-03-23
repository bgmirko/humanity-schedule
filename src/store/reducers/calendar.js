import * as actionTypes from '../actions/actionTypes';

const initialState = {
    daysInWeek: [],
    disableBackwardButton: true
}

const storeDates = ( state, action ) => {
    return {
        ...state,
        daysInWeek: action.daysInWeek,
        disableBackwardButton: action.disableBackwardButton
    }
};

const reducer = ( state = initialState, action) => {
    switch( action.type ){
        case actionTypes.STORE_DATES: return storeDates(state, action);
        default: return state;
    }
}

export default reducer;