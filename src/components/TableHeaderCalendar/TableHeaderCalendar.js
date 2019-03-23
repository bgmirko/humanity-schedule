import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions'


class TableHeaderCalendar extends Component {

    state = {
        daysInWeek: [],
        lastDayInWeek: "",
        firstDayOfFirstWeek: "",
        weekdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        monthNames: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC']
    }

    componentDidMount() {
        const todayNumber = new Date().getDay();
        const today = new Date();
        const lastDayInWeek = new Date(today.setDate(today.getDate() + 7 - todayNumber)).setHours(23, 59, 59, 999);
        const firstDayOfFirstWeek = new Date(today.setDate(today.getDate() - todayNumber)).setHours(0, 0, 0, 1);
        const disableBackwardButton = true;

        this.calculateWeek(lastDayInWeek, disableBackwardButton);
        this.setState({firstDayOfFirstWeek: firstDayOfFirstWeek});
    }

    switchDates = (direction) => {
        let lastDayInNewWeek = "";

        if (direction === "forward") {
            lastDayInNewWeek = this.state.lastDayInWeek + 7 * 24 * 60 * 60 * 1000;
        } else if (direction === "backward") {
            lastDayInNewWeek = this.state.lastDayInWeek - 7 * 24 * 60 * 60 * 1000;
        }

        let disableBackwardButton = false;
        if(lastDayInNewWeek < this.state.firstDayOfFirstWeek + 7 * 24 * 60 * 60 * 1000){
            disableBackwardButton = true;
        }

        this.calculateWeek(lastDayInNewWeek, disableBackwardButton);
    }

    calculateWeek = (lastDayInWeek, disableBackwardButton) => {
        const lastWeekDay = new Date(lastDayInWeek);
        let daysInWeek = [];

        for (let i = 7; i >= 1; i--) {
            const date = new Date(lastWeekDay - i * 24 * 60 * 60 * 1000);
            const dateLabel = `${this.state.weekdays[date.getDay()]}, ${this.state.monthNames[date.getMonth()]} ${date.getDate()}`;
            const day = {
                date: date,
                label: dateLabel
            }
            daysInWeek.push(day);
        }

        this.props.onStoreDates(daysInWeek, disableBackwardButton);
        this.setState({ daysInWeek: daysInWeek, lastDayInWeek: lastDayInWeek });
    }


    render() {

        let tableHeader = [];

        if (this.state.daysInWeek.length > 0) {
            tableHeader = this.state.daysInWeek.map(el => {
                return (<th key={el.date} >{el.label}</th>);
            });
            tableHeader.unshift((<th key="0">{`${this.state.daysInWeek[0].label} - ${this.state.daysInWeek[6].label}`}</th>))
        }

        return (
            <Fragment>
                {tableHeader}
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStoreDates: (daysInWeek, disableBackwardButton) => dispatch(actions.storeDates(daysInWeek, disableBackwardButton))
    };
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(TableHeaderCalendar);