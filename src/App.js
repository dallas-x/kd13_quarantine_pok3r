import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Navi from './Components/Navi';
import Home from './Views/Home';
import Admin from './Views/Admin';
import LowLimit from './Views/LowLimit';
import HighRoller from './Views/HighRoller';
import Registration from './Views/Registration';
import Login from './Views/Login';

const App = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: `https://${process.env.OKTA_DOMAIN}.okta.com/oauth2/default`,
    clientId: process.env.OKTA_REACT_CLIENTID,
    redirectUri: window.location.origin + process.env.REDIRECT_URI,
    onAuthRequired: onAuthRequired,
  });
  return (
    <Router>
      <Security oktaAuth={oktaAuth}>
        <Navi />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/high" component={HighRoller} />
          <Route path="/low" component={LowLimit} />
          <Route path="/registration" component={Registration} />
        </Switch>
        <Route path="/login" component={Login} />
        <Route path="/login/callback" component={LoginCallback} />
      </Security>
    </Router>
  );
};
render(<App />, document.getElementById('root'));
