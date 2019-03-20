import React, { Component } from 'react';


class ScheduleControler extends Component {

    state = {
        showDaysOfWeek: []
    }

    componentDidMount() {
        let daysInWeek = [];
        const todayNumber = new Date().getDay();

        const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const monthName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];

        for(let i=0; i<=7; i++){
            const today = new Date();
            const date = new Date(today.setDate(today.getDate() - todayNumber + i));
            const dateLabel = `${weekday[date.getDay()]}, ${monthName[date.getMonth()]} ${date.getDate()}`;
            const day = {
                date: date,
                label: dateLabel
            }
            daysInWeek.push(day);
        }

        this.setState({showDaysOfWeek: [...daysInWeek]})
        // for(let day of daysInWeek){
        //     console.log(day);
        // }
        
       
    }


    render() {

        console.log(this.state.showDaysOfWeek);
        let tableHeder = [];

        if(this.state.showDaysOfWeek.length > 0){
            console.log('Jeste');
            // tableHeader.push(`${this.state.showDaysOfWeek[0].label} - ${this.state.showDaysOfWeek[6].label}`);
            let iterator = 1;
            tableHeder = this.state.showDaysOfWeek.map(el => {
                return (<th key={iterator++} >{el.label}</th>);
            });
            tableHeder.unshift((<th key="0">{`${this.state.showDaysOfWeek[0].label} - ${this.state.showDaysOfWeek[6].label}`}</th>))
        }

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            {tableHeder}
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ScheduleControler;