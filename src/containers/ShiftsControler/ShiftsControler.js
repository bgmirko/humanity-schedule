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
    }

    componentDidUpdate() {
        if (this.props.shiftsOperation === "editing" && this.state.openForData) {
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

        if(!this.props.modalIsOpen && !this.state.openForData){
            this.setState({openForData: true});
        }
    }

    textInputChangeHandler = (event) => {
        this.setState({
            shift: { ...this.state.shift, [event.target.name]: event.target.value }
        })
    }

    saveNewShiftHandler = (event, date, dateLabel, employees) => {
        event.preventDefault();
        const data = {
            shiftName: event.target.shiftName.value,
            date: date,
            dateLabel: dateLabel,
            time: event.target.time.value,
            employees: employees
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
            case "creating":
                return (
                    <ShiftInputForm
                        onTextInputChange={this.textInputChangeHandler}
                        onSaveShift={(event) => this.saveNewShiftHandler(event, this.props.shift.date, this.props.shift.dateLabel, this.props.shift.employees)}
                        dateLabel={this.props.shift.dateLabel}
                        employees={this.props.shift.employees}
                    />
                );
            case "editing":
                return (
                    <div className={classes.ShiftsControler}>
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
                        <button onClick={this.deleteShiftHandler}>Delete</button>
                        <button onClick={this.saveEditShiftHandler}>Save</button>
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