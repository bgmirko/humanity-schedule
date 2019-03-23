import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import classes from './EditShift.css';

class EditShift extends Component {

    state = {
        sheduledEmployees: [],
        unsheduledEmployees: [],
        openForData: true,

    }

    componentDidUpdate() {
        if (this.props.dialogIsOpen && this.state.openForData) {
            let sheduledEmployees = [];
            let unsheduledEmployees = [];

            if (this.props.shift.employees.length > 0) {
                for (let i = 0; i < this.props.employees.length; i++) {
                    const id = (this.props.employees[i]['id']);
                    if (this.props.shift.employees.find(empl => empl['id'] === id)) {
                        sheduledEmployees.push(this.props.employees[i]);
                    } else {
                        unsheduledEmployees.push(this.props.employees[i]);
                    }
                }
                this.setState({ sheduledEmployees: sheduledEmployees, unsheduledEmployees: unsheduledEmployees, openForData: false })
            }
        }
    }

    sheduleEmployee = (id) => {
        const unsheduledEmployees = this.state.unsheduledEmployees;
        const sheduledEmployees = this.state.sheduledEmployees;
        for (let key in unsheduledEmployees) {
            if (unsheduledEmployees[key].id === id) {
                let employee = JSON.parse(JSON.stringify(unsheduledEmployees[key]));
                sheduledEmployees.push(employee);
                unsheduledEmployees.splice(key, 1);         
            }
        }
        this.setState({ unsheduledEmployees: unsheduledEmployees, sheduledEmployees: sheduledEmployees });
    }

    unSheduleEmployee = (id) => {
        const unsheduledEmployees = this.state.unsheduledEmployees;
        const sheduledEmployees = this.state.sheduledEmployees;
        for (let key in sheduledEmployees) {
            if (sheduledEmployees[key].id === id) {
                let employee = JSON.parse(JSON.stringify(sheduledEmployees[key]));
                unsheduledEmployees.push(employee);
                sheduledEmployees.splice(key, 1);
            }
        }
        this.setState({ unsheduledEmployees: unsheduledEmployees, sheduledEmployees: sheduledEmployees });
    }

    saveShiftChanges = () => {
        this.props.onEditShift(this.props.shift.id, this.state.sheduledEmployees);
        this.props.closeDialog();
        this.setState({ openForData: true });
    }

    render() {

        console.log(this.props);

        let sheduled = this.state.sheduledEmployees.map(el => {
            return (
                <li key={el['id']}>
                    <input type="checkbox"
                        checked
                        name={el['id']}
                        value={el['id']}
                        onChange={() => this.unSheduleEmployee(el.id)} />
                    {`${el['firstName']} ${el['lastName']}`}
                </li>)
        });
        let notSheduled = this.state.unsheduledEmployees.map(el => {
            return (
                <li key={el['id']}>
                    <input type="checkbox"
                        name={el['id']}
                        value={el['id']}
                        onChange={() => this.sheduleEmployee(el.id)} />
                    {`${el['firstName']} ${el['lastName']}`}
                </li>
            )
        });

        return (
            <div className={classes.EditShift}>
                <label>{this.props.shift.shiftName}</label>
                <label>{this.props.shift.dateLabel}</label>
                <label>{this.props.shift.time}</label>
                <label>Working in this shift:</label>
                <ul>
                    {sheduled}
                </ul>
                <hr></hr>
                <label>Add worker to shift:</label>
                <ul>
                    {notSheduled}
                </ul>
                <button onClick={this.saveShiftChanges}>Save</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditShift: (id, employees) => dispatch(actions.editShift(id, employees))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditShift);