import React from 'react';

import Shift from '../../Shift/Shift';

import classes from './Td.css';

export const Td = (props) => {

    // 2019/3/20
    const date = `${props.date.getYear() + 1900}/${props.date.getMonth() + 1}/${props.date.getDate()}`;

    return (
        <td className={classes.Td}
            onClick={() => {if(!props.shift) props.click(props.userId, date, props.dateLabel)}}>
            {
                props.shift ?
                    <Shift
                        editShift={() => props.editShift(props.shift)}
                        position={props.shift.position}
                        time={props.shift.time}
                    /> :
                    <div className={classes.Add_New}></div>
            }
        </td>
    )
}

export default Td;