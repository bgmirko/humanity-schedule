import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Employee from '../../components/Employee/Employee';
import Modal from '../../components/UI/Modal/Modal';
import Td from '../../components/UI/Td/Td';
import TableHeaderCalendar from '../../components/TableHeaderCalendar/TableHeaderCalendar';
import ShiftsControler from '../ShiftsControler/ShiftsControler';
import EmployeesControler from '../EmployeesControler/EmployeesControler';

import classes from './ScheduleControler.css';


class ScheduleControler extends Component {

    state = {
        // daysInWeek: [],
        shift: {
            shiftName: "",
            date: "",
            time: "",
            dateLabel: "",
            employees: []
        },
        shiftsOperation: "no", // no, edit, create
        employeesOperation: "no", // no, new, edit
        modalIsOpen: false
    }

    componentDidMount() {
        this.props.onGetEmployees();
        this.props.onGetShifts();
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
        this.setState({ employeesOperation: "edit" });
    }

    createShift = (userId, date, dateLabel) => {
        const employee = this.props.employees.find(el => el.id === userId);
        const shift = { date: date, dateLabel: dateLabel, employees: [employee] }
        this.setState({ shiftsOperation: "create", shift: shift });
    }

    editShift = (shift) => {
        this.setState({ shiftsOperation: "edit", modalIsOpen: true, shift: shift })
    }

    cancelEditingShiftHandler = () => {
        this.setState({ shiftsOperation: "no", modalIsOpen: false });
    }

    switchDates = (direction) => {
        this.refs.tableHeaderCalendar.switchDates(direction);
    }

    render() {

        let employeesTableRows = [];
        if (this.props.employees.length > 0 && this.props.daysInWeek.length > 0) {
            employeesTableRows = this.props.employees.map(el => {
                const id = el.id;
                let rowCells = [];
                for (let i = 0; i <= 6; i++) {
                    const dataLabel = this.props.daysInWeek[i].label;
                    rowCells.push((
                        <Td key={`${i}${id}`}
                            userId={id}
                            date={this.props.daysInWeek[i].date}
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
                <div className={classes.Date_Buttons_Container}>
                    <button onClick={() => this.switchDates('backward')}
                            disabled = {this.props.disableBackwardButton}>&#60;</button>
                    <button onClick={() => this.switchDates('forward')}>&#62;</button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <TableHeaderCalendar
                                ref="tableHeaderCalendar" 
                            />
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
        shifts: state.shifts.shifts,
        daysInWeek: state.calendar.daysInWeek,
        disableBackwardButton: state.calendar.disableBackwardButton
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetEmployees: () => dispatch(actions.getEmployees()),
        onGetShifts: () => dispatch(actions.getShifts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleControler);