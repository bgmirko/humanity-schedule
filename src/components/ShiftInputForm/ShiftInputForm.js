import React from 'react';

import classes from './ShiftInputForm.css';

const ShiftInputEmployee = (props) => {

        return (
            <div className={classes.ShiftInputForm}>
                <form onSubmit={props.onSaveShift}>
                    <input
                        type="text"
                        placeholder="Shift Name"
                        name="shiftName"
                        onChange={props.onTextInputChange}>
                    </input>
                    <label>{props.dateLabel}</label>
                    <input
                        type="text"
                        placeholder="8:00am : 4:00pm"
                        name="time"
                        value="8:00am : 4:00pm"
                        onChange={props.onTextInputChange}>
                    </input>
                    <label>{`${props.employee.firstName} ${props.employee.lastName}`}</label>
                    <button type="submit">Save Shift</button>
                </form>
            </div>
        )

    }

export default ShiftInputEmployee;