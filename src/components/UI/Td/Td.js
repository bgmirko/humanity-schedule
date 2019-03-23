import React from 'react';

import Shift from '../../Shift/Shift';

import classes from './Td.css';

export const Td = (props) => {

    console.log(props);

    // 2019/3/20
    const date = `${props.date.getYear() + 1900}/${props.date.getMonth() + 1}/${props.date.getDate()}`;

    let employee = "";
    
    if (props.shift && props.employeeId) {
        employee = props.shift.employees.find(el => el.id === props.employeeId);
    }

    return (
        <td className={classes.Td}
            onClick={() => { if (!props.shift) props.click(props.userId, date, props.dateLabel) }}>
            {
                props.shift ?
                    <Shift
                        editShift={() => props.editShift(props.shift)}
                        position={employee.position}
                        time={props.shift.time}
                    /> :
                    <div className={classes.Add_New}></div>
            }
        </td>
    )
}

export default Td;