import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { routes } from '../../routes';

import AddEvent from '../AddEvent/AddEvent';
import Events from '../Events/Events';
import Event from '../Event/Event';
import './App.css';

export function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={routes.addEvent} render={() => <AddEvent />} />
        <Route path={routes.event} render={({ match }) => <Event id={match.params.id} />} />
        <Route path={routes.events} render={() => <Events />} />
        <Redirect to={routes.events} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
