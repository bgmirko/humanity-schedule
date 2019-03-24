import React, { Component } from 'react';

import positions from '../../components/Positions/Positions';

import classes from './FormInputEmployee.css';

class FormInputEmployee extends Component{

    render(props) {

        const options = positions.map(el => { return (<option value={el.name} key={el.name}>{el.name}</option>) });
        options.unshift((<option key="select" disabled hidden 
                                value={this.props.position ? this.props.position : "intro"}>
                                {this.props.position ? this.props.position : 'Job Position'}</option>));

        if(this.props.position){
            this.refs.jobPosition.value = this.props.position;
        }

        let errorMessage = "";
        if(this.props.errorMessage){
            let iterator = 0;
            errorMessage = this.props.errorMessage.map(el => <p key={iterator++}>{el}</p>)
        }

        return (
            <div className={classes.FormInputEmployee}>
                <div className={this.props.errorMessage.length > 0 ? classes.Error_Message : classes.Hidden}>{errorMessage}</div>
                <form onSubmit={(e) => this.props.onSaveEmployee(e)}>
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
                        type="url"
                        placeholder="Url of Avatar image"
                        name="avatarUrl"
                        value={this.props.avatarUrl}
                        onChange={this.props.onTextInputChange}>
                    </input>
                    <select name="jobPosition"
                        ref="jobPosition"
                        defaultValue="intro">
                        {options}
                    </select>
                    <button type="submit">Save Employee</button>
                </form>
            </div>
        )
    }

}

export default FormInputEmployee;