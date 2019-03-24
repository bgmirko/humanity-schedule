import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import FormInputEmployee from '../../components/FormInputEmployee/FormInputEmployee';


class EmployeesControler extends Component {

    state = {
        employee: {
            employeeId: null,
            firstName: "",
            lastName: "",
            avatarUrl: "",
            position: ""
        },
        resetEmployeeData: true,
        errorMessage: []
    }

    componentDidUpdate(){

        if(this.props.employeesOperation === "new" && this.state.resetEmployeeData){
            const employee = {employeeId: null, firstName: "", lastName: "", avatarUrl: "", position: ""}
            this.setState({employee: employee, resetEmployeeData: false})
        }

        if(!this.props.modalIsOpen && !this.state.resetEmployeeData){
            this.setState({resetEmployeeData: true});
        }

        if (!this.props.modalIsOpen && this.state.errorMessage.length > 0) {
            this.setState({ errorMessage: []});
        }

    }

    saveEmployeeHandler = (position) => {
        const { firstName, lastName, avatarUrl, employeeId } = this.state.employee;
        const data = {
            firstName: firstName,
            lastName: lastName,
            avatarUrl: avatarUrl,
            position: position,
        }

        if (this.props.employeesOperation === "new") {
            this.props.onAddEmployee(data);
        } else if (this.props.employeesOperation === "edit") {
            this.props.onEditEmployee(employeeId, data);
        }
        
        const employee = { employeeId: null, firstName: "", lastName: "", avatarUrl: "", position: "" }
        this.props.closeDialog();
        this.setState({ employee: employee, errorMessage: []});
    }

    editEmployeeHandler = (empl) => {
        const employee = {
            employeeId: empl.id,
            firstName: empl.firstName,
            lastName: empl.lastName,
            avatarUrl: empl.avatarUrl,
            position: empl.position
        }
        this.setState({ employee: employee });
    }

    deleteEmployeeHandler = (id) => {
        this.props.onDeleteEmployee(id);
    }

    textInputChangeHandler = (event) => {
        this.setState({
            employee: { ...this.state.employee, [event.target.name]: event.target.value }
        })
    }

    verifyInputData = (e) => {
        e.preventDefault();
        const position = e.target.jobPosition.value;
        let errorMsg = [];
        if(e.target.firstName.value === ""){
            errorMsg.push("Shift name is not defined");
        }
        if(e.target.lastName.value === ""){
            errorMsg.push("Last name is not defined");
        }
        if(e.target.avatarUrl.value === ""){
            errorMsg.push("Image url is not defined");
        }
        if(position === "intro"){
            errorMsg.push("Job position is not defined");
        }
        if(errorMsg.length > 0){
            this.setState({errorMessage: errorMsg});
        }else{
            e.target.jobPosition.value = "intro";
            this.saveEmployeeHandler(position);
        }
    }

    render() {

        return (
            <FormInputEmployee
                onTextInputChange={this.textInputChangeHandler}
                onSaveEmployee={(e) => this.verifyInputData(e)}
                firstName={this.state.employee.firstName}
                lastName={this.state.employee.lastName}
                avatarUrl={this.state.employee.avatarUrl}
                position={this.state.employee.position}
                errorMessage={this.state.errorMessage}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
         onDeleteEmployee: (id) => dispatch(actions.deleteEmployee(id)),
         onAddEmployee: (data) => dispatch(actions.addEmployee(data)),
         onEditEmployee: (id, data) => dispatch(actions.editEmployee(id, data)),
    };
};

export default connect(null, mapDispatchToProps, null, {forwardRef : true})(EmployeesControler);