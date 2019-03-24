import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ScheduleControler from './containers/ScheduleControler/ScheduleControler';
import PageNavigation from './components/UI/PageNavigation/PageNavigation';
import Filter from './components/Filter/Filter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageNavigation />
        <Switch>
          <Route path="/filter" component={Filter} />
          <Route path="/" exact component={ScheduleControler} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
