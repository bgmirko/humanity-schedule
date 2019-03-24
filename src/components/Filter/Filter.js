import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import classes from './Filter.css';

class Filter extends Component{

    state = {
        selectedEmployeeId: "",
        shiftForSelectedEmpl: []
    }

    componentDidMount() {
        if(this.props.employees.length === 0){
            this.props.onGetEmployees();
        }
        if(this.props.shifts.length === 0){
            this.props.onGetShifts();
        }  
    }

    filterShiftForEmployee = (e) =>{
        const selectedEmployeeId = e.target.value;
        let isSheduled;
        let shiftForSelectedEmployee = [];
        for(let key in this.props.shifts){
            isSheduled = this.props.shifts[key].employees.find(empl => empl.id === selectedEmployeeId);
            if(isSheduled){
                shiftForSelectedEmployee.push(this.props.shifts[key]);
            }
        } 
        this.setState({selectedEmployeeId: selectedEmployeeId, shiftForSelectedEmpl: shiftForSelectedEmployee});
    }

    render(){

        let employees = "";
        if(this.props.employees.length > 0){
            employees = this.props.employees.map(el => 
                <option 
                    key={el.id}
                    value={el.id}
                    >{`${el.firstName} ${el.lastName}`}</option>);
            if(this.state.selectedEmployeeId === ""){
                employees.unshift((<option key='intro' value='intro'>Select Employee</option>))
            }
            
        }

        let table = "";
        let rowData = "";

        if(this.state.shiftForSelectedEmpl.length > 0){
            rowData = this.state.shiftForSelectedEmpl.map(el => {
                return(
                    <tr key={el.dateLabel}>
                        <td>{el.dateLabel}</td>
                        <td>{el.time}</td>
                        <td>{el.shiftName}</td>
                    </tr>
                )
            });
            table = (
                <table>
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Shift Name</th>
                        </tr>
                        {rowData}
                    </tbody>
                </table>
            );
        }else if(this.state.selectedEmployeeId){
            table = (<h3>No shift for selected employee</h3>);
        }

        return(
                <div className={classes.Filter}
                    onChange={(e) => this.filterShiftForEmployee(e)}>
                    <select>
                        {employees}
                    </select>
                    {table}
                </div>
        )
    }
} 

const mapStateToProps = state => {
    return {
        employees: state.employees.employees,
        shifts: state.shifts.shifts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetEmployees: () => dispatch(actions.getEmployees()),
        onGetShifts: () => dispatch(actions.getShifts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
