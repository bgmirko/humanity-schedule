import * as actionTypes from './actionTypes';

export const storeDates = (daysInWeek, disableBackwardButton) => {
    return{
        type: actionTypes.STORE_DATES,
        daysInWeek: daysInWeek,
        disableBackwardButton: disableBackwardButton
    }
}
