import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Events from '../Events/Events';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route render={() => <Events />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
