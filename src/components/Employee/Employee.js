import React from 'react';



import classes from './Employee.css';

const Employee = (props) => {

    return (
        <div className={classes.Employee}>
            <img src={props.avatarUrl} alt="" />
            <div>
                <span>{`${props.firstName} ${props.lastName}`}</span>
                <span>{props.position}</span>
            </div>
            <div className={classes.Button_Container}>
                <button onClick={props.onEditEmployee}>Edit</button>
                <button onClick={props.onDeleteEmployee}>Delete</button>
            </div>
        </div>
    );

}

export default Employee;