import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import ShiftInputForm from '../../components/ShiftInputForm/ShiftInputForm';

import classes from './ShiftsControler.css';

class ShiftsControler extends Component {

    state = {
        shift: {
            shiftName: "",
            date: "",
            time: "",
            dateLabel: "",
            position: "",
            employees: []
        },
        sheduledEmployees: [],
        unsheduledEmployees: [],
        openForData: true,
        startTime: "",
        endTime: "",
        errorMessage: []
    }

    componentDidUpdate() {

        if (this.props.shiftsOperation === "edit" && this.state.openForData) {
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

        if (!this.props.modalIsOpen && !this.state.openForData) {
            this.setState({ openForData: true});
        }
        if (!this.props.modalIsOpen && this.state.errorMessage.length > 0) {
            this.setState({ errorMessage: []});
        }
    }

    textInputChangeHandler = (event) => {
        this.setState({
            shift: { ...this.state.shift, [event.target.name]: event.target.value }
        })
    }

    timeInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    saveNewShiftHandler = (time) => {
        const data = {
            shiftName: this.state.shift.shiftName,
            date: this.props.shift.date,
            dateLabel: this.props.shift.dateLabel,
            time: time,
            employees: this.props.shift.employees
        }
        this.props.onSaveShift(data);
        this.props.closeDialog();
    }

    saveEditShiftHandler = () => {
        this.props.onEditShift(this.props.shift.id, this.state.sheduledEmployees);
        this.props.closeDialog();
        this.setState({ openForData: true });
    }

    deleteShiftHandler = () => {
        this.props.onDeleteShift(this.props.shift.id);
        this.props.closeDialog();
        this.setState({ openForData: true })
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

    validateInputData = (event) => {
        event.preventDefault();
        let errorMsg = [];
        if (!this.state.shift.shiftName) {
            errorMsg.push("Shift name is not defined");
        }
        if (!this.state.startTime || !this.state.endTime) {
            errorMsg.push("Time is not defined");
        }
        if (errorMsg.length > 0) {
            this.setState({ errorMessage: errorMsg });
        } else {
            const time = `${this.state.startTime}${event.target.startTimeAmPm.value} - ${this.state.endTime}${event.target.endTimeAmPm.value}`;
            this.saveNewShiftHandler(time)
            const shift = {
                ...this.state.shift,
                shiftName: ""
            }
            this.setState({ errorMessage: [], shift: shift, startTime: "", endTime: "" });
        }
    }


    render() {

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

        switch (this.props.shiftsOperation) {
            case "create":
                return (
                    <ShiftInputForm
                        onTextInputChange={this.textInputChangeHandler}
                        onTimeInputChange={this.timeInputChange}
                        errorMessage={this.state.errorMessage}
                        submit={(e) => this.validateInputData(e)}
                        dateLabel={this.props.shift.dateLabel}
                        employees={this.props.shift.employees}
                    />
                );
            case "edit":
                return (
                    <div className={classes.ShiftsControler}>
                        <h3>{this.props.shift.shiftName}</h3>
                        <div className={classes.Date}>
                            <label>{this.props.shift.dateLabel}</label>
                            <label>{this.props.shift.time}</label>
                        </div>
                        <div className={classes.Workers_Container}>
                            <div>
                                <label>Working in this shift:</label>
                                <ul>
                                    {sheduled}
                                </ul>
                            </div>
                            <div>
                                <label>Add worker to shift:</label>
                                <ul>
                                    {notSheduled}
                                </ul>
                            </div>
                        </div>
                        <div className={classes.Buttons_Container}>
                            <button
                                className={classes.Delete_Button}
                                onClick={this.deleteShiftHandler}>Delete</button>
                            <button
                                className={classes.Save_Button}
                                onClick={this.saveEditShiftHandler}>Save</button>
                        </div>
                    </div>
                )
            default: return null;
        }
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onSaveShift: (data) => dispatch(actions.saveShift(data)),
        onEditShift: (id, employees) => dispatch(actions.editShift(id, employees)),
        onDeleteShift: (id) => dispatch(actions.deleteShift(id))
    };
};

export default connect(null, mapDispatchToProps)(ShiftsControler);