import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Dashboard from '../pages/Dashboard';
import NewMeetup from '../pages/NewMeetup';
import Meetup from '../pages/Meetup';
import Preferences from '../pages/Preferences';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import PrivateRoute from './private';
import history from './history';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/new" component={NewMeetup} />
      <PrivateRoute path="/preferences" showMenu={false} component={Preferences} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/search" component={Search} />
      <PrivateRoute path="/meetup" component={Meetup} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
