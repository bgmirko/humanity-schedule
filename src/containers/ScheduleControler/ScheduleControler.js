import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Employee from '../../components/Employee/Employee';
import FormInputEmployee from '../../components/FormInputEmployee/FormInputEmployee';
import Modal from '../../components/UI/Modal/Modal';

import classes from './ScheduleControler.css';


class ScheduleControler extends Component {

    state = {
        showDaysOfWeek: [],
        editingEmployee: false,
        firstName: "",
        lastName: "",
        avatarUrl: "",
        position: "",
        employeeId: null,
        isNewEmployee: false
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
        console.log("delete employeer");
        console.log(id);
        this.props.onDeleteEmployee(id);
    }

    newEmployeeHandler = () => {
        this.setState({editingEmployee: true, isNewEmployee: true});
    }

    cancelEditingEmployeeHandler = () => {
        this.setState({editingEmployee: false})
    }

    textInputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    saveEmployeeHandler = (event) => {
        event.preventDefault();
        const { firstName, lastName, avatarUrl, position, employeeId } = this.state;
        const data = {
            firstName: firstName,
            lastName: lastName,
            avatarUrl: avatarUrl,
            position: position,
        }
        console.log(data);
        if(this.state.isNewEmployee){
            this.props.onAddEmployee(data);
        }else{
            this.props.onEditEmployee(employeeId, data);
        } 
        event.target.firstName.value = "";
        event.target.lastName.value = "";
        event.target.avatarUrl.value = "";
        event.target.position.value="";
        this.setState({editingEmployee: false});
    }

    editEmployeeHandler = (employee) => {
        this.setState({editingEmployee: true, isNewEmployee: false, employeeId: employee.id, firstName: employee.firstName, lastName: employee.lastName, avatarUrl: employee.avatarUrl, position: employee.position});
    }


    render() {

        let tableHeder = [];

        if (this.state.showDaysOfWeek.length > 0) {
            let iterator = 1;
            tableHeder = this.state.showDaysOfWeek.map(el => {
                return (<th key={iterator++} >{el.label}</th>);
            });
            tableHeder.unshift((<th key="0">{`${this.state.showDaysOfWeek[0].label} - ${this.state.showDaysOfWeek[6].label}`}</th>))
        }

        let employeesTableRows = [];

        if (this.props.employees.length > 0) {
            employeesTableRows = this.props.employees.map(el => {
                const id = el.id;
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
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
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        avatarUrl={this.state.avatarUrl}
                        position={this.state.position}
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