import React from 'react';

import positions from '../Positions/Positions';
import classes from './Shift.css';


const Shift = (props) => {

    const { color } = positions.find(jobPosition => {
        return jobPosition.name === props.position
    });

    return (
        <div className={classes.Shift} style={{backgroundColor: color}}
            onClick={props.editShift}>
            <label>{props.position}</label>
            <label className={classes.TimeLabel}>{props.time}</label>
        </div>
    );
}

export default Shift;