import React, { Component } from 'react';

import positions from '../../components/Positions/Positions';

import classes from './FormInputEmployee.css';

class FormInputEmployee extends Component{

    handleChange = (event) => {
        console.log(event.target.value);
        this.inputPosition.value = event.target.value;
    }

    render(props) {

        const options = positions.map(el => { return (<option value={el.name} key={el.name}>{el.name}</option>) });
        options.unshift((<option key="select" disabled hidden value="intro">Job Position</option>));

        // let valueOfSelected = "intro";

        return (
            <div className={classes.FormInputEmployee}>
                <form onSubmit={this.props.onSaveEmployee}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={this.props.firstName}
                        onChange={this.props.onTextInputChange}>
                    </input>
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={this.props.lastName}
                        onChange={this.props.onTextInputChange}>
                    </input>
                    <input
                        type="text"
                        placeholder="Url of Avatar image"
                        name="avatarUrl"
                        value={this.props.avatarUrl}
                        onChange={this.props.onTextInputChange}>
                    </input>
                    <select name="jobPosition"
                        onChange={(event) => this.handleChange(event)}
                        defaultValue="intro">
                        {options}
                    </select>
                    <input className={classes.Hidden} type="text" name="position" ref={node => { this.inputPosition = node }} />
                    <button type="submit">Save Employee</button>
                </form>
            </div>
        )
    }


}

export default FormInputEmployee;