import React, { Component } from 'react';

import ScheduleControler from './containers/ScheduleControler/ScheduleControler';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ScheduleControler /> 
      </div>
    );
  }
}

export default App;
