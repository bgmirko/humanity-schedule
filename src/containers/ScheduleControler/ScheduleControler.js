import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Employee from '../../components/Employee/Employee';
import Modal from '../../components/UI/Modal/Modal';
import TableCell from '../../components/TableCell/TableCell';
import TableHeaderCalendar from '../../components/TableHeaderCalendar/TableHeaderCalendar';
import ShiftsControler from '../ShiftsControler/ShiftsControler';
import EmployeesControler from '../EmployeesControler/EmployeesControler';

import classes from './ScheduleControler.css';


class ScheduleControler extends Component {

    state = {
        shift: {
            shiftName: "",
            date: "",
            time: "",
            dateLabel: "",
            employees: []
        },
        shiftsOperation: "no", // no, create, edit 
        employeesOperation: "no", // no, new, edit
        modalIsOpen: false
    }

    componentDidMount() {
        if(this.props.employees.length === 0){
            this.props.onGetEmployees();
        }
        if(this.props.shifts.length === 0){
            this.props.onGetShifts();
        }
    }

    newEmployeeHandler = () => {
        this.setState({ employeesOperation: "new", modalIsOpen: true });
    }

    editEmployeeHandler = (empl) => {
        this.refs.employeesControler.editEmployeeHandler(empl);
        this.setState({ employeesOperation: "edit" });
    }

    deleteEmployeeHandler = (id) => {
        this.refs.employeesControler.deleteEmployeeHandler(id);
    }

    cancelEditingEmployeesHandler = () => {
        this.setState({ employeesOperation: "no", modalIsOpen: false})
    }

    createShift = (employeeId, date, dateLabel) => {
        const employee = this.props.employees.find(el => el['id'] === employeeId);
        const shift = { date: date, dateLabel: dateLabel, employees: [employee] }
        this.setState({ shiftsOperation: "create", shift: shift, modalIsOpen: true});
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
                        <TableCell key={`${i}${id}`}
                            date={this.props.daysInWeek[i].date}
                            dateLabel={dataLabel}
                            shift={this.props.shifts.find(el => (el.dateLabel === dataLabel && 
                                    el.employees.find(employee => { return employee.id === id })))}
                            employeeId={id}
                            click={(id, date, dateLabel) => this.createShift(id, date, dateLabel)}
                            editShift={(shift) => this.editShift(shift)}>
                        </TableCell>
                    ));
                }

                let bottomRow = [];
                for (let i = 0; i <= 6; i++) {
                    bottomRow.push((
                        <TableCell key={`${i}${id}`}
                            date={this.props.daysInWeek[i].date}
                            dateLabel={null}
                            shift={null}
                            employeeId={null}>
                        </TableCell>
                    ));
                }


                return (
                    <tr key={id}>
                        <td className={classes.EmployeeCell}><Employee
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

        let endRow = [];
        const today = new Date();
        if(this.props.daysInWeek.length > 0){
            endRow = this.props.daysInWeek.map(el => {
                let inputDate = new Date(el['date']);
                if(inputDate.setHours(0,0,0,0) === today.setHours(0,0,0,0)){
                    return (<td key={el['date']} className={classes.TableCellToday}></td>)
                }else{
                    return (<td key={el['date']}></td>)
                }
            });
        }

        return (
            <div className={classes.ScheduleControler}>
                <div className={classes.Date_Buttons_Container}>
                    <button onClick={() => this.switchDates('backward')}
                            className = {this.props.disableBackwardButton ? classes.Disable : ""}
                            style={{float: 'left'}}>&#60;</button>
                    <button className = {this.props.disableBackwardButton ? classes.Right : ""} 
                        onClick={() => this.switchDates('forward')}>&#62;</button>
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
                            {endRow}
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
                        employees={this.props.employees}
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