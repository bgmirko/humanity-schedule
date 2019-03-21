import React from 'react';

import classes from './FormInputEmployee.css';

const FormInputEmployee = (props) => {

        return (
            <div className={classes.FormInputEmployee}>
                <form onSubmit={props.onSaveEmployee}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={props.firstName}
                        onChange={props.onTextInputChange}>
                    </input>
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={props.lastName}
                        onChange={props.onTextInputChange}>
                    </input>
                    <input
                        type="text"
                        placeholder="Url of Avatar image"
                        name="avatarUrl"
                        value={props.avatarUrl}
                        onChange={props.onTextInputChange}>
                    </input>
                    <input
                        type="text"
                        placeholder="Position"
                        name="position"
                        value={props.position}
                        onChange={props.onTextInputChange}>
                    </input>
                    <button type="submit">Save Employee</button>
                </form>
            </div>
        )

    }

export default FormInputEmployee;