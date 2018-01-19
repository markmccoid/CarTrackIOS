import React from 'react';
import { Router, Route, Switch } from 'react-router-native';
import createHistory from 'history/createMemoryHistory';

import Login from '../components/login/Login';
import MainContainer from '../components/MainContainer';
import ServiceDetails from '../components/ServiceDetails';

export const history = createHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/maincontainer" component={MainContainer} />
        <Route path="/servicedetails/:id" component={ServiceDetails} />
      </Switch>
    </Router>
  );
};

export default AppRouter;