import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SigIn';
import SignUp from '../pages/SigUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);

export default Routes;
