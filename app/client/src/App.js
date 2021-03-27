import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
// rename example.app.config.js
import config from './app.config.js';
import Navi from './Components/Navi';
import Home from './Views/Home';
import Admin from './Views/Admin';
import Registration from './Views/Registration';
import Login from './Views/Login';

const App = () => {
  const oktaAuth = new OktaAuth(config.oidc);
  // I didn't find OKTA redirect to work that great!
  // If you want to use a customHandler for okta SecureRoute
  // Redirect to the /login page that has a CustomLoginComponent
  // -----------------------------------------------------------
  // const history = useHistory();
  // const customAuthHandler = () => {
  //   history('/login');
  // };
  // -----------------------------------------------------------
  return (
    <Router>
      <Security oktaAuth={oktaAuth}>
        <Navi />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/registration" component={Registration} />
        </Switch>
        <Route path="/login" component={Login} />
        <Route path="/login/callback" component={LoginCallback} />
      </Security>
    </Router>
  );
};
render(<App />, document.getElementById('root'));
