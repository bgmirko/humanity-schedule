import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Employee from '../../components/Employee/Employee';
import FormInputEmployee from '../../components/FormInputEmployee/FormInputEmployee';
import ShiftInputForm from '../../components/ShiftInputForm/ShiftInputForm';
import Modal from '../../components/UI/Modal/Modal';

import classes from './ScheduleControler.css';


class ScheduleControler extends Component {

    state = {
        showDaysOfWeek: [],
        editingEmployee: false,
        isNewEmployee: false,
        employee: {
            employeeId: null,
            firstName: "",
            lastName: "",
            avatarUrl: "",
            position: ""
        },
        shift: {
            name: "",
            date: "",
            dateLabel: "",
            position: "",
            employee: ""
        },
        editingShift: false
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
        this.setState({ showDaysOfWeek: [...daysInWeek] })
    }

    deleteEmployeeHandler = (id) => {
        this.props.onDeleteEmployee(id);
    }

    newEmployeeHandler = () => {
        this.setState({ editingEmployee: true, isNewEmployee: true });
    }

    cancelEditingEmployeeHandler = () => {
        const employee = { employeeId: null, firstName: "", lastName: "", avatarUrl: "", position: "" }
        this.setState({ editingEmployee: false, employee: employee })
    }

    textInputChangeHandler = (event) => {
        this.setState({
            employee: { ...this.state.employee, [event.target.name]: event.target.value }
        })
    }

    saveEmployeeHandler = (event) => {
        event.preventDefault();
        const { firstName, lastName, avatarUrl, position, employeeId } = this.state.employee;
        const data = {
            firstName: firstName,
            lastName: lastName,
            avatarUrl: avatarUrl,
            position: position,
        }
        console.log(data);
        if (this.state.isNewEmployee) {
            this.props.onAddEmployee(data);
        } else {
            this.props.onEditEmployee(employeeId, data);
        }
        event.target.firstName.value = "";
        event.target.lastName.value = "";
        event.target.avatarUrl.value = "";
        event.target.position.value = "";
        this.setState({ editingEmployee: false });
    }

    editEmployeeHandler = (empl) => {
        const employee = {
            employeeId: empl.id,
            firstName: empl.firstName,
            lastName: empl.lastName,
            avatarUrl: empl.avatarUrl,
            position: empl.position
        }
        this.setState({ editingEmployee: true, isNewEmployee: false, employee: employee });
    }

    createShift = (event) => {
        const date = event.target.getAttribute('data-date');
        const id = event.target.getAttribute('data-user');
        const dateLabel = event.target.getAttribute('date-label');
        const employee = this.props.employees.find(el => {
            return el.id === id;
        });
        console.log(employee);
        const shift = {
            name: "Shift Name",
            date: date,
            dateLabel: dateLabel,
            position: employee.position,
            employee: employee
        }
        this.setState({ editingShift: true, shift: shift})
    }

    cancelEditingShiftHandler = () => {
        this.setState({ editingShift: false });
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
                for(let i=0; i<=6; i++){
                    rowCells.push((
                    <td key={`a${i}`}
                        data-user={id} 
                        data-date={this.state.showDaysOfWeek[i].date}
                        date-label={this.state.showDaysOfWeek[i].label} 
                        onClick={this.createShift}>
                    </td>));
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
                <Modal show={this.state.editingEmployee} modalClosed={this.cancelEditingEmployeeHandler}>
                    <FormInputEmployee
                        onTextInputChange={this.textInputChangeHandler}
                        onSaveEmployee={this.saveEmployeeHandler}
                        firstName={this.state.employee.firstName}
                        lastName={this.state.employee.lastName}
                        avatarUrl={this.state.employee.avatarUrl}
                        position={this.state.employee.position}
                    />
                </Modal>
                <Modal show={this.state.editingShift} modalClosed={this.cancelEditingShiftHandler}>
                    <ShiftInputForm
                        onTextInputChange={this.textInputChangeHandler}
                        onSaveShift={this.saveShiftHandler}
                        dateLabel={this.state.shift.dateLabel}
                        employeeName={this.state.shift.employee.firstName}
                    />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees.employees
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetEmployees: () => dispatch(actions.getEmployees()),
        onDeleteEmployee: (id) => dispatch(actions.deleteEmployee(id)),
        onAddEmployee: (data) => dispatch(actions.addEmployee(data)),
        onEditEmployee: (id, data) => dispatch(actions.editEmployee(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleControler);