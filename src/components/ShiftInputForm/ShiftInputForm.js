import React from 'react';

import classes from './ShiftInputForm.css';

const ShiftInputEmployee = (props) => {

    const employee = props.employees[0];
    let employeName = "";

    if (typeof employee !== 'undefined') {
        employeName = `${employee['firstName']} ${employee['lastName']}`
    }

    let errorMessage = "";
    if(props.errorMessage){
        let iterator = 0;
        errorMessage = props.errorMessage.map(el => <p key={iterator++}>{el}</p>)
    }

    return (
        <div className={classes.ShiftInputForm}>
            <div className={props.errorMessage.length > 0 ? classes.Error_Message : classes.Hidden}>{errorMessage}</div>
            <form onSubmit={(e) => props.submit(e)}>
                <label className={classes.Date_Label}>{props.dateLabel}</label>
                <label>Employee: <span className={classes.Employe_Name}>{employeName}</span></label>
                <input
                    type="text"
                    placeholder="Shift Name"
                    name="shiftName"
                    onChange={props.onTextInputChange}>
                </input>
                <label>Time:</label>
                <div className={classes.Time_Container}>
                    <input
                        type="text"
                        placeholder="8:00"
                        name="startTime"
                        onChange={props.onTimeInputChange}>
                    </input>
                    <select name="startTimeAmPm"
                        onChange={(event) => this.handleChange(event)}
                        defaultValue="am">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                    <input
                        type="text"
                        placeholder="4:00"
                        name="endTime"
                        onChange={props.onTimeInputChange}>
                    </input>
                    <select name="endTimeAmPm"
                        onChange={(event) => this.handleChange(event)}
                        defaultValue="pm">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </div>
                <button type="submit">Save Shift</button>
            </form>
        </div>
    )

}

export default ShiftInputEmployee;