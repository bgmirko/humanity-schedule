import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Employee from '../../components/Employee/Employee';
import Modal from '../../components/UI/Modal/Modal';
import Td from '../../components/UI/Td/Td';
import ShiftsControler from '../ShiftsControler/ShiftsControler';
import EmployeesControler from '../EmployeesControler/EmployeesControler';

import classes from './ScheduleControler.css';


class ScheduleControler extends Component {

    state = {
        showDaysOfWeek: [],
        shift: {
            shiftName: "",
            date: "",
            time: "",
            dateLabel: "",
            employees: []
        },
        shiftsOperation: "no", // no, editing, creating
        employeesOperation: "no", // no, new, edit
        modalIsOpen: false
    }

    componentDidMount() {
        let daysInWeek = [];
        const todayNumber = new Date().getDay();

        const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const monthName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];

        for (let i = 0; i <= 6; i++) {
            const today = new Date();
            const date = new Date(today.setDate(today.getDate() - todayNumber + i));
            const dateLabel = `${weekday[date.getDay()]}, ${monthName[date.getMonth()]} ${date.getDate()}`;
            const day = {
                date: date,
                label: dateLabel
            }
            daysInWeek.push(day);
        }
        this.props.onGetEmployees();
        this.props.onGetShifts();
        this.setState({ showDaysOfWeek: [...daysInWeek] })
    }

    newEmployeeHandler = () => {
        this.setState({ employeesOperation: "new", modalIsOpen: true });
    }

    cancelEditingEmployeesHandler = () => {
        this.setState({ employeesOperation: "no", modalIsOpen: false})
    }

    deleteEmployeeHandler = (id) => {
        this.refs.employeesControler.deleteEmployeeHandler(id);
    }

    editEmployeeHandler = (empl) => {
        this.refs.employeesControler.editEmployeeHandler(empl);
        this.setState({ employeesOperation: "editing" });
    }

    createShift = (userId, date, dateLabel) => {
        const employee = this.props.employees.find(el => el.id === userId);
        const shift = { date: date, dateLabel: dateLabel, employees: [employee] }
        this.setState({ shiftsOperation: "creating", shift: shift });
    }

    editShift = (shift) => {
        this.setState({ shiftsOperation: "editing", modalIsOpen: true, shift: shift })
    }

    cancelEditingShiftHandler = () => {
        this.setState({ shiftsOperation: "no", modalIsOpen: false });
    }

    render() {

        let tableHeder = [];

        if (this.state.showDaysOfWeek.length > 0) {
            tableHeder = this.state.showDaysOfWeek.map(el => {
                return (<th key={el.date} >{el.label}</th>);
            });
            tableHeder.unshift((<th key="0">{`${this.state.showDaysOfWeek[0].label} - ${this.state.showDaysOfWeek[6].label}`}</th>))
        }

        let employeesTableRows = [];
        if (this.props.employees.length > 0) {
            employeesTableRows = this.props.employees.map(el => {
                const id = el.id;
                let rowCells = [];
                for (let i = 0; i <= 6; i++) {
                    const dataLabel = this.state.showDaysOfWeek[i].label;
                    rowCells.push((
                        <Td key={`${i}${id}`}
                            userId={id}
                            date={this.state.showDaysOfWeek[i].date}
                            dateLabel={dataLabel}
                            shift={this.props.shifts.find(el => (el.dateLabel === dataLabel
                                && el.employees.find(employee => { return employee.id === id })))}
                            employeeId={id}
                            click={(userId, date, dateLabel) => this.createShift(userId, date, dateLabel)}
                            editShift={(shift) => this.editShift(shift)}>
                        </Td>
                    ));
                }
                return (
                    <tr key={id}>
                        <td><Employee
                            firstName={el.firstName}
                            lastName={el.lastName}
                            position={el.position}
                            avatarUrl={el.avatarUrl}
                            onDeleteEmployee={() => this.deleteEmployeeHandler(id)}
                            onEditEmployee={() => this.editEmployeeHandler(el)}
                        /></td>
                        {rowCells}
                    </tr>
                );
            });
        }

        return (
            <div className={classes.ScheduleControler}>
                <table>
                    <tbody>
                        <tr>
                            {tableHeder}
                        </tr>
                        {employeesTableRows}
                        <tr>
                            <td><button onClick={this.newEmployeeHandler}>Add Employee</button></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <Modal show={this.state.employeesOperation !== "no"} modalClosed={this.cancelEditingEmployeesHandler}>
                    <EmployeesControler 
                        ref="employeesControler"
                        employeesOperation={this.state.employeesOperation}
                        modalIsOpen={this.state.modalIsOpen}
                        closeDialog={this.cancelEditingEmployeesHandler}
                    />
                </Modal>
                <Modal show={this.state.shiftsOperation !== "no"} modalClosed={this.cancelEditingShiftHandler}>
                    <ShiftsControler
                        shiftsOperation={this.state.shiftsOperation}
                        shift={this.state.shift}
                        employees={this.props.employees} // this is all employees not only employees in that shift
                        modalIsOpen={this.state.modalIsOpen}
                        closeDialog={this.cancelEditingShiftHandler}

                    />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees.employees,
        shifts: state.shifts.shifts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetEmployees: () => dispatch(actions.getEmployees()),
        onGetShifts: () => dispatch(actions.getShifts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleControler);